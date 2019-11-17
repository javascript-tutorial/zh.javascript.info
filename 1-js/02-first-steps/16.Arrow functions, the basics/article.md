# 箭头函数基础

创建函数还有一个非常简单和简洁的语法，通常比函数表达式更好。它被称为“箭头函数”，因为它看起来像这样：


```js
let func = (arg1, arg2, ...argN) => expression
```

……这样会创建一个参数是 `arg1..argN` 的函数 `func`，运行右侧 `expression` 并返回结果。

换句话说，它大致与以下相同：

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
}
```

……但是更加精简。

看一个例子：

```js run
let sum = (a, b) => a + b;

/* 箭头函数更短：

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```
如你所见， `(a, b) => a +b` 意味着一个接受两个名字为 `a` 和 `b` 的函数。在执行中，它计算表达式 `a + b` 并返回它们的结果 

- 如果我们只有一个参数，那么括号可以省略，使函数变得更短：

    例如
    ```js run

    *!*
    let double = n => n * 2;
    // 基本上等同于: let double = function(n) { return n * 2 } 
    */!*

    alert( double(3) ); // 6
    ```

- 如果没有参数，括号应该是空的（但它们应该存在）：

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

箭头函数可以像函数表达式一样使用

例如，来动态创建一个函数
```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

箭头函数在刚开始使用时可能不熟悉也不便于阅读，但是当我们习惯这种结构之后，情况会迅速改变。

当我们懒得写很多单词时，它们对于简单的单行动作非常方便。

## 多行箭头函数

上面的例子从 `=>` 左边获得参数，并且在右侧运行它们表达式。

有时候，我们需要的东西更加复杂，比如多行表达式或语句。这是可能的，但我们应该把它们包裹在一个大括号 `{}` 里。然后在内部使用一个正常的 `return` 。

就像这样：
```js run

let sum = (a, b) => {  // 大括号打开多线功能
  let result = a + b;
*!*
  return result; // 如果我们使用了大括号，那么我们需要一个显式的 "return"
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="多行箭头函数"

上面的例子是获取左边的参数 `=>` 并用它们运行右边的表达式。

有时我们需要一些更复杂的东西，比如多个表达式或语句。这也是可能的，但我们应该把它们装在花括号里。然后在他们内部使用正常的 `return`。

像这样：

```js run
let sum = (a, b) => {  // 花括号打开多线功能
  let result = a + b;
*!*
  return result; // 如果我们使用花括号，使用返回来获得结果
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="更多介绍"
我们在这里简短地称赞了箭头功能。但那不是全部！

箭头功能还有其他有趣的功能。

为了深入学习它们，我们首先需要了解 JavaScript 其他层面的更多知识，稍后我们将在 <info:arrow-functions> 一章中学习它们。

目前，我们已经可以将它们用于单行动作和回调。
```

## 总结


箭头函数非常适合单行调用，以下是其两个特点。

1. 没有大括号：`(...args) => expression` —— 右侧是一个表达式：该函数对其进行运行并返回结果。
2. 有大括号：`(...args) => { body }` —— 括号允许我们在函数中写入多个语句，但是我们需要一个显式的 `return` 来返回一些东西。
