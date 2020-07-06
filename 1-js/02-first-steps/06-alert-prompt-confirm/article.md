<<<<<<< HEAD
# 交互：alert、prompt 和 confirm
=======
# Interaction: alert, prompt, confirm
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to presses "OK".

<<<<<<< HEAD
例如：
=======
For example:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
alert("Hello");
```

<<<<<<< HEAD
弹出的这个带有信息的小窗口被称为 **模态窗**。"modal" 意味着用户不能与页面的其他部分（例如点击其他按钮等）进行交互，直到他们处理完窗口。在上面示例这种情况下 —— 直到用户点击“确定”按钮。

## prompt

`prompt` 函数接收两个参数：
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
浏览器会显示一个带有文本消息的模态窗口，还有 input 框和确定/取消按钮。

`title`
: 显示给用户的文本

`default`
: 可选的第二个参数，指定 input 框的初始值。
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`
: The text to show the visitor.

`default`
: An optional second parameter, the initial value for the input field.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter as optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.

<<<<<<< HEAD
`prompt` 将返回用户在 `input` 框内输入的文本，如果用户取消了输入，则返回 `null`。

举个例子：
=======
The call to `prompt` returns the text from the input field or `null` if the input was canceled.

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

<<<<<<< HEAD
````warn header="IE 浏览器会提供默认值"
第二个参数是可选的。但是如果我们不提供的话，Internet Explorer 会把 `"undefined"` 插入到 prompt。

我们可以在 Internet Explorer 中运行下面这行代码来看看效果：
=======
````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
所以，为了 prompt 在 IE 中有好的效果，我们建议始终提供第二个参数：
=======
So, for prompts to look good in IE, we recommend always providing the second argument:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

<<<<<<< HEAD
语法：
=======
The syntax:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
result = confirm(question);
```

<<<<<<< HEAD
`confirm` 函数显示一个带有 `question` 以及确定和取消两个按钮的模态窗口。

点击确定返回 `true`，点击取消返回 `false`。

例如：
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let isBoss = confirm("Are you the boss?");

<<<<<<< HEAD
alert( isBoss ); // 如果“确定”按钮被按下，则显示 true
```

## 总结

我们学习了与用户交互的 3 个浏览器的特定函数：

`alert`
: 显示信息。

`prompt`
: 显示信息要求用户输入文本。点击确定返回文本，点击取消或按下 `key:Esc` 键返回 `null`。

`confirm`
: 显示信息等待用户点击确定或取消。点击确定返回 `true`，点击取消或按下 `key:Esc` 键返回 `false`。

这些方法都是模态的：它们暂停脚本的执行，并且不允许用户与该页面的其余部分进行交互，直到窗口被解除。

上述所有方法共有两个限制：

1. 模态窗口的确切位置由浏览器决定。通常在页面中心。
2. 窗口的确切外观也取决于浏览器。我们不能修改它。

这就是简单的代价。还有其他一些方法可以显示更漂亮的窗口，并与用户进行更丰富的交互，但如果“花里胡哨”不是非常重要，那使用本节讲的这些方法也挺好。
=======
alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
