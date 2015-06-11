'use strict';

var mixinNs = '#vui';
var forEachIcon = require('./for-each-icon');

var writeCssLess = function(iconPaths, lessPath) {

	var iconInfos = [];

	var fs = require('fs');
	var less = fs.createWriteStream(lessPath);

	less.write('@import \'icons.less\';\n\n');

	less.write('[class*=" vui-icon-"],\n');
	less.write('[class^="vui-icon-"] { \n');
	less.write('	#vui.Icon();\n');
	less.write('}\n\n');

	return forEachIcon(iconPaths, function(iconInfo) {

		iconInfos.push(iconInfo);

	}).then(function() {

		iconInfos.sort(function(a,b) {
			if (a.className > b.className) {
				return 1;
			}
			if (a.className < b.className) {
				return -1;
			}
			return 0;
		});

		for(var i=0; i<iconInfos.length; i++) {
			var iconInfo = iconInfos[i];
			if (!iconInfo.isRtl) {
				less.write('.' + iconInfo.className + ' {\n');
				less.write('	' + mixinNs + '.Icon' + '.' + iconInfo.mixin + ';\n');
				less.write('}\n');
			}
		}

	}).then(function() {

		var deferred = require('q').defer();

		less.on('finish', function() {
			deferred.resolve();
		});

		less.end();

		return deferred.promise;

	});

};

module.exports = writeCssLess;
