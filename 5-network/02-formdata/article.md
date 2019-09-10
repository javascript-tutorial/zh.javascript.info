
# FormData

这一章是关于发送 HTML 表单的：发送文件或者附加字段等。[FormData](https://xhr.spec.whatwg.org/#interface-formdata) 对象可以解决这个问题。

构造函数是：
```js
let formData = new FormData([form]);
```

如果提供了 HTML `form` 元素，它会自动获取 `form` 元素字段。你可能已经猜到了，`FormData` 是用于保存和发送表单数据的对象。

`FormData` 特殊之处在于它的网络方法（network methods），比如 `fetch` 接受一个 `FormData` 对象作为 body。它会被编码并并且发送出去，该请求带有 `Content-Type: form/multipart`。因此，从服务器角度来看，它就像是一个普通的表单提交。

## 发送一个简单 form

我们首先来发送一个简单的 form。

正如你所见，它几乎就是一行命令：

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

服务器接受 form 的 POST 请求并回应消息“User saved”。

## FormData 方法

我们可以使用一些方法修改 `FormData` 中的字段：

- `formData.append(name, value)` - 添加给定的 `name` 和 `value` 的值到 form 表单，
- `formData.append(name, blob, fileName)` - 当 form 为 `<input type="file">` 时，添加字段，第三个参数 `fileName` 设置文件名（不是 form 字段名）作为用户文件系统（filesystem）中的文件名，
- `formData.delete(name)` - 移除给定 `name` 的字段，
- `formData.get(name)` - 获取给定 `name` 的字段值，
- `formData.has(name)` - 如果存在给定 `name` 的字段，则返回 `true`，否则返回 `false`

从技术上来讲，form 允许有多个相同 `name` 的字段，因此，多次调用 `append` 将会添加多个相同名称的字段。

同样也有一个与 `append` 语法类似的 `set` 方法。不同之处在于 `.set` 移除所有给定 `name` 的字段，然后附加一个新字段。因此它确保了具有 `name` 名称的字段的唯一性。

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.


同样我们也可以使用 `for..of` 循环迭代所有 formData 字段：

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// 列出 key/value 对
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1=value1，然后是 key2=value2
}
```

## 发送文件的表单

Form 默认以 `Content-Type: form/multipart` 来发送数据，这个编码允许发送文件。因此 `<input type="file">` 字段也能被发送，类似于普通的表单提交。

这里是发送文件表单的例子：

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## 发送 Blob 数据的表单

正如我们在 <info:fetch> 章节所见，发送一个动态生成的 `Blob`，比如图像，是很简单的。我们可以将它作为 `fetch` 参数的 `body`。

但在实践中，通常发送图像更加简便的方法不是单独发送，而是作为 form 的一部分发送图像，以及其他字段，例如“name”和其他元数据。

另外，服务器通常更适合接受 multipart-encoded form，而不是原始二进制数据。

下面这个例子使用 `FormData` 从 `<canvas>` 发送一个图片，以及其他一些字段：

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

请注意 `Blob` 是如何添加的：

```js
formData.append("image", imageBlob, "image.png");
```

这与在表单中有 `<input type="file" name="image">` 类似，用户从它们的文件系统中提交名为 `image.png`（第三个参数）的文件。

## 总结

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) 对象是用来捕获 HTML form 并使用 `fetch` 或者其他网络方法提交捕获的数据。

我们可以从 HTML form 中创建一个 `new FormData(form)`，也可以创建一个空的对象，然后使用下面方法追加字段：

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

两个特点：
1. `set` 方法移除移除具有相同名称的字段而 `append` 不会。
2. 发送文件需要三个参数，最后一个参数是文件名，一般是通过 `<input type="file">` 元素从用户文件系统中获取的。

其他方法是：

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

这就是它的全貌！
