
# 使用 promise 进行错误处理

Promise 链在错误（error）处理中十分强大。当一个 promise 被 reject 时，控制权将移交至最近的 rejection 处理程序（handler）。这在实际开发中非常方便。

例如，下面代码中所 `fetch` 的 URL 是错的（没有这个网站），`.catch` 对这个 error 进行了处理：

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch（这里的文字可能有所不同）
```

正如你所看到的，`.catch` 不必是立即的。它可能在一个或多个 `.then` 之后出现。

或者，可能该网站一切正常，但响应不是有效的 JSON。捕获所有 error 的最简单的方法是，将 `.catch` 附加到链的末尾：

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

通常情况下，这样的 `.catch` 根本不会被触发。但是如果上述任意一个 promise 被 reject（网络问题或者无效的 json 或其他），`.catch` 就会捕获它。

## 隐式 try..catch

Promise 的执行者（executor）和 promise 的处理程序（handler）周围有一个“隐式的 `try..catch`”。如果发生异常，它（译注：指异常）就会被捕获，并被视为 rejection 进行处理。

例如，下面这段代码：

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

……与下面这段代码工作上完全相同：

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

在 executor 周围的“隐式 `try..catch`”自动捕获了 error，并将其变为 rejected promise。

这不仅仅发生在 executor 函数中，同样也发生在其 handler 中。如果我们在 `.then` 处理程序（handler）中 `throw`，这意味着 promise 被 rejected，因此控制权移交至最近的 error 处理程序（handler）。

这是一个例子：

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // reject 这个 promise
*/!*
}).catch(alert); // Error: Whoops!
```

对于所有的 error 都会发生这种情况，而不仅仅是由 `throw` 语句导致的这些 error。例如，一个编程错误：

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // 没有这个函数
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

最后的 `.catch` 不仅会捕获显式的 rejection，还会捕获它上面的处理程序（handler）中意外出现的 error。

## 再次抛出（Rethrowing）

正如我们已经注意到的，链尾端的 `.catch` 的表现有点像 `try..catch`。我们可能有许多个 `.then` 处理程序（handler），然后在尾端使用一个 `.catch` 处理上面的所有 error。

在常规的 `try..catch` 中，我们可以分析错误（error），如果我们无法处理它，可以将其再次抛出。对于 promise 来说，这也是可以的。

如果我们在 `.catch` 中 `throw`，那么控制权就会被移交到下一个最近的 error 处理程序（handler）。如果我们处理该 error 并正常完成，那么它将继续到最近的成功的 `.then` 处理程序（handler）。

在下面这个例子中，`.catch` 成功处理了 error：

```js run
// 执行流：catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

这里 `.catch` 块正常完成。所以下一个成功的 `.then` 处理程序（handler）就会被调用。

在下面的例子中，我们可以看到 `.catch` 的另一种情况。`(*)` 行的处理程序（handler）捕获了 error，但无法处理它（例如，它只知道如何处理 `URIError`），所以它将其再次抛出：

```js run
// 执行流：catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // 处理它
  } else {
    alert("Can't handle such error");

*!*
    throw error; // 再次抛出此 error 或另外一个 error，执行将跳转至下一个 catch
*/!*
  }

}).then(function() {
  /* 不在这里运行 */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // 不会返回任何内容 => 执行正常进行

});
```

执行从第一个 `.catch` `(*)` 沿着链跳转至下一个 `(**)`。

## 未处理的 rejection

当一个 error 没有被处理会发生什么？例如，我们忘了在链的尾端附加 `.catch`，像这样：

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // 这里出现 error（没有这个函数）
})
  .then(() => {
    // 一个或多个成功的 promise 处理程序（handler）
  }); // 尾端没有 .catch！
```

如果出现 error，promise 的状态将变为 "rejected"，然后执行应该跳转至最近的 rejection 处理程序（handler）。但是上面这个例子中并没有这样的处理程序（handler）。因此 error 会“卡住（stuck）”。没有代码来处理它。

在实际开发中，就像代码中常规的未处理的 error 一样，这意味着某些东西出了问题。

当发生一个常规的错误（error）并且未被 `try..catch` 捕获时会发生什么？脚本死了，并在控制台（console）中留下了一个信息。对于在 promise 中未被处理的 rejection，也会发生类似的事儿。

JavaScript 引擎会跟踪此类 rejection，在这种情况下会生成一个全局的 error。如果你运行上面这个代码，你可以在控制台（console）中看到。

