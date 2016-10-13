'use strict';

var fs = require('fs'),
	path = require('path'),
	q = require('q');

var basePath = 'https://cdn.rawgit.com/BrightspaceUI/icons/master/images/';

function writeCategory(iconsetPath, writer) {

	iconsetPath = path.join(__dirname, '../', iconsetPath);
	var categoryName = path.basename(iconsetPath);

	var size = 18;
	if (categoryName === 'tier2') {
		size = 24;
	} else if (categoryName === 'tier3') {
		size = 30;
	}

	writer.write('## ' + categoryName + '\n\n');
	writer.write('Size: `' + size + 'px` x `' + size + '`px\n\n');

	var files = fs
		.readdirSync(iconsetPath)
		.filter(function(file) {
			return path.extname(file) === '.svg';
		}).sort(function(a, b) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});

	var numCols = 3;
	var numPerCol = Math.ceil(files.length / numCols);

	for (var c = 0; c < numCols; c++) {
		writer.write('| Icon | Name |');
		if (c === numCols - 1) {
			writer.write('\n');
		}
	}
	for (var d = 0; d < numCols; d++) {
		writer.write('| :---: | :--- |');
		if (d === numCols - 1) {
			writer.write('\n');
		} else {
			writer.write(' --- ');
		}
	}

	for (var i = 0; i < numPerCol; i++ ) {

		for (var j = 0; j < numCols; j++ ) {

			var index = i + j * numPerCol;
			if (index > files.length - 1) {
				writer.write('| &nbsp; | &nbsp; |');
			} else {
				var file = files[index];
				var iconName = path.basename(file, path.extname(file));
				writer.write('| ![](' + basePath + categoryName + '/' + file + '?raw=true) | ' + iconName + ' |');
			}

			if (j === numCols - 1) {
				writer.write('\n');
			}

		}

	}

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
