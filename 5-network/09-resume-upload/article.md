<<<<<<< HEAD
# 可恢复的（resumable）文件上传

使用 `fetch` 方法来上传文件相当容易。

当文件上传过程中连接丢失，此时如何恢复上传呢？目前还没有针对此问题的内建选项，但是我们有实现它的一些方法。

当我们上传大型文件的时候（如果我们可能需要恢复），我们期待可恢复上传应带有上传进度指示。由于 `fetch` 不允许追踪上传进度，我们将会使用 [XMLHttpRequest](info:xmlhttprequest)。

## 不太实用的进度事件

要恢复上传，我们需要知道在连接丢失前已经上传了多少。

我们有 `xhr.upload.onprogress` 来追踪上传进程。

不幸的是，它在这里没什么作用，它在数据发送 **sent** 完成时触发，但是它真的被服务器接收了吗？浏览器并不知道。

或许它只是被本地代理缓冲（buffered），或是有可能远程服务器处理进程宕机无法处理它们，亦或是当连接断开时它刚刚从中间丢失，且没有到达服务器。

因此，这个事件只是对于显示一个漂亮的进度条来说很有用。

要恢复上传，我们需要知道服务器具体接收了多少字节。只有服务器能告诉我们它接收了多少。

## 算法

1. 首先，我们创建一个独一无二的标识符作为我们上传的文件 id，例如：
    ```js
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    这对恢复上传很有用，它能告诉服务器我们我们要恢复的文件是什么。

2. 发送请求到服务器，获取该文件已经上传了多少字节，就像这样：
=======
# Resumable file upload

With `fetch` method it's fairly easy to upload a file.

How to resume the upload after lost connection? There's no built-in option for that, but we have the pieces to implement it.

Resumable uploads should come with upload progress indication, as we expect big files (if we may need to resume). So, as `fetch` doesn't allow to track upload progress, we'll use [XMLHttpRequest](info:xmlhttprequest).

## Not-so-useful progress event

To resume upload, we need to know how much was uploaded till the connection was lost.

There's `xhr.upload.onprogress` to track upload progress.

Unfortunately, it's useless here, as it triggers when the data is *sent*, but was it received by the server? The browser doesn't know.

Maybe it was buffered by a local network proxy, or maybe the remote server process just died and couldn't process them, or it was just lost in the middle when the connection broke, and didn't reach the receiver.

So, this event is only useful to show a nice progress bar.

To resume upload, we need to know exactly the number of bytes received by the server. And only the server can tell that.

## Algorithm

1. First, we create a file id, to uniquely identify the file we're uploading, e.g.
    ```js
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    That's needed for resume upload, to tell the server what we're resuming.

2. Send a request to the server, asking how many bytes it already has, like this:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

<<<<<<< HEAD
    // 服务器已有的字节
    let startByte = +await response.text();
    ```

    这假设服务器通过 `X-File-Id` 头跟踪文件上传。应该在服务端实现。

3. 然后我们可以使用 `Blob` 方法 `slice` 来自 `startByte` 的要发送的文件：
    ```js
    xhr.open("POST", "upload", true);

    // 发送文件 id，这样服务器就能知道要恢复哪个文件
    xhr.setRequestHeader('X-File-Id', fileId);
    // 发送我们正在恢复的字节，因此服务器知道我们正在恢复文件
=======
    // The server has that many bytes
    let startByte = +await response.text();
    ```

    This assumes that the server tracks file uploads by `X-File-Id` header. Should be implemented at server-side.

3. Then, we can use `Blob` method `slice` to send the file from `startByte`:
    ```js
    xhr.open("POST", "upload", true);

    // send file id, so that the server knows which file to resume
    xhr.setRequestHeader('X-File-Id', fileId);
    // send the byte we're resuming from, so the server knows we're resuming
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

<<<<<<< HEAD
    // 文件可以来自于 input.files[0] 或者其他资源
    xhr.send(file.slice(startByte));
    ```

    这里我们将服务器的文件 id 作为 `X-File-Id` 发送，此时服务器就知道我们正在上传哪个文件，并且起始字节为 `X-Start-Byte`，因此服务器知道我们并不是从头开始上传，而是恢复文件。

    服务器应该检查它的记录，如果这个文件之前上传过且当前上传大小是 `X-Start-Byte`，此时将数据附加到原来文件上。


这是用 Node.js 写的客户端和服务端的 demo。

在这个网页上，它只有部分能工作，因为 Node.js 位于另一个服务 Nginx 后面，该服务器缓冲上传过程，当完全上传后才传递给 Node.js。

但是你可以下载这些代码，在本地运行以进行完整演示：

[codetabs src="upload-resume" height=200]

正如你所见，现代网络方法在功能上和文件管理器非常接近 —— 控制 headers，进度指示，发送文件片段等等。
=======
    // file can be from input.files[0] or another source
    xhr.send(file.slice(startByte));
    ```

    Here we send the server both file id as `X-File-Id`, so it knows which file we're uploading, and the starting byte as `X-Start-Byte`, so it knows we're not uploading it initially, but resuming.

    The server should check its records, and if there was an upload of that file, and the current uploaded size is exactly `X-Start-Byte`, then append the data to it.


Here's the demo with both client and server code, written on Node.js.

It works only partially on this site, as Node.js is behind another server named Nginx, that buffers uploads, passing them to Node.js when fully complete.

But you can download it and run locally for the full demonstration:

[codetabs src="upload-resume" height=200]

As you can see, modern networking methods are close to file managers in their capabilities -- control over headers, progress indicator, sending file parts, etc.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