在浏览器中，我们可以使用 `unhandledrejection` 事件来捕获这类 error：

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! - 未处理的 error 对象
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // 没有用来处理 error 的 catch
```

这个事件是 [HTML 标准](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) 的一部分。

如果出现了一个 error，并且在这儿没有 `.catch`，那么 `unhandledrejection` 处理程序（handler）就会被触发，并获取具有 error 相关信息的 `event` 对象，所以我们就能做一些后续处理了。

通常此类 error 是无法恢复的，所以我们最好的解决方案是将问题告知用户，并且可以将事件报告给服务器。

在 Node.js 等非浏览器环境中，有其他用于跟踪未处理的 error 的方法。

## 总结

- `.catch` 处理 promise 中的各种 error：在 `reject()` 调用中的，或者在处理程序（handler）中抛出的（thrown）error。
- 如果给定 `.then` 的第二个参数（即 error 处理程序），那么 `.then` 也会以相同的方式捕获 error。
- 我们应该将 `.catch` 准确地放到我们想要处理 error，并知道如何处理这些 error 的地方。处理程序应该分析 error（可以自定义 error 类来帮助分析）并再次抛出未知的 error（可能它们是编程错误）。
- 如果没有办法从 error 中恢复的话，不使用 `.catch` 也可以。
- 在任何情况下我们都应该有 `unhandledrejection` 事件处理程序（用于浏览器，以及其他环境的模拟），以跟踪未处理的 error 并告知用户（可能还有我们的服务器）有关信息，以使我们的应用程序永远不会“死掉”。

## 补充内容

```smart header="说明"
为了更清晰地讲解 promise，本文经过大幅重写，以下内容是重写时被优化掉的内容，译者认为还是很有学习价值的，遂保留下来供大家学习。
```

### Fetch 错误处理示例

让我们改进用户加载（user-loading）示例的错误处理。

当请求无法发出时，[fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) reject 会返回 promise。例如，远程服务器无法访问，或者 URL 异常。但是如果远程服务器返回响应错误 404，甚至是错误 500，这些都被认为是合法的响应。

如果在 `(*)` 行，服务器返回一个错误 500 的非 JSON（non-JSON）页面该怎么办？如果没有这个用户，GitHub 返回错误 404 的页面又该怎么办呢？

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```

到目前为止，代码试图以 JSON 格式加载响应数据，但无论如何都会因为语法错误而失败。你可以通过执行上述例子来查看相关信息，因为文件 `no-such-user.json` 不存在。

这有点糟糕，因为错误只是落在链上，并没有相关细节信息：什么失败了，在哪里失败的。

因此我们多添加一步：我们应该检查具有 HTTP 状态的 `response.status` 属性，如果不是 200 就抛出错误。

```js run
class HttpError extends Error { // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) { // (2)
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. 我们为 HTTP 错误创建一个自定义类用于区分 HTTP 错误和其他类型错误。此外，新的类有一个 constructor，它接受 `response` 对象，并将其保存到 error 中。因此，错误处理（error-handling）代码就能够获得响应数据了。
2. 然后我们将请求（requesting）和错误处理代码包装进一个函数，它能够 fetch `url` **并** 将所有状态码不是 200 视为错误。这很方便，因为我们通常需要这样的逻辑。
3. 现在 `alert` 显示更多有用的描述信息。

拥有我们自己的错误处理类的好处是我们可以使用 `instanceof` 很容易地在错误处理代码中检查错误。

例如，我们可以创建请求，如果我们得到 404 就可以告知用户修改信息。

下面的代码从 GitHub 加载给定名称的用户。如果没有这个用户，它将告知用户填写正确的名称：

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
*!*
      if (err instanceof HttpError && err.response.status == 404) {
*/!*
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err; // (*)
      }
    });
}

demoGithubUser();
```

请注意：这里的 `.catch` 会捕获所有错误，但是它仅仅“知道如何处理” `HttpError 404`。在那种特殊情况下，它意味着没有这样的用户，而 `.catch` 仅仅在这种情况下重试。

对于其他错误，它不知道会出现什么问题。可能是编程错误或者其他错误。所以它仅仅是在 `(*)` 行再次抛出。

### 其他

如果我们有加载指示（load-indication），`.finally` 是一个很好的处理程序（handler），在 fetch 完成时停止它：

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

*!*
  document.body.style.opacity = 0.3; // (1) 开始指示（indication）
*/!*

  return loadJson(`https://api.github.com/users/${name}`)
*!*
    .finally(() => { // (2) 停止指示（indication）
      document.body.style.opacity = '';
      return new Promise(resolve => setTimeout(resolve)); // (*)
    })
*/!*
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

此处的 `(1)` 行，我们通过调暗文档来指示加载。指示方法没有什么问题，可以使用任何类型的指示来代替。

当 promise 得以解决，fetch 可以是成功或者错误，`finally` 在 `(2)` 行触发并终止加载指示。

有一个浏览器技巧，`(*)` 是从 `finally` 返回零延时（zero-timeout）的 promise。这是因为一些浏览器（比如 Chrome）需要“一点时间”外的 promise 处理程序来绘制文档的更改。因此它确保在进入链下一步之前，指示在视觉上是停止的。
