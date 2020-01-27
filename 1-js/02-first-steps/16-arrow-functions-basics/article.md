<<<<<<< HEAD
# 箭头函数，基础知识

创建函数还有另外一种非常简单的语法，并且这种方法通常比函数表达式更好。

它被称为“箭头函数”，因为它看起来像这样：

```js
let func = (arg1, arg2, ...argN) => expression
```

……这里创建了一个函数 `func`，它接受参数 `arg1..argN`，然后使用参数对右侧的 `expression` 求值并返回其结果。

换句话说，它是下面这段代码的更短的版本：

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

让我们来看一个具体的例子：

```js run
let sum = (a, b) => a + b;

/* 这个箭头函数是下面这个函数的更短的版本：

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

可以看到 `(a, b) => a + b` 表示一个函数接受两个名为 `a` 和 `b` 的参数。在执行时，它将对表达式 `a + b` 求值，并返回计算结果。

- 如果我们只有一个参数，还可以省略掉参数外的圆括号，使代码更短。

    例如：

    ```js run
    *!*
    let double = n => n * 2;
    // 差不多等同于：let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- 如果没有参数，括号将是空的（但括号应该保留）：

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

箭头函数可以像函数表达式一样使用。

例如，动态创建一个函数：

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // 现在好了
```

一开始，箭头函数可能看起来并不熟悉，也不容易读懂，但一旦我们看习惯了之后，这种情况很快就会改变。

箭头函数对于简单的单行动作来说非常方便，尤其是当我们懒得打太多字的时候。

## 多行的箭头函数

上面的例子从 `=>` 的左侧获取参数，然后使用参数计算右侧表达式的值。

但有时我们需要更复杂一点的东西，比如多行的表达式或语句。这也是可以做到的，但是我们应该用花括号括起来。然后使用一个普通的 `return` 将需要返回的值进行返回。

就像这样：

```js run
let sum = (a, b) => {  // 花括号表示开始一个多行函数
  let result = a + b;
*!*
  return result; // 如果我们使用了花括号，那么我们需要一个显式的 “return” 
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="更多内容"
在这里，我们赞扬了箭头功能的简洁性。但还不止这些！

箭头函数还有其他有趣的特性。

为了更深入地学习它们，我们首先需要了解一些 JavaScript 其他方面的知识，因此我们将在后面的 <info:arrow-functions> 一章中再继续研究箭头函数。

现在，我们已经可以用箭头函数进行单行操作和回调了。
```

## 总结

对于一行代码的函数来说，箭头函数是相当方便的。它具体有两种：

1. 不带花括号：`(...args) => expression` — 右侧是一个表达式：函数计算表达式并返回其结果。
2. 带花括号：`(...args) => { body }` — 花括号允许我们在函数中编写多个语句，但是我们需要显式地 `return` 来返回一些内容。
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:

```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

Let's see a concrete example:

```js run
let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:

    ```js run
    *!*
    let double = n => n * 2;
    // roughly the same as: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- If there are no arguments, parentheses will be empty (but they should be present):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
