'use strict';

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

		for( var i=0; i<iconInfos.length; i++ ) {
			var iconInfo = iconInfos[i];
			if ( !iconInfo.isRtl ) {

				less.write( '.' + iconInfo.name + '() {\n' );
				less.write( '	&:before {\n' );
				less.write( '		content: data-uri(\'image/png;base64\',\'' + iconInfo.path + '\');\n' );
				var rtlIconInfo = tryGetRtlIcon( iconInfo );
				if ( rtlIconInfo ) {
					less.write( '		[dir=\'rtl\'] & {\n' );
					less.write( '			content: data-uri(\'image/png;base64\',\'' + rtlIconInfo.path + '\');\n' );
					less.write( '		}\n' );
				}
				less.write( '	}\n' );
				less.write( '}\n' );

			}
		}
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
			style.write( '.' + iconInfo.name + ' {\n' );
			style.write( '	.' + iconInfo.name + ';\n' );
			style.write( '}\n' );
		}

	} ).then( function() {

		style.end();

	} );

	return style;

};

var generateJson = function( iconPaths, jsonPath ) {

	var fs = require( 'fs' );
	var json = fs.createWriteStream( jsonPath );
	var icons = [];

	forEachIcon( iconPaths, function( iconInfo ) {

		icons.push( {
			category: iconInfo.category,
			name: iconInfo.name,
			isRtl: iconInfo.isRtl,
			size: iconInfo.size
		} );

	} ).then( function() {

		json.write( JSON.stringify( icons, null, ' ' ) );
		json.end();

	} );

	return json;

};

var getCategory = function( relativePath ) {

	var pathIndex = relativePath.indexOf( '\\' );
	if ( pathIndex === -1 ) {
		return null;
	}

	return relativePath.substr( 0, pathIndex );

};

var forEachIcon = function( iconPaths, delegate ) {

	var through2 = require( 'through2' ),
		deferred = require( 'q' ).defer(),
		vfs = require( 'vinyl-fs' );

	vfs.src( iconPaths ).pipe( 
		through2.obj( function( file, enc, done ) {

			var relativePath = file.path.replace( file.base, '' );
			var category = getCategory( relativePath );

			var fileName = file.path.replace( /^.*[\\\/]/, '' );

			fileName = fileName.substr( 0, fileName.lastIndexOf( '.' ) );

			var isRtl = ( fileName.length > 4 && fileName.substr( fileName.length - 4, 4 ) == '_rtl' );

			var iconName = 'vui-icon-' + fileName.replace( '_', '-' );
			if ( isRtl ) {
				iconName = iconName.substr( 0, iconName.length - 4 );
			}

			var heightWidth = 16;
			if ( /-large$/.test( iconName ) ) {
				heightWidth = 24;
			} else if ( /-xlarge$/.test( iconName ) ) {
				heightWidth = 50;
			}

			delegate( {
				category: category,
				name: iconName,
				isRtl: isRtl,
				path: relativePath,
				size: heightWidth
			} );

			done();

		}, function() {
			deferred.resolve();
		} )
	);

	return deferred.promise;

};

module.exports = {
	generateJson: generateJson,
	generateLess: generateLess,
	generateStyle: generateStyle
};