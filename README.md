# truncate.js

Truncates HTML cleanly while preserving tags. Creates buttons for toggling between truncated view and full view. Currently a jQuery plugin; a vanilla JS version is possible in the future. At the moment, truncate.js only supports text inside ```<p>``` tags and only protects ```<a>``` tags from splicing during truncation.

Demo page coming soon.

### What is truncating?

When you say you want to truncate text, you are saying that you want to shorten the text or cut off the end of the text. [Here is a definition:](http://www.thefreedictionary.com/truncate)

> **trun·cate** *(trngkt)*
> *tr.v.* **trun·cat·ed**, **trun·cat·ing**, **trun·cates**

> 1. To shorten by or as if by cutting off.

### What does truncate.js do?

Say you have some html:

```html
<p>Thanks to all those who've supported us in launching truncate.js! It's been a long journey, and we've had a bit of help on the way: <a href="http://jon.doe/">John Doe</a> and <a href="http://mary.wilson/about">Mary Wilson</a> from the National Truncation Observatory, the folks at <a href="http://github.com">GitHub</a>, and of course, the users who are here reading this document right now!</p>
<p>If you've found truncate.js to be a great tool for yourself, please share it with others! I'm working hard to get some cool new features out, and I'd love to <a href="/suggestions">hear your suggestions</a> on how truncate.js can improve and what features I should work on next.</p>
<p>If you're a coder and haven't already got started using truncate.js, <a href="https://github.com/li-cn/truncate.js/fork">fork it</a> to finally solve the terrible pains of hiding HTML while preserving tags!</p>
```

Which looks like this on the page:

> Thanks to all those who've supported us in launching truncate.js! It's been a long journey, and we've had a bit of help on the way: [Jon Doe](#) and [Mary Wilson](#) from the National Truncation Observatory, the folks at [GitHub](http://github.com), and of course, the users who are here reading this document right now!

> If you've found truncate.js to be a great tool for yourself, please share it with others! I'm working hard to get some cool new features out, and I'd love to [hear your suggestions](#) on how truncate.js can improve and what features I should work on next.

> If you're a coder and haven't already got started using truncate.js, [fork it](https://github.com/li-cn/truncate.js/fork) to finally solve the terrible pains of truncating HTML without screwing up the inline tags!

But it's too long to fit in your neatly-designed mobile-responsive div. You want to cut off the text in the middle (around 200 characters), put an ellipses where you severed the text, and then put a button next to it which your visitors can click to see all the whole text.

But of course, you don't want to cut a word in half, because that would be awkward. Simple, we just find the spaces and cut the text there. But what if you wanted to keep the links and other tags? Then there's a possibility that you might cut right through the middle of a tag, which will screw up *everything* on the page. Then you investigate how to solve the problem... but it's too much work to bother with, so you settle with another sub-par solution.

That's why truncate.js exists. It's a jQuery plugin for doing this *really* easily.

## Installation

Include script *after* the jQuery library:

```html
<script src="/path/to/jquery.truncate.js"></script>
```

## Usage

To truncate text with basic button:

```javascript
$('.some-class').truncate();
```

Style the buttons (you can set the markup for the buttons, by by default they're ```<a>``` tags with classes ``` morelink ``` and ``` lesslink ```.

```css
a.morelink, a.lesslink {
    display: block;
    border: 1px solid #666;
    border-radius: 4px;
}
```

## Configuration

Truncate method with all default options:

```javascript
$('.some-class').truncate({
    maxLength: 300,
    ellipsis: ' ...',
    morelink: '<button class="morelink">more</button>',
    lesslink: '<button class="lesslink">less</button>',
    morelinkClass: '.morelink',
    lesslinkClass: '.lesslink'}
);
```

Besides changing the ```<button>``` to a ```<a>```, avoid touching the last four options at the moment. The plugin isn't completely finished yet, so user configuration is still a bit funny.

Just use this instead:

```javascript
$('.some-class').truncate({
    maxLength: 300,
    ellipsis: ' ...'}
);
```

## Support

Truncate.js can only work with the following:

* Can truncate text and inline tags nested in ```<p>```
* Can truncate text while protecting inline ```<a>``` tags from splicing

As the project develops, additional tags and options will be supported.

## Contributing

If you are interested in contributing to this project, drop me a line at [la2li@uwaterloo.ca](mailto:la2li@uwaterloo.ca).

## Credits

### Authors

[Leon Li](https://github.com/li-cn)

### Thanks To

[Vitim.us](http://stackoverflow.com/users/938822/vitim-us) - truncate.js uses a function he wrote on a [Stack Overflow answer board](http://stackoverflow.com/questions/4009756/).
