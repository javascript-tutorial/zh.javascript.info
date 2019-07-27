class Uploader {

  constructor({file, onProgress}) {
    this.file = file;
    this.onProgress = onProgress;

    // 创建文件的唯一标识 fileId
    // 我们还可以添加用户会话标识符（如果有的话）来使它更唯一
    this.fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
  }

  async getUploadedBytes() {
    let response = await fetch('status', {
      headers: {
        'X-File-Id': this.fileId
      }
    });

    if (response.status != 200) {
      throw new Error("Can't get uploaded bytes: " + response.statusText);
    }

    let text = await response.text();

    return +text;
  }

  async upload() {
    this.startByte = await this.getUploadedBytes();

    let xhr = this.xhr = new XMLHttpRequest();
    xhr.open("POST", "upload", true);

    // 发送文件 id，这样服务器就知道要恢复哪个文件
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // 发送我们正在恢复的字节（byte），这样服务器就知道我们正在恢复中
    xhr.setRequestHeader('X-Start-Byte', this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("send the file, starting from", this.startByte);
    xhr.send(this.file.slice(this.startByte));

    // 返回值
    //   如果 upload 成功，返回 true，
    //   如果终止，返回 false
    // 如果出现错误，抛出
    return await new Promise((resolve, reject) => {

      xhr.onload = xhr.onerror = () => {
        console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Upload failed: " + xhr.statusText));
        }
      };

      // 仅在 xhr.abort() 被调用后才会触发 onabort
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
