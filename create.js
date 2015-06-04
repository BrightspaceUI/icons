'use strict';

var minify = require('images-to-variables').minify;
var forEachIcon = require('./for-each-icon');

var generate = function(iconPaths, outputPath, formatter) {

	var iconInfos = [];

	return forEachIcon(iconPaths, function(iconInfo) {

		iconInfos.push(iconInfo);

	}).then(function() {

		var q = require('q');
		var iconPromises = [];

		var tryGetRtlIcon = function(ltrIcon) {
			for(var i=0; i<iconInfos.length; i++) {
				if (iconInfos[i].isRtl && iconInfos[i].name === ltrIcon.name) {
					return iconInfos[i];
				}
			}
			return null;
		};

		var getIconInfo = function(ltrIconInfo) {

			if (ltrIconInfo.isRtl) {
				return;
			}

			var minifyPromises = [];
			minifyPromises.push(minify( ltrIconInfo.file));

			var rtlIconInfo = tryGetRtlIcon(ltrIconInfo);
			if (rtlIconInfo) {
				minifyPromises.push(minify(rtlIconInfo.file));
			}

			return q.all(minifyPromises).then(function(minifiedIcons) {

				var iconInfo = ltrIconInfo;

				iconInfo.ltrIcon = minifiedIcons[0].contents;

				if (minifiedIcons.length === 2) {
					iconInfo.rtlIcon = minifiedIcons[1].contents;
				}

				return iconInfo;
			} );

		};

		for(var i=0; i<iconInfos.length; i++) {

			var iconPromise = getIconInfo(iconInfos[i]);
			if (iconPromise) {
				iconPromises.push(iconPromise);
			}

		}

		return q.all(iconPromises);

	}).then(function(iconInfos) {

		return formatter(iconInfos, outputPath);

	});

};

module.exports = generate;
