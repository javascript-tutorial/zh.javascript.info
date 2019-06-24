importance: 5

---

# 模态框表单

创建一个函数 `showPrompt(html, callback)`，展示一个表单，里面有消息 `html`、一个文本输入框和 `OK/CANCEL` 按钮。

<<<<<<< HEAD
- 让用户在文本输入框中输入一些东西，然后按下 `key:Enter` 回车键或者点击 OK 按钮，然后 `callback(value)` 就会被调用，参数是输入的值。
- 另外，如果用户按下 `key:Esc` 按键或者点击 CANCEL 按钮，那么 `callback(null)` 就会被调用。
=======
- A user should type something into a text field and press `key:Enter` or the OK button, then `callback(value)` is called with the value they entered.
- Otherwise if the user presses `key:Esc` or CANCEL, then `callback(null)` is called.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

在这两种情况下，都结束了输入过程并移除了表单。

要求：

- 表单应该在窗口的正中央。
- 表单是**模态框**。也就是说，直到模态框关闭之前，页面的其它地方不能有任何交互。
- 当表单出现后，焦点应该在用户要输入的 `<input>` 输入框中。
- 按键 `key:Tab`/`key:Shift+Tab` 应该能在表单区域之间来回切换焦点，并且不允许离开表单区域到页面的其它元素上。

使用示例：

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

在 iframe 中的一个例子：

[iframe src="solution" height=160 border=1]

P.S. 源文件中使用 HTML/CSS 给表单设定了固定位置，但是做成模态框的方式取决于你。
