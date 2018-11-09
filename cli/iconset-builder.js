'use strict';

var path = require('path'),
	q = require('q'),
	xml2js = require('xml2js'),
	fs = require('fs');

var iconsetObjTemplate = {
	'iron-iconset-svg': {
		'$': {'name': '', 'size': '', 'rtl-mirroring': true},
		'svg': {'defs': {'g': []}}
	}
};

function processFill(elem) {
	if (elem.$ && elem.$.fill && elem.$.fill.toLowerCase() === '#565a5c') {
		delete elem.$.fill;
	}
	for (var child in elem) {
		if (child !== '$') {
			processFill(elem[child]);
		}
	}
}

function buildFileXml(iconsetObj, objs, iconsetPath, file) {

	var deferred = q.defer();

	var extension = path.extname(file);
	if (extension !== '.svg') {
		return;
	}

	fs.readFile(path.join(iconsetPath, file), 'utf8', function(err, xml) {
		if (err) {
			return deferred.reject(err);
		}
		var id = path.basename(file, extension);
		var parser = new xml2js.Parser();
		parser.parseString(xml, function(err, result) {
			if (err) {
				return deferred.reject(err);
			}
			if (iconsetObj['iron-iconset-svg'].$.size === '' && result.svg.$.viewBox) {
				var values = result.svg.$.viewBox.split(' ');
				iconsetObj['iron-iconset-svg'].$.size = values[values.length - 1].toString();
			}
			var attrs = {'id': id};
			if (result.svg.$['mirror-in-rtl'] !== undefined) {
				attrs['mirror-in-rtl'] = true;
			}
			processFill(result);
			var g = {
				$: attrs
			};
			for (var child in result.svg) {
				if (child !== '$') {
					g[child] = result.svg[child];
				}
			}
			objs[file] = g;
			deferred.resolve(true);
		});
	});

	return deferred.promise;

}

module.exports = function(iconsetPath) {

	iconsetPath = path.join(__dirname, '../', iconsetPath);

	var name = path.basename(iconsetPath);

	var iconsetObj = JSON.parse(JSON.stringify(iconsetObjTemplate));
	iconsetObj['iron-iconset-svg'].$.name = 'd2l-' + name;

	var objs = {};

	var files = fs
		.readdirSync(iconsetPath)
		.sort(function(a, b) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});
	var promises = [];
	files.forEach(function(file) {
		promises.push(buildFileXml(iconsetObj, objs, iconsetPath, file));
	});

	return q.allSettled(promises)
		.then(function() {
			files.forEach(function(file) {
				if (objs[file]) {
					iconsetObj['iron-iconset-svg'].svg.defs.g.push(objs[file]);
				}
			});
			var builder = new xml2js.Builder({headless: true});
			return builder.buildObject(iconsetObj);
		}).then(function(xml) {
			//xml = xml.substring(7, xml.length - 7);
			var content = `import '../@polymer/polymer/polymer-legacy.js';
import '../@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = \`${xml}\`;
document.head.appendChild($_documentContainer.content);
`;
			return fs.writeFile(path.join(__dirname, '../', name + '-icons.js'), content);
		});

};
