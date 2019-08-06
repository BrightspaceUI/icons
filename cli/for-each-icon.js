'use strict';

const forEachIcon = function(iconPaths, delegate) {

	const through2 = require('through2'),
		deferred = require('q').defer(),
		vfs = require('vinyl-fs'),
		path = require('path');

	vfs.src(iconPaths, { base: './' }).pipe(
		through2.obj((file, enc, done) => {

			let fileName = file.path.replace(/^.*[\\\/]/, '');
			const dirs = file.relative.split(path.sep);

			let mimeType;
			switch (path.extname(fileName).toLowerCase()) {
				case '.svg':
					mimeType = 'image/svg';
					break;
				case '.png':
					mimeType = 'image/png';
			}

			fileName = fileName.substr(0, fileName.lastIndexOf('.'));
			let iconName = fileName.replace('_', '-');

			const isRtl = (fileName.length > 4 && fileName.substr(fileName.length - 4, 4) === '_rtl');
			if (isRtl) {
				iconName = iconName.substr(0, iconName.length - 4);
			}

			delegate({
				name: iconName,
				className: `d2l-icon-${dirs[1]}-${iconName}`,
				file: file,
				isRtl: isRtl,
				mixin: `d2l-icon-${dirs[1]}-${iconName}`,
				path: file.relative,
				mimeType: mimeType
			});

			done();

		}, () => {
			deferred.resolve();
		})
	);

	return deferred.promise;

};

module.exports = forEachIcon;
