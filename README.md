# vui-icons
[![Bower version][bower-image]][bower-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][dependencies-image]][dependencies-url]

This component contains [Sass mixins](http://sass-lang.com) and CSS that can be used to incorporate icons into your application.

For further information on this and other VUI components, see the docs at [ui.valence.d2l.com](http://ui.valence.d2l.com/).

## Installation

`vui-icons` can be installed from [Bower][bower-url]:
```shell
bower install vui-icons
```

Or alternatively from [NPM][npm-url]:
```shell
npm install vui-icons
```

Depending on which installation method you choose, use that path when doing the SASS import:

```scss
@import "bower_components/vui-icons/icons.scss";
// or...
@import "node_modules/vui-icons/icons.scss";
```

## Usage

There are several ways to consume the icon images. The one you choose depends on your use case.

### As a background image with text

In cases where the icon is purely decorative (it doesn't provide any additional information) and is accompanied by text, applying the icon using a background image is a good approach. It hides the icon from assistive technology (like a screen reader), allowing the text to stand alone.

Examples of this might include: a button or link which contain text and the icon is redundant:
```html
<button>
	<span class="vui-icon-bookmark" />
	Bookmark
</button>
<a>
	<span class="vui-icon-print" />
	Print
</a>
```

To make these CSS classes available, make sure you bundle the `icons.css` file (from the Bower/NPM package) with your application's CSS. The full list of available `vui-icon-*` class names is [listed below](#available-icons).

### As a background image with off-screen text

If you would prefer the text accompanying the icon to be invisible, the background image approach can be combined with off-screen text. The text will be positioned outside of the visible screen area using CSS, essentially hiding it for everyone except those using assistive devices.

To position something off-screen, you can either use the [vui-offscreen](https://github.com/Brightspace/valence-ui-offscreen) component, or follow [WebAIM's text-indent technique](http://webaim.org/techniques/css/invisiblecontent/).

Examples: a button or link which contain only an icon

HTML:
```html
<button title="Bookmark">
	<span class="vui-icon-bookmark" />
	<span class="vui-offscreen">Bookmark</span>
</button>
<a title="Print">
	<span class="vui-icon-print" />
	<span class="vui-offscreen">Print</span>
</a>
```

We've used the `title` attribute in this example so that tooltips will appear on-hover.

### Directly as an image element

Another way to consume the icons is by simply pointing a HTML `<img>` element's `src` attribute directly at the icon file. In both the Bower and NPM packages, all the icon files can be found in the `images` directory.

HTML:
```html
<img src="/images/actions/subscribe.svg" alt="subscribed" />
```

Don't forget to provide alternate text if the icon isn't accompanied by any other text.

## Available Icons

| Name | Icon | CSS Class | Filename |
| ---- | ---- | --------- | --- |
| Bookmark | ![](/images/actions/bookmark.png) | `vui-icon-bookmark` | `/images/actions/bookmark.png` |
| Browse | ![](/images/actions/browse.png) | `vui-icon-browse` | `/images/actions/browse.png` |
| Copy | ![](/images/actions/copy.png) | `vui-icon-copy` | `/images/actions/copy.png` |
| Create | ![](/images/actions/create.png) | `vui-icon-create` | `/images/actions/create.png` |
| Delete | ![](/images/actions/delete.png) | `vui-icon-delete` | `/images/actions/delete.png` |
| Download | ![](/images/actions/download.png) | `vui-icon-download` | `/images/actions/download.png` |
| Edit (Bulk) | ![](/images/actions/edit-bulk.png) | `vui-icon-edit-bulk.` | `/images/actions/edit-bulk..png` |
| Edit | ![](/images/actions/edit.png) | `vui-icon-edit` | `/images/actions/edit.png` |
| Help | ![](/images/actions/help.svg) | `vui-icon-help` | `/images/actions/help.svg` |
| Link | ![](/images/actions/link.png) | `vui-icon-link` | `/images/actions/link.png` |
| Preview | ![](/images/actions/preview.png) | `vui-icon-preview` | `/images/actions/preview.png` |
| Print | ![](/images/actions/print.svg) | `vui-icon-print` | `/images/actions/print.svg` |
| Remove | ![](/images/actions/remove.png) | `vui-icon-remove` | `/images/actions/remove.png` |
| Reorder | ![](/images/actions/reorder.png) | `vui-icon-reorder` | `/images/actions/reorder.png` |
| Search | ![](/images/actions/search.png) | `vui-icon-search` | `/images/actions/search.png` |
| Share | ![](/images/actions/share.png) | `vui-icon-share` | `/images/actions/share.png` |
| Sliders | ![](/images/actions/sliders.svg) | `vui-icon-sliders` | `/images/actions/sliders.svg` |
| Subscribe | ![](/images/actions/subscribe.svg) | `vui-icon-subscribe` | `/images/actions/subscribe.svg` |
| Tag | ![](/images/actions/tag.png) | `vui-icon-tag` | `/images/actions/tag.png` |
| Upload | ![](/images/actions/upload.png) | `vui-icon-upload` | `/images/actions/upload.png` |

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[bower-url]: http://bower.io/search/?q=vui-icons
[bower-image]: https://img.shields.io/bower/v/vui-icons.svg
[npm-url]: https://www.npmjs.org/package/vui-icons
[npm-image]: https://img.shields.io/npm/v/vui-icons.svg
[ci-url]: https://travis-ci.org/Brightspace/valence-ui-icons
[ci-image]: https://travis-ci.org/Brightspace/valence-ui-icons.svg?branch=master
[dependencies-url]: https://david-dm.org/brightspace/valence-ui-icons
[dependencies-image]: https://img.shields.io/david/Brightspace/valence-ui-icons.svg
