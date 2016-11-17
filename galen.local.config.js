/* global load, localBrowserFactory */
/* eslint no-invalid-this: 0 */
'use strict';

load('galen.common.config.js');

this.browsers = {
	chrome: {
		browserName: 'chrome',
		browserFactory: localBrowserFactory.bind(this, ['768x1000', 'chrome'])
	}
};
