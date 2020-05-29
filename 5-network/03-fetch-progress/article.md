
<<<<<<< HEAD
# Fetch：下载进度

`fetch` 方法允许去跟踪 **下载** 进度。

请注意：到目前为止，`fetch` 方法无法跟踪 **上传** 进度。对于这个目的，请使用 [XMLHttpRequest](info:xmlhttprequest)，我们在后面章节会讲到。

要跟踪下载进度，我们可以使用 `response.body` 属性。它是 `ReadableStream` —— 一个特殊的对象，它可以逐块（chunk）提供 body。在 [Streams API](https://streams.spec.whatwg.org/#rs-class) 规范中有对 `ReadableStream` 的详细描述。

与 `response.text()`，`response.json()` 和其他方法不同，`response.body` 给予了对进度读取的完全控制，我们可以随时计算下载了多少。

这是从 `response.body` 读取 response 的示例代码：

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();

// 在 body 下载时，一直为无限循环
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // value 是块字节的 Uint8Array
=======
# Fetch: Download progress

The `fetch` method allows to track *download* progress.

Please note: there's currently no way for `fetch` to track *upload* progress. For that purpose, please use [XMLHttpRequest](info:xmlhttprequest), we'll cover it later.

To track download progress, we can use `response.body` property. It's `ReadableStream` -- a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.

Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can count how much is consumed at any moment.

Here's the sketch of code that reads the reponse from `response.body`:

```js
// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading
while(true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

<<<<<<< HEAD
`await reader.read()` 调用的结果是一个具有两个属性的对象：
- **`done`** —— 当读取完成时为 `true`，否则为 `false`。
- **`value`** —— 字节的类型化数组：`Uint8Array`。

```smart
Streams API 还描述了如果使用 `for await..of` 循环异步迭代 `ReadableStream`，但是目前为止，它还未得到很好的支持（参见 [浏览器问题](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)），所以我们使用了 `while` 循环。
```

我们在循环中接收响应块（response chunk），直到加载完成，也就是：直到 `done` 为 `true`。

要将进度打印出来，我们只需要将每个接收到的片段 `value` 的长度（length）加到 counter 即可。

这是获取响应，并在控制台中记录进度的完整工作示例，下面有更多说明：

```js run async
// Step 1：启动 fetch，并获得一个 reader
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

<<<<<<< HEAD
// Step 2：获得总长度（length）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前接收到了这么多字节
let chunks = []; // 接收到的二进制块的数组（包括 body）
=======
// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
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
// Step 4：将块连接到单个 Uint8Array
=======
// Step 4: concatenate chunks into single Uint8Array
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

<<<<<<< HEAD
让我们一步步解释下这个过程：

1. 我们像往常一样执行 `fetch`，但不是调用 `response.json()`，而是获得了一个流读取器（stream reader）`response.body.getReader()`。

    请注意，我们不能同时使用这两种方法来读取相同的响应。要么使用流读取器，要么使用 reponse 方法来获取结果。
2. 在读取数据之前，我们可以从 `Content-Length` header 中得到完整的响应长度。

    跨源请求中可能不存在这个 header（请参见 <info:fetch-crossorigin>），并且从技术上讲，服务器可以不设置它。但是通常情况下它都会在那里。
3. 调用 `await reader.read()`，直到它完成。

    我们将响应块收集到数组 `chunks` 中。这很重要，因为在使用完（consumed）响应后，我们将无法使用 `response.json()` 或者其他方式（你可以试试，将会出现 error）去“重新读取”它。
4. 最后，我们有了一个 `chunks` —— 一个 `Uint8Array` 字节块数组。我们需要将这些块合并成一个结果。但不幸的是，没有单个方法可以将它们串联起来，所以这里需要一些代码来实现：
    1. 我们创建 `chunksAll = new Uint8Array(receivedLength)` —— 一个具有所有数据块合并后的长度的同类型数组。
    2. 然后使用 `.set(chunk, position)` 方法，从数组中一个个地复制这些 `chunk`。
5. 我们的结果现在储存在 `chunksAll` 中。但它是一个字节数组，不是字符串。

    要创建一个字符串，我们需要解析这些字节。可以使用内建的 [TextDecoder](info:text-decoder) 对象完成。然后，我们可以 `JSON.parse` 它，如果有必要的话。

    如果我们需要的是二进制内容而不是字符串呢？这更简单。用下面这行代码替换掉第 4 和第 5 步，这行代码从所有块创建一个 `Blob`：
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    ```js
    let blob = new Blob(chunks);
    ```

<<<<<<< HEAD
最后，我们得到了结果（以字符串或 blob 的形式表示，什么方便就用什么），并在过程中对进度进行了跟踪。

再强调一遍，这不能用于 **上传** 过程（现在无法通过 `fetch` 获取），仅用于 **下载** 过程。
=======
At the end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

Once again, please note, that's not for *upload* progress (no way now with `fetch`), only for *download* progress.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
