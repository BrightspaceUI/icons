'use strict';

var forEachIcon = function(iconPaths, delegate) {

	var through2 = require('through2'),
		deferred = require('q').defer(),
		vfs = require('vinyl-fs'),
		path = require('path');

	vfs.src(iconPaths, { base: './' }).pipe(
		through2.obj(function(file, enc, done) {

			var fileName = file.path.replace(/^.*[\\\/]/, '');
			var dirs = file.relative.split(path.sep);

			var mimeType;
			switch (path.extname(fileName).toLowerCase()) {
				case '.svg':
					mimeType = 'image/svg';
					break;
				case '.png':
					mimeType = 'image/png';
			}

			fileName = fileName.substr(0, fileName.lastIndexOf('.'));
			var iconName = fileName.replace('_', '-');

			var isRtl = (fileName.length > 4 && fileName.substr(fileName.length - 4, 4) === '_rtl');
			if (isRtl) {
				iconName = iconName.substr(0, iconName.length - 4);
			}

			delegate({
				name: iconName,
				className: 'd2l-icon-' + dirs[1] + '-' + iconName,
				file: file,
				isRtl: isRtl,
				mixin: 'd2l-icon-' + dirs[1] + '-' + iconName,
				path: file.relative,
				mimeType: mimeType
			});

			done();

		}, function() {
			deferred.resolve();
		})
	);

	return deferred.promise;

};

module.exports = forEachIcon;
