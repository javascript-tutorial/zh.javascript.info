实际上解决方案非常简单。

就像这样：

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan'),
  fetch('https://api.github.com/users/remy'),
  fetch('http://no-such-url')
)
```

这里我们有一个指向 `Promise.all` 的 `fetch(...)` promise 数组。

我们不能改变 `Promise.all` 的工作方式：如果它检测到 error，就会 reject 它。因此我们需要避免任何 error 发生。相反，如果 `fetch` 发生 error，我们需要将其视为“正常”结果。

就像这样：

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan').catch(err => err),
  fetch('https://api.github.com/users/remy').catch(err => err),
  fetch('http://no-such-url').catch(err => err)
)
```

换句话说，`.catch` 会对所有的 promise 产生 error，然后正常返回。根据 promise 的工作原理，只要 `.then/catch` 处理器返回值（无论是 error 对象或其他内容），执行流程就会“正常”进行。

因此 `.catch` 会将 error 作为“正常”结果返回给外部的 `Promise.all`。

代码如下：
```js
Promise.all(
  urls.map(url => fetch(url))
)
```

可重写为：

```js
Promise.all(
  urls.map(url => fetch(url).catch(err => err))
)
```
