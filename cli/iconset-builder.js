'use strict';

var path = require('path'),
	q = require('q'),
	xml2js = require('xml2js'),
	fs = require('fs');

var iconsetObjTemplate = {
	'link': [
		{'$': {'rel': 'import', 'href': '../polymer/polymer.html'}},
		{'$': {'rel': 'import', 'href': '../iron-iconset-svg/iron-iconset-svg.html'}},
	],
	'iron-iconset-svg': {
		'$': {'name': '', 'size': ''},
		'svg': {'defs': {'g': []}}
	}
};

function processFill(elem) {
	if (elem.$ && elem.$.fill && elem.$.fill !== 'none') {
		delete elem.$.fill;
	}
	for(var child in elem) {
		if (child !== '$') {
			processFill(elem[child]);
		}
	}
}

function buildFileXml(iconsetObj, iconsetPath, file) {

	var deferred = q.defer();

	var extension = path.extname(file);
	if (extension !== '.svg') {
		return;
	}

	fs.readFile(path.join(iconsetPath, file), 'utf8', function(err, xml) {
		if (err) {
			return deferred.reject(err);
		}
		var parser = new xml2js.Parser();
		parser.parseString(xml, function(err, result) {
			if (err) {
				return deferred.reject(err);
			}
			if (iconsetObj['iron-iconset-svg'].$.size === '' && result.svg.$.viewBox) {
				var values = result.svg.$.viewBox.split(' ');
				iconsetObj['iron-iconset-svg'].$.size = values[values.length-1].toString();
			}
			processFill(result);
			var g = {
				$: {'id': path.basename(file, extension)}
			};
			for(var child in result.svg) {
				if (child !== '$') {
					g[child] = result.svg[child];
				}
			}
			iconsetObj['iron-iconset-svg'].svg.defs.g.push(g);
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

	var files = fs.readdirSync(iconsetPath);
	var promises = [];
	files.forEach(function(file) {
		promises.push(buildFileXml(iconsetObj, iconsetPath, file));
	});

	return q.allSettled(promises)
		.then(function(results) {
			var builder = new xml2js.Builder({headless: true});
			return builder.buildObject(iconsetObj);
		}).then(function(xml) {
			xml = xml.substring(7, xml.length - 7);
			return fs.writeFile(path.join(__dirname, '../', name + '-icons.html'), xml);
		});

};
