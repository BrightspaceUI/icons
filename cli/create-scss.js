'use strict';

var writeScss = function(iconInfos, scssPath) {

	iconInfos = iconInfos.sort(function(a, b) {
		if (a.mixin < b.mixin) return -1;
		if (a.mixin > b.mixin) return 1;
		return 0;
	});

	var deferred = require('q').defer(),
		fs = require('fs'),
		scss = fs.createWriteStream(scssPath);

	scss.on('finish', function() {
		deferred.resolve();
	});

	scss.write('@mixin d2l-icon() {\n');
	scss.write('	display: inline-block;\n');
	scss.write('	font-size: 0;\n');
	scss.write('	line-height: 0;\n');
	scss.write('	margin: 0;\n');
	scss.write('	vertical-align: text-top;\n');
	scss.write('}\n');

	var getContentValue = function(mimeType, icon) {
		if (mimeType === 'image/png') {
			return 'url("data:image/png;base64,' + icon.toString('base64') + '")';
		} else if (mimeType === 'image/svg') {
			return 'url("data:image/svg+xml,' + encodeURIComponent(icon.toString('utf8')) + '")';
		} else {
			deferred.reject(new Error('Unsupported mime/file type.'));
			return;
		}
	};

	for (var i = 0; i < iconInfos.length; i++) {

		var iconInfo = iconInfos[i];

		scss.write('@mixin ' + iconInfo.mixin + '() {\n');
		scss.write('	@include d2l-icon();\n');
		scss.write('	&:before {\n');
		scss.write('		content: ' + getContentValue(iconInfo.mimeType, iconInfo.ltrIcon) + ';\n');
		if ( iconInfo.rtlIcon ) {
			scss.write('		[dir=\'rtl\'] & {\n');
			scss.write('			content: ' + getContentValue(iconInfo.mimeType, iconInfo.rtlIcon) + ';\n');
			scss.write('		}\n');
		}
		scss.write('	}\n');
		scss.write('}\n');

	}

	scss.end();

	return deferred.promise;

};

module.exports = writeScss;
