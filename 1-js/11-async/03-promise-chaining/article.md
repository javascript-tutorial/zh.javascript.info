
<<<<<<< HEAD
# Promises 链

我们回顾一下 <info:callbacks> 章节提及的问题：我们有一系列的异步任务要一个接一个完成。例如，加载脚本。我们如何写出更好的代码呢？

Promises 提供了几种方案来解决这个问题。

本章节中我们来讲解 promise 链。

它看起来就像这样：
=======
# Promises chaining

Let's return to the problem mentioned in the chapter <info:callbacks>: we have a sequence of asynchronous tasks to be done one after another. For instance, loading scripts. How can we code it well?

Promises provide a couple of recipes to do that.

In this chapter we cover promise chaining.

It looks like this:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

<<<<<<< HEAD
它的理念是把 result 传入 `.then` 的处理程序链。

运行流程如下：
1. 初始 promise 1 秒后 resolve `(*)`，
2. 然后 `.then` 方法被调用 `(**)`。
2. 它返回的值被传入下一个 `.then` 的处理程序 `(***)`
4. ……依此类推。

随着 result 在处理程序链中传递，我们会看到 `alert` 依次显示：`1` -> `2` -> `4`。

![](promise-then-chain.svg)

之所以这么运行，是因为 `promise.then` 返回了一个 promise，所以我们可以用它调用下一个 `.then`。

当控制函数返回一个值时，它会变成当前 promise 的 result，所以会用它调用下一个 `.then`。

为了把这些话讲更清楚，我们看一下链的开头：

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result);
  return result * 2; // <-- (1)

}) // <-- (2)
// .then…
```

`.then` 返回的值是一个 promise，这是为什么我们可以在 `(2)` 处添加另一个 `.then`。在 `(1)` 处返回值时，当前 promise 变成 resolved，然后下一个处理程序使用这个返回值运行。

**新手常犯的一个经典错误：从技术上讲我们仍然能添加许多 `.then` 到一个 promise 上。但这并不是 promise 链（chaining）。**

例如：
=======
The idea is that the result is passed through the chain of `.then` handlers.

Here the flow is:
1. The initial promise resolves in 1 second `(*)`,
2. Then the `.then` handler is called `(**)`.
3. The value that it returns is passed to the next `.then` handler `(***)`
4. ...and so on.

As the result is passed along the chain of handlers, we can see a sequence of `alert` calls: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

The whole thing works, because a call to `promise.then` returns a promise, so that we can call the next `.then` on it.

When a handler returns a value, it becomes the result of that promise, so the next `.then` is called with it.

**A classic newbie error: technically we can also add many `.then` to a single promise. This is not chaining.**

For example:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

<<<<<<< HEAD
我们这里所做的仅仅是将几个处理程序（handler）添加到一个 promise 上。它们之间并不会互相传递数据，相反，它们之间彼此独立运行处理程序。

这里有一张图片来解释它（对比上面的链式调用）：

![](promise-then-many.svg)

在同一个 promise 上的所有 `.then` 会得到相同的结果 —— 该 promise 的 result。所以，以上代码中所有 `alert` 会显示相同的内容：`1`。

实际上我们极少遇到一个 promise 需要多处理程序，而是更经常地使用链式调用。

## 返回 promises

正常来说，`.then` 处理程序返回的值会立即传入下一个处理程序。但是有一个例外。

如果返回的值是一个 promise，那么直到它结束之前，下一步执行会一直被暂停。在结束之后，该 promise 的结果会传递给下一个 `.then` 处理程序。

例如：
=======
What we did here is just several handlers to one promise. They don't pass the result to each other, instead they process it independently.

Here's the picture (compare it with the chaining above):

![](promise-then-many.svg)

All `.then` on the same promise get the same result -- the result of that promise. So in the code above all `alert` show the same: `1`.

In practice we rarely need multiple handlers for one promise. Chaining is used much more often.

## Returning promises

A handler, used in `.then(handler)` may create and return a promise.

In that case further handlers wait till it settles, and then get its result.

For instance:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

<<<<<<< HEAD
这里第一个 `.then` 显示 `1` 并在 `(*)` 行返回 `new Promise(…)`，一秒之后它会 resolve 掉，然后 result（`resolve` 的参数，在这里它是 `result*2`）被传递给位于 `(**)` 行的第二个 `.then`。它会显示 `2`，而且执行相同的动作。

所以输出还是 1 -> 2 -> 4，但是现在每次 `alert` 调用之间会有 1 秒钟的延迟。

返回 promises 允许我们建立异步动作链。

## 示例：loadScript

让我们以在 [前述章节](info:promise-basics#loadscript) 定义过的 promise 化的 `loadScript` 来一个个按顺序加载脚本：
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.

So the output is the same as in the previous example: 1 -> 2 -> 4, but now with 1 second delay between `alert` calls.

Returning promises allows us to build chains of asynchronous actions.

## Example: loadScript

Let's use this feature with the promisified `loadScript`, defined in the [previous chapter](info:promise-basics#loadscript), to load scripts one by one, in sequence:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
<<<<<<< HEAD
    // 使用脚本里声明的函数来表明它们的确被加载了

=======
    // use functions declared in scripts
    // to show that they indeed loaded
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
    one();
    two();
    three();
  });
```

