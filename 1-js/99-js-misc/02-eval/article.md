<<<<<<< HEAD
# Eval：执行代码字符串

内建函数 `eval` 函数允许执行一个代码字符串。

语法如下：
=======
# Eval: run a code string

The built-in `eval` function allows to execute a string of code.

The syntax is:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
let result = eval(code);
```

<<<<<<< HEAD
例如：
=======
For example:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

<<<<<<< HEAD
代码字符串可能会比较长，包含换行符、函数声明和变量等。

`eval` 的结果是最后一条语句的结果。

例如：
=======
A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of `eval` is the result of the last statement.

For example:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

<<<<<<< HEAD
`eval` 内的代码在当前词法环境（lexical environment）中执行，因此它能访问外部变量：
=======
The eval'ed code is executed in the current lexical environment, so it can see outer variables:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

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
它也可以更改外部变量：
=======
It can change outer variables as well:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js untrusted refresh run
let x = 5;
eval("x = 10");
<<<<<<< HEAD
alert(x); // 10，值被更改了
```

严格模式下，`eval` 有属于自己的词法环境。因此我们不能从外部访问在 `eval` 中声明的函数和变量：

```js untrusted refresh run
// 提示：本教程所有可运行的示例都默认启用了严格模式 'use strict'

eval("let x = 5; function f() {}");

alert(typeof x); // undefined（没有这个变量）
// 函数 f 也不可从外部进行访问
```

如果不启用严格模式，`eval` 没有属于自己的词法环境，因此我们可以从外部访问变量 `x` 和函数 `f`。

## 使用 "eval"

现代编程中，已经很少使用 `eval` 了。人们经常说“eval 是魔鬼”。

原因很简单：很久很久以前，JavaScript 是一种非常弱的语言，很多东西只能通过 `eval` 来完成。不过那已经是十年前的事了。

如今几乎找不到使用 `eval` 的理由了。如果有人在使用它，那这是一个很好的使用现代语言结构或 [JavaScript Module](info:modules) 来替换它们的机会。

请注意，`eval` 访问外部变量的能力会产生副作用。

代码压缩工具（在把 JS 投入生产环境前对其进行压缩的工具）将局部变量重命名为更短的变量（例如 `a` 和 `b` 等），以使代码体积更小。这通常是安全的，但在使用了 `eval` 的情况下就不一样了，因为局部变量可能会被 `eval` 中的代码访问到。因此压缩工具不会对所有可能会被从 `eval` 中访问的变量进行重命名。这样会导致代码压缩率降低。

在 `eval` 中使用外部局部变量也被认为是一个坏的编程习惯，因为这会使代码维护变得更加困难。

有两种方法可以完全避免此类问题。

**如果 `eval` 中的代码没有使用外部变量，请以 `window.eval(...)` 的形式调用 `eval`：** 

通过这种方式，该代码便会在全局作用域内执行：
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
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js untrusted refresh run
let x = 1;
{
  let x = 5;
<<<<<<< HEAD
  window.eval('alert(x)'); // 1（全局变量）
}
```

**如果 `eval` 中的代码需要访问局部变量，我们可以使用 `new Function` 替代 `eval`，并将它们作为参数传递：** 
=======
  window.eval('alert(x)'); // 1 (global variable)
}
```

**If eval'ed code needs local variables, change `eval` to `new Function` and pass them as arguments:**
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

<<<<<<< HEAD
我们在 <info:new-function> 一章中对 `new Function` 构造器进行了详细说明。`new Function` 从字符串创建一个函数，并且也是在全局作用域中的。所以它无法访问局部变量。但是，正如上面的示例一样，将它们作为参数进行显式传递要清晰得多。

## 总结

调用 `eval(code)` 会运行代码字符串，并返回最后一条语句的结果。
- 在现代 JavaScript 编程中，很少使用它，通常也不需要使用它。
- 可以访问外部局部变量。这被认为是一个不好的编程习惯。
- 要在全局作用域中 `eval` 代码，可以使用 `window.eval(code)` 进行替代。
- 此外，如果你的代码需要从外部作用域获取数据，请使用 `new Function`，并将数据作为参数传递给函数。
=======
The `new Function` construct is explained in the chapter <info:new-function>. It creates a function from a string, also in the global scope. So it can't see local variables. But it's so much clearer to pass them explicitly as arguments, like in the example above.

## Summary

A call to `eval(code)` runs the string of code and returns the result of the last statement.
- Rarely used in modern JavaScript, as there's usually no need.
- Can access outer local variables. That's considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
