'use strict';

var mixinNs = '#vui';

var minify = function( iconInfo ) {

	var chalk = require( 'chalk' ),
		deferred = require( 'q' ).defer(),
		Imagemin = require( 'imagemin' );

	var imagemin = new Imagemin()
		.src( iconInfo.icon ).use( Imagemin.optipng( { optimizationLevel: 3 } ) );

	imagemin.run( function ( err, files ) {

		if ( err ) {
			deferred.reject( err );
			return deferred.promise;
		}

		if ( files === undefined || files.length === 0 ) {
			deferred.reject( 'Imagemin did not return a minified image.' );
			return deferred.promise;
		}

		var bytesSaved = iconInfo.icon.length - files[0].contents.length;
		var percentSaved = 0;
		if ( iconInfo.icon.length > 0 ) {
			percentSaved = ( bytesSaved * 100 / iconInfo.icon.length ).toFixed( 1 );
		}

		console.log(
			'Optimize: ' + iconInfo.path + ' '
				+ chalk.green( files[0].contents.length + 'B ' )
				+ chalk.gray( 'compression ' + percentSaved + '%' )
			);

		deferred.resolve( files[0] );

	} );

	return deferred.promise;

};

var generateLess = function( iconPaths, lessPath, cb ) {

	var iconInfos = [];

	return forEachIcon( iconPaths, function( iconInfo ) {

		iconInfos.push( iconInfo );

	} ).then( function() {

		var q = require( 'q' );
		var iconPromises = [];

		var tryGetRtlIcon = function( ltrIcon ) {
			for( var i=0; i<iconInfos.length; i++ ) {
				if ( iconInfos[i].isRtl && iconInfos[i].name === ltrIcon.name ) {
					return iconInfos[i];
				}
			}
			return null;
		};

		var getIconInfo = function( ltrIconInfo ) {

			if ( ltrIconInfo.isRtl ) {
				return;
			}

			var minifyPromises = [];
			minifyPromises.push( minify( ltrIconInfo ) );

			var rtlIconInfo = tryGetRtlIcon( ltrIconInfo );
			if ( rtlIconInfo ) {
				minifyPromises.push( minify( rtlIconInfo ) );
			}

			return q.all( minifyPromises ).then( function( minifiedIcons ) {

				var iconInfo = ltrIconInfo;

				iconInfo.ltrIcon = minifiedIcons[0].contents;

				if ( minifiedIcons.length === 2 ) {
					iconInfo.rtlIcon = minifiedIcons[1].contents;
				}

				return iconInfo;
			} );

		};

		for( var i=0; i<iconInfos.length; i++ ) {

			var iconPromise = getIconInfo( iconInfos[i] );
			if ( iconPromise ) {
				iconPromises.push( iconPromise );
			}

		}

		return q.all( iconPromises );

	} ).then( function( iconInfos ) {

		var deferred = require( 'q' ).defer(),
			fs = require( 'fs' ),
			less = fs.createWriteStream( lessPath );

		less.on( 'finish', function() {
			deferred.resolve();
		} );

		less.write( mixinNs + ' {\n' );

		less.write( '	.Icon() {\n' );
		less.write( '		display: inline-block;\n' );
		less.write( '		font-size: 0;\n');
		less.write( '		line-height: 0;\n' );
		less.write( '		margin: 0;\n' );
		less.write( '		vertical-align: text-top;\n' );
		less.write( '	}\n' );

		less.write( '	.Icon {\n' );

		for( var i=0; i<iconInfos.length; i++ ) {

			var iconInfo = iconInfos[i];

			less.write( '		.' + iconInfo.mixin + '() {\n' );
			less.write( '			&:before {\n' );
			less.write( '				content: url("data:image/png;base64,' + iconInfo.ltrIcon.toString( 'base64' ) + '");\n' );
			if ( iconInfo.rtlIcon ) {
				less.write( '				[dir=\'rtl\'] & {\n' );
				less.write( '					content: url("data:image/png;base64,' + iconInfo.rtlIcon.toString( 'base64' ) + '");\n' );
				less.write( '				}\n' );
			}
			less.write( '			}\n' );
			less.write( '		}\n' );

		}

		less.write( '	}\n' );
		less.write( '}\n' );

		less.end();

		return deferred.promise;

	} );

};

var generateStyle = function( iconPaths, stylePath ) {

	var fs = require( 'fs' );
	var style = fs.createWriteStream( stylePath );

	style.write( '@import \'icons.less\';\n\n' );

	style.write( '[class*=" vui-icon-"],\n' );
	style.write( '[class^="vui-icon-"] { \n' );
	style.write( '	#vui.Icon();\n' );
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
