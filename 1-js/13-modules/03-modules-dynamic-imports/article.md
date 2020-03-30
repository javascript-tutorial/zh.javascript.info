<<<<<<< HEAD
# 动态导入（Dynamic import）

我们在前面章节中介绍的导出和导入语句称为“静态”导入。语法非常简单且严格。

首先，我们不能动态生成 `import` 的任何参数。

模块路径必须是原始类型字符串，不能是函数调用，下面这样的 `import` 行不通：
=======
# Dynamic imports

Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict.

First, we can't dynamically generate any parameters of `import`.

The module path must be a primitive string, can't be a function call. This won't work:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
import ... from *!*getModuleName()*/!*; // Error, only from "string" is allowed
```

<<<<<<< HEAD
其次，我们无法根据条件或者在运行时导入：
=======
Second, we can't import conditionally or at run-time:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
```

<<<<<<< HEAD
这是因为 `import`/`export` 旨在提供代码结构的主干。这是非常好的事儿，因为这样便于分析代码结构，可以收集模块，可以使用特殊工具将收集的模块打包到一个文件中，可以删除未使用的导出（"tree-shaken"）。这些只有在 `import`/`export` 结构简单且固定的情况下才能够实现。

但是，我们如何才能动态地按需导入模块呢？

## import() 表达式

`import(module)` 表达式加载模块并返回一个 promise，该 promise resolve 为一个包含其所有导出的模块对象。我们可以在代码中的任意位置调用这个表达式。

我们可以在代码中的任意位置动态地使用它。例如：
=======
That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## The import() expression

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

<<<<<<< HEAD
或者，如果在异步函数中，我们可以使用 `let module = await import(modulePath)`。

例如，如果我们有以下模块 `say.js`：
=======
Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following module `say.js`:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

<<<<<<< HEAD
……那么，可以想像下面这样进行动态导入：
=======
...Then dynamic import can be like this:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

<<<<<<< HEAD
或者，如果 `say.js` 有默认的导出：
=======
Or, if `say.js` has the default export:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

<<<<<<< HEAD
……那么，为了访问它，我们可以使用模块对象的 `default` 属性：
=======
...Then, in order to access it, we can use `default` property of the module object:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

<<<<<<< HEAD
这是一个完整的示例：
=======
Here's the full example:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

[codetabs src="say" current="index.html"]

```smart
<<<<<<< HEAD
动态导入在常规脚本中工作时，它们不需要 `script type="module"`.
```

```smart
尽管 `import()` 看起来像一个函数调用，但它只是一种特殊语法，只是恰好使用了括号（类似于 `super()`）。

因此，我们不能将 `import` 复制到一个变量中，或者对其使用 `call/apply`。因为它不是一个函数。
=======
Dynamic imports work in regular scripts, they don't require `script type="module"`.
```

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

So we can't copy `import` to a variable or use `call/apply` with it. It's not a function.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```
