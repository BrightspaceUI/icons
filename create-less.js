'use strict';

var mixinNs = '#vui';

var writeLess = function(iconInfos, lessPath) {

	var deferred = require('q').defer(),
		fs = require('fs'),
		less = fs.createWriteStream(lessPath);

	less.on('finish', function() {
		deferred.resolve();
	});

	less.write(mixinNs + ' {\n');

	less.write('	.Icon() {\n');
	less.write('		display: inline-block;\n');
	less.write('		font-size: 0;\n');
	less.write('		line-height: 0;\n');
	less.write('		margin: 0;\n');
	less.write('		vertical-align: text-top;\n');
	less.write('	}\n');

	less.write('	.Icon {\n');

	for(var i=0; i<iconInfos.length; i++) {

		var iconInfo = iconInfos[i];

		less.write('		.' + iconInfo.mixin + '() {\n');
		less.write('			&::before {\n');
		less.write('				content: url("data:image/png;base64,' + iconInfo.ltrIcon.toString('base64') + '");\n');
		if (iconInfo.rtlIcon) {
			less.write('				[dir=\'rtl\'] & {\n');
			less.write('					content: url("data:image/png;base64,' + iconInfo.rtlIcon.toString('base64') + '");\n');
			less.write('				}\n');
		}
		less.write('			}\n');
		less.write('		}\n');

	}

	less.write('	}\n');
	less.write('}\n');

	less.end();

	return deferred.promise;

};

module.exports = writeLess;
