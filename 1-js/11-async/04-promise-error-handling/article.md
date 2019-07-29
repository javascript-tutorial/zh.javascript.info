
<<<<<<< HEAD
# Promise 错误处理

异步操作有时候可能会失败：如果出现错误，相应的 promise 就会 reject。例如，如果远程服务器无法访问，`fetch` 就会失败。我们可以使用 `.catch` 去处理这些错误（rejections）。

Promise 链在这方面做的很好。当 promise 被 reject，控制权就移交给链中最近的 rejection 处理程序。这在实际应用中很方便。

例如，下面代码中的 URL 是错误的（没有这个网站）此时 `.catch` 可以处理这个错误：
=======
# Error handling with promises

Asynchronous actions may sometimes fail: in case of an error the corresponding promise becomes rejected. For instance, `fetch` fails if the remote server is not available. We can use `.catch` to handle errors (rejections).

Promise chaining is great at that aspect. When a promise rejects, the control jumps to the closest rejection handler down the chain. That's very convenient in practice.

For instance, in the code below the URL is wrong (no such site) and `.catch` handles the error:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
<<<<<<< HEAD
  .catch(err => alert(err)) // TypeError: failed to fetch （文字可能有所不同）
```

或者可能有这样的情况：网站一切正常，但是相应数据不是一个合法的 JSON：

```js run
fetch('/') // 目前 fetch 能正常工作，服务器响应 HTML 页面
*!*
  .then(response => response.json()) // rejects：页面是 HTML，不是合法的 json
=======
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

Or, maybe, everything is all right with the site, but the response is not valid JSON:

```js run
fetch('/') // fetch works fine now, the server responds with the HTML page
*!*
  .then(response => response.json()) // rejects: the page is HTML, not a valid json
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```

<<<<<<< HEAD
捕获所有错误最简单的方法是在链的末端加上 `.catch`：
=======
The easiest way to catch all errors is to append `.catch` to the end of chain:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

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

<<<<<<< HEAD
通常情况下 `.catch` 根本不会触发，因为没有错误发生。但是如果上述任意一个 promise reject（网络错误或者不合法的 json 等等），它就会被捕获。

## 隐式 try..catch

Promise 执行（executor）和 promise 处理（handler）程序周围有一个“不可见 `try..catch`”。如果发生异常，它会被捕获并视为 rejection。

例如，下面的代码：
=======
Normally, `.catch` doesn't trigger at all, because there are no errors. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

## Implicit try..catch

The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an exception happens, it gets caught and treated as a rejection.

For instance, this code:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
……与下面代码完全相同：
=======
...Works exactly the same as this:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*  
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
在执行程序周围 “不可见 `try..catch`” 自动捕获错误并视它为 rejection。

这不仅仅发生在执行程序上，同样也发生在处理程序上。如果我们在 `.then` 处理程序里 `throw`，这意味着被 rejected 的 promise，因此控制权移交最近的错误处理程序。

这里是它的例子：
=======
The "invisible `try..catch`" around the executor automatically catches the error and treats it as a rejection.

This happens not only in the executor, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here's an example:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
<<<<<<< HEAD
  throw new Error("Whoops!"); // rejects 这个 promise
=======
  throw new Error("Whoops!"); // rejects the promise
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
*/!*
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
所有的错误都会发生这种情况，而不仅仅是由 `throw` 语句导致的这些错误。例如，一个编程错误：
=======
This happens for all errors, not just those caused by the `throw` statement. For example, a programming error:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
<<<<<<< HEAD
  blabla(); // 没有这个函数
=======
  blabla(); // no such function
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

<<<<<<< HEAD
最终的 `.catch` 不仅会捕获明确的拒绝，而且会捕获上面上面处理程序中可能会出现的错误。

## 重新抛出（Rethrowing）

正如我们已经注意到的， `.catch` 表现得像 `try..catch`。我们可能有许多的 `.then` 处理程序，然后在最末端使用一个 `.catch` 处理上面的所有错误。

在常规 `try..catch` 中，我们可以分析错误，当我们无法处理的时候可能还会重新抛出（rethrow）它。对于 promise 来说也可以这样做。

如果我们在 `.catch` 内 `throw`，此时控制移交到下一个最近的错误处理程序。如果我们处理错误并正常完成，那么它将继续到最近的成功的 `.then` 处理程序。

在下面例子中 `.catch` 成功处理错误：

```js run
// 执行：catch -> then
=======
The final `.catch` not only catches explicit rejections, but also occasional errors in the handlers above.

## Rethrowing

As we already noticed, `.catch` behaves like `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if can't handle. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:

```js run
// the execution: catch -> then
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

<<<<<<< HEAD
这里 `.catch` 块正常完成。因此就会调用下一个成功的 `.then` 处理程序。

在下面的例子中，我们可以看到 `.catch` 的另一种情况。`(*)` 行的处理程序捕获错误但无法处理它（例如，它只知道如何处理 `URIError` 错误），所以它再次被抛出：

```js run
// 执行：catch -> catch -> then
=======
Here the `.catch` block finishes normally. So the next successful `.then` handler is called.

