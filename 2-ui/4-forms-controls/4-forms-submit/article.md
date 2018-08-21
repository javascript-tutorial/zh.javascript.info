# 表单提交：事件和方法提交

当提交表单时，`submit` 事件就会触发，它通常用于在将结果发送到服务器之前进行表单校验，或者中断提交，然后用 JavaScript 来处理。

`form.submit()` 方法允许从 JavaScript 里开始发送表单。使用此方法，我们可以动态地创建和向服务器发送属于我们自己的表单。

接下来我们看看更多的细节。

## 事件：submit

提交表单有两种方法：

1. 第一种 -- 点击 `<input type="submit">` 或者 `<input type="image">`。
2. 第二种 -- 在输入区域按下 `key:Enter` 按键。

Both actions lead to `submit` event on the form. The handler can check the data, and if there are errors, show them and call `event.preventDefault()`, then the form won't be sent to the server.
两种行为都可以触发表单的 `submit` 事件。处理器可以检查数据，如果有错误，就显示出来，并且调用 `event.preventDefault()`，然后表单就不会再提交给服务端了。

In the form below:
1. Go into the text field and press `key:Enter`.
2. Click `<input type="submit">`.

Both actions show `alert` and the form is not sent anywhere due to `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Relation between `submit` and `click`"
When a form is sent using `key:Enter` on an input field, a `click` event triggers on the `<input type="submit">`.

That's rather funny, because there was no click at all.

Here's the demo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Method: submit

To submit a form to the server manually, we can call `form.submit()`.

Then the `submit` event is not generated. It is assumed that if the programmer calls `form.submit()`, then the script already did all related processing.

Sometimes that's used to manually create and send a form, like this:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// the form must be in the document to submit it
document.body.append(form);

form.submit();
```
