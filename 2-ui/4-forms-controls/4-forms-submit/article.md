<<<<<<< HEAD
# 表单提交：事件和方法提交
=======
# Forms: event and method submit
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

当提交表单时，`submit` 事件就会触发，它通常用于在将结果发送到服务器之前进行表单校验，或者中断提交，然后用 JavaScript 来处理。

`form.submit()` 方法允许从 JavaScript 里发送表单。使用此方法，我们可以动态地创建表单，并将其发送给服务器。

接下来我们来看更多的细节。

## 事件：submit

提交表单有两种方法：

1. 第一种 — 点击 `<input type="submit">` 或者 `<input type="image">`。
2. 第二种 — 在输入框内按下 `key:Enter` 回车键。

两种行为都可以触发表单的 `submit` 事件。处理器可以检查数据，如果有错误，就显示出来，并且调用 `event.preventDefault()`，这样表单就不会再提交给服务端了。

在下面的表单中：
1. 在文本输入框内按下 `key:Enter` 回车键。
2. 点击 `<input type="submit">`。

两种操作都显示了 `alert`，而且因为代码中的 `return false`，表单没有被提交：

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="`submit` 和 `click` 的关系"
当在输入框中使用 `key:Enter` 发送表单时，`click` 事件在 `<input type="submit">` 上也会触发。

这是相当有趣的，因为实际上我们没有点击任何元素。

这里有一个例子：
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## 方法：submit

如果要手动向服务器提交表单，我们可以调用 `form.submit()`。

这样的话 `submit` 事件就不会产生。这里的假设是如果开发人员调用 `form.submit()`，就意味着这段脚本已经做了所有相关的事情。

该方法有时被用来手动创建和发送表单，如下所示：

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// 要提交的表单元素必须处在 document 中
document.body.append(form);

form.submit();
```
