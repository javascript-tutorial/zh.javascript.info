# Blob

<<<<<<< HEAD
`ArrayBuffer` 和视图（views）都是 JavaScript 中 ECMA 标准的一部分。

我们在 [File API](https://www.w3.org/TR/FileAPI/) 一节中描述过，在浏览器中，有其他高阶对象，特别是 `Blob`。

`Blob` 由一个可选的字符串 `type` (通常是 MIME 类型) 和 `blobParts` 组成 -- 一串其他 `Blob` 对象、字符串和 `BufferSources`。

![](blob.svg)

构造函数的语法为：
=======
`ArrayBuffer` and views are a part of ECMA standard, a part of JavaScript.

In the browser, there are additional higher-level objects, described in [File API](https://www.w3.org/TR/FileAPI/), in particular `Blob`.

`Blob` consists of an optional string `type` (a MIME-type usually), plus `blobParts` -- a sequence of other `Blob` objects, strings and `BufferSource`.

![](blob.svg)

The constructor syntax is:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js
new Blob(blobParts, options);
```

<<<<<<< HEAD
- **`blobParts`** `Blob`/`BufferSource`/`String` 类型值的数组。
- **`options`** 可选对象：
  - **`type`** -- blob 类型，通常是 MIME 类型，如 `image/png`，
  - **`endings`** -- 是否转换换行符，使 blob 符合当前操作系统的换行符（`\r\n` 或 `\n`）。默认为 `"transparent"`（啥也不做），不过也可以是 `"native"`（转换）。

例如：

```js
// 从字符串创建 blob
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// 请注意：第一个参数值必须是数组 [...]
```

```js
// 从类型数组（typed array）和字符串创建 blob
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello" 
=======
- **`blobParts`** is an array of `Blob`/`BufferSource`/`String` values.
- **`options`** optional object:
  - **`type`** -- `Blob` type, usually MIME-type, e.g. `image/png`,
  - **`endings`** -- whether to transform end-of-line to make the `Blob` correspond to current OS newlines (`\r\n` or `\n`). By default `"transparent"` (do nothing), but also can be `"native"` (transform).

For example:

```js
// create Blob from a string
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// please note: the first argument must be an array [...]
```

```js
// create Blob from a typed array and strings
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


<<<<<<< HEAD
我们可以用 slice 方法来提取 blob 分段：
=======
We can extract `Blob` slices with:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

<<<<<<< HEAD
- **`byteStart`** -- 起始字节，默认为 0。
- **`byteEnd`** -- 最后一个字节（不包括之，默认为最后）。
- **`contentType`** -- 新 blob 的 `type`，默认与源 blob 相同。

参数值与 `array.slice` 相同，也允许负数。

```smart header="Blob 是不可改变的"
我们不能直接在 blob 中更改数据，但可以切割成多个部分，从每一部分创建新的 blobs，将他们组成新的 blob，以此类推。

这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以生成一个新的改动过的字符串。
```

## Blob 作为 URL

Blob 可以很容易当做 URL 用于 `<a>`、`<img>` 或其他标记（tags），来显示其内容。

有了 `type`，我们也可以下载/上传 blobs，很自然的便成了网络请求中的 `Content-Type`。

让我们来看一个简单的例子。通过\
 点击一个链接，下载一个动态生成的 blob，文件内容是 `hello world`：

```html run
<!-- download 属性使浏览器下载而非浏览 -->
=======
- **`byteStart`** -- the starting byte, by default 0.
- **`byteEnd`** -- the last byte (exclusive, by default till the end).
- **`contentType`** -- the `type` of the new blob, by default the same as the source.

The arguments are similar to `array.slice`, negative numbers are allowed too.

```smart header="`Blob` objects are immutable"
We can't change data directly in a `Blob`, but we can slice parts of a `Blob`, create new `Blob` objects from them, mix them into a new `Blob` and so on.

This behavior is similar to JavaScript strings: we can't change a character in a string, but we can make a new corrected string.
```

## Blob as URL

A Blob can be easily used as an URL for `<a>`, `<img>` or other tags, to show its contents.

Thanks to `type`, we can also download/upload `Blob` objects, and the `type` naturally becomes `Content-Type` in network requests.

Let's start with a simple example. By clicking on a link you download a dynamically-generated `Blob` with `hello world` contents as a file:

```html run
<!-- download attribute forces the browser to download instead of navigating -->
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

<<<<<<< HEAD
我们也可以在 Javascript 中动态创建一个链接，通过 `link.click()` 模拟一个点击（click），然后便自动下载了。

以下是示例代码，用户无需任何 HTML 即可下载动态生成的 Blob：
=======
We can also create a link dynamically in JavaScript and simulate a click by `link.click()`, then download starts automatically.

Here's the similar code that causes user to download the dynamicallly created `Blob`, without any HTML:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

<<<<<<< HEAD
`URL.createObjectURL` 接受一个 blob，为其创建一个唯一的 URL，格式是 `blob:<origin>/<uuid>`。

`link.href` 的值就像这样：
=======
`URL.createObjectURL` takes a `Blob` and creates a unique URL for it, in the form `blob:<origin>/<uuid>`.

That's what the value of `link.href` looks like:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

<<<<<<< HEAD
浏览器内部为每个通过 `URL.createObjectURL` 生成的 url 存储了一个 url -> blob 映射。因此，这些 url 虽然短小，但可以访问 blob。

生成的 url（即其链接）只在当前文档打开的状态下才有效。它允许引用 `<img>`、`<a>` 中的 blob，以及基本上任何其他接受 url 的对象。

不过有个问题是，当 blob 有映射的时候，blob 本身是在内存中的。浏览器无法释放它。

在文档退出时，该映射会被自动清除，因此 blob 也相应被释放了。但是如果应用程序长时间工作时，这个释放工作就不会很快发生了。

**因此，如果我们要创建一个 URL，那个 blob 会长留在内存中，即使已不再需要了。**

`URL.revokeObjectURL(url)` 从内部映射中删除引用，因此允许删除 blob（如果没有其他引用的话），并从内存中释放。

在上一个示例中，为了快速下载，我们想只用一次 blob，因此我们立刻调用 `URL.revokeObjectURL(link.href)`。

而在前一个示例中，利用可以点击的 HTML 链接，我们不调用 `URL.revokeObjectURL(link.href)`，因为那样会使 blob url 无效。在撤销后，由于映射被删除了，因此 url 也不再有效了。

## Blob 转换为 base64

`URL.createObjectURL` 的一个可替代方法是，将 blob 转换为 base64-编码 的字符串。

这种编码是将二进制数据表示为一个由 0 到 64 的 ASCII 码字符组成的字符串，非常安全且“可读“。而且更重要的是 -- 我们可以在数据 url 中使用此编码。

[数据 url（data url）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 的格式是 `data:[<mediatype>][;base64],<data>`。我们可以在其他地方使用这种 url，如同使用 "普通" urls 一样。

例如，这是一个笑容符：
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

That encoding represents binary data as a string of ultra-safe "readable" characters with ASCII-codes from 0 to 64. And what's more important -- we can use this encoding in "data-urls".

A [data url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) has the form `data:[<mediatype>][;base64],<data>`. We can use such urls everywhere, on par with "regular" urls.

For instance, here's a smiley:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

<<<<<<< HEAD
浏览器将字符串解码，显示图像：<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


我们用自带的 `FileReader` 对象将 blob 转换为 base64。它可以从 Blobs 读取为多种格式的数据。在[下一章](info:file) 我们会做深入讲解。

以下是下载 blob 的示例代码，这次是通过 base-64 来实现：
=======
The browser will decode the string and show the image: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


To transform a `Blob` into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.

Here's the demo of downloading a blob, now via base-64:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
<<<<<<< HEAD
reader.readAsDataURL(blob); // 将 blob 转换为 base64 并调用 onload 方法
=======
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

<<<<<<< HEAD
这两种从 blob 创建 URL 的方法都可以用。但通常 `URL.createObjectURL(blob)` 更简单快捷一些。

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob 转换为 数据 url"
+ 如介意内存，我们需要撤销他们
+ 直接访问 blob，无需”编码/解码“
- 无需撤销任何操作。
- 大的 blob 编码时，性能和内存会有损耗。
```

## Image 转换为 blob

我们可以从图像（image）、图像的一部分或甚至一个页面截图来创建 blob。这样便方便上传到其他地方。

Image 操作是通过 `<canvas>` 元素来实现：

1. 用 [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)在画布上画一个图像（或其中的一部分）。
2. 调用 canvas 方法 [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)，创建一个 blob，并在创建后运行 `callback`。

在上例中，图像只是被复制（copy）了，不过我们可以在创建 blob 之前，在画布上进行剪裁（cut)，或转换（transform）：

```js run
// 获取任何图像
let img = document.querySelector('img');

// 生成同尺寸的 <canvas>
=======
Both ways of making an URL of a `Blob` are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
- Performance and memory losses on big `Blob` objects for encoding.
```

## Image to blob

We can create a `Blob` of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.

Image operations are done via `<canvas>` element:

1. Draw an image (or its part) on canvas using [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage).
2. Call canvas method [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) that creates a `Blob` and runs `callback` with it when done.

In the example below, an image is just copied, but we could cut from it, or transform it on canvas prior to making a blob:

```js run
// take any image
let img = document.querySelector('img');

// make <canvas> of the same size
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

<<<<<<< HEAD
// 复制图像（此方法允许剪裁图像）
context.drawImage(img, 0, 0);
// 我们可以在画布上 context.rotate()，以及许多其他操作。

// toBlob 是异步操作，结束后会调用 callback
canvas.toBlob(function(blob) {
  // blob 创建完毕后，下载之
=======
// copy image to it (this method allows to cut image)
context.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas

// toBlob is async opereation, callback is called when done
canvas.toBlob(function(blob) {
  // blob ready, download it
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

<<<<<<< HEAD
  // 删除内部 blob 引用，这样浏览器可以从内存中将其删除
=======
  // delete the internal blob reference, to let the browser clear memory from it
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

<<<<<<< HEAD
如果我们想用 `async/await` 取代 callbacks:
=======
If we prefer `async/await` instead of callbacks:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

<<<<<<< HEAD
对于页面截屏，我们可以用一个库如 <https://github.com/niklasvh/html2canvas>。它做的事情是，在页面上扫一遍，并在 `<canvas>` 上画下来。然后我们便可以如上述操作一样从中获取 blob。

## Blob 转换为 ArrayBuffer

`Blob` 构造函数允许从几乎任何对象创建 blob，包括任何 `BufferSource`。

但如果我们需要做底层操作的话，我们可以用 `FileReader` 从 blob 中获取最底层的 `ArrayBuffer`：

```js
// 从 blob 获取 arrayBuffer
=======
For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a `Blob` of it the same way as above.

## From Blob to ArrayBuffer

The `Blob` constructor allows to create a blob from almost anything, including any `BufferSource`.

But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from it using `FileReader`:

```js
// get arrayBuffer from blob
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


<<<<<<< HEAD
## 总结

`ArrayBuffer`、`Uint8Array` 和其他 `BufferSource` 是“二进制数据”，[Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) 则表示“带类型的二进制数据”。

这样可以方便 blob用于在浏览器中非常普遍使用的上传/下载操作。

[XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) 等进行网络请求的方法可以自然的使用 `Blob`，如同使用其他二进制类型数据一样。

`Blob` 和底层二进制数据类型之间的转换也很容易：

- 我们可以用 `new Blob(...)` 构造函数从一个类型数组（typed array）创建 blob。
- 我们可以用 `FileReader` 从 Blob 中取回 `ArrayBuffer`，然后在其上创建一个视图（view），用于底层二进制操作。
=======
## Summary

While `ArrayBuffer`, `Uint8Array` and other `BufferSource` are "binary data", a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) represents "binary data with type".

That makes Blobs convenient for upload/download operations, that are so common in the browser.

Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) and so on, can work with `Blob` natively, as well as with other binary types.

We can easily convert betweeen `Blob` and low-level binary data types:

- We can make a Blob from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `FileReader`, and then create a view over it for low-level binary processing.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
