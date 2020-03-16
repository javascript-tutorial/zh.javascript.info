# 导出和导入

导出（export）和导入（import）指令有几种语法变体。

在上一章，我们看到了一个简单的用法，现在让我们来探索更多示例吧。

## 在声明前导出

我们可以通过在声明之前放置 `export` 来标记任意声明为导出，无论声明的是变量，函数还是类都可以。

例如，这里的所有导出均有效：

```js
// 导出数组
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 导出 const 声明的变量
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// 导出类
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="导出 class/function 后没有分号"
注意，在类或者函数前的 `export` 不会让它们变成 [函数表达式](info:function-expressions)。尽管被导出了，但它仍然是一个函数声明。

大部分 JavaScript 样式指南都不建议在函数和类声明后使用分号。

这就是为什么在 `export class` 和 `export function` 的末尾不需要加分号：

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // 在这里没有分号 ; */!*
```

````

## 其他导出方式

另外，我们还可以将 `export` 分开放置。

下面的例子中，我们先声明函数，然后再导出它们：

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // 导出变量列表
*/!*
```

……从技术上讲，我们也可以把 `export` 放在函数上面。

## Import *

通常，我们把要导入的东西列在花括号 `import {...}` 中，就像这样：

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

但是如果有很多要导入的内容，我们可以使用 `import * as <obj>` 将所有内容导入为一个对象，例如：

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

乍一看，“通通导入”看起来很酷，写起来也很短，但是我们通常为什么要明确列出我们需要导入的内容？

这里有几个原因。

1. 现代的构建工具（[webpack](http://webpack.github.io) 和其他工具）将模块打包到一起并对其进行优化，以加快加载速度并删除未使用的代码。

    比如说，我们向我们的项目里添加一个第三方库 `say.js`，它具有许多函数：
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    现在，如果我们只在我们的项目里使用了 `say.js` 中的一个函数：
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    ……那么，优化器（optimizer）就会检测到它，并从打包好的代码中删除那些未被使用的函数，从而使构建更小。这就是所谓的“摇树（tree-shaking）”。

2. 明确列出要导入的内容会使得名称较短：`sayHi()` 而不是 `say.sayHi()`。
3. 导入的显式列表可以更好地概述代码结构：使用的内容和位置。它使得代码支持重构，并且重构起来更容易。

## Import "as"

我们也可以使用 `as` 让导入具有不同的名字。

例如，简洁起见，我们将 `sayHi` 导入到局部变量 `hi`，将 `sayBye` 导入到 `bye`：

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

导出也具有类似的语法。

我们将函数导出为 `hi` 和 `bye`：

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

现在 `hi` 和 `bye` 是在外面使用时的正式名称：

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

在实际中，主要有两种模块。

- 包含库或函数包的模块，像上面的 `say.js`。
- 声明单个实体的模块，例如模块 `user.js` 仅导出 `class User`。

大部分情况下，开发者倾向于使用第二种方式，以便每个“东西”都存在于它自己的模块中。

当然，这需要大量文件，因为每个东西都需要自己的模块，但这根本不是问题。实际上，如果文件具有良好的命名，并且文件夹结构得当，那么代码导航会变得更容易。

模块提供了特殊的默认导出 `export default` 语法，以使“一个模块只做一件事”的方式看起来更好。

将 `export default` 放在要导出的实体前：

```js
// 📁 user.js
export *!*default*/!* class User { // 只需要添加 "default"
  constructor(name) {
    this.name = name;
  }
}
```

每个文件可能只有一个 `export default`：

……然后将其导入而不需要花括号：

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // 不是 {User}，只需要写成 User 即可

new User('John');
```

不用花括号的导入看起来很酷。刚开始使用模块时，一个常见的错误就是忘记写花括号。所以，请记住，`import` 命名的导出时需要花括号，而 `import` 默认的导出时不需要花括号。

| 命名的导出 | 默认的导出 |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

从技术上讲，我们可以在一个模块中同时有默认的导出和命名的导出，但是实际上人们通常不会混合使用它们。模块要么是命名的导出要么是默认的导出。

由于每个文件最多只能有一个默认导出，因此导出的实体可能没有名称。

例如，下面这些都是完全有效的默认的导出：

```js
export default class { // 没有类名
  constructor() { ... }
}
```

```js
export default function(user) { // 没有函数名
  alert(`Hello, ${user}!`);
}
```

```js
// 导出单个值，而不使用变量
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

不指定名称是可行的，因为每个文件只有一个 `export default`，因此不带花括号的 `import` 知道要导入的内容。

如果没有 `default`，这样的导出将会出错：

```js
export class { // Error!（非默认的导出需要名称）
  constructor() {}
}
```

### "default" 名称

在某些情况下，`default` 关键词被用于引用默认导出。

例如，要将函数与其定义分开导出：

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 就像我们在函数之前添加了 "export default" 一样
export {sayHi as default};
```

或者，另一种情况，假设模块 `user.js` 导出了一个主要的“默认”的导出和一些命名的导出（虽然很少出现，但是会发生）：

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

