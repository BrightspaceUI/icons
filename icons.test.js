/* global polymerTests, LocalBrowserFactory, SauceBrowserFactory */
/* eslint no-invalid-this: 0 */
'use strict';

var browsers = {
	chrome: new LocalBrowserFactory({ browser: 'chrome', size: '768x1000' }),
	chromeWindows: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'WIN10',
		size: '768x1000'
	}),
	firefoxWindows: new SauceBrowserFactory({
		browser: 'Firefox',
		platform: 'WIN10',
		size: '768x1000'
	}),
	ie11Windows: new SauceBrowserFactory({
		browser: 'internet explorer',
		version: '11',
		platform: 'WIN10',
		size: '768x1000'
	}),
	ie10Windows: new SauceBrowserFactory({
		browser: 'internet explorer',
		version: '10',
		platform: 'WIN8',
		size: '768x1000'
	}),
	edgeWindows: new SauceBrowserFactory({
		browser: 'microsoftedge',
		platform: 'WIN10',
		size: '768x1000'
	}),
	chromeMac: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'EL_CAPITAN',
		size: '768x1000'
	}),
	safariMac: new SauceBrowserFactory({
		browser: 'Safari',
		platform: 'EL_CAPITAN',
		size: '768x1000'
	}),
	firefoxMac: new SauceBrowserFactory({
		browser: 'Firefox',
		platform: 'EL_CAPITAN',
		size: '768x1000'
	})
};

var endpoint = 'http://localhost:8080/components/d2l-icons/demo/index.html';

polymerTests(browsers, function(test) {
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
