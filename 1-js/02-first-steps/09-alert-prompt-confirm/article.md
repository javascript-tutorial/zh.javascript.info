# 交互：alert、prompt、confirm

本部分旨在覆盖 JavaScript “原生”，而无需针对特定环境进行调整。

但我们仍然使用浏览器作为演示环境。所以我们至少应该知道一些用户界面函数。在本章节我们将会熟悉函数 `alert`、`prompt` 和 `confirm` 的用法。

## alert

语法：

```js
alert(message);
```

浏览器会弹出一段信息并暂停脚本，直到用户点击了“确定”。

举个例子：

```js run
alert("Hello");
```

这个小窗口被称为 **模态窗**。"modal" 意味着用户不能与页面的其他部分进行交互，点击其他按钮等，直到他们处理完窗口。在这种情况下 - 直到他们按下“确定”。

## prompt

`prompt` 函数接收两个参数：

```js no-beautify
result = prompt(title[, default]);
```

浏览器会显示一个带有文本消息的模态窗口，还有 input 框和确定/取消按钮。

`title`
: 显示给用户的文本

`default`
: 可选的第二个参数，指定 input 框的初始值。

用户在 prompt 对话框的 input 框输入文本并点击确定。不然就点击取消按钮或敲击 `key:Esc` 键来取消。

`prompt` 返回输入的文本；如果取消输入就返回 `null`。

举个例子：

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="IE: always supply a `default`"
第二个参数可选。但是如果我们不提供的话，Internet Explorer 会把 `"undefined"` 插入到 prompt。

在 Internet Explorer 中运行将会看到：

```js run
let test = prompt("Test");
```

所以，在 IE 中看起来很好，建议始终提供第二个参数：

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

语法：

```js
result = confirm(question);
```

`confirm` 函数显示一个带有 `question` 和两个按钮的模态窗口：确定和取消。

点击确定返回 `true`，点击取消返回 `false`。

举一个例子：

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## 总结

我们探讨了与用户交互的 3 个浏览器指定的函数：

`alert`
: 显示信息。

`prompt`
: 显示信息要求用户输入文本。点击确定返回文本，或者点击取消或按下 `key:Esc` 键，对于所有浏览器来说，其返回值都是。

`confirm`
: 显示信息等待用户点击确定或取消。点击确定返回 `true`，点击取消或 `key:Esc` 键返回 `false`。

这些方法都是模态的：它们暂停脚本执行，并且不允许用户与该页面的其余部分交互，直到消息被解除。

上述所有方法共有两个限制：

1. 模态窗口的确切位置由浏览器决定。通常在页面中心。
2. 窗口的确切外观还取决于浏览器。我们不能修改它。

这是简单的代价。还有其他一些方法可以显示更漂亮的窗口，并与用户进行更丰富的交互，但如果“花里胡哨”不是非常重要，这些方法也可以工作的很好。
