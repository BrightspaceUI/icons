const chalk = require('chalk');

const argv = require('yargs')
	.alias('o', 'output')
	.argv;

if (argv._.length === 0) {
	console.error('At least one image file must be specified.');
	process.exit(1);
}

const create = require('./create');

create(argv._, argv.output, require('./create-scss'))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.then(() => {
		console.log(chalk.green('Icons Scss created successfully.'));
		process.exit(0);
	});
