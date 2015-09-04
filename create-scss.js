'use strict';

var writeScss = function(iconInfos, scssPath) {

	var deferred = require('q').defer(),
		fs = require('fs'),
		scss = fs.createWriteStream(scssPath);

	scss.on('finish', function() {
		deferred.resolve();
	});

	scss.write('@mixin vui-icon() {\n');
	scss.write('	display: inline-block;\n');
	scss.write('	font-size: 0;\n');
	scss.write('	line-height: 0;\n');
	scss.write('	margin: 0;\n');
	scss.write('	vertical-align: text-top;\n');
	scss.write('}\n');

	for(var i=0; i<iconInfos.length; i++) {

		var iconInfo = iconInfos[i];

		scss.write('@mixin vui-' + iconInfo.mixin + '() {\n');
		scss.write('	&:before {\n');
		scss.write('		content: url("data:image/png;base64,' + iconInfo.ltrIcon.toString('base64') + '");\n');
		if ( iconInfo.rtlIcon ) {
			scss.write('		[dir=\'rtl\'] & {\n');
			scss.write('			content: url("data:image/png;base64,' + iconInfo.rtlIcon.toString('base64') + '");\n');
			scss.write('		}\n');
		}
		scss.write('	}\n');
		scss.write('}\n');

	}

	scss.end();

	return deferred.promise;

};

module.exports = writeScss;
