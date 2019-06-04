# 模块 (Modules) 简介

当我们的应用日益增大时，我们想要将应用分割成多个文件，即我们所说的“模块”。

一个模块通常包含一些有用的函数类或者库。

很长一段时间，JavaScript 都没有语言级(language-level)模块语法。这是因为初始的脚本都很小且简单，所以没必要将其模块化。

但是不管怎样，到最后，脚本文件都会变的越来越复杂，所以 JavaScript 社区发明了许多方法将代码组织为模块——一种特殊的可以按需加载的库。

例如：

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- 最古老的模块化系统，最开始应用在 [require.js](http://requirejs.org/) 这个库中。

- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- 为 Node.js 创建的模块化系统。

- [UMD](https://github.com/umdjs/umd) -- 另外一个模块化系统，建议作为通用的模块化系统，它与 AMD 和 CommonJS 都是兼容的。

现在这些都将成为过去，但是我们仍然能在一些旧的脚本中找到他们的踪迹。语言级的模块化系统在 2015 年的时候出现在标准中，从那时候起开始逐渐发展，现在已经得到了所有主流浏览器和 Node.js 的支持。

## 什么是模块？

模块仅仅是一个文件，一个脚本而已，它就是这么简单。

用一些关键字比如 `export` 和 `import` 来交换模块之间的功能(functionality)或者从一个模块中调用另一个模块中的函数。

- `export` 关键字表示在当前模块之外可以访问的变量和功能。
- `import` 关键字允许从其他模块中导入一些诸如函数之类的功能等等。

例如，我们有一个名为 `sayHi.js` 的文件导出一个函数：

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

然后在其他的文件里导入并使用它：

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

在这个章节里，我们专注于语言本身，但是我们使用浏览器作为演示环境，那么就让我们开始来看看怎么在浏览器中使用模块的。

由于模块使用特殊的关键词和功能，所以我们必须通过使用属性 `<script type="module">` 来告诉浏览器，脚本应该被当作 `模块` 来看待。

像这样：

[codetabs src="say" height="140" current="index.html"]

浏览器自动导入脚本并解析导入的模块，然后执行该脚本。

## 核心模块功能

模块相较于普通的脚本有什么区别呢？

下面有一些核心的功能，对于浏览器和服务端的 JavaScript 来说都是有效的。

### 始终使用 "use strict"

模块始终默认使用使用 `use strict`，例如，对一个未声明的变量赋值将会抛出错误。

```html run
<script type="module">
  a = 5; // error
</script>
```

在这里我们可以在浏览器里看到它，但是对于任何模块来说都是一样的。

### 模块级作用域(Module-level scope)

每个模块都有自己的顶级作用域(top-level scope)。换句话说，一个模块中的顶级作用域变量和函数在其他脚本中是不可见的。

在下面的这个例子中，我们导入了两个脚本，`hello.js` 尝试使用从 `user.js` 中导入的 `user` 变量。

[codetabs src="scopes" height="140" current="index.html"]

模块可以导出 `export` 想要从外部访问的内容，也可以导入 `import` 想要的内容。

所以，我们应该在 `hello.js` 中直接导入 `user.js`，而不是在 `index.html` 中导入。

这是正确导入的方法：

[codetabs src="scopes-working" height="140" current="hello.js"]

在浏览器中，每个 `<script type="module">` 也存在独立的顶级范围的作用域。

```html run
<script type="module">
  // 变量仅可在模块脚本内部可见
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

如果我们真的需要创建一个窗口级别(window-level)的全局变量，我们可以显式地将它分配给 `window` 并以 `window.user` 来访问它。但是这样做需要你有足够充分的理由，否则就不要这样。

### 模块代码仅在第一次导入时解析

如果将一个模块导入到多个其他位置，则仅在第一次导入时解析其代码，然后将导出提供给所有导入的位置。

这具有很重要的后果。我们来看一下下面的例子：

首先，如果执行一个模块中的代码带来一些副作用，比如显示一个消息，然后多次导入它但是只会显示一次，即第一次：

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// 从不同的文件导入相同模块

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (nothing)
```

在日常开发中，顶级模块主要是用于初始化使用的。我们创建数据结构，预填充它们，如果我们想要可重用某些东西，只要导出即可。

下面是一个高级点的例子：

我们假设一个模块导出了一个对象：

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

如果这个模块被导入到多个文件中，模块仅仅在第一次导入的时候解析创建 `admin` 对象。然后将其传入所有导入的位置。

所有导入位置都得到了唯一的 `admin` 对象。

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// 1.js 和 2.js 导入相同的对象
// 1.js 中对对象的修改，在 2.js 中是可访问的
*/!*
```

所以，让我们重申一下：模块只执行一次。生成导出，然后在导入的位置共享同一个导出，当在某个位置修改了 `admin` 对象，在其他模块中是可以看到修改的。

这种行为对于需要配置的模块来说是非常棒的。我们可以在第一次导入时设置所需要的属性，然后在后面的导入中就可以直接使用了。

例如，下面的 `admin.js` 模块可能提供特定的功能，但是希望在外部可访问 `admin` 对象：

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}
```

现在，在 `init.js`——我们 app 的第一个脚本中，设置了 `admin.name`。现在每个位置都能看到它了，包括来自 `admin.js` 本身的调用。

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Ready to serve, *!*Pete*/!*!
```

### import.meta

`import.meta` 对象包含当前模块的一些信息。

它的内容取决于其所在环境，比如说在浏览器环境中，它包含脚本的链接，如果是在 HTML 中的话就是当前页面的链接。

```html run height=0
<script type="module">
  alert(import.meta.url); // 脚本链接 (在行内联本中就是当前页面的链接)
</script>
```

### 顶级 "this" 是 未定义(undefined) 的

这是一个小功能，但为了完整性，我们应该提到它。

在一个模块中，顶级 `this` 是未定义的，而不是像非模块脚本中的全局变量。

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## 特定于浏览器的功能

与常规脚本相比，拥有 `type =“module”` 标识的脚本有几个特定于浏览器的差异。

如果你是第一次阅读或者你不在浏览器中使用 JavaScript，你可能需要暂时略过这些内容。

### 模块脚本是延迟解析的

对于外部和内联模块脚本来说，它 *总是* 延迟解析的，就和 `defer` 属性一样(参见 [script-async-defer](info:script-async-defer))。

也就是说：
  - 外部模块脚本 `<script type="module" src="...">` 不会阻塞 HTML 的解析，它们与其他资源并行加载。
  - 直到 HTML 文档完全解析渲染后（即使模块脚本比 HTML 先加载完成），模块脚本才会开始运行。
  - 执行脚本的相对顺序：在前面的先执行。

它的一个副作用是，模块脚本总是 “看见” 完全加载的 HTML 页面，包括在它们后面的 HTML 元素。

例如：

```html run
<script type="module">
*!*
  alert(typeof button); // object: 脚本可以 '看见' 下面的 button
*/!*
  // 当脚本模块延迟时，脚本在整个页面加载完成之后才执行
</script>

相较于普通脚本：

<script>
*!*
  alert(typeof button); // Error: button is undefined, 脚本不能 “看到” 下面的元素
*/!*
  // 普通脚本在剩余页面加载完成前就执行了
</script>

<button id="button">Button</button>
```

注意：上面的第二个脚本要先于前一个脚本执行，所以我们先会看到 `undefined`，然后才是 `object`。

这是因为模块脚本被延迟执行了，所以要等到页面加载结束才执行。而普通脚本就没有这个限制了，它会马上执行，所以我们先看到它的输出。

当使用模块脚本的时候，我们应该知道当 HTML 页面加载完毕的时候会显示出来，然后 JavaScript 在其后开始执行，所以用户会先于 JavaScript 脚本加载完成是看到页面内容。某些依赖于 JavaScript 的功能可能还不能正常工作。我们应该使用透明层或者 “加载指示”，或者其他方法以确保用户不会感到莫名其妙。

### 内联脚本是异步的

内联脚本和外部脚本都允许使用 `<script async type="module">` 属性，当导入的模块被处理时，异步脚本会立即运行，与其他的脚本或者 HTML 文档无关。

例如，下面的脚本中有 `async` 属性，所以它不会等待其他任何加载完成就已经开始运行。

它导入(fetches `./analytics.js`)脚本，导入完成就开始运行，即使 HTML 文档还未解析完毕或者其他脚本仍在待处理的状态。

这对于不依赖任何其他东西的功能来说是非常棒的，比如计数器，广告和文档级的事件监听器。

```html
<!-- 所有依赖都获取(analytics.js)脚本，然后运行 -->
<!-- 不会等待 HTML 文档或者其他 <script> 标签 -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### 外部脚本

外部脚本相较于其他脚本有两个显著的差异：

1. 具有相同 `src` 属性值的外部脚本仅运行一次：
    ```html
    <!-- my.js 脚本被加载，但它只运行一次 -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. 从其他域名获取的外部脚本需要加上 [CORS](mdn:Web/HTTP/CORS) 头。换句话说，如果一个模块脚本是从其他域名获取的，那么它所在的远端服务器必须提供 `Access-Control-Allow-Origin: *`(可能使用加载的域名代替 `*`) 响应头以指明当前请求是被允许的。
    ```html
    <!-- another-site.com 必须提供 Access-Control-Allow-Origin -->
    <!-- 否则, 脚本不会执行 -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    这可以保证最基本的安全问题。

### 不允许裸模块("bare" modules)

在浏览器中，必须给与 `import` 一个相对或者绝对的 URL。没有给定路径的模块被称作 “裸” 模块。`import` 中不允许使用这些模块。

例如，下面这个 `import` 是不允许的：
```js
import {sayHi} from 'sayHi'; // Error, "裸" 模块
// 模块必须提供路径, 例如 './sayHi.js'
```

在具体环境有所不同，比如 Node.js 或者打包工具中是可以使用裸模块的，因为它们有自己的查找模块和钩子的方法。但是目前浏览器还不支持裸模块。

### 兼容性，"nomodule"

旧时的浏览器不理解 `type="module"` 值。对于位置类型的脚本会被忽略掉。对于它们来说可以使用 `nomodule` 属性来提供后备：

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

如果我们使用打包工具，当脚本被打包进一个单一文件(或者几个文件)，在这些脚本中，`import/export` 语句被特殊的打包函数处理后替代。因此最终打包好的脚本不包含任何 `import/export` 语句，它也不需要 `type="module"` 属性，我们仅像普通脚本一样使用就好了：

```html
<!-- 假设我们从诸如 Webpack 这类的打包工具中获得了 "bundle.js" 脚本 -->
<script src="bundle.js"></script>
```

## 构建工具

在日常开发中，浏览器模块很少以原始形式使用，通常，我们用一些特殊工具，像 [Webpack](https://webpack.js.org/)，将他们打包在一起，然后部署到服务器。

使用打包工具的一个好处是——它们对于如何解析模块给与了足够多的控制，比如允许使用裸模块，以及 CSS/HTML 模块等等。

这里列出了一些构建工具做的事情：

1. 从一个打算放在 HTML 中的 `<script type="module">` 主模块开始。
2. 分析它的依赖：它的导入以及它的导入的导入等。
3. 用打包函数替换掉原生的 `import` 调用，生成一个(或者多个，这是可调的)具有所有模块的文件，这就是打包工具的工作。特殊的模块类型，比如 HTML/CSS 模块也是可以这样做的。
4. 在这个过程中，可能会应用其他的转换或者优化：
    - 删除无法访问的代码
    - 删除未使用的导出("tree-shaking")
    - 删除开发中使用的如 `console` 和 `debugger` 这样的语句
    - 使用 [Babel](https://babeljs.io/) 可以将现代的，前沿的 JavaScript 语法转换为具有类似功能的旧语法
    - 最终生成压缩文件(删除无用空格，变量用短的名字替换等)

也就是说，原生模块也是可以使用的。所以我们在这里不会使用 Webpack，你可以稍后再配置它。

## 总结

下面总结一下模块的核心概念：

1. 模块就是文件。浏览器需要使用 `<script type="module">` 属性以使 `import/export` 可用，这里有几点差别：
    - 默认是延迟解析的
    - 行内脚本是异步的
    - 加载外部不同源(domain/protocol/port)脚本时，必须提供 CORS 响应头
    - 重复的外部脚本会被忽略
2. 模块有自己的本地顶级作用域，可以通过 `import/export` 交换功能
3. 模块始终使用 `use strict`  
4. 模块代码只执行一次。导出的代码创建一次然后会在各导入之间共享

所以，通常来说，当我们使用模块的时候，每个模块实现特定功能并导出它。然后我们需要它的时候直接使用 `import` 导入即可。浏览器会自动加载和解析脚本。

在生产环境中，开发者经常基于性能或者其他原因而使用诸如 [Webpack](https://webpack.js.org) 这类的打包工具。

在下一章里，我们将会看到更多关于模块以及如何导入/导出的例子。