
# Async iterator 和 generator

异步迭代器（iterator）允许我们对按需通过异步请求而得到的数据进行迭代。例如，我们通过网络分段（chunk-by-chunk）下载数据时。异步生成器（generator）使这一步骤更加方便。

首先，让我们来看一个简单的示例以掌握语法，然后再看一个实际用例。

## Async iterator

异步迭代器（async iterator）与常规的迭代器类似，不过语法上有一点区别。

一个“常规的”可迭代对象，即我们在 <info:iterable> 一章中提到的，看起来像这样：

```js run
let range = {
  from: 1,
  to: 5,

  // 在刚使用 for..of 循环时，for..of 就会调用一次这个方法
*!*
  [Symbol.iterator]() {
*/!*
    // ...它返回 iterator object：
    // 后续的操作中，for..of 将只针对这个对象
    // 并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for..of 循环在每次迭代时都会调用 next()
*!*
      next() { // (2)
        // 它应该以对象 {done:.., value :...} 的形式返回值
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

有需要的话，你可以返回 <info:iterable> 一章学习关于常规迭代器（iterator）的详细内容。

为了使对象可以异步迭代：
1. 我们需要使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`。
2. `next()` 方法应该返回一个 `promise`。
3. 我们应该使用 `for await (let item of iterable)` 循环来迭代这样的对象

接下来，让我们创建一个类似于之前的，可迭代的 `range` 对象，不过现在它会按照每秒一个的速度，异步地返回值：

```js run
let range = {
  from: 1,
  to: 5,

  // 在刚使用 for await..of 循环时，for await..of 就会调用一次这个方法
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...它返回 iterator object：
    // 后续的操作中，for await..of 将只针对这个对象
    // 并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for await..of 循环在每次迭代时都会调用 next()
*!*
      async next() { // (2)
        // 它应该以对象 {done:.., value :...} 的形式返回值
        // (会被 async 自动包装成一个 promise)
*/!*

*!*
        // 可以在内部使用 await，执行异步任务：
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
  
这是一个小备忘单：

|       | Iterator  | Async iterator |
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

这很正常，因为它期望找到 `Symbol.iterator`，跟 `for..of` 没有 `await` 一样。并非 `Symbol.asyncIterator`。
````

## Async generator

正如我们所知，JavaScript 也支持生成器（generator），并且它们也是可迭代的。

让我们回顾一下 <info:generators> 一章的序列生成器（generator）。它生成从 `start` 到 `end` 的一系列值：

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

在常规的 generator 中，我们无法使用 `await`。所有的值都必须同步获得：`for..of` 中没有延时的地方，它是一个同步结构。

但是，如果我们需要在 `generator` 内使用 `await` 该怎么办呢？我们以执行网络请求为例子。

没问题，只需要在它前面加上 `async` 即可，就像这样：

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // 耶，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5
  }

})();
```

现在，我们有了 async generator，可以使用 `for await...of` 进行迭代。

这确实非常简单。我们加了 `async` 关键字，然后我们就能在 generator 内部使用 `await` 了，依赖于 `promise` 和其他异步函数。

从技术上来讲，async generator 的另一个不同之处在于，它的 `generatr.next()` 方法现在也是异步的，它返回 promise。

在一个常规的 generator 中，我们使用 `result = generator.next()` 来获得值。但在一个 `async generator` 中，我们应该添加 `await` 关键字，像这样：

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Async iterable

正如我们所知道的，要使一个对象可迭代，我们需要给它添加 `Symbol.iterator`。

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

对于 `Symbol.iterator` 来说，一个通常的做法是返回一个 generator，而不是像前面的例子中那样返回一个带有 `next()` 方法的普通对象。

