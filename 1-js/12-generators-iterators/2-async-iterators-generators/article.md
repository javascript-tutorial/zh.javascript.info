
<<<<<<< HEAD
# 异步迭代器（iterators）与生成器（generators）

异步迭代器可以迭代异步请求得到的数据。例如，我们从网络分段（chunk-by-chunk）下载的数据。异步迭代器使这一步骤更加方便。

首先，让我们来看一个简单的示例来掌握语法，然后再去看一些实际的用子。

## 异步迭代器

异步迭代器与常规的迭代器相似，不过语法上有一点区别。

一个“常规的”可迭代对象，即我们在 <info:iterable> 章节中提到的，是这样的：
=======
# Async iterators and generators

Asynchronous iterators allow to iterate over data that comes asynchronously, on-demand. For instance, when we download something chunk-by-chunk over a network. Asynchronous generators make it even more convenient.

Let's see a simple example first, to grasp the syntax, and then review a real-life use case.

## Async iterators

Asynchronous iterators are similar to regular iterators, with a few syntactic differences.

A "regular" iterable object, as described in the chapter <info:iterable>, looks like this:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // 使用 for..of 语句的时候就会调用一次这个方法
*!*
  [Symbol.iterator]() {
*/!*
    // ……它返回一个 iterator 对象：
    // 进一步说, for..of 只能作用于可迭代对象,
    // 使用 next() 方法获取下一个 values
=======
  // for..of calls this method once in the very beginning
*!*
  [Symbol.iterator]() {
*/!*
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() 被 for..of 循环在每一次迭代过程中调用 
*!*
      next() { // (2)
        // 它应该返回一个类似 {done:.., value :...} 的对象
=======
      // next() is called on each iteration by the for..of loop
*!*
      next() { // (2)
        // it should return the value as an object {done:.., value :...}
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
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
<<<<<<< HEAD
  alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
}
```

有需要的话，你可以返回关于 <info:iterable> 的章节查看常规的迭代器的详细内容。

为了使对象可以异步地迭代：
1. 我们需要使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`。
2. `next()` 方法应该返回一个 `promise`。
3. 我们应该使用 `for await (let item of iterable)` 循环来迭代这样的对象

接下来，让我们创建一个类似于之前的，可迭代的 `range` 对象，不过现在它会按照每秒一个的速度，异步地返回值：
=======
  alert(value); // 1 then 2, then 3, then 4, then 5
}
```

If necessary, please refer to the [chapter about iterables](info:iterable) for details about regular iterators.

To make the object iterable asynchronously:
1. We need to use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. `next()` should return a promise.
3. To iterate over such an object, we should use `for await (let item of iterable)` loop.

Let's make an iterable `range` object, like the one before, but now it will return values asynchronously, one per second:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // 使用 for await..of 语句的时候就会调用一次这个方法
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ……它返回一个迭代器对象：
    // 进一步说, for await..of 只能作用于可迭代对象,
    // 使用 next() 方法得到下一个值
=======
  // for await..of calls this method once in the very beginning
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...it returns the iterator object:
    // onward, for await..of works only with that object,
    // asking it for next values using next()
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() 被 for await..of 循环在每一次迭代过程中调用 
*!*
      async next() { // (2)
        // 它应该返回一个形如  {done:.., value :...} 的对象
        // (会被 async 关键字自动包装成一个 promise)
*/!*

*!*
        // 可以在内部使用 await 关键字来执行异步任务:
=======
      // next() is called on each iteration by the for await..of loop
*!*
      async next() { // (2)
        // it should return the value as an object {done:.., value :...}
        // (automatically wrapped into a promise by async)
*/!*

*!*
        // can use await inside, do async stuff:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
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

<<<<<<< HEAD
正如我们看到的，其结构类似于常规的 iterators:

1. 为了异步地迭代一个对象，这个对象必须有 `Symbol.asyncIterator` 方法 `(1)`。
2. 这个方法必须返回一个带有 `next()` 方法的对象，该方法会返回一个 promise `(2)`。
3. 这个 `next()` 方法可以不使用 `async` 关键字，它可以是一个常规的方法返回一个 `promise`，但是使用 `async` 关键字允许在方法内部使用 `await`，所以会更加方便。这里我们只是用来延迟 1 秒操作 `(3)`。
4. 我们使用 `for await(let value of range)` 来执行迭代 `(4)`，也就是在 `for` 后面增加 `await`。它会调用一次 `range[Symbol.asyncIterator]()` 方法一次然后调用它的 `next()` 方法获取值。
  
这里有一个备忘单：

|       | 迭代器 | 异步迭代器 |
|-------|-----------|-----------------|
| 提供 `iterator` 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是             | 任意值        | `Promise`  |
| 使用的循环语法是                          | `for..of`         | `for await..of` |


````warn header="展开运算符 `...` 无法执行异步操作"
展开运算符要求常规的，同步的迭代器，无法工作于异步迭代器。

例如，展开运算符在以下代码无法执行：
=======
As we can see, the structure is similar to regular iterators:

1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows to use `await`, so that's convenient. Here we just delay for a second `(3)`.
4. To iterate, we use `for await(let value of range)` `(4)`, namely add "await" after "for". It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here's a small cheatsheet:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
| to loop, use                          | `for..of`         | `for await..of` |

````warn header="The spread syntax `...` doesn't work asynchronously"
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
```js
alert( [...range] ); // Error, no Symbol.iterator
```

<<<<<<< HEAD
这很正常，因为它要找到 `Symbol.iterator`，跟 `for..of` 没有 `await` 一样。并非是 `Symbol.asyncIterator`。
````

## 异步生成器

正如我们所知，JavaScript 也支持生成器，并且他们也是可迭代的。

让我们来回顾一下生成器所在的章节 <info:generators>。它从 `start` 到 `end` 生成了一系列的值：
=======
That's natural, as it expects to find `Symbol.iterator`, same as `for..of` without `await`. Not `Symbol.asyncIterator`.
````

## Async generators

As we already know, JavaScript also supports generators, and they are iterable.

Let's recall a sequence generator from the chapter [](info:generators). It generates a sequence of values from `start` to `end`:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
<<<<<<< HEAD
  alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
}
```

在常规的生成器中，我们无法使用 `await`，所有的值都必须同步获得：无法在 `for..of` 循环中延迟执行，这是一个同步的结构。

但如果我们在 `generator` 内使用 `await` 呢？我们可以以网络请求为例子。

很简单，只需要在前面加上 `async`，就像这样：
=======
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

In regular generators we can't use `await`. All values must come synchronously: there's no place for delay in `for..of`, it's a synchronous construct.

But what if we need to use `await` in the generator body? To perform network requests, for instance.

No problem, just prepend it with `async`, like this:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // 很好，可以使用 await!
=======
    // yay, can use await!
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
  }

})();
```

<<<<<<< HEAD
现在，我们有了 `async generator`，可以使用 `for await...of` 迭代。

这确实非常简单。我们加了 `async` 关键字，然后我们就能在 生成器内部使用 `await`，依赖于 `promise` 和其他异步函数。

从技术上来讲，异步生成器的另一个不同之处在于，它的 `generatr.next()` 方法现在也是异步地，它返回 promises。

在一个常规的 `generator` 中，我们使用 `result = generator.next()` 来获得值。但在一个 `async generator` 中，我们应该添加 `await` 关键字，如下：
=======
Now we have the async generator, iterable with `for await...of`.

It's indeed very simple. We add the `async` keyword, and the generator now can use `await` inside of it, rely on promises and other async functions.

Technically, another difference of an async generator is that its `generator.next()` method is now asynchronous also, it returns promises.

In a regular generator we'd use `result = generator.next()` to get values. In an async generator, we should add `await`, like this:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

<<<<<<< HEAD
## 异步可迭代对象

如我们所知道的，要是一个对象可迭代，我们需要给它添加 `Symbol.iterator`。
=======
## Async iterables

As we already know, to make an object iterable, we should add `Symbol.iterator` to it.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

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

<<<<<<< HEAD
对于 `Symbol.iterator` 来说，一个通常的做法是返回一个 `generator`，这好过返回一个带有 `next()` 方法的简单对象。

让我们来回想一下之前 [](info:generators) 章节中的一个示例：
=======
A common practice for `Symbol.iterator` is to return a generator, rather than a plain object with `next` as in the example before.

Let's recall an example from the chapter [](info:generators):
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  *[Symbol.iterator]() { // 是 [Symbol.iterator]: function*() 的简写
=======
  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
<<<<<<< HEAD
  alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
}
```

