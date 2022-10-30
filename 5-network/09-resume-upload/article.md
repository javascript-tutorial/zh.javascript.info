# 可恢复的文件上传

使用 `fetch` 方法来上传文件相当容易。

连接断开后如何恢复上传？这里没有对此的内建选项，但是我们有实现它的一些方式。

对于大文件（如果我们可能需要恢复），可恢复的上传应该带有上传进度提示。由于 `fetch` 不允许跟踪上传进度，我们将会使用 [XMLHttpRequest](info:xmlhttprequest)。

## 不太实用的进度事件

要恢复上传，我们需要知道在连接断开前已经上传了多少。

我们有 `xhr.upload.onprogress` 来跟踪上传进度。

不幸的是，它不会帮助我们在此处恢复上传，因为它会在数据 **被发送** 时触发，但是服务器是否接收到了？浏览器并不知道。

或许它是由本地网络代理缓冲的（buffered），或者可能是远程服务器进程刚刚终止而无法处理它们，亦或是它在中间丢失了，并没有到达服务器。

这就是为什么此事件仅适用于显示一个好看的进度条。

要恢复上传，我们需要 **确切地** 知道服务器接收的字节数。而且只有服务器能告诉我们，因此，我们将发出一个额外的请求。

## 算法

1. 首先，创建一个文件 id，以唯一地标识我们要上传的文件：
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    在恢复上传时需要用到它，以告诉服务器我们要恢复的内容。

    如果名称，或大小，或最后一次修改时间发生了更改，则将有另一个 `fileId`。

2. 向服务器发送一个请求，询问它已经有了多少字节，像这样：
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // 服务器已有的字节数
    let startByte = +await response.text();
    ```

    这假设服务器通过 `X-File-Id` header 跟踪文件上传。应该在服务端实现。

    如果服务器上尚不存在该文件，则服务器响应应为 `0`。

3. 然后，我们可以使用 `Blob` 和 `slice` 方法来发送从 `startByte` 开始的文件：
    ```js
    xhr.open("POST", "upload", true);

    // 文件 id，以便服务器知道我们要恢复的是哪个文件
    xhr.setRequestHeader('X-File-Id', fileId);

    // 发送我们要从哪个字节开始恢复，因此服务器知道我们正在恢复
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // 文件可以是来自 input.files[0]，或者另一个源
    xhr.send(file.slice(startByte));
    ```

    这里我们将文件 id 作为 `X-File-Id` 发送给服务器，所以服务器知道我们正在上传哪个文件，并且，我们还将起始字节作为 `X-Start-Byte` 发送给服务器，所以服务器知道我们不是重新上传它，而是恢复其上传。

    服务器应该检查其记录，如果有一个上传的该文件，并且当前已上传的文件大小恰好是 `X-Start-Byte`，那么就将数据附加到该文件。


这是用 Node.js 写的包含客户端和服务端代码的示例。

在本网站上，它只有部分能工作，因为 Node.js 位于另一个服务 Nginx 后面，该服务器缓冲（buffer）上传的内容，当完全上传后才将其传递给 Node.js。

但是你可以下载这些代码，在本地运行以进行完整演示：

[codetabs src="upload-resume" height=200]

正如我们所看到的，现代网络方法在功能上已经与文件管理器非常接近 —— 控制 header，进度指示，发送文件片段等。

我们可以实现可恢复的上传等。