In the example below we see the other situation with `.catch`. The handler `(*)` catches the error and just can't handle it (e.g. it only knows how to handle `URIError`), so it throws it again:

```js run
// the execution: catch -> catch -> then
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

*!*
<<<<<<< HEAD
    throw error; // 抛出这个或者其他的错误跳转到下一个 catch
=======
    throw error; // throwing this or another error jumps to the next catch
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
*/!*
  }

}).then(function() {
<<<<<<< HEAD
  /* 此处不会运行 */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // 不会返回任何内容 => 正常方式执行
=======
  /* never runs here */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

});
```

<<<<<<< HEAD
然后执行从第一个 `.catch` `(*)` 跳到链中的下一个 `(**)`。

在本章的下面，我们将会看到重新抛出的实例。

## Fetch 错误处理示例

让我们改进用户加载（user-loading）示例的错误处理。

当请求无法发出时，[fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) reject 会返回 promise。例如，远程服务器无法访问，或者 URL 异常。但是如果远程服务器返回响应错误 404，甚至是错误 500，这些都被认为是合法的响应。

如果在 `(*)` 行，服务器返回一个错误 500 的非 JSON（non-JSON）页面该怎么办？如果没有这个用户，GitHub 返回错误 404 的页面又该怎么办呢？
=======
Then the execution jumps from the first `.catch` `(*)` to the next one `(**)` down the chain.

In the section below we'll see a practical example of rethrowing.

## Fetch error handling example

Let's improve error handling for the user-loading example.

The promise returned by [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) rejects when it's impossible to make a request. For instance, a remote server is not available, or the URL is malformed. But if the remote server responds with error 404, or even error 500, then it's considered a valid response.

What if the server returns a non-JSON page with error 500 in the line `(*)`? What if there's no such user, and GitHub returns a page with error 404 at `(**)`?
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```


<<<<<<< HEAD
到目前为止，代码试图以 JSON 格式加载响应数据，但无论如何都会因为语法错误而失败。你可以通过执行上述例子来查看相关信息，因为文件 `no-such-user.json` 不存在。

这有点糟糕，因为错误只是落在链上，并没有相关细节信息：什么失败了，在哪里失败的。

因此我们多添加一步：我们应该检查具有 HTTP 状态的 `response.status` 属性，如果不是 200 就抛出错误。
=======
As of now, the code tries to load the response as JSON no matter what and dies with a syntax error. You can see that by running the example above, as the file `no-such-user.json` doesn't exist.

That's not good, because the error just falls through the chain, without details: what failed and where.

So let's add one more step: we should check the `response.status` property that has HTTP status, and if it's not 200, then throw an error.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

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

<<<<<<< HEAD
1. 我们为 HTTP 错误创建一个自定义类用于区分 HTTP 错误和其他类型错误。此外，新的类有一个构造函数，它接受 `response` 对象，并将其保存到 error 中。因此，错误处理（error-handling）代码就能够获得响应数据了。
2. 然后我们将请求（requesting）和错误处理代码包装进一个函数，它能够 fetch `url` *并* 将所有状态码不是 200 视为错误。这很方便，因为我们通常需要这样的逻辑。
3. 现在 `alert` 显示更多有用的描述信息。

拥有我们自己的错误处理类的好处是我们可以使用 `instanceof` 很容易的在错误处理代码中检查错误。

例如，我们可以创建请求，如果我们得到 404 就可以告知用户修改信息。

下面的代码从 GitHub 加载给定名称的用户。如果没有这个用户，它将告知用户填写正确的名称：
=======
1. We make a custom class for HTTP Errors to distinguish them from other types of errors. Besides, the new class has a constructor that accepts `response` object and saves it in the error. So error-handling code will be able to access the response.
2. Then we put together the requesting and error-handling code into a function that fetches the `url` *and* treats any non-200 status as an error. That's convenient, because we often need such logic.
3. Now `alert` shows a more helpful descriptive message.

The great thing about having our own class for errors is that we can easily check for it in error-handling code using `instanceof`.

For instance, we can make a request, and then if we get 404 -- ask the user to modify the information.

The code below loads a user with the given name from GitHub. If there's no such user, then it asks for the correct name:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

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

<<<<<<< HEAD
请注意：这里的 `.catch` 会捕获所有错误，但是它仅仅“知道如何处理” `HttpError 404`。在那种特殊情况下它意味着没有这样的用户，而 `.catch` 仅仅在这种情况下重试。

对于其他错误，它不知道会出现什么问题。可能是编程错误或者其他错误。所以它仅仅是在 `(*)` 行重新抛出。

## 未处理的 rejections

当错误没有被处理会发生什么？例如，在上面例子中 `(*)` 行重新抛出后会发生什么？

或者我们忘记将错误处理程序添加到链末尾，就像这样：
=======
Please note: `.catch` here catches all errors, but it "knows how to handle" only `HttpError 404`. In that particular case it means that there's no such user, and `.catch` just retries in that case.

For other errors, it has no idea what could go wrong. Maybe a programming error or something. So it just rethrows it in the line `(*)`.

## Unhandled rejections

What happens when an error is not handled? For instance, after the rethrow `(*)` in the example above.

Or we could just forget to append an error handler to the end of the chain, like here:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
<<<<<<< HEAD
    // 成功的 promise 处理程序，一个或多个
  }); // 结尾处没有 .catch！
```

