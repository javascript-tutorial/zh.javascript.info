
# 旧时的 "var"

```smart header="本文用于帮助理解旧脚本"
本文所讲的内容对于帮助理解旧脚本很有用。

但这不是我们编写新代码的方式。
```

在本教程最开始那部分的 [变量](info:variables) 这章中，我们提到了变量声明的三种方式：

1. `let`
2. `const`
3. `var`

`var` 声明与 `let` 相似。大部分情况下，我们可以用 `let` 代替 `var` 或者 `var` 代替 `let`，都能达到预期的效果：

```js run
var message = "Hi";
alert(message); // Hi
```

但实际上 `var` 却是一头非常不同的，源自远古时代的怪兽。在现代脚本中一般不再使用它，但它仍然潜伏在旧脚本中。

如果你不打算接触这样的脚本，你甚至可以跳过本章或推迟阅读本章。

另一方面，了解将旧脚本从 `var` 迁移到 `let` 时的区别，以避免奇怪的错误，是很重要的。

## "var" 没有块级作用域

用 `var` 声明的变量，不是函数作用域就是全局作用域。它们在代码块外也是可见的（译注：也就是说，`var` 声明的变量只有函数作用域和全局作用域，没有块级作用域）。

举个例子：

```js run
if (true) {
  var test = true; // 使用 "var" 而不是 "let"
}

*!*
alert(test); // true，变量在 if 结束后仍存在
*/!*
```

由于 `var` 会忽略代码块，因此我们有了一个全局变量 `test`。

如果我们在第二行使用 `let test` 而不是 `var test`，那么该变量将仅在 `if` 内部可见：

```js run
if (true) {
  let test = true; // 使用 "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```

对于循环也是这样的，`var` 声明的变量没有块级作用域也没有循环局部作用域：

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10，"i" 在循环结束后仍可见，它是一个全局变量
alert(one); // 1，"one" 在循环结束后仍可见，它是一个全局变量
*/!*
```

如果一个代码块位于函数内部，那么 `var` 声明的变量的作用域将为函数作用域：

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 能正常工作
}

sayHi();
alert(phrase); // Error: phrase is not defined
```

可以看到，`var` 穿透了 `if`，`for` 和其它代码块。这是因为在早期的 JavaScript 中，块没有词法环境，而 `var` 就是这个时期的代表之一。

## "var" 允许重新声明

如果我们用 `let` 在同一作用域下将同一个变量声明两次，则会出现错误：

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

使用 `var`，我们可以重复声明一个变量，不管多少次都行。如果我们对一个已经声明的变量使用 `var`，这条新的声明语句会被忽略：

```js run
var user = "Pete";

var user = "John"; // 这个 "var" 无效（因为变量已经声明过了）
// ……不会触发错误

alert(user); // John
```

## "var" 声明的变量，可以在其声明语句前被使用

当函数开始的时候，就会处理 `var` 声明（脚本启动对应全局变量）。

换言之，`var` 声明的变量会在函数开头被定义，与它在代码中定义的位置无关（这里不考虑定义在嵌套函数中的情况）。

那么看一下这段代码：

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

……从技术上讲，它与下面这种情况是一样的（`var phrase` 被上移至函数开头）：

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

……甚至与这种情况也一样（记住，代码块是会被忽略的）：

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

人们将这种行为称为“提升”（英文为 "hoisting" 或 "raising"），因为所有的 `var` 都被“提升”到了函数的顶部。

所以，在上面的例子中，`if (false)` 分支永远都不会执行，但没关系，它里面的 `var` 在函数刚开始时就被处理了，所以在执行 `(*)` 那行代码时，变量是存在的。

**声明会被提升，但是赋值不会。**

我们最好用例子来说明：

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

`var phrase = "Hello"` 这行代码包含两个行为：

1. 使用 `var` 声明变量
2. 使用 `=` 给变量赋值。

声明在函数刚开始执行的时候（“提升”）就被处理了，但是赋值操作始终是在它出现的地方才起作用。所以这段代码实际上是这样工作的：

```js run
function sayHi() {
*!*
  var phrase; // 在函数刚开始时进行变量声明
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ……赋值 — 当程序执行到这一行时。
*/!*
}

sayHi();
```

因为所有的 `var` 声明都是在函数开头处理的，我们可以在任何地方引用它们。但是在它们被赋值之前都是 undefined。

上面两个例子中，`alert` 运行都不会报错，因为变量 `phrase` 是存在的。但是它还没有被赋值，所以显示 `undefiend`。

## IIFE

在之前，JavaScript 中只有 `var` 这一种声明变量的方式，并且这种方式声明的变量没有块级作用域，程序员们就发明了一种模仿块级作用域的方法。这种方法被称为“立即调用函数表达式”（immediately-invoked function expressions，IIFE）。

如今，我们不应该再使用 IIFE 了，但是你可以在旧脚本中找到它们。

IIFE 看起来像这样：

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

这里，创建了一个函数表达式并立即调用。因此，代码立即执行并拥有了自己的私有变量。

函数表达式被括号 `(function {...})` 包裹起来，因为当 JavaScript 引擎在主代码中遇到 `"function"` 时，它会把它当成一个函数声明的开始。但函数声明必须有一个函数名，所以这样的代码会导致错误：

```js run
// 尝试声明并立即调用一个函数
function() { // <-- Error: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

即使我们说：“好吧，那我们加一个名称吧”，但它仍然不工作，因为 JavaScript 不允许立即调用函数声明：

```js run
// 下面的括号会导致语法错误
function go() {

}(); // <-- 不能立即调用函数声明
```

因此，需要使用圆括号把该函数表达式包起来，以告诉 JavaScript，这个函数是在另一个表达式的上下文中创建的，因此它是一个函数表达式：它不需要函数名，可以立即调用。

除了使用括号，还有其他方式可以告诉 JavaScript 在这我们指的是函数表达式：

```js run
// 创建 IIFE 的方法

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

在上面的所有情况中，我们都声明了一个函数表达式并立即运行它。请再注意一下：如今我们没有理由来编写这样的代码。

## 总结

`var` 与 `let/const` 有两个主要的区别：

1. `var` 声明的变量没有块级作用域，它们仅在当前函数内可见，或者全局可见（如果变量是在函数外声明的）。
2. `var` 变量声明在函数开头就会被处理（脚本启动对应全局变量）。

涉及全局对象时，还有一个非常小的差异，我们将在下一章中介绍。

这些差异使 `var` 在大多数情况下都比 `let` 更糟糕。块级作用域是这么好的一个东西。这就是 `let` 在几年前就被写入到标准中的原因，并且现在（与 `const` 一起）已经成为了声明变量的主要方式。
