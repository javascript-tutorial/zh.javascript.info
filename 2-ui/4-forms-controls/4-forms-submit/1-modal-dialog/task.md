importance: 5

---

# 模态框表单

创建一个函数 `showPrompt(html, callback)`，该函数显示一个表单，里面有消息 `html`，一个 `input` 字段和 `OK/CANCEL` 按钮。

- 用户应该在文本字段中输入一些内容，然后按下 `key:Enter` 键或点击 OK 按钮，然后 `callback(value)` 就会被调用，参数为输入的值。
- 否则，如果用户按下 `key:Esc` 键或点击 CANCEL 按钮，那么 `callback(null)` 就会被调用。

在这两种情况下，输入过程都会结束，并移除表单。

要求：

- 表单应该在窗口的正中心。
- 表单是 **模态框（modal）**。换句话说，在用户关闭模态框之前，用户无法与页面的其它部分进行任何交互。
- 当表单显示后，焦点应该在用户需要进行输入的 `<input>` 输入框中。
- 按键 `key:Tab`/`key:Shift+Tab` 应该能在表单字段之间切换焦点，不允许焦点离开表单字段到页面的其它元素上。

使用示例：

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

使用 iframe 嵌入的一个示例：

[iframe src="solution" height=160 border=1]

P.S. 源文档有给表单设定了固定位置的 HTML/CSS，但是做成模态框的方式取决于你。
