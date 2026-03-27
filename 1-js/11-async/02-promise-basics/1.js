
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1200);

//   setTimeout(() => reject("sim err!"), 1100);
  setTimeout(() => reject(new Error("sim err!")), 1100);
});

// resolve 运行 .then 中的第一个函数
promise.then(
  result => console.log(result), // 
  error => console.log(error) //
);
