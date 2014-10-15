var gulp = require( 'gulp' ),
	del = require( 'del' ),
	vui = require( 'vui-helpers' ),
	icons = require( './icon-less' );

gulp.task( 'clean', function( cb ) {
	del([ 'icons.css.less', 'icons.less', 'icons.css' ], cb);
} );

gulp.task( 'css', [ 'style', 'less' ], function () {
	return vui.makeCss( [ 'icons.css.less' ], 'icons.css', { lintOpts: '.csslintrc' } );
} );

gulp.task( 'less', function () {
	return icons.generateLess( 'images/**/*.png', 'icons.less' );
} );

gulp.task( 'style', function () {
	return icons.generateStyle( 'images/**/*.png', 'icons.css.less' );
} );

gulp.task( 'default', [ 'clean' ], function() {
	gulp.start( 'css' );
} );

gulp.task( 'test', function () {
	return vui.test( {
		files: [
			'test/unit/**/*Spec.js',
			'icons.css'
		]
	} ) ;
} );
