---
title: 异步迭代器与生成器
date: 2019-08-19 18:36:09
tags: ES6 迭代器与生成器 JS MJT
categories: ES6 JS MJT
---
# Async iterator and generators
异步 `iterator` 可以迭代异步请求得到的数据。例如，我们从网络分段下载的数据。异步 `generators` 使这一步骤更加方便。

首先，让我们来看一个简单的示例来掌握句法，然后再去看一看现实生活中的例子。

## Async iterator 
`Async iterator` 与常规的 `iterator` 类似，不过有一点语法上的区别。

一个“常规的” `iterables` 对象，即我们在 <info:iterable> 章节中提到的，是这样的：
```js run
let range = {
  from: 1,
  to: 5,

  // 使用 for..of 语句的时候就会调用一次这个方法
*!*
  [Symbol.iterator]() {
*/!*
    // ... 它返回一个 iterator 对象：
    // 进一步说, for..of 只能作用于可迭代对象,
    // 使用 next() 方法访问下一个 values
    return {
      current: this.from,
      last: this.to,

      // next() 被 for..of 循环在每一次迭代过程中调用 
*!*
      next() { // (2)
        // 它应该返回一个类似  {done:.., value :...} 的对象
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
  alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
}
```
有需要的话，您可以返回关于 <info:iterable> 的章节查看常规的 `iterators` 的详细内容。

为了使对象可以异步地迭代：
1. 我们需要使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`。
2. `next()` 方法应该返回一个 `promise`。
3. 我们应该使用 `for await (let item of iterable)` 循环来迭代这样的对象

接下来，让我们创建一个类似于之前的，可迭代的 `range` 对象，不过现在它会按照每秒一个的速度，异步地返回 values：
```js run
let range = {
  from: 1,
  to: 5,

  // 使用 for await..of 语句的时候就会调用一次这个方法
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ... 它返回一个 iterator 对象：
    // 进一步说, for await..of 只能作用于可迭代对象,
    // 使用 next() 方法访问下一个 values
    return {
      current: this.from,
      last: this.to,

      // next() 被 for await..of 循环在每一次迭代过程中调用 
*!*
      async next() { // (2)
        // 它应该返回一个类似  {done:.., value :...} 的对象
        // (会被 async 关键字自动包装成一个 promise)
*/!*

*!*
        // 可以在内部使用 await 关键字来执行异步任务:
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

正如我们看到的，其结构类似于常规的 iterators:
1. 为了异步地迭代一个对象，这个对象必须有 `Symbol.asyncIterator` 方法 `(1)`
2. 这个方法必须返回一个带有 `next()` 方法的对象，该方法会返回一个 `promise`。`(2)`
3. 这个 `next()` 方法可以不使用 `async` 关键字，它可以是一个常规的方法返回一个 `promise`，但是使用 `async` 关键字允许在方法内部使用 `await`，所以会更加方便。这里我们只是用来延迟 1 秒操作。`(3)`
4. 我们使用 `for await(let value of range)` `(4)`，也就是在 `for` 后面增加 `await`。它会调用一次 `range[Symbol.asyncIterator]()` 方法一次然后调用它的 `next()` 方法访问 `values`
  
这里有一个备忘单表示：

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| 提供 `iterator` 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是             | 任意值        | `Promise`  |
| 使用的循环语法是                          | `for..of`         | `for await..of` |


````warn header="展开运算符 `...` 无法执行异步操作"
展开运算符要求常规的，同步的 `iterators`，无法工作于异步的 `iterators`。

例如，展开运算符在以下代码无法执行：
```js
alert( [...range] ); // 错误，没有 Symbol.iterator
```

这很正常，因为它要找到 `Symbol.iterator`，正如 `for..of` 没有 `await`，而非 `Symbol.asyncIterator`。
````
````
## Async generators
正如我们所知，JavaScript 也支持 `generators`，并且他们也是可迭代的。

让我们来回顾一下 `generators` 所在的章节 <info:generators>。它从 `start` 到 `end` 生成了一系列的值：

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
}
```

在常规的 `generators` 中，我们无法使用 `await`， 所有的值都必须同步获得：无法在 `for..of` 循环中延迟执行，这是一个同步的结构。

但如果我们在 `generator` 内使用 `await` 呢？我们可以以网络请求为例子。

很简单，只需要在前面加上 `async`，就像这样：

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // 很好，可以使用 await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
  }

})();
```

现在，我们有了 `async generator`，可以使用 `for await...of` 迭代。

这实际上非常简单。我们加了 `async` 关键字，然后我们就能在 `generator` 内部使用 `await`，来执行 `promise` 和其他异步函数。

从技术上来讲，`async generator` 的另一个不同之处在于，它的 `generatr.next()` 方法现在也是异步地，它返回一个 `promise`

在一个常规的 `generator` 中，我们使用 `result = generator.next()` 来获得值。但在一个 `async generator` 中，我们应该添加 `await` 关键字，如下：

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Async iterables

如我们所知道的，要是一个对象可迭代，我们需要给它添加 `Symbol.iterator`。

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

对于 `Symbol.iterator` 来说，一个通常的做法是返回一个 `generator`，这好过返回一个带有 `next()` 方法的简单对象。

让我们来回想一下之前[](info:generators)章节中的一个示例：

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // 是 [Symbol.iterator]: function*() 的简写
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
}
```

这有一个可迭代的对象 `range`，并且它的 `generator` `*[Symbol.iterator]` 实现了列出 `value` 的逻辑

如果们想要给 `generator` 加上异步操作，那么我们应该将 `Symbol.iterator` 带换成异步的 `Symbol.asyncIterator`：

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // 等价于 [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // 在获得 value 之间暂停，执行其他任务 
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
  }

})();
```

现在 `value` 都是延迟 1 秒后才弹出

## 真实例子

到目前为止，我们为了获得基础的了解，看到的都是简单的例子。接下来，我们就看一下真实应用的例子。

目前，有很多网络服务都是传递分页的数据。例如，当我们需要一个用户的清单，一个请求只返回了一个预定义数量的用户（例如：100 个用户） - “一页”，并且提供了一个前往下一页的 `URL`。

这种模式非常常见。不只是用户，基本所有数据都是。例如， GitHub 允许使用相同的，分页的方式找回提交记录：

- 我们应该提交一个请求到这种格式的 `URL`： `https://api.github.com/repos/<repo>/commits`。
- 它返回一个包含 30 条提交记录的 `JSON` 对象，并且在返回头的 `Link` 中提供了一个前往下一页的链接
- 然后我们可以使用那个链接作为下一个请求地址，获得更多的提交记录。

但是我们可以有一个更简单的 API：一个带有提交记录的可迭代对象，然后我们可以像这样来访问它们：

```js
let repo = 'javascript-tutorial/en.javascript.info'; // 获得提交记录的 GitHub 仓库

for await (let commit of fetchCommits(repo)) {
  // 处理提交记录
}
```
我们可以使用一个函数 `fetchCommits(repo)` ，用来在任何需要的时候，为我们获取提交记录，发送请求等。并且让它关注于所有分页的数据。对于我们来说，它就是一个简单的 `for await..of`。

通过使用 `async generator`，我们可以很简单的实现它：

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github 要求 user-agent 头部
    });

    const body = await response.json(); // (2) 返回的数据是一个 JSON (提交记录的列表)

    // (3) 前往下一页的 URL 在头部，需要将其提取出来
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) 一个接一个地 yield 提交记录，直到最后一页
      yield commit;
    }
  }
}
```

1. 我们使用浏览器的 <info:fetch> 方法从 `URL` 下载数据。它允许我们提供授权和其他需要的头部，这里 GitHub 需要的是 `User-Agent`
2. `fetch` 的结果作为 `JSON` 被解析，那也是一个 `fetch` 的特殊方法
3. 我们应该从返回头的 `Link` 中获得前往下一页的 `URL`。它有一个特殊的格式，所以我们可以使用正则表达式得到它。前往下一页的 `URL` 看起来像：`https://api.github.com/repositories/93253246/commits?page=2`，这是由 GitHub 自己生成的。
4. 然后我们将接收的提交记录 `yield` 出来，当它结束的时候 -- 下一个 `while(url)` 迭代将会触发，从而发送下一个请求

