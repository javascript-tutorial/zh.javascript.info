# Async/await

有一种特殊的语法可用一种更舒适的方式使用 promise，称为 "async/await"。它的易于理解和使用简单让人惊讶。

## Async 函数

我们从 `async` 关键字开始。它可以放在函数前，就像这样：

```js
async function f() {
  return 1;
}
```

函数前的 "async" 意味着一件简单的事情：函数总是会返回 promise。如果代码中有 `return <non-promise>`，那么 JavaScript 就会自动将其封装到一个带有该值的 resolved promise 中。

例如，上述代码中返回一个带有结果 `1` 的 resolved promise，我们可以进行测试：

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...我们可以显式的返回一个 promise，结果相同：

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

因此，`async` 确保函数返回一个 promise，并在其中封装非 promise。很简单对吧？但不仅仅如此。因为还有 `await` 关键字，它只在 `async` 函数中工作，而且非常酷。

## Await

语法：

```js
// 只在 async 函数中工作
let value = await promise;
```

`await` 关键字使 JavaScript 等待，直到 promise 得到解决并返回其结果。

下面是一个 promise 在 1s 之后 resolve 的例子：
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // 等待，直到 promise 执行 resolves (*)
*/!*

  alert(result); // “done！”
}

f();
```

函数在 `(*)` 行执行“暂停”，并在 promise 被处理时继续执行，`result` 变成其结果。上述代码在一秒内显示了 "done!"

我们强调：`await` 字面上是让 JavaScript 等待 promise 完成，然后继续处理结果。这并不会消耗 CPU 资源，因为引擎可以同时处理其他任务：执行其他脚本，处理事件等。

这是一种比 `promise.then` 更优雅地获取 promise 结果的语法，它更容易阅读和编写。

````warn header="不能在常规函数中使用 `await`"
如果我们尝试在非 async 函数中使用 `await`，就会产生语法错误：

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // 语法错误
*/!*
}
```

如果我们忘记将 `async` 放在函数前，我们就会得到这样的错误。如前面所说的，`await` 只在 `async 函数` 中工作。
````

我们用 <info:promise-chaining> 章节 `showAvatar()` 示例开始，并使用 `async/await` 重写它：

1. 我们需要用 `await` 替换 `.then` 调用。
2. 此外，我们应该使用 `async` 函数来工作。

```js run
async function showAvatar() {

  // 读取我们的 JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // 读取 GitHub 用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 显示化身
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

非常整洁，而且易于阅读，对吧？比之前好多了。

````smart header="`await` 在顶层代码中无效"
刚开始使用 `await` 的新手往往会忘记这一点，但我们不能在最顶层的代码中编写 `await`，因为它会无效：

```js run
// 在顶层代码中导致语法错误
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

所以我们需要将 await 代码封装在一个async 函数中。就像上述例子一样。
````
````smart header="`await` 接受 thenables"
像 `promise.then`、`await` 允许使用 thenable 对象（那些具有可调用的 `then` 方法）。同样，我们的想法是，第三方对象可能不是 promise，而是与 promise 兼容：如果它支持 `.then`，那么就可以和 `await` 一起使用。

例如，这里的 `await` 接受 `new Thenable(1)`：
```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 在 1000 ms 后将 this.num*2 作为 resolve 值返回
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // 等待 1 秒后，结果变成 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

如果 `await` 获取了带有 `.then` 的非 promise 对象，它就会调用提供 `resolve`、`reject` 作为参数的原生函数。`await` 等待，直到其中一个被调用（在上述示例中，发生在 `(*)` 行），然后继续处理结果。
````

````smart header="Async 方法"
类方法也可以 async，只要把 `async` 放在类方法前即可。

就像这样：

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
  .then(alert); // 1
```
意义相同：它确保返回值是 promise，并使 `await` 可用。

````
## Error 处理

如果一个 promise 正常 reslove，那么 `await promise` 就会返回结果。但在 reject 情况下，它会抛出 error，就像该行上有 `throw` 语句一样。

代码：

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...与此相同：

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

在实际情况中，promise 可能需要一段时间才会变成 reject。因此 `await` 会等待，然后抛出 error。

我们可以使用 `try..catch` 来捕获这个 error，就像常规 `throw` 方法一样：

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // 类型错误：获取失败
*/!*
  }
}

f();
```

出错时，控制权会进入 `catch` 块。我们也可以封装多行：

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

如果我们没有 `try..catch`，那么 async 函数 `f()` 调用所产生的 promise 就会变为 reject 状态。我们可以通过追加 `.catch` 来处理它：

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() 变成一个 rejected 状态的 promise
*!*
f().catch(alert); // 类型错误：未能获取 // (*)
*/!*
```

如果忘记在那里添加 `.catch`，那么我们就会得到一个未处理的 promise 错误（可以在控制台中看到）。我们可以像 <info:promise-chaining> 章节所描述的那样，使用一个全局事件处理器来捕获这样的 error。


```smart header="`async/await` 和 `promise.then/catch`"
我们使用 `async/await` 时，几乎不需要 `.then`，因为 `await` 为我们处理等待。我们也可以使用 `try..catch` 替代 `.catch`。但这通常（并不总是）更方便。

但是在代码的顶层，当我们在 `async` 函数的外部时，我们在语法上是不能使用 `await` 的，所以通常添加 `.then/catch` 去处理最终结果或者 error。

与上述示例的 `(*)` 行一样。
```

````smart header="`async/await` 可以很好的与 `Promise.all` 协同工作"
当我们需要等待多个 promise 时，我们可以将它们封装进 `Promise.all` 然后 `await`：

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

产生 error 的情况下，它会像往常一样传输：从失败的 promise 到 `Promise.all`，然后变成一个我们可以使用 `try..catch` 捕获的异常。

````

## 总结

函数前的 `async` 关键字有两个作用：

1. 总是返回 promise。
2. 允许在其中使用 `await`。

在 promise 之前的 `await` 关键字，使 JavaScript 等待 promise 被处理，然后：

1. 如果有 error，就会产生异常，就像在那个地方调用了 `throw error` 一样。
2. 否则，就会返回值，我们可以给它分配一个值。

它们一起为编写易于读写的异步代码提供了一个很好的框架。

对于 `async/await`，我们很少需要编写 `promise.then/catch`，但我们不应该忘记它们是基于 promise 的。因为有时（例如，在最外面的范围）我们不得不使用这些方法。`Promise.all` 也是一个很好的东西，它能够同时等待很多任务。
