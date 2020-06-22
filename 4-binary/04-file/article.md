<<<<<<< HEAD
# File 和 FileReader

[File](https://www.w3.org/TR/FileAPI/#dfn-file) 对象继承自 `Blob`，并扩展了与文件系统相关的功能。 

有两种方式可以获取它。

第一种，与 `Blob` 类似，有一个构造器：
=======
# File and FileReader

A [File](https://www.w3.org/TR/FileAPI/#dfn-file) object inherits from `Blob` and is extended with filesystem-related capabilities.

There are two ways to obtain it.

First, there's a constructor, similar to `Blob`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
new File(fileParts, fileName, [options])
```

<<<<<<< HEAD
- **`fileParts`** —— Blob/BufferSource/String 类型值的数组。
- **`fileName`** —— 文件名字符串。
- **`options`** —— 可选对象：
    - **`lastModified`** —— 最后一次修改的时间戳（整数日期）。

第二种，更常见的是，我们从 `<input type="file">` 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。

由于 `File` 是继承自 `Blob` 的，所以 `File` 对象具有相同的属性，附加：
- `name` —— 文件名，
- `lastModified` —— 最后一次修改的时间戳。

这就是我们从 `<input type="file">` 中获取 `File` 对象的方式：
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
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
}
</script>
```

```smart
<<<<<<< HEAD
输入（input）可以选择多个文件，因此 `input.files` 是一个类数组对象。这里我们只有一个文件，所以我们只取 `input.files[0]`。
=======
The input may select multiple files, so `input.files` is an array-like object with them. Here we have only one file, so we just take `input.files[0]`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
```

## FileReader

<<<<<<< HEAD
[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) 是一个对象，其唯一目的是从 `Blob`（因此也从 `File`）对象中读取数据。

它使用事件来传递数据，因为从磁盘读取数据可能比较费时间。

构造函数：

```js
let reader = new FileReader(); // 没有参数
```

主要方法:

- **`readAsArrayBuffer(blob)`** —— 将数据读取为二进制格式的 `ArrayBuffer`。
- **`readAsText(blob, [encoding])`** —— 将数据读取为给定编码（默认为 `utf-8` 编码）的文本字符串。
- **`readAsDataURL(blob)`** —— 读取二进制数据，并将其编码为 base64 的 data url。
- **`abort()`** —— 取消操作。

`read*` 方法的选择，取决于我们喜欢哪种格式，以及如何使用数据。

- `readAsArrayBuffer` —— 用于二进制文件，执行低级别的二进制操作。对于诸如切片（slicing）之类的高级别的操作，`File` 是继承自 `Blob` 的，所以我们可以直接调用它们，而无需读取。
- `readAsText` —— 用于文本文件，当我们想要获取字符串时。
- `readAsDataURL` —— 当我们想在 `src` 中使用此数据，并将其用于 `img` 或其他标签时。正如我们在  <info:blob> 一章中所讲的，还有一种用于此的读取文件的替代方案：`URL.createObjectURL(file)`。

读取过程中，有以下事件：
- `loadstart` —— 开始加载。
- `progress` —— 在读取过程中出现。
- `load` —— 读取完成，没有 error。
- `abort` —— 调用了 `abort()`。
- `error` —— 出现 error。
- `loadend` —— 读取完成，无论成功还是失败。

读取完成后，我们可以通过以下方式访问读取结果：
- `reader.result` 是结果（如果成功）
- `reader.error` 是 error（如果失败）。

使用最广泛的事件无疑是 `load` 和 `error`。

这是一个读取文件的示例：
=======
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

- `readAsArrayBuffer` -- for binary files, to do low-level binary operations. For high-level operations, like slicing, `File` inherits from `Blob`, so we can call them directly, without reading.
- `readAsText` -- for text files, when we'd like to get a string.
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
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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
```smart header="`FileReader` 用于 blob"
正如我们在 <info:blob> 一章中所提到的，`FileReader` 不仅可读取文件，还可读取任何 blob。

我们可以使用它将 blob 转换为其他格式：
- `readAsArrayBuffer(blob)` —— 转换为 `ArrayBuffer`，
- `readAsText(blob, [encoding])` —— 转换为字符串（`TextDecoder` 的一个替代方案），
- `readAsDataURL(blob)` —— 转换为 base64 的 data url。
```


```smart header="在 Web Workers 中可以使用 `FileReaderSync`"
对于 Web Worker，还有一种同步的 `FileReader` 变体，称为 [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync)。

它的读取方法 `read*` 不会生成事件，但是会像常规函数那样返回一个结果。

不过，这仅在 Web Worker 中可用，因为在读取文件的时候，同步调用会有延迟，而在 Web Worker 中，这种延迟并不是很重要。它不会影响页面。
```

## 总结

`File` 对象继承自 `Blob`。

除了 `Blob` 方法和属性外，`File` 对象还有 `name` 和 `lastModified` 属性，以及从文件系统读取的内部功能。我们通常从用户输入如 `<input>` 或拖放事件来获取 `File` 对象。

`FileReader` 对象可以从文件或 blob 中读取数据，可以读取为以下三种格式：
- 字符串（`readAsText`）。
- `ArrayBuffer`（`readAsArrayBuffer`）。
- data url，base-64 编码（`readAsDataURL`）。

但是，在很多情况下，我们不必读取文件内容。就像我们处理 blob 一样，我们可以使用 `URL.createObjectURL(file)` 创建一个短的 url，并将其赋给 `<a>` 或 `<img>`。这样，文件便可以下载文件或者将其呈现为图像，作为 canvas 等的一部分。

而且，如果我们要通过网络发送一个 `File`，那也很容易：像 `XMLHttpRequest` 或 `fetch` 等网络 API 本身就接受 `File` 对象。
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
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