这是一个使用的例子（将会在用户的控制台显示）


```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();
```
这就是我们想要的。从外面无法看到内部的是如何处理分页数据的请求的。对我们来说，那只是一个返回提交记录的 `async generator` 

## 总结

对于无需花费很长时间生成的数据，常规的 `iterators` 和 `generators` 工作良好。

当我们需要异步获得数据的时候，它们的异步的同行则有了发挥的机会，`for await..of` 会去替代 `for..of`。

异步与常规 `iterator` 的语法区别：

|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
| 提供 `iterator` 的方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是          | `{value:…, done: true/false}`         |被 `resolves` 成 `{value:…, done: true/false}` 的 `Promise`  |

异步与常规 `generator` 的语法区别：

|       | Generators | Async generators |
|-------|-----------|-----------------|
| 声明方式 | `function*` | `async function*` |
| `next()` 返回的值是          | `{value:…, done: true/false}`         | 被 `resolves` 成 `{value:…, done: true/false}` 的 `Promise`  |


在网络开发中，我们经常会遇到数据流，例如下载或者上传大文件。

我们可以使用 `async generator` 来处理类似的数据。值得注意的是，在一些环境，例如浏览器环境下，还有另外一个 API 被叫做 `Streams`，它提供一些特殊的接口来操作类似的数据流，来传输数据或将其从一个数据流传递到另一个数据流（例如，从一个地方下载后立刻将其发送到其他地方）