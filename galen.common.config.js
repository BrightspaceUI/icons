/* global polymerTests */
/* eslint no-invalid-this: 0 */
'use strict';

var endpoint = 'http://localhost:8080/components/d2l-icons/demo/index.html';

polymerTests(this.browsers, function(test) {
	test('d2l-icons', {
		endpoint: endpoint,
		spec: 'test/acceptance/icons.polyfill.gspec'
	});

	test('d2l-icons-rtl', {
		endpoint: endpoint + '?dir=rtl',
		spec: 'test/acceptance/icons.polyfill.gspec'
	});

	test.shadow('d2l-icons-shadow', {
		endpoint: endpoint + '?dom=shadow',
		spec: 'test/acceptance/icons.shadow.gspec'
	});

	/*
	// This spec fails because the icon mirroring is broken in Chrome's ShadowDOM
	test.shadow('d2l-icons-shadow-rtl', {
		endpoint: endpoint + '?dom=shadow&dir=rtl',
		spec: 'test/acceptance/icons.shadow.gspec'
	});*/
});
