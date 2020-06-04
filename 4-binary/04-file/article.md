# File 和 FileReader

[File](https://www.w3.org/TR/FileAPI/#dfn-file) 对象继承自 `Blob`，并扩展了与文件系统相关的功能。 

有两种方式可以获取它。

第一种，与 `Blob` 类似，有一个构造器：

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** —— Blob/BufferSource/String 类型值的数组。
- **`fileName`** —— 文件名字符串。
- **`options`** —— 可选对象：
    - **`lastModified`** —— 最后一次修改的时间戳（整数日期）。

第二种，更常见的是，我们从 `<input type="file">` 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。

由于 `File` 是继承自 `Blob` 的，所以 `File` 对象具有相同的属性，附加：
- `name` —— 文件名，
- `lastModified` —— 最后一次修改的时间戳。

这就是我们从 `<input type="file">` 中获取 `File` 对象的方式：

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // 例如 my.png
  alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
}
</script>
```

```smart
输入（input）可以选择多个文件，因此 `input.files` 是一个类数组对象。这里我们只有一个文件，所以我们只取 `input.files[0]`。
```

## FileReader

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
