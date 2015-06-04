'use strict';

var mixinNs = '#vui';
var minify = require('images-to-variables').minify;
var forEachIcon = require('./for-each-icon');

var generateLess = function( iconPaths, lessPath ) {

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
			minifyPromises.push( minify( ltrIconInfo.file ) );

			var rtlIconInfo = tryGetRtlIcon( ltrIconInfo );
			if ( rtlIconInfo ) {
				minifyPromises.push( minify( rtlIconInfo.file ) );
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
			less.write( '			&::before {\n' );
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

module.exports = generateLess;
