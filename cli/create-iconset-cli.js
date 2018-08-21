
var chalk = require('chalk'),
    iconsetBuilder = require('./iconset-builder'),
    markdownBuilder = require('./md-builder'),
    Q = require('q');

console.log(chalk.green('Creating icon sets and markdown...'));

var promises = [];
var categories = process.argv.slice(2);
categories.forEach(function(p) {
    console.log(chalk.green('	' + p));
    promises.push(iconsetBuilder(p));
});

promises.push(markdownBuilder(categories));

Q.allSettled(function() {
    process.exit(0);
});
