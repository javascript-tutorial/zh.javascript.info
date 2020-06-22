
# 旧时的 "var"

<<<<<<< HEAD
```smart header="本文用于帮助理解旧脚本"
本文所讲的内容对于帮助理解旧脚本很有用。

但这不是我们编写新代码的方式。
```

在本教程最开始那部分的 [变量](info:variables) 这章中，我们提到了变量声明的三种方式：
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` 和 `const` 在词法环境中的行为完全一样。

但 `var` 却是一头完全不同的，源自非常古老的时代的怪兽。在现代脚本中一般不再使用它，但它仍然潜伏在旧脚本中。

如果你不打算接触这样的脚本，你甚至可以跳过本章或推迟阅读本章，但是之后你很可能会踩到它的坑。

乍一看，`var` 和 `let` 的行为相似，不就是声明变量嘛：

```js run
function sayHi() {
  var phrase = "Hello"; // 局部变量，使用 "var"，而不是 "let"

  alert(phrase); // Hello
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

<<<<<<< HEAD
……但两者存在区别。
=======
On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

## "var" 没有块级作用域

<<<<<<< HEAD
用 `var` 声明的变量，不是函数作用域就是全局作用域。它们在代码块外也是可见的（译注：也就是说，`var` 声明的变量只有函数作用域和全局作用域，没有块级作用域）。
=======
Variables, declared with `var`, are either function-wide or global. They are visible through blocks.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

举个例子：

```js run
if (true) {
  var test = true; // 使用 "var" 而不是 "let"
}

*!*
alert(test); // true，变量在 if 结束后仍存在
*/!*
```

<<<<<<< HEAD
由于 `var` 会忽略代码块，因此我们有了一个全局变量 `test`。
=======
As `var` ignores code blocks, we've got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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
  // ...
}

*!*
alert(i); // 10，"i" 在循环结束后仍可见，它是一个全局变量
*/!*
```

如果一个代码块位于函数内部，那么 `var` 声明的变量的作用域将为函数作用域：

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
alert(phrase); // Error: phrase is not defined (Check the Developer Console)
```

<<<<<<< HEAD
可以看到，`var` 穿透了 `if`，`for` 和其它代码块。这是因为在早期的 JavaScript 中，块没有词法环境。而 `var` 就是这个时期的代表之一。

## "var" 声明在函数开头就会被处理
=======
As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript blocks had no Lexical Environments. And `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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

……从技术上将，它与下面这种情况是一样的（`var phrase` 被上移至函数开头）：

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

<<<<<<< HEAD
我们最好用例子来说明：
=======
That's best demonstrated with an example:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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

上面两个例子中 `alert` 运行都不会报错，因为变量 `phrase` 是存在的。但是它还没有被赋值，所以显示 `undefiend`。

### IIFE

在之前，JavaScript 中只有 `var` 这一种声明变量的方式，并且这种方式声明的变量没有块级作用域，程序员们就发明了一种模仿块级作用域的方法。这种方法被称为“立即调用函数表达式”（immediately-invoked function expressions，IIFE）。

如今，我们不应该再使用 IIFE 了，但是你可以在旧脚本中找到它们。

IIFE 看起来像这样：

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

这里创建了一个函数表达式并立即调用。因此，代码立即执行并拥有了自己的私有变量。

函数表达式被括号 `(function {...})` 包裹起来，因为在 JavaScript 中，当主代码流遇到 `"function"` 时，它会把它当成一个函数声明的开始。但函数声明必须有一个函数名，所以这样的代码会导致错误：

```js run
// 尝试声明并立即调用一个函数
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

即使我们说：“好吧，那我们加一个名称吧”，但它仍然不工作，因为 JavaScript 不允许立即调用函数声明：

```js run
// 下面的括号会导致语法错误
function go() {

}(); // <-- 不能立即调用函数声明
```

因此，需要使用圆括号把告函数表达式包起来，以告诉 JavaScript，这个函数是在另一个表达式的上下文中创建的，因此它是一个函数表达式：它不需要函数名，可以立即调用。

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

<<<<<<< HEAD
## 总结

`var` 与 `let/const` 有两个主要的区别：

1. `var` 声明的变量没有块级作用域，它们的最小作用域就是函数级作用域。
2. `var`  变量声明在函数开头就会被处理（脚本启动对应全局变量）。

涉及全局对象时，还有一个非常小的差异，我们将在下一章中介绍。

这些差异使 `var` 在大多数情况下都比 `let` 更糟糕。块级作用域是这么好的一个东西。这就是 `let` 在几年前就被写入到标准中的原因，并且现在（与 `const` 一起）已经成为了声明变量的主要方式。
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

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

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## Summary

There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, they are visible minimum at the function level.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
