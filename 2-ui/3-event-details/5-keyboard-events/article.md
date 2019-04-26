# 键盘：按下键盘和释放按键

在我们开始键盘之前，请注意现代设备上还有其他方法可以“输入内容”。比如，人们可以使用语音识别（尤其是移动设备）或鼠标的复制/粘贴。

因此，如果我们想要跟踪 `<input>` 区域中的任何输入，键盘事件是不够的。无论如何，还需要一个名为 `input` 的事件来处理 `<input>` 字段的变更。对于这样的任务来说，这可能是一个更好的选择。我们之后将在 <info:events-change-input> 章节中讨论它们。

当我们想要处理键盘动作时，应使用键盘事件（虚拟键盘也算）。例如，对箭头键 `key:Up` 和 `key:Down` 或热键（包括键的组合）作出反应。


## Teststand [#keyboard-test-stand]

```offline
为了更好的理解键盘事件，你可以使用 [teststand](sandbox:keyboard-dump)。
```

```online
要更好的理解键盘事件，你可以使用下面的 teststand。

在文本区域中中尝试不同的组合键。

[codetabs src="keyboard-dump" height=480]
```


## Keydown 和 keyup

当键被按下时，`keydown` 事件会发生，而当键被释放时，`keyup` 事件会发生。

### event.code 和 event.key

事件对象 `key` 属性允许获取字符，而事件对象的 `code` 属性允许获取“物理秘钥代码”。

例如，相同的键 `key:Z` 可以按下或者不按下 `Shift`。这给了我们两个不同的字符：小写的 `z` 和大写 `Z`。