这有一个自定义对象 `range` 是可迭代的，并且它的生成器 `*[Symbol.iterator]` 实现了列出所有值的逻辑。

如果们想要给 `generator` 加上异步操作，那么我们应该将 `Symbol.iterator` 带换成异步的 `Symbol.asyncIterator`：
=======
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Here a custom object `range` is iterable, and the generator `*[Symbol.iterator]` implements the logic for listing values.

If we'd like to add async actions into the generator, then we should replace `Symbol.iterator` with async `Symbol.asyncIterator`:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
let range = {
  from: 1,
  to: 5,

*!*
<<<<<<< HEAD
  async *[Symbol.asyncIterator]() { // 等价于 [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // 在获得 value 之间暂停，执行其他任务 
=======
  async *[Symbol.asyncIterator]() { // same as [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something  
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
<<<<<<< HEAD
    alert(value); // 弹出 1, 然后 2, 然后 3, 然后 4, 然后 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
  }

})();
```

<<<<<<< HEAD
现在 `value` 都是延迟 1 秒后才弹出

## 实际例子

到目前为止，我们为了获得基础的了解，看到的都是简单的例子。接下来，我们就看一下实际应用的例子。

目前，有很多网络服务都是传递分页的数据。例如，当我们需要一个用户的清单，一个请求只返回了一个预定义数量的用户（例如：100 个用户） - “一页”，并且提供了一个前往下一页的 `URL`。

这种模式非常常见。不只是用户，基本所有数据都是。例如，GitHub 允许使用相同的，分页的方式找回提交记录：

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
=======
Now values come with a delay of 1 second between them.

## Real-life example

So far we've seen simple examples, to gain basic understanding. Now let's review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides a URL to the next page.

This pattern is very common. It's not about users, but just about anything. For instance, GitHub allows to retrieve commits in the same, paginated fashion:

- We should make a request to URL in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

But we'd like to have a simpler API: an iterable object with commits, so that we could go over them like this:

```js
let repo = 'javascript-tutorial/en.javascript.info'; // GitHub repository to get commits from

