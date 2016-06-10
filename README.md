**Looking for pre-Daylight icons?** They're [over here](https://github.com/Brightspace/d2l-icons-ui/tree/pre-daylight).

# d2l-icons
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

`d2l-icons` contains SVGs and [Sass mixins](http://sass-lang.com) to incorporate D2L iconography into your application. It also exposes icons as [Polymer iron-iconset-svg](https://github.com/PolymerElements/iron-iconset-svg) collections.

For further information on this and other D2L UI components, see the docs at [ui.valence.d2l.com](http://ui.valence.d2l.com/).

## Installation

`d2l-icons` can be installed from [Bower][bower-url]:
```shell
bower install d2l-icons
```

## Icon Categories

Each icon is grouped into a category, and every icon in a particular category has the same native size. You can browse the categories and icons by visiting the [/images/](https://github.com/Brightspace/d2l-icons-ui/tree/master/images) directory.

Currently, there are 4 icon categories:
- **tier1**: general D2L icons, 18px x 18px native
- **tier2**: general D2L icons, 24px x 24px native
- **tier3**: general D2L icons, 30px x 30px native
- **html-editor**: icons for use in the HTML editor, 18px x 18px native

Always choose the icon whose native size best matches your desired icon size -- ideally exactly.

## Usage

There are many ways to consume icons -- the best technique depends on your application and use case.

### Directly with an `<img>` element

Simply point an HTML `<img>` element's `src` attribute at the icon's SVG file. You can reference the files directly from `bower_components`, or copy the icons you need as part of your application's build process.

HTML:
```html
<img src="bower_components/d2l-icons/images/tier1/bookmark-filled.svg" alt="bookmarked" />
```

Don't forget to provide alternate text if the icon isn't accompanied by any other text.

### Background Images

In cases where the icon is purely decorative (it doesn't provide any additional information) and is accompanied by text and/or a tooltip, applying the icon using a background image is a good approach. It hides the icon from assistive technology (like a screen reader), allowing the accompanying text to stand alone.

First, create some CSS that points at the image you'd like and sets the correct size:

```
.my-app-bookmark-icon {
	background: url('bower_components/d2l-icons/tier1/bookmark-filled.svg');
	background-size: 18px 18px; /* needed for IE */
	display: inline-block;
	height: 18px;
	width: 18px;
}
```

Then apply the CSS class to an element:
```html
<button>
	<span class="my-app-bookmark-icon"></span>
	Bookmark
</button>
```

#### Background images with invisible text

If you would prefer the text accompanying the icon to be invisible, the background image approach can be combined with off-screen text. The text will be positioned outside of the visible screen area using CSS, essentially hiding it for everyone except those using assistive devices.

To position something off-screen, you can either use the [vui-offscreen](https://github.com/Brightspace/d2l-offscreen-ui) component, or follow [WebAIM's text-indent technique](http://webaim.org/techniques/css/invisiblecontent/).

For example, a button which contains only an icon:
```html
<link rel="import" href="../d2l-offscreen/d2l-offscreen.html">
<button title="Bookmark">
	<span class="my-app-bookmark-icon"></span>
	<d2l-offscreen>Bookmark</d2l-offscreen>
</button>
```

We've used the `title` attribute in this example to display tooltips on-hover.

#### Sass Mixins

If you'd like to use the [Sass](http://sass-lang.com) extension language in your application, `d2l-icons` provides an `icons.scss` file you can import which contains mixins to generate the background image CSS.

Import the mixin file and [include it](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#including_a_mixin) in a CSS class for each of the icons you'd like to use:

```scss
@import "bower_components/d2l-icons/icons.scss";

.my-app-bookmark-icon {
	@include d2l-icon-tier1-bookmark-hollow();
}

.my-app-print-icon {
	@include d2l-icon-tier1-print();
}
```

The name of the mixin will correspond to its location within the `images` directory, plus the subdirectory/category (e.g. `tier1`, `tier2`), plus the icon's filename -- all separated by hyphens.

Finally, consume the CSS class in your markup as before.

```html
<button>
	<span class="my-app-bookmark-icon"></span>
	Bookmark
</button>
```

### Polymer Icon Sets

If your application is using Google's [Polymer](https://www.polymer-project.org/1.0/) framework, `d2l-icons` exposes [iron-iconset-svg](https://elements.polymer-project.org/elements/iron-iconset-svg) collections for usage with the Polymer [iron-icon](https://elements.polymer-project.org/elements/iron-icon) web component.

An iconset collection is available for each category (tier1, tier2, etc.), named `{category}-icons.html`. Also, an HTML import which imports ALL categories is also available by including `d2l-icons.html`.

Here's an example which consumes the "bookmark-filled" icon from the "tier1" category using an `iron-icon` web component:
```html
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../iron-icon/iron-icon.html">
<link rel="import" href="../d2l-icons/tier1-icons.html">
<button>
	<iron-icon icon="d2l-tier1:bookmark-filled"></iron-icon>
	Bookmark
</button>
```

You'll need to set the size (ideally 18px, 24px or 30px) and color (tungsten) of the icon. [d2l-colors](https://github.com/Brightspace/d2l-colors-ui) comes in handy:

```html
<link rel="import" href="../d2l-colors/d2l-colors.html">
<style include="d2l-colors">
iron-icon {
	color: var(--d2l-color-tungsten);
	height: 18px;
	width: 18px;
}
</style>
```

If you'd like a different color when the user hovers:
```css
button:hover iron-icon, button:focus iron-icon {
	color: var(--d2l-color-celestuba);
}
```

## Coding styles

### Updating or contributing new icons

#### SVG format

When contributing changes to icons, the SVG files should be properly formatted. Follow these rules:
- native icon sizes need to be one of: 18, 24 or 30
- the `<svg>` element must:
  - have a `width` and `height` attribute which match the native size
  - not have an `id` or `data-name` attribute
- the `<svg>`'s `viewBox` attribute must:
  - have an origin beginning at `0 0`
  - be exactly square (e.g. `0 0 18 18`)
  - match the icon's native size
  - not contain negative values
- there should be no `<title>` element
- there should be no inline `<style>` -- all style for line fills should be applied directly to the SVG elements
- color of SVG elements should be "tungsten" (#72777a)

The best way to have most of these rules applied for you automatically is to put the icon through [SVGOMG](https://jakearchibald.github.io/svgomg/) with the "remove title" and "prettify code" options selected.

Here's a sample of a properly formatted SVG:

```svg
<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
  <path fill="#72777a" d="..."/>
</svg>
```

#### Auto-generated files

The Polymer iconset files and Sass `icons.scss` file are automatically generated, so when making icon modifications, re-generate these files by running `npm run build`.

### General

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[bower-url]: http://bower.io/search/?q=d2l-icons
[bower-image]: https://img.shields.io/bower/v/d2l-icons.svg
[ci-url]: https://travis-ci.org/Brightspace/d2l-icons-ui
[ci-image]: https://travis-ci.org/Brightspace/d2l-icons-ui.svg?branch=master
