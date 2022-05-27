# 表单：事件和方法提交

提交表单时，会触发 `submit` 事件，它通常用于在将表单发送到服务器之前对表单进行校验，或者中止提交，并使用 JavaScript 来处理表单。

`form.submit()` 方法允许从 JavaScript 启动表单发送。我们可以使用此方法动态地创建表单，并将其发送到服务器。

让我们看看它们的更多细节。

## 事件：submit

提交表单主要有两种方式：

1. 第一种 —— 点击 `<input type="submit">` 或 `<input type="image">` 或 `<button type="submit"></button>`。
2. 第二种 —— 在 `input` 字段中按下 `key:Enter` 键。

这两个行为都会触发表单的 `submit` 事件。处理程序可以检查数据，如果有错误，就显示出来，并调用 `event.preventDefault()`，这样表单就不会被发送到服务器了。

在下面的表单中：
1. 在文本字段中按下 `key:Enter` 键。
2. 点击 `<input type="submit">`。

这两种行为都会显示 `alert`，而因为代码中的 `return false`，表单不会被发送到别处：

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="`submit` 和 `click` 的关系"
在输入框中使用 `key:Enter` 发送表单时，会在 `<input type="submit">` 上触发一次 `click` 事件。

这很有趣，因为实际上根本没有点击。

这是一个示例：
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## 方法：submit

如果要手动将表单提交到服务器，我们可以调用 `form.submit()`。

这样就不会产生 `submit` 事件。这里假设如果开发人员调用 `form.submit()`，就意味着此脚本已经进行了所有相关处理。

有时该方法被用来手动创建和发送表单，如下所示：

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// 该表单必须在文档中才能提交
document.body.append(form);

form.submit();
```
