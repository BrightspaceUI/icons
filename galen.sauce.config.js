/* global sauceBrowserFactory, load */

load('galen.common.config.js');

this.browsers = {
	chromeWindows: {
		browserName: 'chrome-windows',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'Chrome',
			platform: 'WIN10',
			size: '768x1000'
		})
	},
	firefoxWindows: {
		browserName: 'firefox-windows',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'Firefox',
			platform: 'WIN10',
			size: '768x1000'
		})
	},
	ie11Windows: {
		browserName: 'ie11-windows',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'internet explorer',
			version: '11',
			platform: 'WIN10',
			size: '768x1000'
		})
	},
	ie10Windows: {
		browserName: 'ie10-windows',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'internet explorer',
			version: '10',
			platform: 'WIN8',
			size: '768x1000'
		})
	},
	edgeWindows: {
		browserName: 'edge-windows',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'microsoftedge',
			platform: 'WIN10',
			size: '768x1000'
		})
	},
	chromeMac: {
		browserName: 'chrome-mac',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'Chrome',
			platform: 'EL_CAPITAN',
			size: '768x1000'
		})
	},
	safariMac: {
		browserName: 'safari-mac',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'Safari',
			platform: 'EL_CAPITAN',
			size: '768x1000'
		})
	},
	firefoxMac: {
		browserName: 'firefox-mac',
		browserFactory: sauceBrowserFactory.bind(this, {
			browser: 'Firefox',
			platform: 'EL_CAPITAN',
			size: '768x1000'
		})
	}
};
