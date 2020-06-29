<<<<<<< HEAD
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
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    在恢复上传时需要用到它，以告诉服务器我们要恢复的内容。

    如果名称，或大小，或最后一次修改事件发生了更改，则将有另一个 `fileId`。

2. 向服务器发送一个请求，询问它已经有了多少字节，像这样：
=======
# Resumable file upload

With `fetch` method it's fairly easy to upload a file.

How to resume the upload after lost connection? There's no built-in option for that, but we have the pieces to implement it.

Resumable uploads should come with upload progress indication, as we expect big files (if we may need to resume). So, as `fetch` doesn't allow to track upload progress, we'll use [XMLHttpRequest](info:xmlhttprequest).

## Not-so-useful progress event

To resume upload, we need to know how much was uploaded till the connection was lost.

There's `xhr.upload.onprogress` to track upload progress.

Unfortunately, it won't help us to resume the upload here, as it triggers when the data is *sent*, but was it received by the server? The browser doesn't know.

Maybe it was buffered by a local network proxy, or maybe the remote server process just died and couldn't process them, or it was just lost in the middle and didn't reach the receiver.

That's why this event is only useful to show a nice progress bar.

To resume upload, we need to know *exactly* the number of bytes received by the server. And only the server can tell that, so we'll make an additional request.

## Algorithm

1. First, create a file id, to uniquely identify the file we're going to upload:
    ```js
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    That's needed for resume upload, to tell the server what we're resuming.

    If the name or the size or the last modification date changes, then there'll be another `fileId`.

2. Send a request to the server, asking how many bytes it already has, like this:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

<<<<<<< HEAD
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
=======
    // The server has that many bytes
    let startByte = +await response.text();
    ```

    This assumes that the server tracks file uploads by `X-File-Id` header. Should be implemented at server-side.

    If the file doesn't yet exist at the server, then the server response should be `0`

3. Then, we can use `Blob` method `slice` to send the file from `startByte`:
    ```js
    xhr.open("POST", "upload", true);

    // File id, so that the server knows which file we upload
    xhr.setRequestHeader('X-File-Id', fileId);

    // The byte we're resuming from, so the server knows we're resuming
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

<<<<<<< HEAD
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

As we can see, modern networking methods are close to file managers in their capabilities -- control over headers, progress indicator, sending file parts, etc.

We can implement resumable upload and much more.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
