# 资源价值：onload 和 onerror

浏览器允许跟踪外部资源的加载 —— 脚本、iframes、图像等。

有两个事件

- `onload` —— 成功加载，
- `onerror` —— 发生异常。

## 加载脚本

假设我们需要调用属于外部脚本的函数。

我们可以像这样动态加载：

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...但如何运行声明在脚本中的函数？我们需要等到脚本被加载后才能调用它。

### script.onload

主要得力于 `load` 事件。它在脚本被加载和执行后才被触发。

例如：

```js run untrusted
let script = document.createElement('script');

// 可以从任意地方加载脚本
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // 脚本创建了一个辅助函数 "_"
  alert(_); // 函数可用
};
*/!*
```

因此，在 `onload` 中我们使用脚本变量来运行函数等。

...如果加载失败怎么办？比如，没有这样的脚本（错误 404）或者服务器宕机（不可用）。

### script.onerror

发生在脚本（不是执行）期间的错误可以在 `error` 事件上进行追踪。

比如，我们请求一个不存在的脚本：

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // 没有这样的脚本
document.head.append(script);

*!*
script.onerror = function() {
  alert("Error loading " + this.src); // 加载 https://example.com/404.js 发生错误
};
*/!*
```

请注意，我们无法再这获取错误的更多细节。我们不知道错误是 404 还是 500 或者其他情况，只知道是加载失败了。

## 其他资源

`load` 和 `error` 事件也适用于其他资源。但是也存在细微的差别。

例如：

`<img>`，`<link>`（外部样式表）
: `load` 和 `error` 事件都如期运行。

`<iframe>`
: 当 iframe 加载完成时会发生 `load` 事件。在成功或失败的情况下，都会触发它。这是历史原因。

## 总结

`<img>` 图像、外部样式表、脚本和其他资源都提供了 `load` 和 `error` 事件来追踪它们的加载：

- `load` 在成功加载时被触发。
- `error` 在加载失败时被触发。

只有 `<iframe>` 特殊：出于历史原因，既是页面没有被找到，它也会触发 `load` 来完成任何加载。

`readystatechange` 事件也适用于资源，但很少被使用，因为 `load/error` 事件更简单。
