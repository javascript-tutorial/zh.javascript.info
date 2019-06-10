# 导出和导入

导出和导入语句非常有用。

在前面的章节里我们已经初试牛刀，那么现在让我们探索更多的应用吧。

## 声明前导出

我们可以通过在声明之前放置 `export` 来标记任何声明为导出，无论声明的是变量，函数还是类都可以。

例如，这里的所有导出都是正确的：

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

````smart header="导出类/函数后没有分号"
注意，在类或者函数前的 `export` 不会让它们变成 [函数表达式](info:function-expressions-arrows)。尽管被导出了，但它仍然是一个函数声明。

大部分 JavaScript 样式指南都推荐在语句之后使用分号，但是不要在函数和类的声明后使用分号。

这就是为什么在 `export class` 和 `export function` 后不使用分号。

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // no ; at the end */!*
```

````

## 其他导出声明方式

我们可以单独使用 `export` 导出。

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

...从技术上讲，我们也可以把 `export` 放在函数上面。

## 导入所有（`import *`）

通常，我们把要导入的东西列在 `import {...}` 中，就像这样：

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

但是如果这个列表很长呢？我们可以使用 `import * as <obj>` 导入所有内容，例如：

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

乍一看，“通通导入”看起来很酷，语法也很短，但是我们通常为什么要明确列出我们需要导入的内容？

这里有几个原因：

1. 现在的构建工具（[webpack](http://webpack.github.io) 或者其他的）把模块打包到一起，然后对其进行优化以获得更快的加载速度，并且还会删除无用的代码。

    比如说，我们在项目里添加第三方库 `lib.js` 中的几个函数：
    ```js
    // 📁 lib.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    现在，如果我们只在项目里使用 `lib.js` 中的一个函数：
    ```js
    // 📁 main.js
    import {sayHi} from './lib.js';
    ```
    ...然后，打包工具会自动检测优化它，并且在打包文件中完全删除其他无用的函数以使得打包后的文件更小，这就是所谓的“tree-shaking”技术。

2. 明确列出要导入的内容会使得名称较短：`sayHi()` 取代 `lib.sayHi()`。
3. 显示导入可以更好的概述代码结构：在哪里使用了什么。它使得代码阅读和重构更容易。

## 导入为（import as）

我们也可以使用 `as` 让导入具有不同的名字。

例如，为了简洁起见，我们将 `sayHi` 导入到局部变量 `hi`，同样将 `sayBye` 导入到 `bye`：

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## 导出为（export as）

导出也具有以上相同的语法。

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

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```

## 默认导出（export default）

到目前为止，我们已经看到了如何导入/导出（import/export）多个内容，也可以用“as”语法导入/导出为其他名称。

在开发中，模块包含：
- 一个库，一组函数，就像 `lib.js` 这样。
- 或者在 `user.js` 中描述了一个实体，比如 `class User` 这样，整个模块只有这个类。

大部分情况下，开发者倾向于使用第二种方式，因此每个“thing”都存在于自己的模块中。

当然，如果每个文件都需要自己的模块，这就使得文件很多，但是这不算什么大问题。实际上，如果文件命名以及文件夹结构得当，代码导航会变得更容易。

模块提供特殊的默认导出 `export default` 语法，以使得“一个模块只做一件事”看起来更好。

默认导出要求下列的 `export` 和 `import` 语句：

1. `export default` 放在模块“主导出（main export）”之前。
2. `import` 导入时不使用花括号

例如，`user.js` 导出 `class User`：

```js
// 📁 user.js
export *!*default*/!* class User { // 只要添加“default”即可
  constructor(name) {
    this.name = name;
  }
}
```

...在 `main.js` 中添加导入：

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // 不需要花括号 {User}, 仅仅是 User 就可以了

new User('John');
```

不用花括号的导入看起来很酷。开始使用模块时常见的错误就是忘记花括号。所以请记住，命名导入需要使用花括号，而默认导入不需要。

| 命名导出 | 默认导出 |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

当然，每个文件只有一个“默认”导出。

我们可能在单个模块中同时使用默认导出和命名导出，但是在日常开发中，开发者一般不会这样做。模块要么是命名导出要么是默认导出。

**另外需要注意的是命名导出必须（理应）具有名称，而 `export default` 可能是匿名的（没有名称）**

例如，下面这些都是完全有效的默认导出：

```js
export default class { // 没有类名
  constructor() { ... }
}

export default function(user) { // 没有函数名
  alert(`Hello, ${user}!`);
}

// 导出一个值而不使用变量
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

这些都是可行的，因为每个文件只有一个 `export default`。相反，省略命名导入的名称将会出错：

```js
export class { // Error!（非命名导出需要名称）
  constructor() {}
}
```     

### “Default” 别名

“default”关键词用于默认导出的别名，常用于我们需要引用单独导出和其他脚本的情况。

例如，如果我们已经声明了一个函数，然后导出它 `export default`（和定义分开）：

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

export {sayHi as default}; // 和我们在函数前添加“export default”一样
```

又如，假设模块 `user.js` 导出一个默认导出“default”和几个命名导出（虽然很少出现，但是会发生）：

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

那么，如何导入默认导出和命名导出：

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

**请注意在 `{...}` 中的导入/导出语句无效**

像这样的导入语句是无效的：
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

但是，如果我们真的需要根据某些条件来导入东西呢？比如在某些合适的时间？就像根据要求加载模块，什么时候才是真正需要？

我们将在下一章探讨这些关于动态导入的内容。
