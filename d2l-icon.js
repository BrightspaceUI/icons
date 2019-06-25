/**
d2l-icon is effectively a copy of iron-icon with some modification to handle focusable
attribute for IE, and styles to apply default color and dimensions.  The following
license is included for attribution. Integration with iron-iconset-svg is exactly the same
with the exclusion of the theme.

@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
`d2l-icon`
Polymer-based web component for icons

@demo demo/icon.html d2l-icon
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Base } from '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-meta/iron-meta.js';
import 'd2l-colors/d2l-colors.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-icon">
	<template strip-whitespace="">
		<style>
			:host {
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
				color: var(--d2l-color-ferrite);
				display: -ms-inline-flexbox;
				display: -webkit-inline-flex;
				display: inline-flex;
				fill: var(--d2l-icon-fill-color, currentcolor);
				height: var(--d2l-icon-height, 18px);
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				stroke: var(--d2l-icon-stroke-color, none);
				vertical-align: middle;
				width: var(--d2l-icon-width, 18px);
			}
			:host([icon*="d2l-tier2:"]) {
				height: var(--d2l-icon-height, 24px);
				width: var(--d2l-icon-width, 24px);
			}
			:host([icon*="d2l-tier3:"]) {
				height: var(--d2l-icon-height, 30px);
				width: var(--d2l-icon-width, 30px);
			}
			:host-context(.d2l-dark-mode) {
				color: var(--d2l-color-regolith);
			}
			/* required since display of inline-block is non-default */
			:host([hidden]) {
				display: none;
			}
		</style>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-icon',

	properties: {

		/**
		 * (Optional) Name of icon (ex. [iconset-name:icon-id]).
		 */
		icon: {
			type: String,
			reflectToAttribute: true
		},
		/**
		 * (Optional) Explicit source of icon.
		 */
		src: String,

		_meta: {
			value: Base.create('iron-meta', {type: 'iconset'})
		}

	},

	observers: [
		'_updateIcon(_meta, isAttached)',
		'_srcChanged(src, isAttached)',
		'_iconChanged(icon, isAttached)'
	],

	_DEFAULT_ICONSET: 'icons',

	_iconChanged: function(icon, attached) {
		if (!attached) return;
		var parts = (icon || '').split(':');
		var iconName = parts.pop();
		var iconSetName = parts.pop() || this._DEFAULT_ICONSET;
		if (iconName === this._iconName && iconSetName === this._iconsetName && attached === this.attached) {
			return;
		}
		this._d2lIconName = undefined;
		this._iconName = iconName;
		this._iconsetName = iconSetName;
		this._updateIcon();
	},

	_srcChanged: function() {
		this._updateIcon();
	},

	_updateIcon: function() {
		if (this._usesIconset()) {
			if (this._img && this._img.parentNode) {
				dom(this.root).removeChild(this._img);
			}
			if (this._iconName === '') {
				if (this._iconset) {
					this._iconset.removeIcon(this);
				}
			} else if (this._iconsetName && this._meta) {
				this._iconset = /** @type {?Polymer.Iconset} */ (
					this._meta.byKey(this._iconsetName));
				if (this._iconset) {
					if (!this._d2lIconName) {
						this._d2lIconName = this._iconset.querySelector(`#d2l-icon-${this._iconName}`) ?
							(`d2l-icon-${this._iconName}`) : this._iconName;
					}
					this._iconset.applyIcon(this, this._d2lIconName);
					this.unlisten(window, 'iron-iconset-added', '_updateIcon');
				} else {
					this.listen(window, 'iron-iconset-added', '_updateIcon');
				}
			}
		} else {
			if (this._iconset) {
				this._iconset.removeIcon(this);
			}
			if (!this._img) {
				this._img = document.createElement('img');
				this._img.style.width = '100%';
				this._img.style.height = '100%';
				this._img.draggable = false;
			}
			this._img.src = this.src;
			dom(this.root).appendChild(this._img);
		}
	},

	_usesIconset: function() {
		return this.icon || !this.src;
	}

});
