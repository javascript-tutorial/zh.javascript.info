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

它们属于 [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) 类，并提供了对剪切/拷贝/粘贴的数据的访问方法。

我们也可以使用 `event.preventDefault()` 来中止行为，然后什么都不会被复制/粘贴。

例如，下面的代码阻止了剪切/拷贝/粘贴的事件，并显示出了我们所尝试操作的内容：

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };
  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

请注意，在剪切/复制事件处理程序中调用 `event.clipboardData.getData(...)` 只会得到空值，这是因为技术上数据还未存入剪切板中。

所以上面的例子中使用 `document.getSelection()` 来得到被选中的文本，你可以在 <info:selection-range> 中了解更多关于选择（Selection）的细节。

请注意，不仅可以复制/粘贴文本，还可以复制/粘贴其他各种内容。例如，我们可以在 OS 文件管理器中复制一个文件并粘贴它。

这是因为 `clipboardData` 实现了 `DataTransfer` 接口，通常用于拖放和复制/粘贴。这超出了本文的范围，但是你可以在 [DataTransfer 规范](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface) 中进行了解。

另外，还有一个可以访问剪切板的异步 API：`navigator.clipboard`。在 [规范](https://www.w3.org/TR/clipboard-apis/) 中更多介绍，[火狐（Firefox）尚未支持](https://caniuse.com/async-clipboard)。

## 安全限制

剪贴板是“全局”操作系统级别的。用户可能会在各种应用程序中复制/粘贴不同的东西，而浏览器网页不应该能访问这些内容。

所以基本所有浏览器都只允许在用户操作的一个安全子集中对剪切板进行无缝的读写访问，例如复制/粘贴。

除火狐（Firefox）浏览器外，所有浏览器都禁止使用 `dispatchEvent` 生成“自定义”剪贴板事件。并且，即使我们尝试去分发这样的事件，规范也明确说明合成（syntetic）事件不能提供剪切板的访问权限。

同时，在事件处理程序中的 `event.clipboardData` 也不能被保存再后续使用。

重申，[event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) 只在事件处理程序的上下文中工作。

另外, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) 是一个较新的 API， 可以在任何上下文中使用。如有需要，它会请求用户的访问权限。 火狐（Firefox）尚未支持。

## 总结

数据更改事件:

| 事件 | 描述 | 特点 |
|---------|----------|-------------|
| `change`| 值被改变。 | 对于文本输入，当失去焦点时触发。 |
| `input` | 文本输入的每次更改。 | 立即触发，与 `change` 不同。 |
| `cut/copy/paste` | 剪贴/拷贝/粘贴行为。 | 行为可以被阻止。`event.clipboardData` 属性可以用于访问剪贴板。除了火狐（Firefox）之外的浏览器都支持 `navigator.clipboard`。 |
