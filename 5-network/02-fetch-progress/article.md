
# Fetch：下载过程

`fetch` 方法允许去追踪其下载过程。

请注意：到目前为止，对于 `fetch` 方法的上传过程，还没有方法去追踪它。基于这个目的，请使用 [XMLHttpRequest](info:xmlhttprequest)。

我们可以使用 `response.body` 属性来追踪下载过程。它是一个“可读流（readable stream）”——提供一个个响应体块的特殊对象，当他们在下载的时候，我们可以知道当前有多少块是可用的。

下面是使用它来读取 response 的代码草图：

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();

// 当 body 在下载过程中无限循环
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // 块字节的值是 Uint8Array
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

所以，当 `await reader.read()` 返回 response 块时，我们始终循环它。

块（chunk）有两个属性：
- **`done`** —— 当块全部下载完毕时，其值为 true。
- **`value`** —— 一个类型化的字节数组：`Uint8Array`。

我们只需要统计块的数量来记录它的进度。

以下是获取响应和记录进度的完整代码，更多解释如下：

```js run async
// Step 1：启动 fetch 并赋值给 reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2：获取总长度（总块数）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前长度
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

// Step 4：将块连接成单个 Uint8Array
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

    请注意，我们不能同时使用这些方法来读取相同的响应。使用阅读器（reader）或响应方法来获得结果。
2. 在阅读之前，我们可以从 `Content-Length` 头中找出完整的响应长度。

    跨域请求可能不存在这个（请参见 <info:fetch-crossorigin>），并且从技术上讲，服务器可以不设置它。但是通常情况下响应头中都会存在。
3. 调用 `await reader.read()` 直到它已经完成。

    我们将响应的数据 `chunks` 收集到数组中。这很重要，因为当响应结束后，我们就不能再使用 `response.json()` 或者 其他方法（你可以试试，它将会出错）去“重新读取”它。
4. 在最后阶段，我们拥有以 `Uint8Array` 字节填充的 `chunks` 数组。我们需要将这些快合并成一个完整的结果。不幸的是，现阶段还没有一种单一的方法来连接它们，所以我们通过一些代码来完成它：
    1. 我们创建 `new Uint8Array(receivedLength)` —— 具有组合长度的相同类型的数组。
    2. 然后使用 `.set(chunk, position)` 方法从数组中一个个复制这些 `chunk`。
5. 我们的结果现在储存在 `chunksAll` 中。它是字节组成的数组而不是字符串。

    要创建字符串，我们需要解析这些字节。可以使用内置的 [TextDecoder](info:text-decoder) 对象来操作。然后我们就可以对其使用 `JSON.parse`。

如果我们需要二进制内容而不是 JSON 那该怎么办？这个问题甚至比上面还简单。我们可以创建一个包含所有 chunks 的 blob，而不是使用步骤 4 和步骤 5： 
```js
let blob = new Blob(chunks);
```

请注意，这个进度仅仅是对于下载来说的，而对于上传目前仍然没有办法追踪。
