
new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => console.log("Promise ready")) // 先触发
  .catch(err => console.log(err));  // <-- .catch 显示这个 error
  