
new Promise(function() {
    noSuchFunction(); // 这里出现 error（没有这个函数）
  })
    .then(() => {
      // 一个或多个成功的 promise 处理程序
    }); // 尾端没有 .catch！
