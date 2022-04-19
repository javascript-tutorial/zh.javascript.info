
# FormData

这一章是关于发送 HTML 表单的：带有或不带文件，带有其他字段等。

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) 对象可以提供帮助。你可能已经猜到了，它是表示 HTML 表单数据的对象。

构造函数是：
```js
let formData = new FormData([form]);
```

如果提供了 HTML `form` 元素，它会自动捕获 `form` 元素字段。

`FormData` 的特殊之处在于网络方法（network methods），例如 `fetch` 可以接受一个 `FormData` 对象作为 body。它会被编码并发送出去，带有 `Content-Type: multipart/form-data`。

从服务器角度来看，它就像是一个普通的表单提交。

## 发送一个简单的表单

我们先来发送一个简单的表单。

正如你所看到的，它几乎就是一行代码：

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

在这个示例中，没有将服务器代码展示出来，因为它超出了我们当前的学习范围。服务器接受 POST 请求并回应 "User saved"。

## FormData 方法

我们可以使用以下方法修改 `FormData` 中的字段：

- `formData.append(name, value)` —— 添加具有给定 `name` 和 `value` 的表单字段，
- `formData.append(name, blob, fileName)` —— 添加一个字段，就像它是 `<input type="file">`，第三个参数 `fileName` 设置文件名（而不是表单字段名），因为它是用户文件系统中文件的名称，
- `formData.delete(name)` —— 移除带有给定 `name` 的字段，
- `formData.get(name)` —— 获取带有给定 `name` 的字段值，
- `formData.has(name)` —— 如果存在带有给定 `name` 的字段，则返回 `true`，否则返回 `false`。

从技术上来讲，一个表单可以包含多个具有相同 `name` 的字段，因此，多次调用 `append` 将会添加多个具有相同名称的字段。

还有一个 `set` 方法，语法与 `append` 相同。不同之处在于 `.set` 移除所有具有给定 `name` 的字段，然后附加一个新字段。因此，它确保了只有一个具有这种 `name` 的字段，其他的和 `append` 一样：

- `formData.set(name, value)`，
- `formData.set(name, blob, fileName)`。

我们也可以使用 `for..of` 循环迭代 formData 字段：

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// 列出 key/value 对
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1，然后是 key2 = value2
}
```

## 发送带有文件的表单

表单始终以 `Content-Type: multipart/form-data` 来发送数据，这个编码允许发送文件。因此 `<input type="file">` 字段也能被发送，类似于普通的表单提交。

这是具有这种形式的示例：

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

## 发送具有 Blob 数据的表单

正如我们在 <info:fetch> 一章中所看到的，以 `Blob` 发送一个动态生成的二进制数据，例如图片，是很简单的。我们可以直接将其作为 `fetch` 参数的 `body`。

但在实际中，通常更方便的发送图片的方式不是单独发送，而是将其作为表单的一部分，并带有附加字段（例如 "name" 和其他 metadata）一起发送。

并且，服务器通常更适合接收多部分编码的表单（multipart-encoded form），而不是原始的二进制数据。

下面这个例子使用 `FormData` 将一个来自 `<canvas>` 的图片和一些其他字段一起作为一个表单提交：

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

请注意图片 `Blob` 是如何添加的：

```js
formData.append("image", imageBlob, "image.png");
```

就像表单中有 `<input type="file" name="image">` 一样，用户从他们的文件系统中使用数据 `imageBlob`（第二个参数）提交了一个名为 `image.png`（第三个参数）的文件。

服务器读取表单数据和文件，就好像它是常规的表单提交一样。

## 总结

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) 对象用于捕获 HTML 表单，并使用 `fetch` 或其他网络方法提交。

我们可以从 HTML 表单创建 `new FormData(form)`，也可以创建一个完全没有表单的对象，然后使用以下方法附加字段：

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

让我们在这里注意两个特点：

1. `set` 方法会移除具有相同名称（name）的字段，而 `append` 不会。
2. 要发送文件，需要使用三个参数的语法，最后一个参数是文件名，一般是通过 `<input type="file">` 从用户文件系统中获取的。

其他方法是：

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

这就是它的全貌！
