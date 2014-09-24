module.exports = function( config ) {
	'use strict';

	config.set( {
		autoWatch: false,
		basePath: '../../',
		browsers: ['PhantomJS'],
		coverageReporter: {
			reporters: [
				{ type: 'html', dir: 'output/test/coverage/' },
				{ type: 'cobertura', dir: 'output/test/coverage/' }
			]
		},
		exclude: [],
		frameworks: ['jasmine'],
		junitReporter : {
			outputFile: 'output/test/unit.xml',
			suite: 'unit'
		},
		plugins : [
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-script-launcher'
		],
		reporters: ['progress','junit','coverage']
	} );
};