for await (let commit of fetchCommits(repo)) {
  // process commit
}
```

We'd like to make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple `for await..of`.

With async generators that's pretty easy to implement:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // github 要求 user-agent 头部
    });

    const body = await response.json(); // (2) 返回的数据是一个 JSON (提交记录的列表)

    // (3) 前往下一页的 URL 在头部，需要将其提取出来
=======
      headers: {'User-Agent': 'Our script'}, // github requires user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

<<<<<<< HEAD
    for(let commit of body) { // (4) 一个接一个地 yield 提交记录，直到最后一页
=======
    for(let commit of body) { // (4) yield commits one by one, until the page ends
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. 我们使用浏览器的 <info:fetch> 方法从 `URL` 下载数据。它允许我们提供授权和其他需要的头部，这里 GitHub 需要的是 `User-Agent`
2. `fetch` 的结果作为 `JSON` 被解析，那也是一个 `fetch` 的特殊方法
3. 我们应该从返回头的 `Link` 中获得前往下一页的 `URL`。它有一个特殊的格式，所以我们可以使用正则表达式得到它。前往下一页的 `URL` 看起来像：`https://api.github.com/repositories/93253246/commits?page=2`，这是由 GitHub 自己生成的。
4. 然后我们将接收的提交记录 `yield` 出来，当它结束的时候 -- 下一个 `while(url)` 迭代将会触发，从而发送下一个请求

这是一个使用的例子（将会在用户的控制台显示）

=======
1. We use the browser [fetch](info:fetch) method to download from a remote URL. It allows to supply authorization and other headers if needed, here GitHub requires `User-Agent`.
2. The fetch result is parsed as JSON, that's again a `fetch`-specific method.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regexp for that. The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`, it's generated by GitHub itself.
4. Then we yield all commits received, and when they finish -- the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

<<<<<<< HEAD
    if (++count == 100) { // 获取一百条数据后停止
=======
    if (++count == 100) { // let's stop at 100 commits
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
      break;
    }
  }

})();
```
<<<<<<< HEAD
这就是我们想要的。从外面无法看到内部的是如何处理分页数据的请求的。对我们来说，那只是一个返回提交记录的异步生成器。

## 总结

对于无需花费时间生成的数据，常规的迭代器和生成器就能胜任。

当我们需要异步获得数据的时候，它们的异步的同行则有了发挥的机会，`for await..of` 会去替代 `for..of`。

异步迭代器与常规迭代器的语法区别：

|       | 常规迭代 | 异步迭代 |
|-------|-----------|-----------------|
| 提供 `iterator` 的方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是          | `{value:…, done: true/false}`         | 被解析（resolves）成 `{value:…, done: true/false}` 的 `Promise`  |

异步生成器与常规生成器的语法区别：

|       | 常规生成器 | 异步生成器 |
|-------|-----------|-----------------|
| 声明方式 | `function*` | `async function*` |
| `next()` 返回的值是          | `{value:…, done: true/false}`         | 被解析成 `{value:…, done: true/false}` 的 `Promise`  |

在网络开发中，我们经常会遇到数据流，例如下载或者上传大文件。

我们可以使用 `async generator` 来处理类似的数据。值得注意的是，在一些环境，例如浏览器环境下，还有另外一个 API 被叫做流（Streams），它提供一些特殊的接口来操作类似的数据流，来传输数据或将其从一个数据流传递到另一个数据流（例如，从一个地方下载后立刻将其发送到其他地方）。
=======

That's just what we wanted. The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
| Method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We can use async generators to process such data. It's also noteworthy that in some environments, such as browsers, there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
