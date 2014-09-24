( function() {
	'use strict';

	describe( 'vui-icons', function() {

		beforeEach( function () {
			jasmine.addMatchers( d2l.jasmine.matchers );
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
				expect( node ).toHaveBase64ImageBefore();
			} );

			it( 'has icon content', function() {
				expect( node ).toHaveContentBefore( 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QwQDjsk/bI5LAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAA1ElEQVQ4jc2QsQ3CQAxFfxIkGpBoIWPQcDPcDggmASZJhiAzuGGNgwIkrFQgYkwBxQVZCEQBllzcO/vd1yWqirgq55YAFrBr5YmWMUhiQeXcIMmy43g6RdbttjblfMamKOCJkph3zHdOJ1z2hxZK+z1zNI0PnohVBMIMlabVwmwKzATaNObw2wKIfCf4OoH+PMEf/MFDEEIAAOR5/qFABNvdDsxc3oHORsPh+4JtCOC6Lj3RHAAq54DrdWbNphaMlwHAE825rkszgqq2ej2ZFM/s1d0NOfWahtOT58QAAAAASUVORK5CYII=)' );
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