<<<<<<< HEAD
我们可以用箭头函数来重写代码，让其变得简短一些：
=======
This code can be made bit shorter with arrow functions:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
<<<<<<< HEAD
    // 脚本被加载，我们可以使用声明过的函数了
=======
    // scripts are loaded, we can use functions declared there
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
    one();
    two();
    three();
  });
```


<<<<<<< HEAD
这里每个 `loadScript` 调用返回一个 promise，并且在它 resolve 时运行下一个 `.then`。 然后它开始加载下一个脚本。所以脚本是依次被加载的。

我们可以在链中添加更多的异步动作。请注意代码仍然“扁平”，它向下增长，而不是向右。没有“死亡金字塔”的迹象。

请注意理论上可以向每个 `loadScript` 直接添加 `.then`，就像这样：
=======
Here each `loadScript` call returns a promise, and the next `.then` runs when it resolves. Then it initiates the loading of the next script. So scripts are loaded one after another.

We can add more asynchronous actions to the chain. Please note that code is still "flat", it grows down, not to the right. There are no signs of "pyramid of doom".

Technically, we could add `.then` directly to each `loadScript`, like this:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
<<<<<<< HEAD
      // 这个函数可以访问 script1、script2 和 script3 变量
=======
      // this function has access to variables script1, script2 and script3
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
      one();
      two();
      three();
    });
  });
});
```

<<<<<<< HEAD
这段代码做了一样的事情：顺序加载 3 个脚本。但是它“向右增长”。所以和使用回调函数一样，我们会碰到相同的问题。

人们刚开始使用 promise 有时候可能并不知道什么是链，所以它们就这样写了。通常，链是优先考虑的。

有时直接写 `.then` 是没问题的，因为嵌套函数可以访问外部作用域。在上面的例子中嵌套最深的那一层回调（callback）可以访问所有变量 `script1`, `script2`, `script3`。但这是一个例外而不算是规则。


````smart header="Thenables"
确切地说，`.then` 可以返回任意的 “thenable” 对象 —— 一个具有 `.then` 方法的任意对象，并且会被当做一个 promise 来对待。

第三方库能实现它们自己的 “可兼容 promise” 对象就是这种理念。他们可以扩展方法集，不过会保证与原生 promise 兼容，因为他们实现了 `.then` 方法。

这里是一个 thenable 对象的示例：
=======
This code does the same: loads 3 scripts in sequence. But it "grows to the right". So we have the same problem as with callbacks.

People who start to use promises sometimes don't know about chaining, so they write it this way. Generally, chaining is preferred.

Sometimes it's ok to write `.then` directly, because the nested function has access to the outer scope. In the example above the most nested callback has access to all variables `script1`, `script2`, `script3`. But that's an exception rather than a rule.


````smart header="Thenables"
To be precise, a handler may return not exactly a promise, but a so-called "thenable" object - an arbitrary object that has method `.then`, and it will be treated the same way as a promise.

The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own. They can have extended set of methods, but also be compatible with native promises, because they implement `.then`.

Here's an example of a thenable object:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
<<<<<<< HEAD
    // 1 秒后用 this.num*2 来 resolve
=======
    // resolve with this.num*2 after the 1 second
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
<<<<<<< HEAD
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000 ms 后显示 2
```

JavaScript 在 `(*)` 行检查 `.then` 处理程序返回的对象：如果它有一个名为 `then` 的可调用方法，那么它会调用该方法并提供原生函数 `resolve`，`reject 作为参数（类似于 executor）并在它被调用前一直等待。上面的例子中 `resolve(2)` 1 秒后被调用 `(**)`。然后 result 会延链向下传递。

这个功能允许整合定制对象和 promise 链，不用从 `Promise` 继承。
````


## 更复杂的示例：fetch

在前端编程中，promise 经常被用来网络请求，就让我们再看一个关于这点展开的示例。

我们将使用 [fetch](info:fetch) 方法从远程服务器加载用户信息。我们在其他章节中介绍了许多其他可选参数，但是基本语法很简单：
=======
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // shows 2 after 1000ms
```

JavaScript checks the object returned by `.then` handler in the line `(*)`: if it has a callable method named `then`, then it calls that method providing native functions `resolve`, `reject` as arguments (similar to executor) and waits until one of them is called. In the example above `resolve(2)` is called after 1 second `(**)`. Then the result is passed further down the chain.

This feature allows to integrate custom objects with promise chains without having to inherit from `Promise`.
````


## Bigger example: fetch

In frontend programming promises are often used for network requests. So let's see an extended example of that.

We'll use the [fetch](info:fetch) method to load the information about the user from the remote server. It has a lot of optional parameters covered in [separate chapters](info:fetch), but the basic syntax is quite simple:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js
let promise = fetch(url);
```

