# 动态导入

我们在前面章节中介绍的导出和导入语句称为“静态”导入。语法非常简单且严格。

首先，我们不能动态生成 `import` 的任何参数。

模块路径必须是原始类型字符串，不能是函数调用，下面这样的 `import` 行不通：

```js
import ... from *!*getModuleName()*/!*; // Error, only from "string" is allowed
```

其次，我们无法根据条件或者在运行时导入：

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
```

这是因为 `import`/`export` 旨在提供代码结构的主干。这是非常好的事儿，因为这样便于分析代码结构，可以收集模块，可以使用特殊工具将收集的模块打包到一个文件中，可以删除未使用的导出（"tree-shaken"）。这些只有在 `import`/`export` 结构简单且固定的情况下才能够实现。

但是，我们如何才能动态地按需导入模块呢？

## import() 表达式

`import(module)` 表达式加载模块并返回一个 promise，该 promise resolve 为一个包含其所有导出的模块对象。我们可以在代码中的任意位置调用这个表达式。

我们可以在代码中的任意位置动态地使用它。例如：

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

或者，如果在异步函数中，我们可以使用 `let module = await import(modulePath)`。

例如，如果我们有以下模块 `say.js`：

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

……那么，可以想像下面这样进行动态导入：

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

或者，如果 `say.js` 有默认的导出：

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

……那么，为了访问它，我们可以使用模块对象的 `default` 属性：

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

这是一个完整的示例：

[codetabs src="say" current="index.html"]

```smart
动态导入在常规脚本中工作时，它们不需要 `script type="module"`.
```

```smart
尽管 `import()` 看起来像一个函数调用，但它只是一种特殊语法，只是恰好使用了括号（类似于 `super()`）。

因此，我们不能将 `import` 复制到一个变量中，或者对其使用 `call/apply`。因为它不是一个函数。
```
