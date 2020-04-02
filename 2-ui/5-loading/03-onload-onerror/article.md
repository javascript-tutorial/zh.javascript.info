# 资源加载：onload，onerror

浏览器允许我们跟踪外部资源的加载 —— 脚本，iframe，图片等。

这里有两个事件：

- `onload` —— 成功加载，
- `onerror` —— 出现 error。

## 加载脚本

假设我们需要加载第三方脚本，并调用其中的函数。

我们可以像这样动态加载它：

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

……但如何运行在该脚本中声明的函数？我们需要等到该脚本加载完成，之后才能调用它。

```smart
对于我们自己的脚本，可以使用 [JavaScript module](info:modules)，但是它们并未被广泛应用于第三方库。
```

### script.onload

我们的得力助手是 `load` 事件。它会在脚本加载并执行完成时触发。

例如：

```js run untrusted
let script = document.createElement('script');

// 可以从任意域名（domain），加载任意脚本
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // 该脚本创建了一个辅助函数 "_"
  alert(_); // 该函数可用
};
*/!*
```

因此，在 `onload` 中我们可以使用脚本中的变量，运行函数等。

……如果加载失败怎么办？例如，这里没有这样的脚本（error 404）或者服务器宕机（不可用）。

### script.onerror

发生在脚本加载期间的 error 会被 `error` 事件跟踪到。

例如，我们请求一个不存在的脚本：

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // 没有这个脚本
document.head.append(script);

*!*
script.onerror = function() {
  alert("Error loading " + this.src); // Error loading https://example.com/404.js
};
*/!*
```

请注意，在这里我们无法获取更多 HTTP error 的详细信息。我们不知道 error 是 404 还是 500 或者其他情况。只知道是加载失败了。

```warn
`onload`/`onerror` 事件仅跟踪加载本身。

在脚本处理和执行期间可能发生的 error 超出了这些事件跟踪的范围。也就是说：如果脚本成功加载，则即使脚本中有编程 error，也会触发 `onload` 事件。如果要跟踪脚本 error，可以使用 `window.onerror` 全局处理程序。
```

## 其他资源

`load` 和 `error` 事件也适用于其他资源，基本上（basically）适用于具有外部 `src` 的任何资源。

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

但是有一些注意事项：

- 大多数资源在被添加到文档中后，便开始加载。但是 `<img>` 是个例外。它要等到获得 src `(*)` 后才开始加载。
- 对于 `<iframe>` 来说，iframe 加载完成时会触发 `iframe.onload` 事件，无论是成功加载还是出现 error。

这是出于历史原因。

## 跨源策略

这里有一条规则：来自一个站点的脚本无法访问其他站点的内容。例如，位于 `https://facebook.com` 的脚本无法读取位于 `https://gmail.com` 的用户邮箱。

或者，更确切地说，一个源（域/端口/协议三者）无法获取另一个源的内容。因此，即使我们有一个子域名，或者仅仅是另一个端口，这都是不同的源，彼此无法相互访问。

这个规则还影响其他域的资源。

如果我们使用的是来自其他域的脚本，并且该脚本中存在 error，那么我们无法获取 error 的详细信息。

例如，让我们使用一个脚本 `error.js`，该脚本只包含一个（错误）函数调用：
```js
// 📁 error.js
noSuchFunction();
```

现在从它所在的同一个站点加载它：

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

我们可以看到一个很好的 error 报告，就像这样：

```
Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

现在，让我们从另一个域名中加载相同的脚本：

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

此报告与上面那个示例中的不同，就像这样：

```
Script error.
, 0:0
```

error 的详细信息可能因浏览器而异，但是原理是相同的：有关脚本内部的任何信息（包括 error 堆栈跟踪）都被隐藏了。正是因为它来自于另一个域。

为什么我们需要 error 的详细信息？

因为有很多服务（我们也可以构建自己的服务）使用 `window.onerror` 监听全局 error，保存 error 并提供访问和分析 error 的接口。这很好，因为我们可以看到由用户触发的实际中的 error。但是，如果一个脚本来自于另一个源，那么正如我们刚刚看到的那样，其中没有太多有关 error 的信息。

对其他类型的资源也执行类似的跨源策略（CORS）。

**要允许跨源访问，我们需要 `crossorigin` 属性，同样对于服务器也需要提供特殊的响应头。**

这里有三个级别的跨源访问：

1. **无 `crossorigin` 属性*** —— 禁止访问。
2. **`crossorigin="anonymous"`** —— 如果服务器的响应头中提供了 `Access-Control-Allow-Origin` 为 `*` 或者为我们的源，那么就可以访问。浏览器不会将授权信息和 cookies 发送到远程服务器。
3. **`crossorigin="use-credentials"`** —— 如果服务器的响应头提供了 `Access-Control-Allow-Origin` 为我们的源，且提供了 `Access-Control-Allow-Credentials: true`，那么我们就可以访问。浏览器此时会将授权信息和 cookies 发送到远程服务器。

```smart
你可以在 <info:fetch-crossorigin> 中阅读更多关于跨源访问的信息。这里虽然它是以 `fetch` 方法作为网络请求的，但策略都是相同的。

诸如“cookies”这类的内容超出了本章的范围，你可以在 <info:cookie> 章节获取到关于它的更多信息。
```

在我们的的例子中没有任何 crossorigin 属性。因此禁止跨源访问。让我们来加上它吧。

我们可以选择“anonymous”（不会发送 cookies，但是需要一个服务端响应头）或者“use-credentials”（发送 cookes，需要设置两个服务端响应头）。

如果我们不关心“cookies”，那么可以使用`“anonymous”`：

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

现在，假设服务器提供 `Access-Control-Allow-Origin` 头，一切都正常。我们有完整的 error 报告。

## 总结

`<img>` 图片，外部样式表，脚本和其他资源都提供了 `load` 和 `error` 事件来跟踪它们的加载：

- `load` 在成功加载时被触发。
- `error` 在加载失败时被触发。

只有 `<iframe>` 特殊：出于历史原因，不管加载成功还是失败，即使页面没有被找到，它都会触发 `load` 事件。

`readystatechange` 事件也适用于资源，但很少被使用，因为 `load/error` 事件更简单。
