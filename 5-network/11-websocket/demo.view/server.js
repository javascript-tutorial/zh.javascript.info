const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

function accept(req, res) {
<<<<<<< HEAD
  // 所有传入请求都是 websockets
=======
  // all incoming requests must be websockets
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }
<<<<<<< HEAD
  // 可以是 Connection: keep-alive, Upgrade
  if (req.headers.connection.match(/\bupgrade\b/i)) {
=======

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
<<<<<<< HEAD
    let name = message.match(/\w+$/) || "Guest";
    ws.send(`Hello, ${name}!`);
=======
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
    ws.send(`Hello from server, ${name}!`);
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

    setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
