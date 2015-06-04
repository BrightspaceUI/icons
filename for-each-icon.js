'use strict';

var forEachIcon = function( iconPaths, delegate ) {

	var through2 = require( 'through2' ),
		deferred = require( 'q' ).defer(),
		vfs = require( 'vinyl-fs' ),
		iconsData = require( './icons.json' );

	vfs.src( iconPaths, { base: './' } ).pipe(
		through2.obj( function( file, enc, done ) {

			var fileName = file.path.replace( /^.*[\\\/]/, '' );
			var iconData = iconsData[ fileName ];

			fileName = fileName.substr( 0, fileName.lastIndexOf( '.' ) );

			var isRtl = ( fileName.length > 4 && fileName.substr( fileName.length - 4, 4 ) == '_rtl' );

			if ( iconsData ===  undefined && !isRtl ) {
				console.log( 'No icon data ( mixin or class ) defined for ' + fileName + '.' );
			}

			var iconName = fileName.replace( '_', '-' );
			if ( isRtl ) {
				iconName = iconName.substr( 0, iconName.length - 4 );
			}

			delegate( {
				name: iconName,
				className: iconData ? iconData.className : undefined,
				file: file,
				isRtl: isRtl,
				mixin: iconData ? iconData.mixin : undefined,
				path: file.relative
			} );

			done();

		}, function() {
			deferred.resolve();
		} )
	);

	return deferred.promise;

};

module.exports = forEachIcon;
