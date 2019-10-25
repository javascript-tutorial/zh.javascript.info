# Eval：执行字符串内的代码

内建（built-in）函数`eval`让我们能够执行字符串内的代码。

语法如下：

```js
let result = eval(code);
```

比如：

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

这样的字符串可能比较长，其中包含换行符（line breaks）、函数声明（function declarations）和变量，等等。

`eval`返回字符串中最后一个语句的结果。

比如：

```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

字符串内的代码在当前词法环境（lexical environment）下执行，因此能访问外部变量：

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

我们在字符串中也能对外部变量重新赋值：

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, 变量的值改变了
```

严格模式（strict mode）下，`eval`有属于自己的词法环境，因此我们不能访问在该函数中声明的函数和变量：

```js untrusted refresh run
// 提示: 网站内可运行的代码默认启用'use strict'

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (不存在该变量)
// f函数也不可从外部访问
```

如果不用严格模式，`eval`没有属于自己的词法环境，因此我们能在外部访问`x`变量和`f函数`。

## 使用“eval”

现代编程中，`eval`已不常用。人们经常说“eval is evil”.

原因很简单：JavaScript 曾经很难用，很多操作只能用`eval`来完成，不过这是十年前的事了。

如今几乎找不到理由来用`eval`了。如果有人用，那么可能要换用现代语言构造（language construct）或者 [JavaScript Module](info:modules) 了。

注意，`eval`访问外部函数会产生副作用（side-effects）。

代码压缩工具（minifier）将局部变量重命名，使其更短（比如`a`和`b`，等等），这样代码体积就变小了。

**注：压缩工具压缩代码，用于JS进入生产环境前。**

在`eval`内获取外部局部变量不是良好的编程习惯，这会使维护代码变得更加困难。

有两种方法来完全避免这类问题。

**如果字符串中的代码不访问外部变量，调用`window.eval(...)`：**

这样，代码便会在全局作用域（global scope）内执行：

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (全局变量)
}
```

**如果`eval`内代码需要访问局部变量，我们可以使用`new Function`，将此变量作为参数传递。**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

对于`new Function`，可参考 <info:new-function>。该构造函数接收字符串，返回位于全局作用域下的函数，因此该函数无法访问局部变量。然而如以上一例，向`new Function`显式传递该变量会使代码变得容易理解。

## 总结

`eval(code)`会执行字符串内的代码并返回最后一个语句的结果。

- 现代 JavaScript 不常用该函数，通常也没必要用。

- 该函数可以访问外部局部变量，但这不是个好习惯。

- 取而代之，使用`window.eval(code)`以使代码在全局作用域下执行。

- 或者，如果代码需要从外部作用域获取数据，请使用`new Function`并将该数据作为参数传递给函数。