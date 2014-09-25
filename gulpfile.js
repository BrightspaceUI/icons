var gulp = require( 'gulp' ),
	flatten = require( 'gulp-flatten' ),
	vui = require( 'vui-helpers' ),
	icons = require( './icon-less' );

gulp.task( 'clean', function() {
	return gulp.src( [ 'dist', 'output' ], { read: false } )
		.pipe( vui.clean() );
} );

gulp.task( 'copy-icons', function () {
	return gulp.src( 'src/**/*.png' )
		.pipe( flatten() )
		.pipe( gulp.dest( 'dist/images' ) );
} );

gulp.task( 'css', [ 'style', 'less', 'copy-icons' ], function () {
	return vui.makeCss( [ 'dist/icons.style' ], 'dist/', { lintOpts: '.csslintrc' } );
} );

gulp.task( 'less', [ 'copy-icons' ], function () {
	return icons.generateLess( 'dist/**/*.png', 'dist/icons.less' );
} );

gulp.task( 'style', [ 'copy-icons' ], function () {
	return icons.generateStyle( 'dist/**/*.png', 'dist/icons.style' );
} );

gulp.task( 'json', [ 'copy-icons' ], function () {
	return icons.generateJson( 'src/**/*.png', 'dist/icons.json' );
} );

gulp.task( 'default', [ 'clean' ], function() {
	gulp.start( 'css', 'json' );
} );

gulp.task( 'test', function () {
	return vui.test(
			'test/unit/karma.conf.js',
			'test/unit/**/*Spec.js',
			'dist/**/*.css'
		);
} );