如果出现错误，promise 的状态变为 “rejected”，此时执行程序应该跳转到最近的 rejection 处理程序。但是上面例子中并没有这个处理程序。因此错误会“卡住（stuck）”。没有代码来处理它。

在实践中，就像常规的未处理错误一样，这意味着某些东西出了问题。

当一个常规的错误发生且未被 `try..catch` 捕获时会发生什么呢？脚本死了。类似的事情也发生在未处理的 promise rejections 上。

JavaScript 引擎跟踪此类 rejections，在这种情况下会生成一个全局错误。如果你运行上面代码，你可以在控制台（console）里看到。

在浏览器里，我们可以使用 `unhandledrejection` 时间来捕获这类错误：
=======
    // successful promise handlers, one or more
  }); // without .catch at the end!
```

In case of an error, the promise state becomes "rejected", and the execution should jump to the closest rejection handler. But there is no such handler in the examples above. So the error gets "stuck". There's no code to handle it.

In practice, just like with a regular unhandled errors, it means that something has terribly gone wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies. Similar thing happens with unhandled promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.

In the browser we can catch such errors using the event `unhandledrejection`:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
<<<<<<< HEAD
  alert(event.promise); // [object Promise] - 产生错误的 promise
  alert(event.reason); // Error: Whoops! - 未处理的错误对象
=======
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
<<<<<<< HEAD
}); // 没有 catch 处理错误
```

这个事件是 [HTML 标准](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) 的一部分。

如果发生错误且没有 `.catch` 捕获，`unhandledrejection` 处理程序就会被触发并获取具有相关错误信息的 `event` 对象，此时我们就能做一些处理了。

通常这种错误是不可恢复的，所以我们最好的办法是告知用户有关问题的信息，并可能将事件报告给服务器。

在 Node.js 等非浏览器环境中，还有其他类似的方法来跟踪未处理的错误。


## 总结

- `.catch` 能处理各种 promise rejections：可以是 `reject()` 调用或者处理程序中抛出的错误。
- 我们应该将 `.catch` 准确放到我们想要处理错误的位置，并知道如何处理它们。处理程序应该分析错误（可以自定义错误类帮助分析）并且重新抛出未知错误。
- 如果没有办法从错误中恢复的话，不使用 `.catch` 也没有问题。
- 在任何情况下我们都应该有 `unhandledrejection` 事件处理程序（用于浏览器，以及其他环境的模拟），跟踪未处理的错误并告知用户（可能还有我们的服务器），这样我们的应用程序永远不会“死”。

最后，如果我们有加载指示（load-indication），`.finally` 是一个很好的处理程序，在 fetch 完成时停止它：
=======
}); // no catch to handle the error
```

The event is the part of the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

If an error occurs, and there's no `.catch`, the `unhandledrejection` handler triggers, and gets the `event` object with the information about the error, so we can do something.

Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

In non-browser environments like Node.js there are other similar ways to track unhandled errors.


## Summary

- `.catch` handles promise rejections of all kinds: be it a `reject()` call, or an error thrown in a handler.
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones.
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments), to track unhandled errors and inform the user (and probably our server) about the them, so that our app never "just dies".

And finally, if we have load-indication, then `.finally` is a great handler to stop it when the fetch is complete:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

*!*
<<<<<<< HEAD
  document.body.style.opacity = 0.3; // (1) 开始指示（indication）
=======
  document.body.style.opacity = 0.3; // (1) start the indication
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
*/!*

  return loadJson(`https://api.github.com/users/${name}`)
*!*
<<<<<<< HEAD
    .finally(() => { // (2) 停止指示（indication）
=======
    .finally(() => { // (2) stop the indication
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
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

<<<<<<< HEAD
此处的 `(1)` 行，我们通过调暗文档来指示加载。指示方法没有什么问题，可以使用任何类型的指示来代替。

当 promise 得以解决，fetch 可以是成功或者错误，`finally` 在 `(2)` 行触发并终止加载指示。

有一个浏览器技巧 `(*)` 是从 `finally` 返回零延时（zero-timeout）的 promise。这是因为一些浏览器（比如 Chrome）需要“一点时间”外的 promise 处理程序来绘制文档的更改。因此它确保在进入链下一步之前，指示在视觉上是停止的。
=======
Here on the line `(1)` we indicate loading by dimming the document. The method doesn't matter, could use any type of indication instead.

When the promise is settled, be it a successful fetch or an error, `finally` triggers at the line `(2)` and stops the indication.

There's a little browser trick `(*)` with returning a zero-timeout promise from `finally`. That's because some browsers (like Chrome) need "a bit time" outside promise handlers to paint document changes. So it ensures that the indication is visually stopped before going further on the chain.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
