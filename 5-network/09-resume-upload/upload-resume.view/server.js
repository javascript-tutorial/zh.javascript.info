let http = require('http');
let static = require('node-static');
let fileServer = new static.Server('.');
let path = require('path');
let fs = require('fs');
let debug = require('debug')('example:resume-upload');

let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

  // 文件位置 “nowhere”
  let filePath = '/dev/null';
  // 可以使用真实路径替代，例如：
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

  // 初始化新 upload
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  let fileStream;

  // 如果 startByte 是 0 或者没有设置，就创建一个新文件，否则检查文件大小并追加到已存在的文件上
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    debug("New file created: " + filePath);
  } else {
    // 我们也可以检查磁盘（on-disk）文件大小
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // 追加到已存在的文件上
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    debug("File reopened: " + filePath);
  }


  req.on('data', function(data) {
    debug("bytes received", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

  // 将请求体发送到文件
  req.pipe(fileStream);

  // 当请求完成时，所有数据都被写入磁盘
  fileStream.on('close', function() {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      debug("Upload finished");
      delete uploads[fileId];

      // 可以对上传的文件进行一些处理

      res.end("Success " + upload.bytesReceived);
    } else {
      // 连接丢失，我们留下未完成的文件
      debug("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  // 在 I/O 错误的情况下 —— 完成请求
  fileStream.on('error', function(err) {
    debug("fileStream error");
    res.writeHead(500, "File error");
    res.end();
  });

}

function onStatus(req, res) {
  let fileId = req.headers['x-file-id'];
  let upload = uploads[fileId];
  debug("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }
}


function accept(req, res) {
  if (req.url == '/status') {
    onStatus(req, res);
  } else if (req.url == '/upload' && req.method == 'POST') {
    onUpload(req, res);
  } else {
    fileServer.serve(req, res);
  }

}




// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server listening at port 8080');
} else {
  exports.accept = accept;
}
