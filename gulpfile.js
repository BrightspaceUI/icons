var gulp = require( 'gulp' ),
	flatten = require( 'gulp-flatten' ),
	vui = require( 'vui-helpers' ),
	icons = require( './icon-less' );

gulp.task( 'clean', function() {
	return gulp.src( [ 
			'icons.json', 
			'icons.css.less', 
			'icons.less', 
			'images' 
		], { read: false } )
		.pipe( vui.clean() );
} );

gulp.task( 'copy-icons', function () {
	return gulp.src( 'src/**/*.png' )
		.pipe( flatten() )
		.pipe( gulp.dest( 'images' ) );
} );

gulp.task( 'css', [ 'style', 'less', 'copy-icons' ], function () {
	return vui.makeCss( [ 'icons.css.less' ], 'icons.css', { lintOpts: '.csslintrc' } );
} );

gulp.task( 'less', [ 'copy-icons' ], function () {
	return icons.generateLess( 'images/**/*.png', 'images/', 'icons.less' );
} );

gulp.task( 'style', [ 'copy-icons' ], function () {
	return icons.generateStyle( 'images/**/*.png', 'icons.css.less' );
} );

gulp.task( 'json', [ 'copy-icons' ], function () {
	return icons.generateJson( 'src/**/*.png', 'icons.json' );
} );

gulp.task( 'default', [ 'clean' ], function() {
	gulp.start( 'css', 'json' );
} );

gulp.task( 'test', function () {
	return vui.test(
			'test/unit/karma.conf.js',
			'test/unit/**/*Spec.js',
			'icons.css'
		);
} );