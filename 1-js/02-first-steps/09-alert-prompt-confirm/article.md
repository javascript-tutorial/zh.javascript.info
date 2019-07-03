# 交互：alert、prompt、confirm

<<<<<<< HEAD
本部分旨在覆盖 JavaScript “原生”，而无需针对特定环境进行调整。

但我们仍然使用浏览器作为演示环境。所以我们至少应该知道一些用户界面函数。在本章节我们将会熟悉函数 `alert`、`prompt` 和 `confirm` 的用法。
=======
In this part of the tutorial we cover JavaScript language "as is", without environment-specific tweaks.

But we'll still be using the browser as our demo environment, so we should know at least a few of its user-interface functions. In this chapter, we'll get familiar with the browser functions `alert`, `prompt` and `confirm`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## alert

语法：

```js
alert(message);
```

<<<<<<< HEAD
浏览器会弹出一段信息并暂停脚本，直到用户点击了“确定”。
=======
This shows a message and pauses script execution until the user presses "OK".
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

举个例子：

```js run
alert("Hello");
```

<<<<<<< HEAD
这个小窗口被称为 **模态窗**。"modal" 意味着用户不能与页面的其他部分进行交互，点击其他按钮等，直到他们处理完窗口。在这种情况下 - 直到他们按下“确定”。

## prompt

`prompt` 函数接收两个参数：
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc. until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
浏览器会显示一个带有文本消息的模态窗口，还有 input 框和确定/取消按钮。

`title`
: 显示给用户的文本
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/CANCEL.

`title`
: The text to show the visitor.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

`default`
: 可选的第二个参数，指定 input 框的初始值。

<<<<<<< HEAD
用户在 prompt 对话框的 input 框输入文本并点击确定。不然就点击取消按钮或敲击 `key:Esc` 键来取消。

`prompt` 返回输入的文本；如果取消输入就返回 `null`。
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing CANCEL or hitting the `key:Esc` key.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

举个例子：

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

<<<<<<< HEAD
````warn header="IE: always supply a `default`"
第二个参数可选。但是如果我们不提供的话，Internet Explorer 会把 `"undefined"` 插入到 prompt。

在 Internet Explorer 中运行将会看到：
=======
````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
所以，在 IE 中看起来很好，建议始终提供第二个参数：
=======
So, for prompts to look good in IE, we recommend always providing the second argument:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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
`confirm` 函数显示一个带有 `question` 和两个按钮的模态窗口：确定和取消。
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and CANCEL.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

点击确定返回 `true`，点击取消返回 `false`。

举一个例子：

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## 总结

<<<<<<< HEAD
我们探讨了与用户交互的 3 个浏览器指定的函数：
=======
We covered 3 browser-specific functions to interact with visitors:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

`alert`
: 显示信息。

`prompt`
<<<<<<< HEAD
: 显示信息要求用户输入文本。点击确定返回文本，点击取消或按下 `key:Esc` 键返回 `null`。
=======
: shows a message asking the user to input text. It returns the text or, if CANCEL or `key:Esc` is clicked, `null`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

`confirm`
: 显示信息等待用户点击确定或取消。点击确定返回 `true`，点击取消或 `key:Esc` 键返回 `false`。

<<<<<<< HEAD
这些方法都是模态的：它们暂停脚本执行，并且不允许用户与该页面的其余部分交互，直到消息被解除。
=======
All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

上述所有方法共有两个限制：

<<<<<<< HEAD
1. 模态窗口的确切位置由浏览器决定。通常在页面中心。
2. 窗口的确切外观还取决于浏览器。我们不能修改它。
=======
1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

这是简单的代价。还有其他一些方法可以显示更漂亮的窗口，并与用户进行更丰富的交互，但如果“花里胡哨”不是非常重要，这些方法也可以工作的很好。
