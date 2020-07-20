class Uploader {

  constructor({file, onProgress}) {
    this.file = file;
    this.onProgress = onProgress;

<<<<<<< HEAD
    // 创建唯一标识文件的 fileId
    // 我们还可以添加用户会话标识符（如果有的话），以使其更具唯一性
=======
    // create fileId that uniquely identifies the file
    // we could also add user session identifier (if had one), to make it even more unique
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
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
    // 发送文件 id，以便服务器知道要恢复哪个文件
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // 发送我们要从哪个字节开始恢复，因此服务器知道我们正在恢复
=======
    // send file id, so that the server knows which file to resume
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // send the byte we're resuming from, so the server knows we're resuming
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
    xhr.setRequestHeader('X-Start-Byte', this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("send the file, starting from", this.startByte);
    xhr.send(this.file.slice(this.startByte));

    // return
<<<<<<< HEAD
    //   true —— 如果上传成功，
    //   false —— 如果被中止
    // 出现 error 时将其抛出
=======
    //   true if upload was successful,
    //   false if aborted
    // throw in case of an error
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
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
      // onabort 仅在 xhr.abort() 被调用时触发
=======
      // onabort triggers only when xhr.abort() is called
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
