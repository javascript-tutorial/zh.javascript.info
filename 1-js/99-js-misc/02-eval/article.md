<<<<<<< HEAD
# Eval：执行字符串内的代码

内建（built-in）函数 `eval` 让我们能够执行字符串内的代码。

语法如下：
=======
# Eval: run a code string

The built-in `eval` function allows to execute a string of code.

The syntax is:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js
let result = eval(code);
```

<<<<<<< HEAD
比如：
=======
For example:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

<<<<<<< HEAD
这样的字符串可能比较长，其中包含换行符（line breaks）、函数声明（function declarations）和变量，等等。

`eval` 返回字符串中最后一个语句的结果。

比如：

=======
A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of `eval` is the result of the last statement.

For example:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

<<<<<<< HEAD
字符串内的代码在当前词法环境（lexical environment）下执行，因此能访问外部变量：
=======
The eval'ed code is executed in the current lexical environment, so it can see outer variables:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

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

<<<<<<< HEAD
我们也能对外部变量重新赋值：
=======
It can change outer variables as well:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js untrusted refresh run
let x = 5;
eval("x = 10");
<<<<<<< HEAD
alert(x); // 10, 变量的值改变了
```

严格模式（strict mode）下，`eval` 有属于自己的词法环境，因此我们不能从外部访问在 `eval` 中声明的函数和变量：

```js untrusted refresh run
// 提示: 网站内可运行的代码默认启用 'use strict'

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (不存在该变量)
// f 函数也不可从外部访问
```

如果不用严格模式，`eval` 没有属于自己的词法环境，因此我们能在外部访问 `x` 变量和 `f` 函数。

## 使用“eval”

现代编程中，`eval` 已不常用。人们经常说“eval is evil”.

原因很简单：JavaScript 曾经很难用，很多操作只能用 `eval` 来完成，不过这是十年前的事了。

如今几乎找不到理由来用 `eval` 了。如果有人用，那么可能要换用现代语言构造（language construct）或者 [JavaScript Module](info:modules) 了。

注意，`eval` 访问外部函数会产生副作用（side-effects）。

代码压缩工具（minifier，在 JS 进入生产环境前对其进行压缩的工具）将局部变量重命名，使其更短（比如 `a` 和 `b`，等等），这样代码体积就变小了。这种方式通常比较安全，但在使用 `eval` 的情况下就不一样了，这是因为局部变量可能会被 `eval` 中的代码访问到。因此压缩器不会对所有可能被 `eval` 访问的变量作重命名。这样会导致代码压缩率降低。

在 `eval` 内获取外部局部变量不是良好的编程习惯，这会使维护代码变得更加困难。

有两种方法来完全避免这类问题。

**如果字符串中的代码不访问外部变量，调用 `window.eval(...)`：** 

这样，代码便会在全局作用域（global scope）内执行：
=======
alert(x); // 10, value modified
```

In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

```js untrusted refresh run
// reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible
```

Without `use strict`, `eval` doesn't have its own lexical environment, so we would see `x` and `f` outside.

## Using "eval"

In modern programming `eval` is used very sparingly. It's often said that "eval is evil".

The reason is simple: long, long time ago JavaScript was a much weaker language, many things could only be done with `eval`. But that time passed a decade ago.

Right now, there's almost no reason to use `eval`. If someone is using it, there's a good chance they can replace it with a modern language construct or a [JavaScript Module](info:modules).

Please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) rename local variables into shorter ones (like `a`, `b` etc) to make the code smaller. That's usually safe, but not if `eval` is used, as local variables may be accessed from eval'ed code string. So minifiers don't do that renaming for all variables potentially visible from `eval`. That negatively affects code compression ratio.

Using outer local variables inside `eval` is also considered a bad programming practice, as it makes maintaining the code more difficult.

There are two ways how to be totally safe from such problems.

**If eval'ed code doesn't use outer variables, please call `eval` as `window.eval(...)`:**

This way the code is executed in the global scope:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js untrusted refresh run
let x = 1;
{
  let x = 5;
<<<<<<< HEAD
  window.eval('alert(x)'); // 1 (全局变量)
}
```

**如果 `eval` 内代码需要访问局部变量，我们可以使用 `new Function`，将此变量作为参数传递。** 
=======
  window.eval('alert(x)'); // 1 (global variable)
}
```

**If eval'ed code needs local variables, change `eval` to `new Function` and pass them as arguments:**
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

<<<<<<< HEAD
对于 `new Function`，可参考 <info:new-function>。该构造函数接收字符串，返回位于全局作用域下的函数，因此该函数无法访问局部变量。然而如以上一例，向 `new Function` 显式传递该变量会使代码变得容易理解。

## 总结

`eval(code)` 会执行字符串内的代码并返回最后一个语句的结果。

- 现代 JavaScript 不常用该函数，通常也没必要用。
- 该函数可以访问外部局部变量，但这不是个好习惯。
- 取而代之，使用 `window.eval(code)` 以使代码在全局作用域下执行。
- 或者，如果代码需要从外部作用域获取数据，请使用 `new Function` 并将该数据作为参数传递给函数。
=======
The `new Function` construct is explained in the chapter <info:new-function>. It creates a function from a string, also in the global scope. So it can't see local variables. But it's so much clearer to pass them explicitly as arguments, like in the example above.

## Summary

A call to `eval(code)` runs the string of code and returns the result of the last statement.
- Rarely used in modern JavaScript, as there's usually no need.
- Can access outer local variables. That's considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
