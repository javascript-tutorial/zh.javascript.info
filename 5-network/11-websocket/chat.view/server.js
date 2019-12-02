/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/

const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({noServer: true});

const clients = new Set();

function accept(req, res) {

  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
<<<<<<< HEAD
      // 可以是 Connection: keep-alive, Upgrade
=======
      // can be Connection: keep-alive, Upgrade
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
      req.headers.connection.match(/\bupgrade\b/i)) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') { // index.html
    fs.createReadStream('./index.html').pipe(res);
<<<<<<< HEAD
  } else { // 页面不存在
=======
  } else { // page not found
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on('message', function(message) {
    log(`message received: ${message}`);

<<<<<<< HEAD
    message = message.slice(0, 50); // 最大消息长度为 50
=======
    message = message.slice(0, 50); // max message length will be 50
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    log(`connection closed`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(accept).listen(8080);
} else {
<<<<<<< HEAD
  // 嵌入 javascript.info
=======
  // to embed into javascript.info
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}
