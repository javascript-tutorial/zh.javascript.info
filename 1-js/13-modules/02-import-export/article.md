<<<<<<< HEAD
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
=======
# Export and Import

Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let's explore more examples.

## Export before declarations

We can label any declaration as exported by placing `export` before it, be it a variable, function or a class.

For instance, here all exports are valid:

```js
// export an array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
````smart header="导出 class/function 后没有分号"
注意，在类或者函数前的 `export` 不会让它们变成 [函数表达式](info:function-expressions)。尽管被导出了，但它仍然是一个函数声明。

大部分 JavaScript 样式指南都不建议在函数和类声明后使用分号。

这就是为什么在 `export class` 和 `export function` 的末尾不需要加分号：
=======
````smart header="No semicolons after export class/function"
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions). It's still a function declaration, albeit exported.

Most JavaScript style guides don't recommend semicolons after function and class declarations.

That's why there's no need for a semicolon at the end of `export class` and `export function`:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
<<<<<<< HEAD
} *!* // 在这里没有分号 ; */!*
=======
} *!* // no ; at the end */!*
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```

````

<<<<<<< HEAD
## 导出与声明分开

另外，我们还可以将 `export` 分开放置。

下面的例子中，我们先声明函数，然后再导出它们：
=======
## Export apart from declarations

Also, we can put `export` separately.

Here we first declare, and then export:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
<<<<<<< HEAD
export {sayHi, sayBye}; // 导出变量列表
*/!*
```

……从技术上讲，我们也可以把 `export` 放在函数上面。

## Import *

通常，我们把要导入的东西列在花括号 `import {...}` 中，就像这样：
=======
export {sayHi, sayBye}; // a list of exported variables
*/!*
```

...Or, technically we could put `export` above functions as well.

## Import *

Usually, we put a list of what to import in curly braces `import {...}`, like this:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

<<<<<<< HEAD
但是如果有很多要导入的内容，我们可以使用 `import * as <obj>` 将所有内容导入为一个对象，例如：
=======
But if there's a lot to import, we can import everything as an object using `import * as <obj>`, for instance:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

<<<<<<< HEAD
乍一看，“通通导入”看起来很酷，写起来也很短，但是我们通常为什么要明确列出我们需要导入的内容？

这里有几个原因。

