
# Fetch：下载过程

The `fetch` method allows to track *download* progress.

Please note: there's currently no way for `fetch` to track *upload* progress. For that purpose, please use [XMLHttpRequest](info:xmlhttprequest), we'll cover it later.

To track download progress, we can use `response.body` property. It's a "readable stream" -- a special object that provides body chunk-by-chunk, as it comes.

Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can count how much is consumed at any moment.

Here's the sketch of code that reads the reponse from `response.body`:

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();

// 无限循环执行直到 body 下载完成
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // value 是存放块字节码的 Uint8Array
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

The result of `await reader.read()` call is an object with two properties:
- **`done`** —— 当块全部下载完毕时，其值为 true。
- **`value`** —— 一个存放字节码的类型数组：`Uint8Array`。

We wait for more chunks in the loop, until `done` is `true`.

To log the progress, we just need for every `value` add its length to the counter.

Here's the full code to get response and log the progress, more explanations follow:

```js run async
// Step 1：启动 fetch 并赋值给 reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2：获取总长度（总块数）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前长度
let chunks = []; // 存放接收到的二进制块的数组（包括 body）
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4：将块合并成单个 Uint8Array
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

    What if we need binary content instead of JSON? That's even simpler. Replace steps 4 and 5 with a single call to a blob from all chunks:
    ```js
    let blob = new Blob(chunks);
    ```

At we end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

Once again, please note, that's not for *upload* progress (no way now with `fetch`), only for *download* progress.
