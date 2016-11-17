/* eslint no-invalid-this: 0 */
'use strict';

var endpoint = 'http://localhost:8080/components/d2l-icons/demo/index.html';

this.specs = {
	'd2l-icons': {
		// This spec will be run on all browsers
		name: 'LTR',
		endpoint: endpoint,
		file: 'test/acceptance/icons.polyfill.gspec'
	},
	'd2l-icons-rtl': {
		// This spec will be run on all browsers
		name: 'RTL',
		endpoint: endpoint + '?dir=rtl',
		file: 'test/acceptance/icons.polyfill.rtl.gspec'
	},
	'd2l-icons-shadow': {
		// This spec will only be run on browsers that have shadow dom
		shadow: true,
		name: 'Shadow LTR',
		endpoint: endpoint + '?dom=shadow',
		file: 'test/acceptance/icons.shadow.gspec'
	},
	'd2l-icons-shadow-rtl': {
		// This spec will only be run on browsers that have shadow dom
		shadow: true,
		name: 'Shadow RTL',
		endpoint: endpoint + '?dom=shadow&dir=rtl',
		file: 'test/acceptance/icons.shadow.rtl.gspec'
	}
};
