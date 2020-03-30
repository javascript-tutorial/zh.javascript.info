# 键盘：keydown 和 keyup

在我们开始学习键盘的相关内容之前，请注意，在现代设备商，还有其他“输入内容”的方法。例如，人们使用语音识别（尤其是在移动端设备上）或用鼠标复制/粘贴。

因此，如果我们想要跟踪 `<input>` 字段中的所有输入，那么键盘事件是不够的。无论如何，还需要一个名为 `input` 的事件来跟踪 `<input>` 字段中的更改。对于这样的任务来说，这可能是一个更好的选择。稍后我们将在 <info:events-change-input> 一章中介绍它们。

当我们想要处理键盘行为时，应该使用键盘事件（虚拟键盘也算）。例如，对方向键 `key:Up` 和 `key:Down` 或热键（包括按键的组合）作出反应。


## 测试台 [#keyboard-test-stand]

```offline
为了更好地理解键盘事件，你可以使用下面这个 [测试台](sandbox:keyboard-dump)。
```

```online
为了更好地理解键盘事件，你可以使用下面这个测试台。

在文本区域中尝试使用不同的组合键。

[codetabs src="keyboard-dump" height=480]
```


## Keydown 和 keyup

当一个按键被按下时，会触发 `keydown` 事件，而当按键被释放时，会触发 `keyup` 事件。

### event.code 和 event.key

事件对象的 `key` 属性允许获取字符，而事件对象的 `code` 属性则允许获取“物理按键代码”。

例如，同一个按键 `key:Z`，可以与或不与 `Shift` 一起按下。我们会得到两个不同的字符：小写的 `z` 和大写的 `Z`。

