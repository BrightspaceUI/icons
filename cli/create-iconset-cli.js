var chalk = require('chalk'),
	iconsetBuilder = require('./iconset-builder'),
	Q = require('q');

console.log(chalk.green('Creating icon sets...'));

var promises = [];
process.argv.slice(2).forEach(function(p) {
	console.log(chalk.green('	' + p));
	promises.push(iconsetBuilder(p));
});

Q.allSettled(function() {
	process.exit(0);
});
