class Uploader {

  constructor({file, onProgress}) {
    this.file = file;
    this.onProgress = onProgress;

<<<<<<< HEAD
    // 创建文件的唯一标识 fileId
    // 我们还可以添加用户会话标识符（如果有的话）来使它更唯一
=======
    // create fileId that uniquely identifies the file
    // we could also add user session identifier (if had one), to make it even more unique
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
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

<<<<<<< HEAD
    // 发送文件 id，这样服务器就知道要恢复哪个文件
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // 发送我们开始进行恢复的起点字节（即之前已经上传的字节数），这样服务器就知道我们正在恢复中
=======
    // send file id, so that the server knows which file to resume
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // send the byte we're resuming from, so the server knows we're resuming
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
    xhr.setRequestHeader('X-Start-Byte', this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("send the file, starting from", this.startByte);
    xhr.send(this.file.slice(this.startByte));

<<<<<<< HEAD
    // 返回值
    //   如果 upload 成功，返回 true，
    //   如果终止，返回 false
    // 如果出现错误，抛出
=======
    // return
    //   true if upload was successful,
    //   false if aborted
    // throw in case of an error
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
    return await new Promise((resolve, reject) => {

      xhr.onload = xhr.onerror = () => {
        console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Upload failed: " + xhr.statusText));
        }
      };

<<<<<<< HEAD
      // 仅在 xhr.abort() 被调用后才会触发 onabort
=======
      // onabort triggers only when xhr.abort() is called
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
