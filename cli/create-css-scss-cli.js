
var chalk = require('chalk');

var argv = require('yargs')
	.alias('o', 'output')
	.argv;

if (argv._.length === 0) {
	console.error('At least one image file must be specified.');
	process.exit(1);
}

var createCssScss = require('../create-css-scss');

createCssScss(argv._, argv.output)
	.catch(function(err) {
		console.error(err);
		process.exit(1);
	})
	.then(function() {
		console.log(chalk.green('Icons Css-Scss created successfully.'));
		process.exit(0);
	});
