# 事件：change、input、cut、copy 和 paste

<<<<<<< HEAD
下面让我们来讨论一下伴随数据更新的各种事件。
=======
Let's cover various events that accompany data updates.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## 事件：change

<<<<<<< HEAD
[change](http://www.w3.org/TR/html5/forms.html#event-input-change) 事件是在元素变化结束之后触发的。

对于文本输入框来说，当其失去焦点的时候就会触发 change 事件。
=======
The `change` event triggers when the element has finished changing.

For text inputs that means that the event occurs when it loses focus.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

例如，当我们在下面的文本区域中输入的时候，`change` 事件不会被触发。但是当我们将焦点移到别处时，例如点击按钮，就会触发 `change` 事件：

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

<<<<<<< HEAD
对于其它元素：`select`，`input type=checkbox/radio`，`change` 事件会在选项变化后立即触发。
=======
For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## 事件：input

<<<<<<< HEAD
每当输入的值发生改变时，就会触发 `input` 事件。
=======
The `input` event triggers every time after a value is modified.

Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

<<<<<<< HEAD
与键盘事件不同，只要值改变了，`input` 事件就会触发，甚至包括不使用键盘的操作：使用鼠标粘贴或者使用语音识别来输入文字。
=======
On the other hand, `input` event doesn't trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys `key:⇦` `key:⇨` while in the input.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```smart header="`oninput` 不能阻止任何事件"
当输入值变化之后，`input` 事件就会触发。

所以在这里我们无法使用 `event.preventDefault()` — 已经太迟了，不会有任何作用了。
```

## 事件：cut、copy 和 paste

这些事件发生于剪切/拷贝/粘贴一个值的时候。

它们属于 [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) 类，并且提供对拷贝/粘贴的数据的访问方法。

<<<<<<< HEAD
我们也可以使用 `event.preventDefault()` 来终止操作。
=======
We also can use `event.preventDefault()` to abort the action, then nothing gets copied/pasted.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

在[设计规范](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer)中有一系列的方法，可以作用于不同的数据类型，对剪贴板进行读写。

但是请注意，剪贴板是“全局”操作系统级别的。安全起见，大多数浏览器只在一些特定的用户行为下允许读写剪贴板。除了火狐浏览器，其它浏览器也都是禁止创建“自定义”剪贴板事件的。
=======
Please note, that it's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

There's a list of methods [in the specification](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) that can work with different data types including files, read/write to the clipboard.

But please note that clipboard is a "global" OS-level thing. Most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety, e.g. in `onclick` event handlers.

Also it's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## 总结

数据变化事件:

| 事件 | 描述 | 特性 |
|---------|----------|-------------|
| `change`| 值被改变。 | 对于文本输入框，当失去焦点时触发。 |
| `input` | 文本输入框的每次变化。 | 立即触发，与 `change` 不同。 |
| `cut/copy/paste` | 剪贴/拷贝/粘贴行为。 | 行为可以被阻止。`event.clipboardData` 属性可以读写剪贴板。 |
