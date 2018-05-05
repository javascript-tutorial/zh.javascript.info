

# 全局对象

JavaScript 初创时，存在一种借助「全局对象」提供全局变量和函数的思想。它的初衷是多个浏览器中的代码可以通过一个全局对象共享变量。

从那之后，JavaScript 有了极大的发展，那种通过全局变量来连通代码的想法不再受欢迎。在现代 JavaScript 中，模块化概念成为主流。

但是全局对象仍然在规范中保留着。

浏览器中它被命名为「window」，对 Node.JS 而言是「global」，其它环境可能用的别的名字。

它做了两件事情：

1. 提供对由规范和环境定义的内置函数和值的访问。
    比如，我们可以直接调用 `alert` 或者以 `window` 的方法的形式调用：

    ```js run
    alert("Hello");

    // 等同于
    window.alert("Hello");
    ```

    同样的，也适用于其它内置的东西，比如，我们可以使用 `window.Array` 而不是 `Array`。

2. 提供对全局声明和 `var` 变量的访问。我们可以使用全局对象的属性来读、写它们，比如：

    <!-- no-strict to move variables out of eval -->
    ```js untrusted run no-strict refresh
    var phrase = "Hello";

    function sayHi() {
      alert(phrase);
    }

    // 可以从 window 读取
    alert( window.phrase ); // Hello（全局变量）
    alert( window.sayHi ); // function（全局函数声明）

    // 可以写入 window（会生成新的全局变量）
    window.test = 5;

    alert(test); // 5
    ```

...但是全局对象里不会有 `let/const` 声明的变量！

```js untrusted run no-strict refresh
*!*let*/!* user = "John";
alert(user); // John

alert(window.user); // undefined，不会有 let 声明的
alert("user" in window); // false
```

```smart header="全局对象不是全局环境记录"
在 ES-2015 之前的 ECMAScript 版本中，还没有 `let/const` 变量，只有 `var`。而且全局对象被用作全局环境记录（文字有些不同，但是本质是一样的）。

但是从 ES-2015 开始，这些实体被分开了。全局的词法环境有了自己的环境记录。而且有了能够提供**一些**全局变量的全局对象。

在实际中的区别是，全局 `let/const` 变量是全局环境记录的属性，但是它们不在全局对象里。

很自然地，那是因为全局对象作为访问「所有全局内容」的途径，这种思想来自于早期。如今，它已经不被看好。诸如 `let/const` 的现代语言特性无法与它为友，但是旧代码仍然是兼容的。
```

## 使用「window」

在如 Node.JS 的服务器环境，`global` 对象很少被使用。或者可以说几乎「从来没有」。

但在浏览器环境， `window` 有时会被使用。

通常，使用全局对象并不是一个好主意，但是有时你会遇到一些下面的例子：

1. 为了访问与函数局部变量同名的全局变量。

    ```js untrusted run no-strict refresh
    var user = "Global";

    function sayHi() {
      var user = "Local";

    *!*
      alert(window.user); // Global
    */!*
    }

    sayHi();
    ```
    
    这是一个变通用法。最好不要这样写代码，而是使用不同名称的变量。而且注意 `user` 前的 `var`，这种方式对 `let` 不适用。

2. 为了检测某个特定全局变量或内置函数是否存在。
    
    比如，我们想要检测全局函数 `XMLHttpRequest` 是否存在。

    我们不能用 `if (XMLHttpRequest)`，因为如果 `XMLHttpRequest` 不存在，会出错（变量没有定义）。

    但我们可以从 `window.XMLHttpRequest` 里读取：

    ```js run
    if (window.XMLHttpRequest) {
      alert('XMLHttpRequest exists!')
    }
    ```

    如果没有全局函数，那么 `window.XMLHttpRequest` 只不过是不存在的对象属性，会得到 `undefined`，而不是错误，所以这种写法会生效。

    我们也可以不用 `window` 来检测：

    ```js
    if (typeof XMLHttpRequest == 'function') {
      /* 是否有函数 XMLHttpRequest？ */
    }
    ```

    这里没有使用 `window`，但是（理论上）它不够可靠，因为 `typeof` 可能会使用局部的 `XMLHttpRequest`，而我们想要的是全局的那个。

3. 为了从正确的窗口中获取变量，这可能是最合理的使用场景了。

    浏览器可能会打开多个窗口或页签。一个窗口还可能嵌入了另一个 `<iframe>`。每一个浏览器窗口都有自己的 `window` 对象和全局变量。JavaScript 允许来自相同站点（相同的协议、域名、端口）的窗口互相访问彼此的变量。
    
    这种用法已经有些超出我们这里的范围，但它大体是这样的：
    
    ```html run
    <iframe src="/" id="iframe"></iframe>

    <script>
      alert( innerWidth ); // 获取当前窗口的 innerWith 属性（仅在浏览器中）
      alert( Array ); // 获取当前窗口的 Array（javascript 核心内置函数）

      // 当 iframe 加载后 ...
      iframe.onload = function() {
        // 获取 iframe 窗口的 innerWidth 属性
      *!*
        alert( iframe.contentWindow.innerWidth );
      */!*
        // 获取 iframe 窗口的内置 Array
      *!*
        alert( iframe.contentWindow.Array );
      */!*
      };
    </script>
    ```

    这里，前两个 `alert` 使用当前窗口，后两个使用 `iframe` 窗口的变量。如果 `iframe` 来自相同协议、主机、端口，那么就可以访问到任何变量。

## 「this」和全局对象

有时候，`this` 的值恰好是全局对象。这很少用，但有些脚本是依赖它的。

1. 在浏览器中，全局范围的 `this` 就是 `window`：

    ```js run
    // outside of functions
    alert( this === window ); // true
    ```

    在这种场景下，其它非浏览器环境，可能使用其它的值来赋给 `this`。

2. 当一个有 `this` 的函数在非严格模式下被调用时，全局对象会作为 `this`：

    ```js run no-strict
    // 不在严格模式下 (!)
    function f() {
      alert(this); // [object Window]
    }

    f(); // 没有通过对象来调用
    ```

    根据规范，这种场景下的 `this` 必须是全局对象，即使是在非浏览器环境，比如 Node.JS。这样是为了兼容旧的代码，在严格模式下，`this` 会是 `undefiend`。
