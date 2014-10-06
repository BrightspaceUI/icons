var gulp = require( 'gulp' ),
	vui = require( 'vui-helpers' ),
	icons = require( './icon-less' );

gulp.task( 'clean', function() {
	return gulp.src( [ 
			'icons.css.less', 
			'icons.less'
		], { read: false } )
		.pipe( vui.clean() );
} );

gulp.task( 'css', [ 'style', 'less' ], function () {
	return vui.makeCss( [ 'icons.css.less' ], 'icons.css', { lintOpts: '.csslintrc' } );
} );

gulp.task( 'less', function () {
	return icons.generateLess( 'images/**/*.png', 'images/', 'icons.less' );
} );

gulp.task( 'style', function () {
	return icons.generateStyle( 'images/**/*.png', 'icons.css.less' );
} );

gulp.task( 'default', [ 'clean' ], function() {
	gulp.start( 'css' );
} );

gulp.task( 'test', function () {
	return vui.test(
			'test/unit/karma.conf.js',
			'test/unit/**/*Spec.js',
			'icons.css'
		);
} );