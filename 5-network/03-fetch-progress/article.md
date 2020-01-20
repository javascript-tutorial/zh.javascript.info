
<<<<<<< HEAD
# Fetch：下载过程

`fetch` 方法允许去追踪 *download* 过程。

请注意：到目前为止，对于 `fetch` 方法的 *upload* 过程，还没有方法去追踪它。基于这个目的，请使用 [XMLHttpRequest](info:xmlhttprequest)，我们将会在后面讲到它。

要追踪下载过程，可以使用 `response.body` 属性。它是一个“可读流（readable stream）”——当他们下载的时候提供一个个响应体块（chunk）的特殊对象。

与 `response.text()`，`response.json()` 和其他方法不同，`response.body` 完全控制了读取过程，我们可以随时计算下载了多少。

下面是从 `response.body` 读取 response 的代码草图：

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();

// 无限循环执行直到 body 下载完成
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // value 是存放块字节码的 Uint8Array
=======
# Fetch: Download progress

The `fetch` method allows to track *download* progress.

Please note: there's currently no way for `fetch` to track *upload* progress. For that purpose, please use [XMLHttpRequest](info:xmlhttprequest), we'll cover it later.

To track download progress, we can use `response.body` property. It's  `ReadableStream` -- a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.

Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can count how much is consumed at any moment.

Here's the sketch of code that reads the reponse from `response.body`:

```js
// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading
while(true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

<<<<<<< HEAD
`await reader.read()` 的结果是一个具有两个属性的对象：
- **`done`** —— 当块全部下载完毕时，其值为 true。
- **`value`** —— 一个存放字节码的类型数组：`Uint8Array`。

我们在循环中等待更多的块（chunk），直到 `done` 是 `true`。

要打印 progress 的话，我们只需向 counter 添加每个 `value` 的长度。

这是完整的获取响应并打印进度的代码，更多解释如下：

```js run async
// Step 1：启动 fetch 并赋值给 reader
=======
The result of `await reader.read()` call is an object with two properties:
- **`done`** -- `true` when the reading is complete, otherwise `false`.
- **`value`** -- a typed array of bytes: `Uint8Array`.

```smart
Streams API also describes asynchronous iteration over `ReadableStream` with `for await..of` loop, but it's not yet widely supported (see [browser issues](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), so we use `while` loop.
```

We receive response chunks in the loop, until the loading finishes, that is: until `done` becomes `true`.

To log the progress, we just need for every received fragment `value` to add its length to the counter.

Here's the full working example that gets the response and logs the progress in console, more explanations to follow:

```js run async
// Step 1: start the fetch and obtain a reader
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

<<<<<<< HEAD
// Step 2：获取总长度（总块数）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前长度
let chunks = []; // 存放接收到的二进制块的数组（包括 body）
=======
// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

<<<<<<< HEAD
// Step 4：将块合并成单个 Uint8Array
=======
// Step 4: concatenate chunks into single Uint8Array
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

<<<<<<< HEAD
// Step 5：解码成字符串
let result = new TextDecoder("utf-8").decode(chunksAll);

// 我们完成啦！
=======
// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

<<<<<<< HEAD
让我们一步步阐释这个过程：

1. 我们像往常一样执行 `fetch`，但不是调用 `response.json()`，而是获取一个流读取器（stream reader）`response.body.getReader()`。

    请注意，我们不能同时使用这些方法来读取相同的响应。要么使用流读取器，要么使用 reponse 方法来获得响应结果。
2. 在阅读之前，我们可以从 `Content-Length` 头中找出完整的响应长度。

    跨域请求可能不存在这个（请参见 <info:fetch-crossorigin>），并且从技术上讲，服务器可以不设置它。但是通常情况下响应头中都会存在。
3. 调用 `await reader.read()` 直到它已经完成。

    我们将响应的数据 `chunks` 收集到数组中。这很重要，因为当响应结束后，我们就不能再使用 `response.json()` 或者 其他方法（你可以试试，它将会出错）去“重新读取”它。
4. 最后，我们有了一个 `Uint8Array` 字节块数组。我们需要将这些块合并成一个响应结果。但不幸的是，没有一个方法来合并它们，所以这里需要一些代码来实现：
    1. 我们创建 `new Uint8Array(receivedLength)` —— 一个具有所有数据块合并后的长度的同类型数组。
    2. 然后使用 `.set(chunk, position)` 方法从数组中一个个复制这些 `chunk`。
5. 我们的结果现在储存在 `chunksAll` 中。它是字节组成的数组而不是字符串。

    要创建字符串，我们需要解析这些字节。可以使用内置的 [TextDecoder](info:text-decoder) 对象来操作。然后我们就可以对其使用 `JSON.parse`。

    如果我们需要二进制内容而不是 JSON 呢？这甚是简单。只需要调用所有块中的 blob 来代替步骤 4 和步骤 5。
=======
Let's explain that step-by-step:

1. We perform `fetch` as usual, but instead of calling `response.json()`, we obtain a stream reader `response.body.getReader()`.

    Please note, we can't use both these methods to read the same response: either use a reader or a response method to get the result.
2. Prior to reading, we can figure out the full response length from the `Content-Length` header.

    It may be absent for cross-origin requests (see chapter <info:fetch-crossorigin>) and, well, technically a server doesn't have to set it. But usually it's at place.
3. Call `await reader.read()` until it's done.

    We gather response chunks in the array `chunks`. That's important, because after the response is consumed, we won't be able to "re-read" it using `response.json()` or another way (you can try, there'll be an error).
4. At the end, we have `chunks` -- an array of `Uint8Array` byte chunks. We need to join them into a single result. Unfortunately, there's no single method that concatenates those, so there's some code to do that:
    1. We create `chunksAll = new Uint8Array(receivedLength)` -- a same-typed array with the combined length.
    2. Then use `.set(chunk, position)` method to copy each `chunk` one after another in it.
5. We have the result in `chunksAll`. It's a byte array though, not a string.

    To create a string, we need to interpret these bytes. The built-in [TextDecoder](info:text-decoder) does exactly that. Then we can `JSON.parse` it, if necessary.

    What if we need binary content instead of a string? That's even simpler. Replace steps 4 and 5 with a single line that creates a `Blob` from all chunks:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
    ```js
    let blob = new Blob(chunks);
    ```

<<<<<<< HEAD
最终我们将得到结果（以 string 或者 blob 呈现，什么方便就用什么）以及进程中的跟踪进度。

再一次提醒，这个进度仅仅是对于 *download* 来说的而不是 *upload* 过程（`fetch` 目前还没办法做到这点）。
=======
At the end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

Once again, please note, that's not for *upload* progress (no way now with `fetch`), only for *download* progress.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
