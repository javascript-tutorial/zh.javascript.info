# 外部脚本

如果我们有很多JavaScript代码，我们可以将他们放在一个单独的文件里。

脚本将这样被添加到HTML中：

```html
<script src="/path/to/script.js"></script>
```

 `/path/to/script.js` 是一个脚本文件所在的绝对路径（从网站根目录）

也可以提供一个对于当前页面的相对路径。例如： `src="script.js"` 意味着在当前文件夹的一个文件，名为 `"script.js"` 。

我们也可以提供一个完整的URL，例如：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

添加多个脚本，要使用多个标签：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
作为规定，只有最简单的脚本才被直接写在HTML中。稍复杂的都要写在一个单独的文件中。

分离文件的好处是浏览器将会下载它并将其写入[缓存](https://en.wikipedia.org/wiki/Web_cache)。

在这之后，也需要用到这个脚本的其他页面将直接从缓存中读取而不用重新下载。所以实际上这个文件只需要被下载一次。

这样可以节省流量并提高页面加载速度。
```

````warn header="如果 `src` 这个属性已被设置，脚本的内容将被忽略。"
一个单独的 `<script>` 标签内不能同时包含 `src` 和代码。

一个错误的写法：

```html
<script *!*src*/!*="file.js">
  alert(1); // 代码内容将被忽视，因为 `src` 属性被设置。
</script>
```

我们必须二选一： 在外部 `<script src="…">` 或者用 `<script>` 包含脚本内容。

上面的实例可以分为两个脚本来工作：

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## 异步脚本：延迟 / 异步

浏览器逐渐加载并显示HTML，当网速慢的时候可以很明显的被观察到。浏览器不会等到页面加载完毕，它显示已经被加载的部分，然后当新内容加载后添加显示。

我们之前说过，当浏览器遇到一个 `<script>` 标签时，必须首先执行它，然后再显示网页的其他部分。

举个例子，在下面的代码中 ------ 直到所有的兔子都被计数，底部的 `<p>` 才会被显示：

```html run height=100
<!DOCTYPE HTML>
<html>
<body>

  <p>Let's count:</p>

*!*
  <script>
    alert( 'The 1st rabbit!' );
    alert( 'The 2nd rabbit!' );
    alert( 'The 3rd rabbit!' );
  </script>
*/!*

  <p>所有兔子都被计数！</p>

</body>
</html>
```

这个行为叫做“同步”。通常来说这样不会产生问题，但有一种特殊的情况。


**如果一个脚本在外部，用户必须等到浏览器下载并执行完它。**

所以，在这段代码中，直到 `big.js` 加载并执行， `<body>` 的内容才得以显示。

```html
<html>
<head>
*!*
  <script src="big.js"></script>
*/!*
</head>
<body>
  这段文字直到浏览器执行完 big.js才显示。
</body>
</html>
```

问题是 ------ 我们真的希望用户等待直到脚本运行结束？

大多数时间，我们不希望。

有时候，一个脚本可能包含着非常重要的脚本，必须在页面其他内容解析（之后执行的脚本）之前加载。但也只是有时。

通常，一个用户在脚本加载时应该可以看到页面。尤其是包含重要内容的网站（例如教程）----- 即使一些接口还没被激活（脚本还没加载），用户也能阅读文字和导航。

在一些情况下，这些阻塞甚至是很危险的。例如，当我们想轮播中加一段脚本，或集成第三方代码。
比如这样：

```html run height=100
等等，下面的文本只有在脚本执行后才会展示出来。

<!-- this banner script takes time to load -->
<script src="/article/external-script/banner.js?speed=0"></script>

<p>......重要信息</p>
```

页面的其余部分在加载轮播之前没有显示是错误的。如果他们的服务器过载，响应很慢怎么办？我们的用户将要等待更久，甚至离开去了其他更快的网站。

所以，怎么解决这个阻塞的问题？

我们第一步尝试是将这些脚本放在 `<body>` 的底部，在所有内容之后。

但是这种解决方法并不完美：

1. 脚本只能在 HTML 加载完才能开始运行。如果 HTML 很大，这个延迟将会很明显。我们希望浏览器能尽早来加载脚本，还不会阻塞页面渲染。
2. 如果在页面的底部有很多脚本，他们排起队来执行。浏览器一次只能执行一段 `<script>` 代码块。注意它尝试并行地下载脚本（为了更好地利用网络），但执行顺序还是一个接着一个。所以如果第一段脚本执行太慢，它会阻塞其他的，这不是总受欢迎的：一些脚本，例如广告和web分析统计脚本应该独立并且在加载时立即运行，不相互阻塞。

这里我们讨论下 `async` 和 `defer`属性。

 `async` 属性。
: 表示脚本是异步执行的，换句话说，当浏览器遇到 `<script async src="...">`, 并不会停止渲染页面。它会开始加载脚本并继续，当脚本加载时，异步运行。
 `defer` 属性。
: 有 `defer` 属性的脚本也会异步执行，就像 `async` 属性一样，但有两个关键的区别：

1. 浏览器保证“延后”脚本的相对执行顺序。
2. “延后”脚本总是在HTML文本完全加载之后执行。


我们修改我们之前看过的“阻塞脚本”，加一个 `async`

```html run height=100
等等，下面的文本只有在脚本执行后才会展示出来。

<!-- This banner script take some time to load... But nobody cares. -->
<script *!*async*/!* src="/article/external-script/banner.js?speed=0"></script>

<p>......重要信息！</p>
```

现在如果我们执行它，我们将看到整个文档立即显示，并且当它加载的同时，外部脚本也在执行。

让我们看看更多关于 `defer` 和 `async` 的例子来更全面地了解他们的相似之处和不同。

这两个属性都允许浏览器不用等待脚本加载就显示页面。但......

1. 延后的脚本保持这相对的位置，然而异步脚本没有。

    举个例子，在下面这段代码中（使用了 `async`）有两段脚本。先加载的将首先运行。

    ```html
    <script src="1.js" async></script>
    <script src="2.js" async></script>
    ```

    如果 `2.js` 比 `1.js` 大，就很有可能`2.js` 在 `1.js` 之前运行。这很正常，异步脚本是完全独立的。 

    在下面这段使用了 `defer` 的代码中，强制了浏览器保持执行顺序。即使 `2.js` 现加载完毕，它也会在 `1.js` 之后执行。

    ```html
    <script src="1.js" defer></script>
    <script src="2.js" defer></script>
    ```

    “延后”脚本的这个特性在 `2.js` 依赖 `1.js` 的结果时很重要，我们必须确定这个顺序是确定的。

2. 一个用了 `defer` 的脚本总是等 HTML 完全加载后才能执行，`async` 脚本会在加载时立即执行。

   举个例子，当文档很大的时候，例如：

    ```html
    <script src="async.js" async></script>
    <script src="defer.js" defer></script>

    A long long text. Many words.
    ...
    ```

    ...这里的 `async.js` 在加载时执行 ------ 肯能实在文本完全加载之前。 比较来说， `defer.js` 总是在等文档全部加载。

    所以，如果一个脚本不需要文档的剩余部分（比如web计数器）， `async` 是更好的选择。另一种情况脚本可能需要整个文档才能工作，这样 `defer` 就更好。


```smart header="`async` 或者 `defer`"
我们不能在一段脚本中同时使用 `defer` 和 `async` 。 如果这样的话, `async` 优先，`defer` 被忽略。
```

```warn header="`async/defer` 属性只适用于外部脚本。"
 `async/defer` 属性只有在带有 `src` 的脚本上才有效。

On a script without `src` like <code>&lt;script&gt;...&lt;/script&gt;</code>, they will be ignored.
在没有 `src` 的脚本上设置 `async/defer` 属性无效，例如 <code>&lt;script&gt;...&lt;/script&gt;</code>。
```


## 总结

- 外部脚本可以通过 `<script src="path"></script>`插入页面。
- 浏览器直到脚本执行完才能显示脚本以后的内容，除非脚本设置了 `async` 或 `defer` 属性。
-`async` 和 `defer` 属性允许浏览器开始加载脚同时继续渲染页面。他们支队外部脚本有效。
- 不同点是 `defer` 保持了脚本的相对顺序，并总是在在文档完全加载之后，相反，`async` 脚本加载时就执行，没有任何条件。

在插入一条 `<script src="…">`  这样的外部标签之前，我们总是应该考虑阻塞页面渲染的副作用。尤其是第三方脚本。如果我们希望避免它们， `defer/async` 可以派上用场。

````smart header="Running ahead..."
对于有经验的读者，你已经知道了如何使用 DOM 在页面中添加新标签：实现了 `async`的动态 `<script>` 标签。换句话说，它们在加载时独立运行。

但我们可以调整它。如果我们设置了 `script.async = false`，这些脚本会在插入加载中运行，这是保持动态添加标签的相对顺序的一种方法。

举个例子：
```js
function addScript(src){
  let script = document.createElement('script');
  script.src = src;
*!*
  script.async = false;
*/!*
  document.head.appendChild(script);
}

addScript('1.js'); // 这些脚本将被立即加载
addScript('2.js'); // 但会依照插入顺序依次执行
addScript('3.js'); // 顺序是: 1 -> 2 -> 3
```

稍后我们将详细介绍动态标记和页面操作，在本教程的第二部分。
````
