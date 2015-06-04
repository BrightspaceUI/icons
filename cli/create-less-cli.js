
var chalk = require('chalk');

var argv = require('yargs')
	.alias('o', 'output')
	.argv;

if (argv._.length === 0) {
	console.error('At least one image file must be specified.');
	process.exit(1);
}

var createLess = require('../create-less');

createLess(argv._, argv.output)
	.catch(function(err) {
		console.error(err);
		process.exit(1);
	})
	.then(function() {
		console.log(chalk.green('Icons Less created successfully.'));
		process.exit(0);
	});
