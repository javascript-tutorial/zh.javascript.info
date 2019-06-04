# 事件：change、input、cut、copy 和 paste

下面让我们来讨论一下伴随数据更新的各种事件。

## 事件：change

[change](http://www.w3.org/TR/html5/forms.html#event-input-change) 事件是在元素变化结束之后触发的。

<<<<<<< HEAD
对于文本输入框来说，当其失去焦点的时候就会触发 change 事件。
=======
For text inputs that means that the event occurs when it loses focus.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

例如，当我们在下面的文本区域中输入的时候，`change` 事件不会被触发。但是当我们将焦点移到别处时，例如点击按钮，就会触发 `change` 事件：

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

对于其它元素：`select`，`input type=checkbox/radio`，`change` 事件会在选项变化后立即触发。

## 事件：input

每当输入的值发生改变时，就会触发 `input` 事件。

例如：

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

如果我们想要处理 `<input>` 的每次变化，那么使用该事件就是最好的选择。

与键盘事件不同，只要值改变了，`input` 事件就会触发，甚至包括不使用键盘的操作：使用鼠标粘贴或者使用语音识别来输入文字。

```smart header="`oninput` 不能阻止任何事件"
当输入值变化之后，`input` 事件就会触发。

所以在这里我们无法使用 `event.preventDefault()` — 已经太迟了，不会有任何作用了。
```

## 事件：cut、copy 和 paste

这些事件发生于剪切/拷贝/粘贴一个值的时候。

它们属于 [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) 类，并且提供对拷贝/粘贴的数据的访问方法。

我们也可以使用 `event.preventDefault()` 来终止操作。

例如，下面的代码阻止了所有的这样的事件，然后展示出了我们尝试剪切/拷贝/粘贴的内容：

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

<<<<<<< HEAD
从技术上来讲，我们可以拷贝/粘贴任何东西。例如，我们可以从资源管理器中拷贝一份文件，然后粘贴进来。
=======
Technically, we can copy/paste everything. For instance, we can copy a file in the OS file manager, and paste it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

在[设计规范](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer)中有一系列的方法，可以作用于不同的数据类型，对剪贴板进行读写。

但是请注意，剪贴板是“全局”操作系统级别的。安全起见，大多数浏览器只在一些特定的用户行为下允许读写剪贴板。除了火狐浏览器，其它浏览器也都是禁止创建“自定义”剪贴板事件的。

## 总结

数据变化事件:

| 事件 | 描述 | 特性 |
|---------|----------|-------------|
| `change`| 值被改变。 | 对于文本输入框，当失去焦点时触发。 |
| `input` | 文本输入框的每次变化。 | 立即触发，与 `change` 不同。 |
| `cut/copy/paste` | 剪贴/拷贝/粘贴行为。 | 行为可以被阻止。`event.clipboardData` 属性可以读写剪贴板。 |
