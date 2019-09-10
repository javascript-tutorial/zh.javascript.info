
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
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

`await reader.read()` 的结果是一个具有两个属性的对象：
- **`done`** —— 当块全部下载完毕时，其值为 true。
- **`value`** —— 一个存放字节码的类型数组：`Uint8Array`。

我们在循环中等待更多的块（chunk），直到 `done` 是 `true`。

要打印 progress 的话，我们只需向 counter 添加每个 `value` 的长度。

这是完整的获取响应并打印进度的代码，更多解释如下：

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

    如果我们需要二进制内容而不是 JSON 呢？这甚是简单。只需要调用所有块中的 blob 来代替步骤 4 和步骤 5。
    ```js
    let blob = new Blob(chunks);
    ```

最终我们将得到结果（以 string 或者 blob 呈现，什么方便就用什么）以及进程中的跟踪进度。

再一次提醒，这个进度仅仅是对于 *download* 来说的而不是 *upload* 过程（`fetch` 目前还没办法做到这点）。
