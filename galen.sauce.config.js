/* global SauceBrowserFactory, load */

load('galen.common.config.js');

this.browsers = {
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
