'use strict';

var mixinNs = '#vui';

var generateLess = function( iconPaths, lessPath ) {

	var fs = require( 'fs' );
	var less = fs.createWriteStream( lessPath );
	var iconInfos = [];

	forEachIcon( iconPaths, function( iconInfo ) {

		iconInfos.push( iconInfo );

	} ).then( function() {

		var tryGetRtlIcon = function( ltrIcon ) {
			for( var i=0; i<iconInfos.length; i++ ) {
				if ( iconInfos[i].isRtl && iconInfos[i].name === ltrIcon.name ) {
					return iconInfos[i];
				}
			}
			return null;
		};

		less.write( mixinNs + ' {\n' );
		less.write( '	.Icon {\n' );

		for( var i=0; i<iconInfos.length; i++ ) {
			var iconInfo = iconInfos[i];
			if ( !iconInfo.isRtl ) {

				less.write( '		.' + iconInfo.mixin + '() {\n' );
				less.write( '			&:before {\n' );
				less.write( '				content: url("data:image/png;base64,' + iconInfo.icon.toString( 'base64' ) + '");\n' );
				var rtlIconInfo = tryGetRtlIcon( iconInfo );
				if ( rtlIconInfo ) {
					less.write( '				[dir=\'rtl\'] & {\n' );
					less.write( '					content: url("data:image/png;base64,' + rtlIconInfo.icon.toString( 'base64' ) + '");\n' );
					less.write( '				}\n' );
				}
				less.write( '			}\n' );
				less.write( '		}\n' );

			}
		}

		less.write( '	}\n' );
		less.write( '}\n' );

		less.end();

	} );

	return less;

};

var generateStyle = function( iconPaths, stylePath ) {

	var fs = require( 'fs' );
	var style = fs.createWriteStream( stylePath );

	style.write( '@import \'icons.less\';\n\n' );

	style.write( '[class*=" vui-icon-"],\n' );
	style.write( '[class^="vui-icon-"] { \n' );
	style.write( '	display: inline-block;\n' );
	style.write( '	font-size: 0;\n');
	style.write( '	line-height: 0;\n' );
	style.write( '	margin: 0;\n' );
	style.write( '	vertical-align: text-top;\n' );
	style.write( '}\n\n' );

	forEachIcon( iconPaths, function( iconInfo ) {

		if ( !iconInfo.isRtl ) {
			style.write( '.' + iconInfo.className + ' {\n' );
			style.write( '	' + mixinNs + '.Icon' + '.' + iconInfo.mixin + ';\n' );
			style.write( '}\n' );
		}

	} ).then( function() {

		style.end();

	} );

	return style;

};

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
				icon: file.contents,
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

module.exports = {
	generateLess: generateLess,
	generateStyle: generateStyle
};
