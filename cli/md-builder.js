'use strict';

var fs = require('fs'),
	path = require('path'),
	q = require('q');

function writeCategory(iconsetPath, writer) {

	iconsetPath = path.join(__dirname, '../', iconsetPath);
	var categoryName = path.basename(iconsetPath);

	var size = 18;
	if (categoryName === 'tier2') {
		size = 24;
	} else if (categoryName === 'tier3') {
		size = 30;
	}

	writer.write('## ' + categoryName + ' (`' + size + 'px` x `' + size + 'px`)\n\n');
	writer.write('| Icon | Name |\n');
	writer.write('| :---: | --- |\n');

	var files = fs
		.readdirSync(iconsetPath)
		.sort(function(a,b) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});
	files.forEach(function(file) {
		var extension = path.extname(file);
		if (extension !== '.svg') {
			return;
		}
		var iconName = path.basename(file, extension);
		writer.write('| ![](/images/' + categoryName + '/' + file + '?raw=true) | ' + iconName + ' |\n');
	});

	writer.write('\n');

}

module.exports = function(categories) {

	var deferred = q.defer();

	var mdPath = path.join(__dirname, '../d2l-icons.md');

	var writer = fs.createWriteStream(mdPath);
	writer.on('finish', function() {
		deferred.resolve();
	});

	writer.write('# Icons\n\n');

	categories.forEach(function(iconsetPath) {
		writeCategory(iconsetPath, writer);
	});

	writer.end();

	return deferred.promise;

};
