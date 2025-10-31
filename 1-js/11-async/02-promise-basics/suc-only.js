
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(console.log); // 1 秒后显示 "done!"
