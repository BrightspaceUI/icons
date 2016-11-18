/* global LocalBrowserFactory, load */

load('galen.common.config.js');

this.browsers = {
	phantomjs: new LocalBrowserFactory({ browser: 'phantomjs', size: '768x768' })
};