`event.key` 正是这个字符，并且它将是不同的。但是，`event.code` 是相同的：

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z`（小写）     |`KeyZ`        |
| `key:Shift+Z`|`Z`（大写）     |`KeyZ`        |


如果用户使用不同的语言，那么切换到另一种语言将产生完全不同的字符，而不是 `"Z"`。它将成为 `event.key` 的值，而 `event.code` 则始终都是一样的：`"KeyZ"`。

```smart header="\"KeyZ\" 和其他按键代码"
每个按键的代码都取决于该按键在键盘上的位置。[UI 事件代码规范](https://www.w3.org/TR/uievents-code/) 中描述了按键代码。

例如：
- 字符键的代码为 `"Key<letter>"`：`"KeyA"`，`"KeyB"` 等。
- 数字键的代码为：`"Digit<number>"`：`"Digit0"`，`"Digit1"` 等。
- 特殊按键的代码为按键的名字：`"Enter"`，`"Backspace"`，`"Tab"` 等。

有几种广泛应用的键盘布局，该规范给出了每种键盘的按键代码。

有关更多按键代码，请参见 [规范的字母数字部分](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section)，或者只需在上面的 [测试台](#keyboard-test-stand) 中按下一个按键。
```

```warn header="大小写敏感：`\"KeyZ\"`，不是 `\"keyZ\"`"
这是显而易见的，但人们仍会搞错。

请规避错误类型：它是 `KeyZ`，而不是 `keyZ`。像 `event.code=="keyZ"` 这样的检查不起作用：`"Key"` 的首字母必须大写。
```

如果按键没有给出任何字符呢？例如，`key:Shift` 或 `key:F1` 或其他。对于这些按键，它们的 `event.key` 与 `event.code` 大致相同：

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` 或 `ShiftLeft`       |

请注意，`event.code` 准确地标明了哪个键被按下了。例如，大多数键盘有两个 `key:Shift` 键，一个在左边，一个在右边。`event.code` 准确地告诉我们按下了哪个键，并且 `event.key` 对按键的“含义”负责：它是什么（一个 "Shift"）。

假设，我们要处理一个热键：`key:Ctrl+Z`（或 Mac 上的 `key:Cmd+Z`）。大多数文本编辑器将“撤销”行为挂在其上。我们可以在 `keydown` 上设置一个监听器，并检查哪个键被按下了。

这里有个难题：在这样的监听器中，我们应该检查 `event.key` 或 `event.code` 的值吗？

一方面，`event.key` 的值是一个字符，它随语言而改变。如果访问者在 OS 中使用多种语言，并在它们之间进行切换，那么相同的按键将给出不同的字符。因此检查 `event.code` 会更好，因为它总是相同的。

像这样：

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

On the other hand, there's a problem with `event.code`. For different keyboard layouts, the same key may have different characters.

For example, here are US layout ("QWERTY") and German layout ("QWERTZ") under it (from Wikipedia):

![](us-layout.svg)

![](german-layout.svg)

For the same key, US layout has "Z", while German layout has "Y" (letters are swapped).

Literally, `event.code` will equal `KeyZ` for people with German layout when they press `key:Y`.

If we check `event.code == 'KeyZ'` in our code, then for people with German layout such test will pass when they press `key:Y`.

That sounds really odd, but so it is. The [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) explicitly mentions such behavior.

So, `event.code` may match a wrong character for unexpected layout. Same letters in different layouts may map to different physical keys, leading to different codes. Luckily, that happens only with several codes, e.g. `keyA`, `keyQ`, `keyZ` (as we've seen), and doesn't happen with special keys such as `Shift`. You can find the list in the [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

To reliably track layout-dependent characters, `event.key` may be a better way.

On the other hand, `event.code` has the benefit of staying always the same, bound to the physical key location, even if the visitor changes languages. So hotkeys that rely on it work well even in case of a language switch.

Do we want to handle layout-dependant keys? Then `event.key` is the way to go.

Or we want a hotkey to work even after a language switch? Then `event.code` may be better.

## 自动重复

如果按键时间足够长，它就会开始重复：`keydown` 会被一次又一次触发，并且当它释放时我们终于得到 `keyup`。所以有很多的 `keydown` 却只有一个 `keyup` 很正常。

对于所有的重复按键，事件对象的 `event.repeat` 属性都设置为 `true`。


## 默认动作

默认动作各不相同，因为键盘可以开始许多可能的事情。

比如：

- 一个字符出现在屏幕上（最明显的结果）。
- 删除一个字符（`key:Delete` 键）。
- 滚动页面（`key:PageDown` 键）。
- 浏览器打开“保存页面”对话框（`key:Ctrl+S`）
-  ...等等。

阻止对 `keydown` 的默认动作可以取消其中的大多数操作，但基于操作系统的特殊按键除外。例如在 Windows 里，`key:Alt+F4` 关闭当前浏览器窗口。也没有办法通过阻止 JavaScript 中的默认动作来阻止它。

例如，下述的 `<input>` 期望输入值是电话号码，因此他不会接受除数字、`+`、`()` 或 `-`以外的其他按键：

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Phone, please" type="tel">
```

请注意，像 `key:Backspace`、`key:Left`、`key:Right`、`key:Ctrl+V` 这样的特殊按键在输入中无效。这是严格过滤器 `checkPhoneKey` 的副作用。

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

按一个按键总是会产生一个键盘事件，无论是符号键还是特殊按键，比如 `key:Shift` 或 `key:Ctrl` 等。唯一的例外是 `key:Fn`，它有时会出现在笔记本电脑键盘上。它没有键盘事件，因为它通常在比 OS 低的级别上实现的。

键盘事件：

- `keydown` —— 长久按键（如果按下长键则自动重复），
- `keyup` —— 释放按键时。

主键盘事件属性：

- `code` —— “按键代码”（`"KeyA"`、`"ArrowLeft"` 等），具体到键盘上键的物理位置。
- `key` —— 非字符键的字符（`"A"`、`"a"` 等），通常具有和 `code` 一样的值。

过去，键盘事件有时用于跟踪用户在表单字段中的输入。这很不可靠，因为输入源可以不同。我们有 `input` 和 `change` 事件来处理任何输入（之后我们会在 <info:events-change-input> 章节中作进一步介绍）。它们在任何输入后触发，包括鼠标或语音识别。

当我们真正想要键盘时，我们应该使用键盘事件。比如，对热键或特殊键作出反应。
