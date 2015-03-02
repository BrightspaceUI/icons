( function() {
	'use strict';

	describe( 'vui-icons', function() {

		beforeEach( function () {
			jasmine.addMatchers( vui.jasmine.dom.matchers );
		} );

		describe( 'Selectors', function() {

			it( 'defines a "[class*=" vui-icon-"]" selector', function() {
				expect( document ).toHaveCssSelector( '[class*=" vui-icon-"]' );
			} );

			it( 'defines a "[class^="vui-icon-"]" selector', function() {
				expect( document ).toHaveCssSelector( '[class^="vui-icon-"]' );
			} );

			it( 'defines a ".vui-icon-expand:before" selector', function() {
				expect( document ).toHaveCssSelector( '.vui-icon-expand::before' );
			} );

			it( 'defines a "[dir=\'rtl\'] .vui-icon-expand:before" selector', function() {
				expect( document ).toHaveCssSelector( '[dir="rtl"] .vui-icon-expand::before' );
			} );

		} );

		describe( 'Normal Icon Style', function() {

			var node;

			beforeEach( function () {
				node = document.body.appendChild( document.createElement( 'span' ) );
				node.className = 'vui-icon-bookmark';
			} );

			afterEach( function() {
				document.body.removeChild( node );
			} );

			it( 'has icon as ":before" content', function() {
				expect( node ).toHaveBeforeElementBase64Image();
			} );

			it( 'has icon content', function() {
				expect( node ).toHaveBeforeElementContent( 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEX///+0ODi0ODi0ODi0ODi1OzvERkbESEjESUneYWHfZGTgaGjhbGzhb2/ic3PjdnbkenrkfX3lgYHmhIXokZHomZnroKDN9k3IAAAABHRSTlMAEICf9IbTdAAAAEpJREFUGNPFz7kNgEAQA8C5gwLov0kaYHcJ7pGogMjWyIkb9A4ycaIdV0PdC6hEY0JVQm1Y/QdI/QP5OIcc0EXUPDAWEcQ8s2czXpV3HyAKn9Y1AAAAAElFTkSuQmCC)' );
			} );

			it( 'has display of inline-block', function() {
				expect( node ).toHaveDisplay( 'inline-block' );
			} );

			it( 'has font-size of 0px', function() {
				expect( node ).toHaveFontSize( '0px' );
			} );

			it( 'has line-height of 0px', function() {
				expect( node ).toHaveLineHeight( '0px' );
			} );

			it( 'has margin of 0px', function() {
				expect( node ).toHaveMargin( '0px' );
			} );

			it( 'has padding of 0px', function() {
				expect( node ).toHavePadding( '0px' );
			} );

		} );

		describe( 'Custom Icon Style', function() {

			var node;

			beforeEach( function () {
				node = document.body.appendChild( document.createElement( 'span' ) );
				node.className = 'vui-icon-custom';
			} );

			afterEach( function() {
				document.body.removeChild( node );
			} );

			it( 'has display of inline-block', function() {
				expect( node ).toHaveDisplay( 'inline-block' );
			} );

			it( 'has font-size of 0px', function() {
				expect( node ).toHaveFontSize( '0px' );
			} );

			it( 'has line-height of 0px', function() {
				expect( node ).toHaveLineHeight( '0px' );
			} );

			it( 'has margin of 0px', function() {
				expect( node ).toHaveMargin( '0px' );
			} );

			it( 'has padding of 0px', function() {
				expect( node ).toHavePadding( '0px' );
			} );

		} );

	} );

} )();
