'use strict';

var mixinNs = '#vui';
var forEachIcon = require('./for-each-icon');

var generateCssLess = function( iconPaths, stylePath ) {

	var fs = require( 'fs' );
	var style = fs.createWriteStream( stylePath );

	style.write( '@import \'icons.less\';\n\n' );

	style.write( '[class*=" vui-icon-"],\n' );
	style.write( '[class^="vui-icon-"] { \n' );
	style.write( '	#vui.Icon();\n' );
	style.write( '}\n\n' );

	return forEachIcon( iconPaths, function( iconInfo ) {

		if ( !iconInfo.isRtl ) {
			style.write( '.' + iconInfo.className + ' {\n' );
			style.write( '	' + mixinNs + '.Icon' + '.' + iconInfo.mixin + ';\n' );
			style.write( '}\n' );
		}

	} ).then( function() {

		var deferred = require( 'q' ).defer();

		style.on( 'finish', function() {
			deferred.resolve();
		} );

		style.end();

		return deferred.promise;

	} );

};

module.exports = generateCssLess;
