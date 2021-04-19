# Async/await

Async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用。

## Async function

让我们以 `async` 这个关键字开始。它可以被放置在一个函数前面，如下所示：

```js
async function f() {
  return 1;
}
```

在函数前面的 "async" 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。

例如，下面这个函数返回一个结果为 `1` 的 resolved promise，让我们测试一下：

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

……我们也可以显式地返回一个 promise，结果是一样的：

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

所以说，`async` 确保了函数返回一个 promise，也会将非 promise 的值包装进去。很简单，对吧？但不仅仅这些。还有另外一个叫 `await` 的关键词，它只在 `async` 函数内工作，也非常酷。

## Await

语法如下：

```js
// 只在 async 函数内工作
let value = await promise;
```

关键字 `await` 让 JavaScript 引擎等待直到 promise 完成（settle）并返回结果。

这里的例子就是一个 1 秒后 resolve 的 promise：
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // 等待，直到 promise resolve (*)
*/!*

  alert(result); // "done!"
}

f();
```

这个函数在执行的时候，“暂停”在了 `(*)` 那一行，并在 promise settle 时，拿到 `result` 作为结果继续往下执行。所以上面这段代码在一秒后显示 "done!"。

让我们强调一下：`await` 实际上会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。

相比于 `promise.then`，它只是获取 promise 的结果的一个更优雅的语法，同时也更易于读写。

````warn header="不能在普通函数中使用 `await`"
如果我们尝试在非 async 函数中使用 `await` 的话，就会报语法错误：

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

如果我们忘记在函数前面写 `async` 关键字，我们可能会得到一个这个错误。就像前面说的，`await` 只在 `async` 函数中有效。
````

让我们拿 <info:promise-chaining> 那一章的 `showAvatar()` 例子，并将其改写成 `async/await` 的形式：

1. 我们需要用 `await` 替换掉 `.then` 的调用。
2. 另外，我们需要在函数前面加上 `async` 关键字，以使它们能工作。

```js run
async function showAvatar() {

  // 读取我们的 JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // 读取 github 用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 显示头像
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 等待 3 秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

简洁明了，是吧？比之前可强多了。

````smart header="`await` 不能在顶层代码运行"
刚开始使用 `await` 的人常常会忘记 `await` 不能用在顶层代码中。例如，下面这样就不行：

```js run
// 用在顶层代码中会报语法错误
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

但我们可以将其包裹在一个匿名 async 函数中，如下所示：

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

P.S. 新特性：从 V8 引擎 8.9+ 版本开始，顶层 await 可以在 [模块](info:modules) 中工作。
````

````smart header="`await` 接受 \"thenables\""
像 `promise.then` 那样，`await` 允许我们使用 thenable 对象（那些具有可调用的 `then` 方法的对象）。这里的想法是，第三方对象可能不是一个 promise，但却是 promise 兼容的：如果这些对象支持 `.then`，那么就可以对它们使用 `await`。

这有一个用于演示的 `Thenable` 类，下面的 `await` 接受了该类的实例：

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000ms 后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 等待 1 秒，之后 result 变为 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

如果 `await` 接收了一个非 promise 的但是提供了 `.then` 方法的对象，它就会调用这个 `.then` 方法，并将内建的函数 `resolve` 和 `reject` 作为参数传入（就像它对待一个常规的 `Promise` executor 时一样）。然后 `await` 等待直到这两个函数中的某个被调用（在上面这个例子中发生在 `(*)` 行），然后使用得到的结果继续执行后续任务。
````

````smart header="Class 中的 async 方法"
要声明一个 class 中的 async 方法，只需在对应方法前面加上 `async` 即可：

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1（alert 等同于 result => alert(result)）
```
这里的含义是一样的：它确保了方法的返回值是一个 promise 并且可以在方法中使用 `await`。

````
## Error 处理

如果一个 promise 正常 resolve，`await promise` 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error，就像在这一行有一个 `throw` 语句那样。

这个代码：

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

……和下面是一样的：

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

在真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 `await` 抛出（throw）一个 error 之前会有一个延时。

我们可以用 `try..catch` 来捕获上面提到的那个 error，与常规的 `throw` 使用的是一样的方式：

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

如果有 error 发生，执行控制权马上就会被移交至 `catch` 块。我们也可以用 `try` 包装多行 `await` 代码：

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // 捕获到 fetch 和 response.json 中的错误
    alert(err);
  }
}

f();
```

如果我们没有 `try..catch`，那么由异步函数 `f()` 的调用生成的 promise 将变为 rejected。我们可以在函数调用后面添加 `.catch` 来处理这个 error：

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() 变成了一个 rejected 的 promise
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

如果我们忘了在这添加 `.catch`，那么我们就会得到一个未处理的 promise error（可以在控制台中查看）。我们可以使用在 <info:promise-error-handling> 一章中所讲的全局事件处理程序 `unhandledrejection` 来捕获这类 error。


```smart header="`async/await` 和 `promise.then/catch`"
当我们使用 `async/await` 时，几乎就不会用到 `.then` 了，因为 `await` 为我们处理了等待。并且我们使用常规的 `try..catch` 而不是 `.catch`。这通常（但不总是）更加方便。

但是当我们在代码的顶层时，也就是在所有 `async` 函数之外，我们在语法上就不能使用 `await` 了，所以这时候通常的做法是添加 `.then/catch` 来处理最终的结果（result）或掉出来的（falling-through）error，例如像上面那个例子中的 `(*)` 行那样。
```

````smart header="`async/await` 可以和 `Promise.all` 一起使用"
当我们需要同时等待多个 promise 时，我们可以用 `Promise.all` 把它们包装起来，然后使用 `await`：

```js
// 等待结果数组
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

如果出现 error，也会正常传递，从失败了的 promise 传到 `Promise.all`，然后变成我们能通过使用 `try..catch` 在调用周围捕获到的异常（exception）。

````

## 总结

函数前面的关键字 `async` 有两个作用：

1. 让这个函数总是返回一个 promise。
2. 允许在该函数内使用 `await`。

Promise 前的关键字 `await` 使 JavaScript 引擎等待该 promise settle，然后：

1. 如果有 error，就会抛出异常 — 就像那里调用了 `throw error` 一样。
2. 否则，就返回结果。

这两个关键字一起提供了一个很好的用来编写异步代码的框架，这种代码易于阅读也易于编写。

有了 `async/await` 之后，我们就几乎不需要使用 `promise.then/catch`，但是不要忘了它们是基于 promise 的，因为有些时候（例如在最外层作用域）我们不得不使用这些方法。并且，当我们需要同时等待需要任务时，`Promise.all` 是很好用的。
