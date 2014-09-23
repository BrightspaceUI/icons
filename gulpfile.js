var gulp = require( 'gulp' ),
	vui = require( 'vui-helpers' ),
	icons = require( './icon-less' );

gulp.task( 'clean', function( cb ) {
	vui.clean( [ 'dist/**/*', 'output' ] )
		.then( function() { cb(); } );
} );

gulp.task( 'copy-icons', function () {
	return gulp.src( 'src/**/*.png' )
		.pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'css', [ 'style', 'less', 'copy-icons' ], function () {
	return vui.makeCss( [ 'dist/icons.style' ], 'dist/' );
} );

gulp.task( 'less', function () {
	return icons.generateLess( 'src/**/*.png', 'dist/icons.less' );
} );

gulp.task( 'style', function () {
	return icons.generateStyle( 'src/**/*.png', 'dist/icons.style' );
} );

gulp.task( 'json', function () {
	return icons.generateJson( 'src/**/*.png', 'dist/icons.json' );
} );

gulp.task( 'default', [ 'clean' ], function() {
	gulp.start( 'css' );
} );

gulp.task( 'test', function () {
	return vui.test(
			'test/unit/karma.conf.js',
			'test/unit/**/*Spec.js',
			'dist/**/*.css'
		);
} );
