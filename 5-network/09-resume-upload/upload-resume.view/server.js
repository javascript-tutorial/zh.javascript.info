let http = require('http');
let static = require('node-static');
let fileServer = new static.Server('.');
let path = require('path');
let fs = require('fs');
let debug = require('debug')('example:resume-upload');

let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = +req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

<<<<<<< HEAD
  // 我们将“无处”保存文件
  let filePath = '/dev/null';
  // 可以改用真实路径，例如
=======
  // we'll files "nowhere"
  let filePath = '/dev/null';
  // could use a real path instead, e.g.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

<<<<<<< HEAD
  // 初始化一个新上传
=======
  // initialize a new upload
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  let fileStream;

<<<<<<< HEAD
  // 如果 startByte 为 0 或者没设置，创建一个新文件，否则检查大小并附加到现有的大小
=======
  // if startByte is 0 or not set, create a new file, otherwise check the size and append to existing one
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    debug("New file created: " + filePath);
  } else {
<<<<<<< HEAD
    // 我们也可以检查磁盘上的文件大小以确保
=======
    // we can check on-disk file size as well to be sure
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
<<<<<<< HEAD
    // 附加到现有文件
=======
    // append to existing file
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    debug("File reopened: " + filePath);
  }


  req.on('data', function(data) {
    debug("bytes received", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

<<<<<<< HEAD
  // 将 request body 发送到文件
  req.pipe(fileStream);

  // 当请求完成，并且其所有数据都以写入完成
=======
  // send request body to file
  req.pipe(fileStream);

  // when the request is finished, and all its data is written
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  fileStream.on('close', function() {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      debug("Upload finished");
      delete uploads[fileId];

<<<<<<< HEAD
      // 可以在这里对上传的文件进行其他操作

      res.end("Success " + upload.bytesReceived);
    } else {
      // 连接断开，我们将未完成的文件保留在周围
=======
      // can do something else with the uploaded file here

      res.end("Success " + upload.bytesReceived);
    } else {
      // connection lost, we leave the unfinished file around
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
      debug("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

<<<<<<< HEAD
  // 如果发生 I/O error —— 完成请求
=======
  // in case of I/O error - finish the request
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
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
