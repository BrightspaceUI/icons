'use strict';

var forEachIcon = require('./for-each-icon');

var writeCssScss = function(iconPaths, scssPath) {

	var iconInfos = [];

	var fs = require('fs');
	var scss = fs.createWriteStream(scssPath);

	scss.write('@import \'icons\';\n\n');

	scss.write('[class*=" vui-icon-"],\n');
	scss.write('[class^="vui-icon-"] { \n');
	scss.write('	@include vui-icon();\n');
	scss.write('}\n\n');

	return forEachIcon(iconPaths, function(iconInfo) {

		if (!iconInfo.isRtl) {
			iconInfos.push(iconInfo);
		}

	}).then( function() {

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
				scss.write('.' + iconInfo.className + ' {\n');
				scss.write('	@include vui-icon-' + iconInfo.mixin + ';\n');
				scss.write('}\n');
			}
		}

	}).then( function() {

		var deferred = require('q').defer();

		scss.on('finish', function() {
			deferred.resolve();
		});

		scss.end();

		return deferred.promise;

	});

};

module.exports = writeCssScss;