让我们回顾一下来自之前 [](info:generators) 一章中的一个示例：

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```

这有一个自定义的对象 `range`，它是可迭代的，并且它的 generator `*[Symbol.iterator]` 实现了列出值的逻辑。

如果们想要给 generator 加上异步行为，那么我们应该将 `Symbol.iterator` 替换成异步的 `Symbol.asyncIterator`：

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // 等价于 [Symbol.asyncIterator]: async function*()
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

## 实际的例子

到目前为止，我们为了获得基础的了解，看到的都是简单的例子。接下来，我们来看一个实际的用例。

目前，有很多在线服务都是发送的分页数据（paginated data）。例如，当我们需要一个用户列表时，一个请求只返回一个预定义数量的用户（例如 100 个用户）— “一页”，并提供了指向下一页的 URL。

这种模式非常常见。不仅可用于获取用户列表，这种模式还可以用于任意东西。例如，GitHub 允许使用相同的分页提交（paginated fashion）的方式找回 commit：

- 我们应该提交一个请求到这种格式的 URL：`https://api.github.com/repos/<repo>/commits`。
- 它返回一个包含 30 条 commit 的 JSON，并在返回的 `Link` header 中提供了指向下一页的链接。
- 然后我们可以将该链接用于下一个请求，以获取更多 commit，以此类推。

但是我们希望有一个更简单的 API：具有 commit 的可迭代对象，然后我们就可以像这样来遍历它们：

```js
let repo = 'javascript-tutorial/en.javascript.info'; // 用于获取 commit 的 GitHub 仓库

for await (let commit of fetchCommits(repo)) {
  // 处理 commit
}
```

我们想创建一个函数 `fetchCommits(repo)`，用来在任何我们有需要的时候发出请求，来为我们获取 commit。并且让它关注于所有分页的数据。对于我们来说，它就是一个简单的 `for await..of`。

通过使用 async generator，我们可以很容易地实现它：

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github 要求 user-agent header
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

1. 我们使用浏览器的 [fetch](info:fetch) 方法从远程 URL 下载数据。它允许我们提供授权和其他 header，如果需要 — 这里 GitHub 需要的是 `User-Agent`。
2. `fetch` 的结果被解析为 JSON。这又是 `fetch` 特定的方法。
3. 我们应该从响应（response）的 `Link` header 中获取前往下一页的 URL。它有一个特殊的格式，所以我们对它使用正则表达式（regexp）。前往下一页的 URL 看起来就像这样 `https://api.github.com/repositories/93253246/commits?page=2`。这是由 GitHub 自己生成的。
4. 然后我们将接收到的所有 commit 都 yield 出来，当它 yield 完成时，将触发下一个 `while(url)` 迭代，并发出下一个请求。

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

这就是我们想要的。从外部看不到分页请求（paginated requests）的内部机制。对我们来说，它只是一个返回 commit 的 async generator。

## 总结

常规的 iterator 和 generator 可以很好地处理那些不需要花费时间来生成的的数据。

当我们期望异步地，有延迟地获取数据时，可以使用它们的 async counterpart，并且使用 `for await..of` 替代 `for..of`。

Async iterator 与常规 iterator 在语法上的区别：

|       | Iterable  | Async Iterable |
|-------|-----------|-----------------|
| 提供 iterator 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是     | `{value:…, done: true/false}`             | resolve 成 `{value:…, done: true/false}` 的 `Promise` |

Async generator 与常规 generator 在语法上的区别：

|       | Generator | Async generator |
|-------|-----------|-----------------|
| 声明方式 | `function*` | `async function*` |
| `next()` 返回的值是          | `{value:…, done: true/false}`         | resolve 成 `{value:…, done: true/false}` 的 `Promise`  |

在 Web 开发中，我们经常会遇到数据流，它们分段流动（flows chunk-by-chunk）。例如，下载或上传大文件。

我们可以使用 async generator 来处理此类数据。值得注意的是，在一些环境，例如浏览器环境下，还有另一个被称为 Streams 的 API，它提供了特殊的接口来处理此类数据流，转换数据并将数据从一个数据流传递到另一个数据流（例如，从一个地方下载并立即发送到其他地方）。
