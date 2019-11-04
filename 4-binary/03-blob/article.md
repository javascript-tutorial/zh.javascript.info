# Blob

`ArrayBuffer` and views are a part of ECMA standard, a part of JavaScript.

In the browser, there are additional higher-level objects, described in [File API](https://www.w3.org/TR/FileAPI/), in particular `Blob`.

<<<<<<< HEAD
`Blob` consists of an optional string `type` (a MIME-type usually), plus `blobParts` -- a sequence of other `Blob` objects, strings and `BufferSources`.
=======
`Blob` consists of an optional string `type` (a MIME-type usually), plus `blobParts` -- a sequence of other `Blob` objects, strings and `BufferSource`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

![](blob.svg)

The constructor syntax is:

```js
new Blob(blobParts, options);
```

- **`blobParts`** is an array of `Blob`/`BufferSource`/`String` values.
- **`options`** optional object:
<<<<<<< HEAD
  - **`type`** -- blob type, usually MIME-type, e.g. `image/png`,
  - **`endings`** -- whether to transform end-of-line to make the blob correspond to current OS newlines (`\r\n` or `\n`). By default `"transparent"` (do nothing), but also can be `"native"` (transform).
=======
  - **`type`** -- `Blob` type, usually MIME-type, e.g. `image/png`,
  - **`endings`** -- whether to transform end-of-line to make the `Blob` correspond to current OS newlines (`\r\n` or `\n`). By default `"transparent"` (do nothing), but also can be `"native"` (transform).
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

For example:

```js
// create Blob from a string
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// please note: the first argument must be an array [...]
```

```js
// create Blob from a typed array and strings
<<<<<<< HEAD
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "hello" in binary form
=======
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


<<<<<<< HEAD
We can extract blob slices with:
=======
We can extract `Blob` slices with:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- the starting byte, by default 0.
- **`byteEnd`** -- the last byte (exclusive, by default till the end).
- **`contentType`** -- the `type` of the new blob, by default the same as the source.

The arguments are similar to `array.slice`, negative numbers are allowed too.

<<<<<<< HEAD
```smart header="Blobs are immutable"
We can't change data directly in a blob, but we can slice parts of blobs, create new blobs from them, mix them into a new blob and so on.
=======
```smart header="`Blob` objects are immutable"
We can't change data directly in a `Blob`, but we can slice parts of a `Blob`, create new `Blob` objects from them, mix them into a new `Blob` and so on.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

This behavior is similar to JavaScript strings: we can't change a character in a string, but we can make a new corrected string.
```

## Blob as URL

A Blob can be easily used as an URL for `<a>`, `<img>` or other tags, to show its contents.

<<<<<<< HEAD
Thanks to `type`, we can allso download/upload blobs, and it naturally becomes `Content-Type` in network requests.

Let's start with a simple example. By\
 clicking on a link you download a dynamically-generated blob with `hello world` contents as a file:
=======
Thanks to `type`, we can also download/upload `Blob` objects, and the `type` naturally becomes `Content-Type` in network requests.

Let's start with a simple example. By clicking on a link you download a dynamically-generated `Blob` with `hello world` contents as a file:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```html run
<!-- download attribute forces the browser to download instead of navigating -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

We can also create a link dynamically in JavaScript and simulate a click by `link.click()`, then download starts automatically.

<<<<<<< HEAD
Here's the similar code that causes user to download the dynamicallly created Blob, without any HTML:
=======
Here's the similar code that causes user to download the dynamicallly created `Blob`, without any HTML:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

<<<<<<< HEAD
`URL.createObjectURL` takes a blob and creates an unique URL for it, in the form `blob:<origin>/<uuid>`.
=======
`URL.createObjectURL` takes a `Blob` and creates a unique URL for it, in the form `blob:<origin>/<uuid>`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

That's what the value of `link.href` looks like:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

<<<<<<< HEAD
The browser for each url generated by `URL.createObjectURL` stores an the url -> blob mapping internally. So such urls are short, but allow to access the blob.

A generated url (and hence the link with it) is only valid within the current document, while it's open. And it allows to reference the blob in `<img>`, `<a>`, basically any other object that expects an url.

There's a side-effect though. While there's an mapping for a blob, the blob itself resides in the memory. The browser can't free it.

The mapping is automatically cleared on document unload, so blobs are freed then. But if an app is long-living, then that doesn't happen soon.

**So if we create an URL, that blob will hang in memory, even if not needed any more.**

`URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the blob to be deleted (if there are no other references), and the memory to be freed.

In the last example, we intend the blob to be used only once, for instant downloading, so we call `URL.revokeObjectURL(link.href)` immediately.

In the previous example though, with the clickable HTML-link, we don't call `URL.revokeObjectURL(link.href)`, because that would make the blob url invalid. After the revocation, as the mapping is removed, the url doesn't work any more.

## Blob to base64

An alternative to `URL.createObjectURL` is to convert a blob into a base64-encoded string.
=======
The browser for each URL generated by `URL.createObjectURL` stores an the URL -> `Blob` mapping internally. So such URLs are short, but allow to access the `Blob`.

A generated URL (and hence the link with it) is only valid within the current document, while it's open. And it allows to reference the `Blob` in `<img>`, `<a>`, basically any other object that expects an url.

There's a side-effect though. While there's a mapping for a `Blob`, the `Blob` itself resides in the memory. The browser can't free it.

The mapping is automatically cleared on document unload, so `Blob` objects are freed then. But if an app is long-living, then that doesn't happen soon.

**So if we create a URL, that `Blob` will hang in memory, even if not needed any more.**

`URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the `Blob` to be deleted (if there are no other references), and the memory to be freed.

In the last example, we intend the `Blob` to be used only once, for instant downloading, so we call `URL.revokeObjectURL(link.href)` immediately.

In the previous example with the clickable HTML-link, we don't call `URL.revokeObjectURL(link.href)`, because that would make the `Blob` url invalid. After the revocation, as the mapping is removed, the URL doesn't work any more.

## Blob to base64

An alternative to `URL.createObjectURL` is to convert a `Blob` into a base64-encoded string.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

That encoding represents binary data as a string of ultra-safe "readable" characters with ASCII-codes from 0 to 64. And what's more important -- we can use this encoding in "data-urls".

A [data url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) has the form `data:[<mediatype>][;base64],<data>`. We can use such urls everywhere, on par with "regular" urls.

For instance, here's a smiley:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

The browser will decode the string and show the image: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


<<<<<<< HEAD
To transform a blob into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.
=======
To transform a `Blob` into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

Here's the demo of downloading a blob, now via base-64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

<<<<<<< HEAD
Both ways of making an URL of a blob are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.
=======
Both ways of making an URL of a `Blob` are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
<<<<<<< HEAD
- Performance and memory losses on big blobs for encoding.
=======
- Performance and memory losses on big `Blob` objects for encoding.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
```

## Image to blob

<<<<<<< HEAD
We can create a blob of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.
=======
We can create a `Blob` of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

Image operations are done via `<canvas>` element:

1. Draw an image (or its part) on canvas using [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage).
<<<<<<< HEAD
2. Call canvas method [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) that creates a blob and runs `callback` with it when done.
=======
2. Call canvas method [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) that creates a `Blob` and runs `callback` with it when done.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

In the example below, an image is just copied, but we could cut from it, or transform it on canvas prior to making a blob:

```js run
// take any image
let img = document.querySelector('img');

// make <canvas> of the same size
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// copy image to it (this method allows to cut image)
context.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas

// toBlob is async opereation, callback is called when done
canvas.toBlob(function(blob) {
  // blob ready, download it
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

If we prefer `async/await` instead of callbacks:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

<<<<<<< HEAD
For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a blob of it the same way as above.
=======
For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a `Blob` of it the same way as above.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## From Blob to ArrayBuffer

The `Blob` constructor allows to create a blob from almost anything, including any `BufferSource`.

But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from it using `FileReader`:

```js
// get arrayBuffer from blob
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## Summary

While `ArrayBuffer`, `Uint8Array` and other `BufferSource` are "binary data", a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) represents "binary data with type".

That makes Blobs convenient for upload/download operations, that are so common in the browser.

<<<<<<< HEAD
Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) and so on, can work with `Blob` natively, as well as with other binary types.
=======
Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) and so on, can work with `Blob` natively, as well as with other binary types.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

We can easily convert betweeen `Blob` and low-level binary data types:

- We can make a Blob from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `FileReader`, and then create a view over it for low-level binary processing.
