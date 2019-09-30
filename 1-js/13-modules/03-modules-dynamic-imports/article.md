<<<<<<< HEAD

# 动态导入（Dynamic imports）

我们在前面章节中介绍的导出和导入语句称为“静态”导入。

这是因为它们确实是静态的，语法非常严格。

首先，我们不能动态生成 `import` 的任何参数。

模块路径必须是原始类型字符串，不能是函数调用，下面的语句不起作用：

```js
import ... from *!*getModuleName()*/!*; // 错误，只能是原始类型字符串
```

其次，我们无法根据条件或者在运行时导入：

```js
if(...) {
  import ...; // 错误，不允许这样做
}

{
  import ...; // 错误，不能将导入放到块中
}
```

这是因为，导入/导出的目的是为代码提供主干结构。这是非常好的事情，因为这样便于分析代码结构，可以收集和打包模块，可以删除未使用的导出（tree-shaken）。这些只有在这一切都是固定的情况才能够实现。

但是，我们如何才能动态的按需导入模块呢？

## import() 函数

`import(module)` 函数可以在任何地方调用。它返回一个解析为模块对象的 promise。

使用模式如下：

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

另外，如果在一个 async 函数里，我们可以这样使用 `let module = await import(modulePath)`。

就像这样：

[codetabs src="say" current="index.html"]

所以，动态导入用起来很简单。

此外，动态导入可以像常规脚本一样工作，不需要额外指出 `script type="module"`。
=======
# Dynamic imports

Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict.

First, we can't dynamically generate any parameters of `import`.

The module path must be a primitive string, can't be a function call. This won't work:

```js
import ... from *!*getModuleName()*/!*; // Error, only from "string" is allowed
```

Second, we can't import conditionally or at run-time:

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
```

That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## The import() expression

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following module `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Or, if `say.js` has the default export:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

...Then, in order to access it, we can use `default` property of the module object:

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

Here's the full example:

[codetabs src="say" current="index.html"]

```smart
Dynamic imports work in regular scripts, they don't require `script type="module"`.
```

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

So we can't copy `import` to a variable or use `call/apply` with it. That's not a function.
```
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
