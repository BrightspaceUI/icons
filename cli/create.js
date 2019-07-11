'use strict';

const minify = require('images-to-variables').minify;
const forEachIcon = require('./for-each-icon');

const generate = function(iconPaths, outputPath, formatter) {

	const iconInfos = [];

	return forEachIcon(iconPaths, (iconInfo) => {

		iconInfos.push(iconInfo);

	}).then(() => {

		const q = require('q');
		const iconPromises = [];

		const tryGetRtlIcon = function(ltrIcon) {
			for (let i = 0; i < iconInfos.length; i++) {
				if (iconInfos[i].isRtl && iconInfos[i].name === ltrIcon.name) {
					return iconInfos[i];
				}
			}
			return null;
		};

		const getIconInfo = function(ltrIconInfo) {

			if (ltrIconInfo.isRtl) {
				return;
			}

			const minifyPromises = [];
			minifyPromises.push(minify(ltrIconInfo.file));

			const rtlIconInfo = tryGetRtlIcon(ltrIconInfo);
			if (rtlIconInfo) {
				minifyPromises.push(minify(rtlIconInfo.file));
			}

			return q.all(minifyPromises).then((minifiedIcons) => {

				const iconInfo = ltrIconInfo;

				iconInfo.ltrIcon = minifiedIcons[0].contents;

				if (minifiedIcons.length === 2) {
					iconInfo.rtlIcon = minifiedIcons[1].contents;
				}

				return iconInfo;
			});

		};

		for (let i = 0; i < iconInfos.length; i++) {

			const iconPromise = getIconInfo(iconInfos[i]);
			if (iconPromise) {
				iconPromises.push(iconPromise);
			}

		}

		return q.all(iconPromises);

	}).then((iconInfos) => {

		iconInfos.sort((a, b) => {
			if (a.mixin > b.mixin) {
				return 1;
			}
			if (a.mixin < b.mixin) {
				return -1;
			}
			return 0;
		});

		return formatter(iconInfos, outputPath);

	});

};

module.exports = generate;
