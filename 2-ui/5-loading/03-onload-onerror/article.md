# 资源加载：onload 和 onerror

浏览器允许跟踪外部资源的加载 —— 脚本，iframes，图像等。

它有两个事件：

- `onload` —— 成功加载，
- `onerror` —— 发生异常。

## 加载脚本

假设我们需要调用属于第三方脚本的函数。

我们可以像这样动态加载：

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...但如何运行声明在脚本中的函数？我们需要等到脚本被加载后才能调用它。

```smart
对于我们自己的脚本，可以使用 [JavaScript modules](info:modules)，但它们并没有被第三方库采用。
```

### script.onload

主要得力于 `load` 事件。它在脚本被加载和执行后才会触发。

例如：

```js run untrusted
let script = document.createElement('script');

// 可以从任意域名加载任意脚本
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // 脚本创建了一个辅助函数“_”
  alert(_); // 函数可用
};
*/!*
```

因此，在 `onload` 中我们使用脚本中的变量、运行函数等。

...如果加载失败怎么办？比如，没有这样的脚本（错误 404）或者服务器宕机（不可用）。

### script.onerror

发生在脚本加载期间的错误可以在 `error` 事件上进行追踪。

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

请注意，我们无法在这里获取更多 HTTP 错误细节。我们不知道错误是 404 还是 500 或者其他情况，只知道是加载失败了。

```warn
`onload`/`onerror` 事件仅仅跟踪加载本身。
跟踪脚本处理和执行期间的错误超出了这些事件的范围。如果要追踪脚本错误，可以使用 `window.onerror` 全局处理器。
```

## 其他资源

`load` 和 `error` 事件也适用于几乎任何具有外部 `src` 的资源。

例如：

```js run
let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)
img.onload = function() {
  alert(`Image loaded, size ${img.width}x${img.height}`);
};
img.onerror = function() {
  alert("Error occurred while loading image");
};
```

但也有一些注意事项：

- 对于大部分资源来说，当他们被添加到文档时就开始加载。但是 `<img>` 是个例外。它要等到获取 src `(*)` 属性后才开始加载。
- 对于 `<iframe>` 来说，只有当 iframe 加载完成，不论时成功还是失败，`iframe.onload` 事件才会触发，

这是出于历史遗留原因。

## 跨域策略

这里有个规则：来自一个站点的脚本无法访问其他站点的内容。即 `https://facebook.com` 中的脚本不能获取 `https://gmail.com` 中的用户邮箱。

或者，更确切地说，一个源（domain/port/protocol 三者）不能获取另外一个源中的内容。因此，即使我们有一个子域名，或者仅仅是另外一个端口，这都是不同的源，彼此不能互相访问。

这个规则同样适用于其他域中的资源。

如果我们需要使用来自其他域名的脚本，并且脚本里面存在错误，那么我们就不能获取错误信息。

例如，我们调用脚本中一个（错误）函数：

```js
// 📁 error.js
noSuchFunction();
```

现在从我们的域名中加载它：

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

我们可以看到一个很好的错误报告，就像这样：

```
Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

现在，再从其他域名中加载这个脚本：

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

错误报告与上面不同，就像这样：

```
Script error.
, 0:0
```

错误细节可能因浏览器而异，但是原理是相同的：任何有关脚本内部的信息都是不可见的。确切来说是因为它来自于其他域。

我们为什么需要细节信息？

因为有很多服务（我们也可以自己建立）来监听 `window.onerror`，在服务器上保存错误信息，并分析它们，以提供用户相应的错误页面。这很棒，因为我们可以看到由用户触发的真实错误。但是我们不能获得来自其他域名的脚本的任何错误信息。

类似的跨源策略（CORS）也适用于其他类型资源。

**要允许跨域访问，我们需要 `crossorigin` 属性，同样对于服务器也需要提供特殊的响应头。**

这里有三个级别的跨源访问：

1. **无 `crossorigin` 属性*** —— 禁止访问。
2. **`crossorigin="anonymous"`** —— 如果服务器的响应头中提供了 `Access-Control-Allow-Origin` 为 `*` 或者为我们的源，那么就可以访问。浏览器不会将授权信息和 cookies 发送到远程服务器。
3. **`crossorigin="use-credentials"`** —— 如果服务器的响应头提供了 `Access-Control-Allow-Origin` 为我们的源，且提供了 `Access-Control-Allow-Credentials: true`，那么我们就可以访问。浏览器此时会将授权信息和 cookies 发送到远程服务器。

```smart
你可以在 <info:fetch-crossorigin> 中阅读更多关于跨源访问的信息。这里虽然它是以 `fetch` 方法作为网络请求的，但策略都是相同的。

诸如“cookies”这类的内容超出了本章的范围，你可以在 <info:cookie> 章节获取到关于它的更多信息。
```

在我们的的例子中没有任何 crossorigin 属性。因此禁止跨域访问。让我们来加上它吧。

我们可以选择“anonymous”（不会发送 cookies，但是需要服务端响应头）和“use-credentials”（发送 cookes，需要两个服务端响应头）中的任意一个。

如果我们不关心“cookies”，那么可以使用`“anonymous”`：

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

现在，假设服务器提供 `Access-Control-Allow-Origin` 头，一切都正常。我们有完整的错误报告。

## 总结

`<img>` 图像、外部样式表、脚本和其他资源都提供了 `load` 和 `error` 事件来追踪它们的加载：

- `load` 在成功加载时被触发。
- `error` 在加载失败时被触发。

只有 `<iframe>` 特殊：出于历史原因，即使页面没有被找到，它总会触发 `load` 来完成任何加载过程。

`readystatechange` 事件也适用于资源，但很少被使用，因为 `load/error` 事件更简单。