`event.key` 正是这个字符，并且它将是不同的。但是，`event.code` 是相同的：

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z`（小写）     |`KeyZ`        |
| `key:Shift+Z`|`Z`（大写）     |`KeyZ`        |


如果用户使用不同的语言，那么切换到另一种语言就会产生一个完全不同的字符，而不是 `"Z"`。这将成为 `event.key` 的值，而 `event.code` 则始终是一样的：`"KeyZ"`。

```smart header="\"KeyZ\" 和其他密钥代码"
每个键都有取决于其在键盘上位置的代码。[键值代码在 UI 事件代码规范中中的描述](https://www.w3.org/TR/uievents-code/)。

例如：
- 字符键有代码 `"Key<letter>"`：`"KeyA"` 和 `"KeyB"` 等。
- 数字键有代码：`"Digit<number>"`：`"Digit0"` 和 `"Digit1"` 等。
- 特殊秘钥按其名称编码：`"Enter"`、`"Backspace"` 和 `"Tab"` 等。

有几种通用的键盘布局，规范中为它们每个给出了键值代码。

有关更多代码，请参见[该规范的字母数字部分](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section) 或者只是尝试上面的 [teststand](#keyboard-test-stand)。
```

```warn header="Case matters: `\"KeyZ\"`, not `\"keyZ\"`"
显而易见的，但人们仍会搞错。

请避开错误类型：它是 `KeyZ` 而不是 `keyZ`。像 `event.code=="keyZ"` 这样的检查不起作用：`"Key"` 的第一个字母必须大写。
```


如果键没有给出任何字符呢？例如，`key:Shift` 或 `key:F1` 或其他的。对于那些键的 `event.key` 则与 `event.code` 大致相同：


| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` 或 `ShiftLeft`        |

请注意 `event.code` 确切地标明了哪个键被按下。例如，大多数键盘有两个 `key:Shift` 键，一个在左边，一个在右边。`event.code` 确切地告诉我们按下了哪个键，并且 `event.key` 对键的含义负责：它是什么（一个"Shift"）。

比方说，我们想要处理一个热键：`key:Ctrl+Z`（或 Mac 上的 `key:Cmd+Z`）。大多数文本编辑器将“撤销”动作挂在上面。我们可以在 `keydown` 上设置一个监听者，检查哪个键被按下 —— 用来检测我们什么时候需要热键。

请回答问题 —— 在这样的监听者中，我们要监测的是 `event.key` 还是 `event.code` 的值？

请暂停并回答。

决定好了么？

如果你已经理解了，那么答案当然是 `event.code`，因为在那里我们不想要 `event.key`。`event.key` 的值会因为语言的不同或者 `CapsLock` 的使用而改变。`event.code` 的值被严格绑定到秘钥上，因此我们现在开始：

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

## 自动重复

如果按键时间足够长，它就会开始重复：`keydown` 会被一次又一次触发，并且当它释放时我们终于得到 `keyup`。所以有很多的 `keydown` 却只有一个 `keyup` 很正常。

对于所有的重复键，事件对象的 `event.repeat` 属性都设置为 `true`。


## 默认动作

默认动作各不相同，因为键盘可以开始许多可能的事情。

比如：

- 一个字符出现在屏幕上（最明显的结果）。
- 删除一个字符（`key:Delete` 键）。
- 滚动页面（`key:PageDown` 键）。
- 浏览器打开“保存页面”对话框（`key:Ctrl+S`）
-  ...等等。

阻止对 `keydown` 的默认动作可以取消其中的大多数操作，但基于操作系统的特殊键除外。例如在 Windows 里，`key:Alt+F4` 关闭当前浏览器窗口。也没有办法通过阻止 JavaScript 中的默认动作来阻止它。

例如，下述的 `<input>` 期望输入值是电话号码，因此他不会接受除数字以外的其他键 `+`、`()` 或 `-`：

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Phone, please" type="tel">
```

<<<<<<< HEAD
请注意，像 `key:Backspace`、`key:Left`、`key:Right`、`key:Ctrl+V` 这样的特殊键在输入中无效。这是严格过滤器 `checkPhoneKey` 的副作用。
=======
Please note that special keys like `key:Backspace`, `key:Left`, `key:Right`, `key:Ctrl+V` do not work in the input. That's a side-effect of the strict filter `checkPhoneKey`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

让我们放松一下：


```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
```

现在箭头和删除工作正常。

...但我们仍然可以使用鼠标右键 + 粘贴来输入任何内容。因此这个过滤器并不是 100% 可靠。我们可以让它这样做，因为大多数时候它是有效的。或者另一种方法是跟踪 `input` 事件 —— 在任何修改后被触发。这样我们可以监测新值并在其无效时高亮/修改它。

## 遗存

在过去，有一个 `keypress` 事件，还有事件对象属性 `keyCode`、`charCode` 和 `which`。

大多数的浏览器都不兼容，以至于开发者决定放弃这些。以前的代码仍然可以正常工作，因为浏览器还是支持它们的，但现在没有必要再使用这些代码了。

这章有包括了它们详细描述的时间。但现在我们可以忘记它们了。


## 总结

按一个键总是会产生一个键盘事件，无论是符号键还是特殊键，比如 `key:Shift` 或 `key:Ctrl` 等。唯一的例外是 `key:Fn`，它有时会出现在笔记本电脑键盘上。它没有键盘事件，因为它通常在比 OS 低的级别上实现的。

键盘事件：

- `keydown` —— 长久按键（如果按下长键则自动重复），
- `keyup` —— 释放按键时。

主键盘事件属性：

- `code` —— “按键代码”（`"KeyA"`、`"ArrowLeft"` 等），具体到键盘上键的物理位置。
- `key` —— 非字符键的字符（`"A"`、`"a"` 等），通常具有和 `code` 一样的值。

过去，键盘事件有时用于跟踪用户在表单字段中的输入。这很不可靠，因为输入源可以不同。我们有 `input` 和 `change` 事件来处理任何输入（之后我们会在 <info:events-change-input> 章节中作进一步介绍）。它们在任何输入后触发，包括鼠标或语音识别。

当我们真正想要键盘时，我们应该使用键盘事件。比如，对热键或特殊键作出反应。
