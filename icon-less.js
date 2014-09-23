'use strict';

var generateLess = function( iconPaths, lessPath ) {

	var fs = require( 'fs' );
	var less = fs.createWriteStream( lessPath );

	forEachIcon( iconPaths, function( iconInfo ) {

		if ( iconInfo.isRtl ) {
			less.write( '.' + iconInfo.name + '-rtl' + '() {\n' );
		} else {
			less.write( '.' + iconInfo.name + '() {\n' );
		}
		less.write( '	&:before {\n' );
		less.write( '		content: data-uri(\'image/png;base64\',\'' + iconInfo.path + '\');\n' );
		less.write( '	}\n' );
		less.write( '}\n' );

	} ).then( function() {

		less.end();

	} );

	return less;

};

var generateStyle = function( iconPaths, stylePath ) {

	var fs = require( 'fs' );
	var style = fs.createWriteStream( stylePath );

	style.write( '@import \'../dist/icons.less\';\n\n' );

	forEachIcon( iconPaths, function( iconInfo ) {

		if ( iconInfo.isRtl ) {
			style.write( '[dir=\'rtl\'] ' );
		}
		style.write( '.' + iconInfo.name + ' {\n' );
		if ( iconInfo.isRtl ) {
			style.write( '	.' + iconInfo.name + '-rtl' + ';\n' );
		} else {
			style.write( '	.' + iconInfo.name + ';\n' );
		}
		style.write( '}\n' );

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

		icons.push( iconInfo );

	} ).then( function() {

		json.write( JSON.stringify( icons ) );
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