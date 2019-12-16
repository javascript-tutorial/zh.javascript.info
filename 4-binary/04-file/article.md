<<<<<<< HEAD
# 文件（File）和文件读取（FileReader）

文件对象 [File](https://www.w3.org/TR/FileAPI/#dfn-file) 继承自 Blob，并扩展了文件系统相关的功能。 

获取文件对象的方法有两种。

首先，与 Blob 类似，有构造函数:
=======
# File and FileReader

A [File](https://www.w3.org/TR/FileAPI/#dfn-file) object inherits from `Blob` and is extended with filesystem-related capabilities.

There are two ways to obtain it.

First, there's a constructor, similar to `Blob`:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js
new File(fileParts, fileName, [options])
```

<<<<<<< HEAD
- **`fileParts`** -- Blob/BufferSource/String 类型值的数组，同 `Blob`。
- **`fileName`** -- 文件名字符串。
- **`options`** -- 可选对象:
    - **`lastModified`** -- 上次更新的时间戳（整型日期）。

其次，我们经常从 `<input type="file">` 或拖拽或其他浏览器接口来获取。 然后，再从操作系统（OS) 中获取文件。

例如:
=======
- **`fileParts`** -- is an array of Blob/BufferSource/String values.
- **`fileName`** -- file name string.
- **`options`** -- optional object:
    - **`lastModified`** -- the timestamp (integer date) of last modification.

Second, more often we get a file from `<input type="file">` or drag'n'drop or other browser interfaces. In that case, the file gets this information from OS.

As `File` inherits from `Blob`, `File` objects have the same properties, plus:
- `name` -- the file name,
- `lastModified` -- the timestamp of last modification.

That's how we can get a `File` object from `<input type="file">`:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

<<<<<<< HEAD
  alert(`File name: ${file.name}`); // 例如 my.png
  alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
=======
  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
}
</script>
```

```smart
<<<<<<< HEAD
输入（input）可以选择多个文件， 因此 `input.files` 是类似数组的对象。 此处我们只有一个文件，因此我们只取 `input.files[0]`。
```

## 文件读取（FileReader）

文件读取 [FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) 是从 Blob（以及 `File` ）对象中读取数据的对象。

由于从磁盘读取数据可能比较费时间，FileReader 通过事件（events）来传递数据。

构造函数:

```js
let reader = new FileReader(); // 无参构造
```

主要方法:

- **`readAsArrayBuffer(blob)`** -- 读取数据为 `ArrayBuffer`
- **`readAsText(blob, [encoding])`** -- 读取数据为字符串（默认 `utf-8` 编码）
- **`readAsDataURL(blob)`** -- 将数据编码为 base64 的数据 url。
- **`abort()`** -- 取消操作。

数据读取期间，有以下事件:
- `loadstart` -- 开始加载。
- `progress` -- 读取过程中出现。
- `load` -- 读取完毕，没有错误。
- `abort` -- 调用 `abort()` 。
- `error` -- 出现错误。
- `loadend` -- 读取完成，或成功或失败。

读取完成后，我们可以如此访问读取的结果:
- `reader.result` 是结果（如成功）
- `reader.error` 是错误（如失败）。

用的最广泛的事件无疑是 `load` 和 `error`。

以下是读取一个文件的示例:
=======
The input may select multiple files, so `input.files` is an array-like object with them. Here we have only one file, so we just take `input.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) is an object with the sole purpose of reading data from `Blob` (and hence `File` too) objects.

It delivers the data using events, as reading from disk may take time.

The constructor:

```js
let reader = new FileReader(); // no arguments
```

The main methods:

- **`readAsArrayBuffer(blob)`** -- read the data in binary format `ArrayBuffer`.
- **`readAsText(blob, [encoding])`** -- read the data as a text string with the given encoding (`utf-8` by default).
- **`readAsDataURL(blob)`** -- read the binary data and encode it as base64 data url.
- **`abort()`** -- cancel the operation.

The choice of `read*` method depends on which format we prefer, how we're going to use the data.

- `readAsArrayBuffer` - for binary files, to do low-level binary operations. For high-level operations, like slicing, `File` inherits from `Blob`, so we can call them directly, without reading.
- `readAsText` - for text files, when we'd like to get a string.
- `readAsDataURL` -- when we'd like to use this data in `src` for `img` or another tag. There's an alternative to reading a file for that, as discussed in chapter <info:blob>: `URL.createObjectURL(file)`.

As the reading proceeds, there are events:
- `loadstart` -- loading started.
- `progress` -- occurs during reading.
- `load` -- no errors, reading complete.
- `abort` -- `abort()` called.
- `error` -- error has occurred.
- `loadend` -- reading finished with either success or failure.

When the reading is finished, we can access the result as:
- `reader.result` is the result (if successful)
- `reader.error` is the error (if failed).

The most widely used events are for sure `load` and `error`.

Here's an example of reading a file:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

<<<<<<< HEAD
```smart header="`FileReader` 用于 blobs"
在 <info:blob> 一章中我们提到，`FileReader` 适用于任何块（blobs），不仅仅适用于文件。

因此我们可以用它将一个 blob 转换为其他格式:
- `readAsArrayBuffer(blob)` -- 转换为 `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- 转换为字符串（`TextDecoder` 的一个可替代方法）,
- `readAsDataURL(blob)` -- 转换为 base64 的数据 url。
```


```smart header="`FileReaderSync` 只适用于 workers "
对于 Web Workers，还有一种同步的 `FileReader` 变体，称为 [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync)。

FileReader 的读取方法 `read*` 并不生成事件，而是会和普通函数一样返回一个结果。

不过，那只是在 Web Worker 内部，因为在读取文件的时候，同步调用会有延迟，而在 Web Workers 则不是很重要，并不会影响页面。
```

## 总结

`File` 对象继承自 `Blob`。

除了 `Blob` 方法和属性，`File` 对象还有 `fileName` 和 `lastModified` 属性，以及从文件系统读取的内部方法。 我们通常从用户输入如 `<input>` 或拖拽（drag'n'drop）来获取 `File` 对象。

`FileReader` 对象可以从文件或 blob 读取以下三种格式:
- 字符串 (`readAsText`)。
- `ArrayBuffer` (`readAsArrayBuffer`)。
- 数据 url，base-64 编码（`readAsDataURL`)。

但是，多数情况下，我们不必读取文件内容。正如我们处理 blobs 一样，我们可以通过  `URL.createObjectURL(file)` 创建一个短小的 url，并将其赋给 `<a>` 或 `<img>`。 这样，文件便可以下载或者呈现为图像，作为画布（canvas）等的一部分。 

而且，如果我们要通过网络发送一个文件（`File`），也简单，因为网络 API 如 `XMLHttpRequest` 或 `fetch` 本质上都接受 `File` 对象。
=======
```smart header="`FileReader` for blobs"
As mentioned in the chapter <info:blob>, `FileReader` can read not just files, but any blobs.

We can use it to convert a blob to another format:
- `readAsArrayBuffer(blob)` -- to `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- to string (an alternative to `TextDecoder`),
- `readAsDataURL(blob)` -- to base64 data url.
```


```smart header="`FileReaderSync` is available inside Web Workers"
For Web Workers, there also exists a synchronous variant of `FileReader`, called [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Its reading methods `read*` do not generate events, but rather return a result, as regular functions do.

That's only inside a Web Worker though, because delays in synchronous calls, that are possible while reading from files, in Web Workers are less important. They do not affect the page.
```

## Summary

`File` objects inherit from `Blob`.

In addition to `Blob` methods and properties, `File` objects also have `name` and `lastModified` properties, plus the internal ability to read from filesystem. We usually get `File` objects from user input, like `<input>` or Drag'n'Drop events (`ondragend`).

`FileReader` objects can read from a file or a blob, in one of three formats:
- String (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Data url, base-64 encoded (`readAsDataURL`).

In many cases though, we don't have to read the file contents. Just as we did with blobs, we can create a short url with `URL.createObjectURL(file)` and assign it to `<a>` or `<img>`. This way the file can be downloaded or shown up as an image, as a part of canvas etc.

And if we're going to send a `File` over a network, that's also easy: network API like `XMLHttpRequest` or `fetch` natively accepts `File` objects.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