1. 现代的构建工具（[webpack](http://webpack.github.io) 和其他工具）将模块打包到一起并对其进行优化，以加快加载速度并删除未使用的代码。

    比如说，我们向我们的项目里添加一个第三方库 `say.js`，它具有许多函数：
=======
At first sight, "import everything" seems such a cool thing, short to write, why should we ever explicitly list what we need to import?

Well, there are few reasons.

1. Modern build tools ([webpack](http://webpack.github.io) and others) bundle modules together and optimize them to speedup loading and remove unused stuff.

    Let's say, we added a 3rd-party library `say.js` to our project with many functions:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

<<<<<<< HEAD
    现在，如果我们只在我们的项目里使用了 `say.js` 中的一个函数：
=======
    Now if we only use one of `say.js` functions in our project:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
<<<<<<< HEAD
    ……那么，优化器（optimizer）就会检测到它，并从打包好的代码中删除那些未被使用的函数，从而使构建更小。这就是所谓的“摇树（tree-shaking）”。

2. 明确列出要导入的内容会使得名称较短：`sayHi()` 而不是 `say.sayHi()`。
3. 导入的显式列表可以更好地概述代码结构：使用的内容和位置。它使得代码支持重构，并且重构起来更容易。

## Import "as"

我们也可以使用 `as` 让导入具有不同的名字。

例如，简洁起见，我们将 `sayHi` 导入到局部变量 `hi`，将 `sayBye` 导入到 `bye`：
=======
    ...Then the optimizer will see that and remove the other functions from the bundled code, thus making the build smaller. That is called "tree-shaking".

2. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
3. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

## Import "as"

We can also use `as` to import under different names.

For instance, let's import `sayHi` into the local variable `hi` for brevity, and import `sayBye` as `bye`:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

<<<<<<< HEAD
导出也具有类似的语法。

我们将函数导出为 `hi` 和 `bye`：
=======
The similar syntax exists for `export`.

Let's export functions as `hi` and `bye`:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

<<<<<<< HEAD
现在 `hi` 和 `bye` 是在外面使用时的正式名称：
=======
Now `hi` and `bye` are official names for outsiders, to be used in imports:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

<<<<<<< HEAD
在实际中，主要有两种模块。

- 包含库或函数包的模块，像上面的 `say.js`。
- 声明单个实体的模块，例如模块 `user.js` 仅导出 `class User`。

大部分情况下，开发者倾向于使用第二种方式，以便每个“东西”都存在于它自己的模块中。

当然，这需要大量文件，因为每个东西都需要自己的模块，但这根本不是问题。实际上，如果文件具有良好的命名，并且文件夹结构得当，那么代码导航（navigation）会变得更容易。

模块提供了特殊的默认导出 `export default` 语法，以使“一个模块只做一件事”的方式看起来更好。

将 `export default` 放在要导出的实体前：

```js
// 📁 user.js
export *!*default*/!* class User { // 只需要添加 "default" 即可
=======
In practice, there are mainly two kinds of modules.

1. Modules that contain a library, pack of functions, like `say.js` above.
2. Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.

Mostly, the second approach is preferred, so that every "thing" resides in its own module.

Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" way look better.

Put `export default` before the entity to export:

```js
// 📁 user.js
export *!*default*/!* class User { // just add "default"
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
每个文件可能只有一个 `export default`：

……然后将其导入而不需要花括号：

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // 不需要花括号 {User}，只需要写成 User 即可
=======
There may be only one `export default` per file.

...And then import it without curly braces:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // not {User}, just User
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

new User('John');
```

<<<<<<< HEAD
不用花括号的导入看起来很酷。刚开始使用模块时，一个常见的错误就是忘记写花括号。所以，请记住，`import` 命名的导出时需要花括号，而 `import` 默认的导出时不需要花括号。

| 命名的导出 | 默认的导出 |
=======
Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named exports and doesn't need them for the default one.

| Named export | Default export |
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

<<<<<<< HEAD
从技术上讲，我们可以在一个模块中同时有默认的导出和命名的导出，但是实际上人们通常不会混合使用它们。模块要么是命名的导出要么是默认的导出。

由于每个文件最多只能有一个默认的导出，因此导出的实体可能没有名称。

例如，下面这些都是完全有效的默认的导出：

```js
export default class { // 没有类名
=======
Technically, we may have both default and named exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.

For instance, these are all perfectly valid default exports:

```js
export default class { // no class name
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
  constructor() { ... }
}
```

```js
<<<<<<< HEAD
export default function(user) { // 没有函数名
=======
export default function(user) { // no function name
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
  alert(`Hello, ${user}!`);
}
```

```js
<<<<<<< HEAD
// 导出单个值，而不使用变量
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

不指定名称是可以的，因为每个文件只有一个 `export default`，因此不带花括号的 `import` 知道要导入的内容是什么。

如果没有 `default`，这样的导出将会出错：

```js
export class { // Error!（非默认的导出需要名称）
  constructor() {}
}
```

### "default" 名称

在某些情况下，`default` 关键词被用于引用默认的导出。

例如，要将函数与其定义分开导出：
=======
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:

```js
export class { // Error! (non-default export needs a name)
  constructor() {}
}
```     

### The "default" name

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

<<<<<<< HEAD
// 就像我们在函数之前添加了 "export default" 一样
export {sayHi as default};
```

或者，另一种情况，假设模块 `user.js` 导出了一个主要的默认的导出和一些命名的导出（虽然很少出现，但是会发生）：
=======
// same as if we added "export default" before the function
export {sayHi as default};
```

Or, another situation, let's say a module `user.js` exports one main "default" thing, and a few named ones (rarely the case, but it happens):
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
这是导入默认的导出以及命名的导出的方法：
=======
Here's how to import the default export along with a named one:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

<<<<<<< HEAD
如果我们将所有东西 `*` 作为一个对象导入，那么 `default` 属性正是默认的导出：
=======
And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 main.js
import * as user from './user.js';

<<<<<<< HEAD
let User = user.default; // 默认的导出
new User('John');
```

### 我应该使用默认的导出吗？

命名的导出是明确的。它们确切地命名了它们要导出的内容，因此我们能从它们获得这些信息，这是一件好事。

命名的导出会强制我们使用正确的名称进行导入：

```js
import {User} from './user.js';
// 导入 {MyUser} 不起作用，导入名字必须为 {User}
```

……对于默认的导出，我们总是在导入时选择名称：

```js
import User from './user.js'; // 有效
import MyUser from './user.js'; // 也有效
// 使用任何名称导入都没有问题
```

因此，团队成员可能会使用不同的名称来导入相同的内容，这不好。

通常，为了避免这种情况并使代码保持一致，可以遵从这条规则，即导入的变量应与文件名相对应，例如：
=======
let User = user.default; // the default export
new User('John');
```

### A word against default exports

Named exports are explicit. They exactly name what they import, so we have that information from them; that's a good thing.

Named exports force us to use exactly the right name to import:

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

...While for a default export, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
```

So team members may use different names to import the same thing, and that's not good.

Usually, to avoid that and keep the code consistent, there's a rule that imported variables should correspond to file names, e.g:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

<<<<<<< HEAD
但是，一些团队仍然认为这是默认的导出的严重缺陷。因此，他们更倾向于始终使用命名的导出。即使只导出一个东西，也仍然使用命名的导出，而不是默认的导出。

这也使得重新导出（见下文）更容易。

## 重新导出

“重新导入（Re-export）”语法 `export ... from ...` 允许导入内容，并立即将其导出（可能是用的是其他的名字），就像这样：

```js
export {sayHi} from './say.js'; // 重新导出 sayHi

export {default as User} from './user.js'; // 重新导出 default
```

为什么要这样做？我们看一个实际开发中的用例。

想象一下，我们正在编写一个 "package"：一个包含大量模块的文件夹，其中一些功能是导出到外部的（像 NPM 这样的工具允许发布和分发这样的 package），并且其中一些模块仅仅是供其他 package 中的模块内部使用的 "helpers"。

文件结构可能是这样的：
=======
Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it's still exported under a name, without `default`.

That also makes re-export (see below) a little bit easier.

## Re-export

"Re-export" syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

Why would that be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages), and many modules are just "helpers", for internal use in other package modules.

The file structure could be like this:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
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

<<<<<<< HEAD
我们想通过单个入口，即“主文件” `auth/index.js` 来公开 package 的功能，进而可以像下面这样使用我们的 package：
=======
We'd like to expose the package functionality via a single entry point, the "main file" `auth/index.js`, to be used like this:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
import {login, logout} from 'auth/index.js'
```

<<<<<<< HEAD
我们的想法是，使用我们 package 的开发者，不应该干预其内部结构，不应该搜索我们 package 的文件夹中的文件。我们只在 `auth/index.js` 中导出必须的内容，并保持其他内容“不可见”。

由于实际导出的功能分散在 package 中，所以我们可以将它们导入到 `auth/index.js`，然后再从中导出它们：
=======
The idea is that outsiders, developers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 auth/index.js

<<<<<<< HEAD
// 导入 login/logout 然后立即导出它们
import {login, logout} from './helpers.js';
export {login, logout};

// 将默认导出导入为 User，然后导出它
=======
// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
import User from './user.js';
export {User};
...
```

<<<<<<< HEAD
现在使用我们 package 的人可以 `import {login} from "auth/index.js"`。

语法 `export ... from ...` 只是下面这种导入-导出的简写：

```js
// 📁 auth/index.js
// 导入 login/logout 然后立即导出它们
export {login, logout} from './helpers.js';

// 将默认导出导入为 User，然后导出它
=======
Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:

```js
// 📁 auth/index.js
// import login/logout and immediately export them
export {login, logout} from './helpers.js';

// import default as User and export it
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
### 重新导出默认导出

重新导出时，默认导出需要单独处理。

假设我们有 `user.js`，我们想从中重新导出类 `User`：
=======
### Re-exporting the default export

The default export needs separate handling when re-exporting.

Let's say we have `user.js`, and we'd like to re-export class `User` from it:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
// 📁 user.js
export default class User {
  // ...
}
```

<<<<<<< HEAD
1. `export User from './user.js'` 无效。什么出了问题？这实际上是一个语法错误。

    要重新导出默认导出，我们必须明确写出 `export {default as User}`，就像上面的例子中那样。

2. `export * from './user.js'` 重新导出只导出了命名的导出，但是忽略了默认的导出。

    如果我们想将命名的导出和默认的导出都重新导出，那么需要两条语句：
    ```js
    export * from './user.js'; // 重新导出命名的导出
    export {default} from './user.js'; // 重新导出默认的导出
    ```

重新导出默认的导出的这种奇怪现象是某些开发者不喜欢它们的原因之一。

## 总结

这是我们在本章和前面章节中介绍的所有 `export` 类型：

你可以阅读并回忆它们的含义来进行自查：

- 在声明一个 class/function/.. 之前：
  - `export [default] class/function/variable ...`
- 独立的导出：
  - `export {x [as y], ...}`.
- 重新导出：
  - `export {x [as y], ...} from "module"`
  - `export * from "module"`（不会重新导出默认的导出）。
  - `export {default [as y]} from "module"`（重新导出默认的导出）。

导入：

- 模块中命名的导出：
  - `import {x [as y], ...} from "module"`
- 默认的导出：
  - `import x from "module"`
  - `import {default as x} from "module"`
- 所有：
  - `import * as obj from "module"`
- 导入模块（它的代码，并运行），但不要将其赋值给变量：
  - `import "module"`

我们把 `import/export` 语句放在脚本的顶部或底部，都没关系。

因此，从技术上讲，下面这样的代码没有问题：
=======
1. `export User from './user.js'` won't work. What can go wrong?... But that's a syntax error!

    To re-export the default export, we have to write `export {default as User}`, as in the example above.    

2. `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we'd like to re-export both named and the default export, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

Such oddities of re-exporting the default export are one of the reasons why some developers don't like them.

## Summary

Here are all types of `export` that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/..:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn't re-export default).
  - `export {default [as y]} from "module"` (re-export default).

Import:

- Named exports from module:
  - `import {x [as y], ...} from "module"`
- Default export:  
  - `import x from "module"`
  - `import {default as x} from "module"`
- Everything:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign it to a variable:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn't matter.

So, technically this code is fine:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```js
sayHi();

// ...

<<<<<<< HEAD
import {sayHi} from './say.js'; // 在文件底部导入
```

在实际开发中，导入通常位于文件的开头，但是这只是为了更加方便。

**请注意在 `{...}` 中的 import/export 语句无效。**

像这样的有条件的导入是无效的：
=======
import {sayHi} from './say.js'; // import at the end of the file
```

In practice imports are usually at the start of the file, but that's only for more convenience.

**Please note that import/export statements don't work if inside `{...}`.**

A conditional import, like this, won't work:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

<<<<<<< HEAD
……但是，如果我们真的需要根据某些条件来进行导入呢？或者在某些合适的时间？例如，根据请求（request）加载模块，什么时候才是真正需要呢？

我们将在下一章中学习动态导入。
=======
...But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it's really needed?

We'll see dynamic imports in the next article.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
