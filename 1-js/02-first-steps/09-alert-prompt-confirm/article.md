# 交互：alert、prompt 和 confirm

<<<<<<< HEAD
本教程的这部分内容主要使用原生 JavaScript，你无需针对特定环境进行调整。

但我们仍然会使用浏览器作为演示环境。所以我们至少应该知道一些用户界面函数。在这一节，我们一起来熟悉一下浏览器中 `alert`、`prompt` 和 `confirm` 函数的用法。
=======
In this part of the tutorial we cover JavaScript language "as is", without environment-specific tweaks.

But we'll still be using the browser as our demo environment, so we should know at least a few of its user-interface functions. In this chapter, we'll get familiar with the browser functions `alert`, `prompt` and `confirm`.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

## alert

语法：

```js
alert(message);
```

<<<<<<< HEAD
运行这行代码，浏览器会弹出一个信息弹窗并暂停脚本，直到用户点击了“确定”。
=======
This shows a message and pauses script execution until the user presses "OK".
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

举个例子：

```js run
alert("Hello");
```

<<<<<<< HEAD
弹出的这个带有信息的小窗口被称为 **模态窗**。"modal" 意味着用户不能与页面的其他部分（例如点击其他按钮等）进行交互，直到他们处理完窗口。在上面示例这种情况下 —— 直到用户点击“确定”按钮。

## prompt

`prompt` 函数接收两个参数：
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc. until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
浏览器会显示一个带有文本消息的模态窗口，还有 input 框和确定/取消按钮。

`title`
: 显示给用户的文本
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`
: The text to show the visitor.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

`default`
: 可选的第二个参数，指定 input 框的初始值。

<<<<<<< HEAD
用户可以在 prompt 对话框的 input 框内输入一些内容，然后点击确定。或者他们可以通过按“取消”按钮或按下键盘的 `key:Esc` 键，以取消输入。

`prompt` 将返回用户在 `input` 框内输入的文本，如果用户取消了输入，则返回 `null`。
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

举个例子：

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
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
所以，为了 prompt 在 IE 中有好的效果，我们建议始终提供第二个参数：
=======
So, for prompts to look good in IE, we recommend always providing the second argument:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

语法：

```js
result = confirm(question);
```

<<<<<<< HEAD
`confirm` 函数显示一个带有 `question` 以及确定和取消两个按钮的模态窗口。
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

点击确定返回 `true`，点击取消返回 `false`。

例如：

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // 如果“确定”按钮被按下，则显示 true
```

## 总结

<<<<<<< HEAD
我们学习了与用户交互的 3 个浏览器的特定函数：
=======
We covered 3 browser-specific functions to interact with visitors:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

`alert`
: 显示信息。

`prompt`
<<<<<<< HEAD
: 显示信息要求用户输入文本。点击确定返回文本，点击取消或按下 `key:Esc` 键返回 `null`。

`confirm`
: 显示信息等待用户点击确定或取消。点击确定返回 `true`，点击取消或按下 `key:Esc` 键返回 `false`。

这些方法都是模态的：它们暂停脚本的执行，并且不允许用户与该页面的其余部分进行交互，直到窗口被解除。
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

上述所有方法共有两个限制：

<<<<<<< HEAD
1. 模态窗口的确切位置由浏览器决定。通常在页面中心。
2. 窗口的确切外观也取决于浏览器。我们不能修改它。
=======
1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

这就是简单的代价。还有其他一些方法可以显示更漂亮的窗口，并与用户进行更丰富的交互，但如果“花里胡哨”不是非常重要，那使用本节讲的这些方法也挺好。