<<<<<<< HEAD
它发送网络请求到 `url` 并返回一个 promise。当远程服务器返回响应头（注意不是**全部响应加载完成**）时，该 promise 用一个 `response` 来 resolve 掉。

为了读取全部的响应，我们应该调用方法 `response.text()`：当全部文字内容从远程服务器上下载后，它会返回一个 resolved 状态的 promise，同时该文字会作为 result。

下面代码向 `user.json` 发送请求并从服务器加载文字。

```js run
fetch('/article/promise-chaining/user.json')
  // 当远程服务器开始响应时，下面的 .then 执行
  .then(function(response) {
    // 当结束下载时，response.text() 会返回一个新的 resolved promise，该 promise 拥有全部响应文字

    return response.text();
  })
  .then(function(text) {
    // ...这是远程文件内容
=======
This makes a network request to the `url` and returns a promise. The promise resolves with a `response` object when the remote server responds with headers, but *before the full response is downloaded*.

To read the full response, we should call a method `response.text()`: it returns a promise that resolves  when the full text downloaded from the remote server, with that text as a result.

The code below makes a request to `user.json` and loads its text from the server:

```js run
fetch('/article/promise-chaining/user.json')
  // .then below runs when the remote server responds
  .then(function(response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

<<<<<<< HEAD
其实还有一个方法，`response.json()` 会读取远程数据并把它解析成 JSON。我们的示例中用这个方法要更方便，所以让我们替换成此方法。

为了简洁，我们也使用箭头函数：

```js run
// 同上，但是使用 response.json() 把远程内容解析为 JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan
```

现在我们用加载好的用户信息搞点事情。

例如，我们可以多发一个请求到 GitHub，加载用户信息并显示头像：

```js run
// 发一个 user.json 请求
fetch('/article/promise-chaining/user.json')
  // 作为 json 加载
  .then(response => response.json())
  // 发一个请求到 GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // 响应作为 json 加载
  .then(response => response.json())
  // 显示头像图片（githubUser.avatar_url）3 秒（也可以加上动画效果）
=======
There is also a method `response.json()` that reads the remote data and parses it as JSON. In our case that's even more convenient, so let's switch to it.

We'll also use arrow functions for brevity:

```js run
// same as above, but response.json() parses the remote content as JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name
```

Now let's do something with the loaded user.

For instance, we can make one more request to GitHub, load the user profile and show the avatar:

```js run
// Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

<<<<<<< HEAD
这段代码可以工作，具体细节请看注释。但是，有一个潜在的问题，一个新手使用 promise 的典型问题。

请看 `(*)` 行：我们如何能在头像结束显示并在移除**之后**做点什么？例如，我们想显示一个可以编辑用户，或者别的表单。就目前而言是做不到的。

为了使链可扩展，我们需要在头像结束显示时返回一个 resolved 状态的 promise。

就像这样：
=======
The code works, see comments about the details. Although, there's a potential problem in it, a typical error of those who begin to use promises.

Look at the line `(*)`: how can we do something *after* the avatar has finished showing and gets removed? For instance, we'd like to show a form for editing that user or something else. As of now, there's no way.

To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.

Like this:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
<<<<<<< HEAD
  .then(githubUser => new Promise(function(resolve, reject) {
=======
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
<<<<<<< HEAD
      resolve(githubUser);
=======
      resolve(githubUser); // (**)
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
*/!*
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

<<<<<<< HEAD
现在，在 `setTimeout` 后运行 `img.remove()`，然后调用 `resolve(githubUser)`，这样链中的控制流程走到下一个 `.then` 并传入用户数据。

作为一个规律，一个异步动作应该永远返回一个 promise。

这让它规划下一步动作成为可能。虽然现在我们没打算扩展链，我们可能在日后需要它。

最终，我们可以把代码分割成几个可复用的函数：
=======
That is, `.then` handler in the line `(*)` now returns `new Promise`, that becomes settled only after the call of `resolve(githubUser)` in `setTimeout` `(**)`.

The next `.then` in chain will wait for that.

As a good rule, an asynchronous action should always return a promise.

That makes it possible to plan actions after it. Even if we don't plan to extend the chain now, we may need it later.

Finally, we can split the code into reusable functions:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

<<<<<<< HEAD
// 使用它们
=======
// Use them:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

<<<<<<< HEAD
## 总结

如果 `.then`（或者 `catch/finally` 都可以）处理程序（handler）返回一个 promise，链的其余部分会等到它执行结束。当它完成后，其结果（或者错误）将会进一步传递下去。

这是一个完整的流程图：
=======
## Summary

If a `.then` (or `catch/finally`, doesn't matter) handler returns a promise, the rest of the chain waits until it settles. When it does, its result (or error) is passed further.

Here's a full picture:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

![](promise-handler-variants.svg)
