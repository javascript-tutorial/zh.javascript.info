# 事件：change，input，cut，copy，paste

让我们介绍一下伴随数据更新的各种事件。

## 事件：change

当元素更改完成时，将触发 `change` 事件。

对于文本输入框，当其失去焦点时，就会触发 `change` 事件。

例如，当我们在下面的文本字段中键入内容时 —— 不会触发 `change` 事件。但是，当我们将焦点移到其他位置时，例如，点击按钮 —— 就会触发 `change` 事件：

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

对于其它元素：`select`，`input type=checkbox/radio`，会在选项更改后立即触发 `change` 事件。

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## 事件：input

每当用户对输入值进行修改后，就会触发 `input` 事件。

与键盘事件不同，只要值改变了，`input` 事件就会触发，即使那些不涉及键盘行为（action）的值的更改也是如此：使用鼠标粘贴，或者使用语音识别来输入文本。

例如：

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

如果我们想要处理对 `<input>` 的每次更改，那么此事件是最佳选择。

另一方面，`input` 事件不会在那些不涉及值更改的键盘输入或其他行为上触发，例如在输入时按方向键 `key:⇦` `key:⇨`。

```smart header="无法阻止 `oninput` 中的任何事件"
当输入值更改后，就会触发 `input` 事件。

所以，我们无法使用 `event.preventDefault()` —— 已经太迟了，不会起任何作用了。
```

## 事件：cut，copy，paste

这些事件发生于剪切/拷贝/粘贴一个值的时候。

它们属于 [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) 类，并提供了对拷贝/粘贴的数据的访问方法。

我们也可以使用 `event.preventDefault()` 来中止行为，然后什么都不会被复制/粘贴。

例如，下面的代码阻止了所有的这样的事件，并显示出了我们所尝试剪切/拷贝/粘贴的内容：

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

请注意，不仅可以复制/粘贴文本，还可以复制/粘贴所有内容。例如，我们可以在 OS 文件管理器中复制一个文件并粘贴它。

[在规范中](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) 有一系列方法，这些方法可用于不同的数据类型，包括文件，对剪贴板（clipboard）进行读/写。

但是请注意，剪贴板是“全局”操作系统级别的。安全起见，大多数浏览器仅在特定的用户行为下，才允许对剪贴板进行读/写，例如在 `onclick` 事件处理程序中。

并且，除火狐（Firefox）浏览器外，所有浏览器都禁止使用 `dispatchEvent` 生成“自定义”剪贴板事件。

## 总结

数据更改事件:

| 事件 | 描述 | 特点 |
|---------|----------|-------------|
| `change`| 值被改变。 | 对于文本输入，当失去焦点时触发。 |
| `input` | 文本输入的每次更改。 | 立即触发，与 `change` 不同。 |
| `cut/copy/paste` | 剪贴/拷贝/粘贴行为。 | 行为可以被阻止。`event.clipboardData` 属性可以用于读/写剪贴板。 |