这是导入默认导出以及命名导出的方法：

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

再如，我们想要把 `*` 作为对象导入，那么 `default` 属性就是默认导出：

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default;
new User('John');
```


### 我应该使用默认导出吗？

开发者应该谨慎使用默认导出，因为这将会使代码更难维护。

命名导出是显式的。它们准确命名导入的内容，因此我们能得到更多的信息，这对于代码阅读与维护都是非常有利的。

此外，命名导出会强制我们使用正确的名称来导入：

```js
import {User} from './user.js';
// 使用 {MyUser} 导入将不起作用，导入名字应该为 {User}
```

对于默认导出，我们总是在导入时选择名称：

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// 使用任何名称导入都没有问题
```

对于相同的导入，团队成员可能使用不同的命名，因此，默认导入的命名可能会被滥用，

通常，为了避免这种情况并保持代码的整洁一致，可以遵从这条规则，即导入的变量应该与文件名相对应，例如：

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

另一种解决方案是在任何地方都使用命名导出。即使只导出一个东西，也仍然使用命名导出，而不是默认导出 `default`。

这也使得重新导出（见下一节）更容易。

## Re-export

“Re-export”语法 `export ... from ...` 允许直接导出刚刚导入的内容（可能是其他名字），就像这样：

```js
export {sayHi} from './say.js';
export {default as User} from './user.js';
```

重点是，为什么要这样做？我们看一个开发中的用例：

想象一下，我们正在编写一个“包（package）”：一个包含大量模块的文件夹，主要是内部需要的模块，其中一些功能是导出到外部的（像 NPM 这样的工具允许发布和分发包，但这里我们不细说）。

目录结构可能是这样的：
```
auth/
  index.js  
  user.js
  helpers.js
  tests/
    login.js
  providers/
    github.js
    facebook.js
    ...
```

我们想通过单个入口公开包的功能，主文件 `auth/index.js` 可以这样使用：

```js
import {login, logout} from 'auth/index.js'
```

我们的想法是，使用我们软件包的开发者，不应该干涉其内部结构。他们不应该搜索我们包文件夹中的文件。我们只导出 `auth/index.js` 中需要的内容，并保持其余部分“不可见”。

现在，由于实际导出的功能分散在包中，我们可以在 `auth/index.js` 中收集并“重新导出（re-export）”它：

```js
// 📁 auth/index.js
import {login, logout} from './helpers.js';
export {login, logout};

import User from './user.js';
export {User};

import Github from './providers/github.js';
export {Github};
...
```

“重新导出（re-export）”仅仅是一个短符号：

```js
// 📁 auth/index.js
export {login, logout} from './helpers.js';
// 或者，为了重新导出所有的 helpers 内容，我们可以使用：
// export * from './helpers.js';

export {default as User} from './user.js';

export {default as Github} from './providers/github.js';
...
```

````warn header="重新导出“默认导出”则很棘手"
请注意：`export User from './user.js'` 语句无效。这实际上是一个语法错误。要重新导出默认导出，我们必须明确指出 `{default as ...}`，就像上面例子一样。

另外，还有另外一个奇怪之处是，`export * from './user.js'` 只重新导出命名导出，不导出默认导出。再次重申，我们需要像上面那样明确指出 `{default as ...}`。

例如，重新导出所有内容，需要下面两条语句：
```js
export * from './module.js'; // 重新导出命名导出
export {default} from './module.js'; // 重新导出默认导出
```

只有在重新导出时才应该明确指出默认值：`import * as obj` 正常工作。它将默认导出导入为 `obj.default`。所以这里的导入和导出结构存在一些不对称。
````

## 总结

导出 `export` 类型有以下几种：

- 声明之前：
  - `export [default] class/function/variable ...`
- 单个导出：
  - `export {x [as y], ...}`.
- 重新导出：
  - `export {x [as y], ...} from "mod"`
  - `export * from "mod"`（不会重新导出 default）
  - `export {default [as y]} from "mod"`（重新导出 default）

导入 `import` 类型有以下几种：

- 模块中的命名导出：
  - `import {x [as y], ...} from "mod"`
- 默认导出：
  - `import x from "mod"`
  - `import {default as x} from "mod"`
- 导入全部导出：
  - `import * as obj from "mod"`
- 导入模块（可运行），但是没有将其赋值给变量：
  - `import "mod"`

我们把导入/导出语句放在脚本的顶部或者底部都是没问题的。

下面这样的方式完全可以：
```js
sayHi();

// ...

import {sayHi} from './say.js'; // 在脚本底部导入
```

在开发中，导入通常位于文件开头，但是这只是为了方便。

**请注意在 `{...}` 中的导入/导出语句无效。**

像这样的导入语句是无效的：
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

...但是，如果我们真的需要根据某些条件来导入东西呢？或者在某些合适的时间？就像根据要求加载模块，什么时候才是真正需要？

我们将在下一章探讨这些关于动态导入的内容。
