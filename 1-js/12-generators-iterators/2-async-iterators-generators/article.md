
# 异步迭代和 generator

异步迭代允许我们对按需通过异步请求而得到的数据进行迭代。例如，我们通过网络分段（chunk-by-chunk）下载数据时。异步生成器（generator）使这一步骤更加方便。

首先，让我们来看一个简单的示例以掌握语法，然后再看一个实际用例。

## 回顾可迭代对象

让我们回顾一下可迭代对象的相关内容。

假设我们有一个对象，例如下面的 `range`：
```js
let range = {
  from: 1,
  to: 5
};
```

我们想对它使用 `for..of` 循环，例如 `for(value of range)`，来获取从 `1` 到 `5` 的值。

换句话说，我们想向对象 `range` 添加 **迭代能力**。

这可以通过使用一个名为 `Symbol.iterator` 的特殊方法来实现：

- 当循环开始时，该方法被 `for..of` 结构调用，并且它应该返回一个带有 `next` 方法的对象。
- 对于每次迭代，都会为下一个值调用 `next()` 方法。
- `next()` 方法应该以 `{done: true/false, value:<loop value>}` 的格式返回一个值，其中 `done:true` 表示循环结束。

这是可迭代的 `range` 的一个实现：

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // 在 for..of 循环开始时被调用一次
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // 每次迭代时都会被调用，来获取下一个值
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```

如果有任何不清楚的，你可以阅读 [](info:iterable) 一章，其中详细讲解了关于常规迭代器（iterator）的所有内容。

## 异步可迭代对象

当值是以异步的形式出现时，例如在 `setTimeout` 或者另一种延迟之后，就需要异步迭代。

最常见的场景是，对象需要发送一个网络请求以传递下一个值，稍后我们将看到一个它的真实示例。

要使对象异步迭代：

1. 使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`。
2. `next()` 方法应该返回一个 `promise`（带有下一个值，并且状态为 `fulfilled`）。
    - 关键字 `async` 可以实现这一点，我们可以简单地使用 `async next()`。
3. 我们应该使用 `for await (let item of iterable)` 循环来迭代这样的对象。
    - 注意关键字 `await`。

作为开始的示例，让我们创建一个可迭代的 `range` 对象，与前面的那个类似，不过现在它将异步地每秒返回一个值。

我们需要做的就是对上面代码中的部分代码进行替换：

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // 注意：我们可以在 async next 内部使用 "await"
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

正如我们所看到的，其结构与常规的 iterator 类似:

1. 为了使一个对象可以异步迭代，它必须具有方法 `Symbol.asyncIterator` `(1)`。
2. 这个方法必须返回一个带有 `next()` 方法的对象，`next()` 方法会返回一个 promise `(2)`。
3. 这个 `next()` 方法可以不是 `async` 的，它可以是一个返回值是一个 `promise` 的常规的方法，但是使用 `async` 关键字可以允许我们在方法内部使用 `await`，所以会更加方便。这里我们只是用于延迟 1 秒的操作 `(3)`。
4. 我们使用 `for await(let value of range)` `(4)` 来进行迭代，也就是在 `for` 后面添加 `await`。它会调用一次 `range[Symbol.asyncIterator]()` 方法一次，然后调用它的 `next()` 方法获取值。
  
这是一个对比 Iterator 和异步 iterator 之间差异的表格：

|       | Iterator  | 异步 iterator |
|-------|-----------|-----------------|
| 提供 iterator 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是     | 任意值             | `Promise` |
| 要进行循环，使用         | `for..of`         | `for await..of` |

````warn header="Spread 语法 `...` 无法异步工作"
需要常规的同步 iterator 的功能，无法与异步 iterator 一起使用。

例如，spread 语法无法工作：
```js
alert( [...range] ); // Error, no Symbol.iterator
```

这很正常，因为它期望找到 `Symbol.iterator`，而不是 `Symbol.asyncIterator`。

`for..of` 的情况和这个一样：没有 `await` 关键字时，则期望找到的是 `Symbol.iterator`。
````

## 回顾 generator

现在，让我们回顾一下 generator，它使我们能够写出更短的迭代代码。在大多数时候，当我们想要创建一个可迭代对象时，我们会使用 generator。

简单起见，这里省略了一些解释，即 generator 是“生成（yield）值的函数”。关于此的详细说明请见 [](info:generators) 一章。

Generator 是标有 `function*`（注意星号）的函数，它使用 `yield` 来生成值，并且我们可以使用 `for..of` 循环来遍历它们。

下面这例子生成了从 `start` 到 `end` 的一系列值：

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```

正如我们所知道的，要使一个对象可迭代，我们需要给它添加 `Symbol.iterator`。

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <带有 next 方法的对象，以使对象 range 可迭代>
  }
*/!*
}
```

对于 `Symbol.iterator` 来说，一个通常的做法是返回一个 generator，这样可以使代码更短，如下所示：

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的一种简写
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```

如果你想了解更多详细内容，请阅读 [](info:generators) 一章。

在常规的 generator 中，我们无法使用 `await`。所有的值都必须按照 `for..of` 构造的要求同步地出现。

如果我们想要异步地生成值该怎么办？例如，对于来自网络请求的值。

让我们再回到异步 generator，来使这个需求成为可能。

## 异步 generator (finally)

对于大多数的实际应用程序，当我们想创建一个异步生成一系列值的对象时，我们都可以使用异步 generator。

语法很简单：在 `function*` 前面加上 `async`。这即可使 generator 变为异步的。

然后使用 `for await (...)` 来遍历它，像这样：

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // 哇，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 alert 之间有延迟）
  }

})();
```

因为此 generator 是异步的，所以我们可以在其内部使用 `await`，依赖于 `promise`，执行网络请求等任务。

