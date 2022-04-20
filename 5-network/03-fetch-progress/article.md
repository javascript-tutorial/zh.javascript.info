
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
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

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
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2：获得总长度（length）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前接收到了这么多字节
let chunks = []; // 接收到的二进制块的数组（包括 body）
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4：将块连接到单个 Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Step 5：解码成字符串
let result = new TextDecoder("utf-8").decode(chunksAll);

// 我们完成啦！
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

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
    ```js
    let blob = new Blob(chunks);
    ```

最后，我们得到了结果（以字符串或 blob 的形式表示，什么方便就用什么），并在过程中对进度进行了跟踪。

再强调一遍，这不能用于 **上传** 过程（现在无法通过 `fetch` 获取），仅用于 **下载** 过程。

另外，如果大小未知，我们应该检查循环中的 `receivedLength`，一旦达到一定的限制就将其中断。这样 `chunks` 就不会溢出内存了。