````smart header="引擎盖下的差异"
如果你还记得我们在前面章节中所讲的关于 generator 的细节知识，那你应该知道，从技术上讲，异步 generator 和常规的 generator 在内部是有区别的。

对于异步 generator，`generator.next()` 方法是异步的，它返回 promise。

在一个常规的 generator 中，我们使用 `result = generator.next()` 来获得值。但在一个异步 generator 中，我们应该添加 `await` 关键字，像这样：

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
这就是为什么异步 generator 可以与 `for await...of` 一起工作。
````

### 异步的可迭代对象 range

常规的 generator 可用作 `Symbol.iterator` 以使迭代代码更短。

与之类似，异步 generator 可用作 `Symbol.asyncIterator` 来实现异步迭代。

例如，我们可以通过将同步的 `Symbol.iterator` 替换为异步的 `Symbol.asyncIterator`，来使对象 `range` 异步地生成值，每秒生成一个：

```js run
let range = {
  from: 1,
  to: 5,

  // 这一行等价于 [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // 在 value 之间暂停一会儿，等待一些东西
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5
  }

})();
```

现在，value 之间的延迟为 1 秒。

```smart
从技术上讲，我们可以把 `Symbol.iterator` 和 `Symbol.asyncIterator` 都添加到对象中，因此它既可以是同步的（`for..of`）也可以是异步的（`for await..of`）可迭代对象。

但是实际上，这将是一件很奇怪的事情。
```

## 实际的例子：分页的数据

到目前为止，我们已经了解了一些基本示例，以加深理解。现在，我们来看一个实际的用例。

目前，有很多在线服务都是发送的分页的数据（paginated data）。例如，当我们需要一个用户列表时，一个请求只返回一个预设数量的用户（例如 100 个用户）—— “一页”，并提供了指向下一页的 URL。

这种模式非常常见。不仅可用于获取用户列表，这种模式还可以用于任意东西。

例如，GitHub 允许使用相同的分页提交（paginated fashion）的方式找回 commit：

- 我们应该以 `https://api.github.com/repos/<repo>/commits` 格式创建进行 `fetch` 的网络请求。
- 它返回一个包含 30 条 commit 的 JSON，并在返回的 `Link` header 中提供了指向下一页的链接。
- 然后我们可以将该链接用于下一个请求，以获取更多 commit，以此类推。

对于我们的代码，我们希望有一种更简单的获取 commit 的方式。

让我们创建一个函数 `fetchCommits(repo)`，用来在任何我们有需要的时候发出请求，来为我们获取 commit。并且，该函数能够关注到所有分页内容。对于我们来说，它将是一个简单的 `for await..of` 异步迭代。

因此，其用法将如下所示：

```js
for await (let commit of fetchCommits("username/repository")) {
  // 处理 commit
}
```

通过异步 generator，我们可以轻松实现上面所描述的函数，如下所示：

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github 需要任意的 user-agent header
    });

    const body = await response.json(); // (2) 响应的是 JSON（array of commits）

    // (3) 前往下一页的 URL 在 header 中，提取它
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) 一个接一个地 yield commit，直到最后一页
      yield commit;
    }
  }
}
```

关于其工作原理的进一步解释：

1. 我们使用浏览器的 [fetch](info:fetch) 方法来下载 commit。

    - 初始 URL 是 `https://api.github.com/repos/<repo>/commits`，并且下一页的 URL 将在响应的 `Link` header 中。
    - `fetch` 方法允许我们提供授权和其他 header，如果需要 —— 这里 GitHub 需要的是 `User-Agent`。
2. commit 被以 JSON 的格式返回。
3. 我们应该从响应（response）的 `Link` header 中获取前往下一页的 URL。它有一个特殊的格式，所以我们对它使用正则表达式（我们将在 [正则表达式](info:regular-expressions) 一章中学习它）。
    - 前往下一页的 URL 看起来可能就像这样 `https://api.github.com/repositories/93253246/commits?page=2`。这是由 GitHub 自己生成的。
4. 然后，我们将接收到的所有 commit 一个一个地 yield 出来，当所有 commit 都 yield 完成时，将触发下一个 `while(url)` 迭代，并发出下一个请求。

这是一个使用示例（在控制台中显示 commit 的作者）

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // 让我们在获取了 100 个 commit 时停止
      break;
    }
  }

})();
```

这就是我们想要的。

从外部看不到分页请求（paginated requests）的内部机制。对我们来说，它只是一个返回 commit 的异步 generator。

## 总结

常规的 iterator 和 generator 可以很好地处理那些不需要花费时间来生成的的数据。

当我们期望异步地，有延迟地获取数据时，可以使用它们的异步版本，并且使用 `for await..of` 替代 `for..of`。

异步 iterator 与常规 iterator 在语法上的区别：

|       | Iterable  | 异步 Iterable |
|-------|-----------|-----------------|
| 提供 iterator 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是     | `{value:…, done: true/false}`             | resolve 成 `{value:…, done: true/false}` 的 `Promise` |

异步 generator 与常规 generator 在语法上的区别：

|       | Generator | 异步 generator |
|-------|-----------|-----------------|
| 声明方式 | `function*` | `async function*` |
| `next()` 返回的值是          | `{value:…, done: true/false}`         | resolve 成 `{value:…, done: true/false}` 的 `Promise`  |

在 Web 开发中，我们经常会遇到数据流，它们分段流动（flows chunk-by-chunk）。例如，下载或上传大文件。

我们可以使用异步 generator 来处理此类数据。值得注意的是，在一些环境，例如浏览器环境下，还有另一个被称为 Streams 的 API，它提供了特殊的接口来处理此类数据流，转换数据并将数据从一个数据流传递到另一个数据流（例如，从一个地方下载并立即发送到其他地方）。
