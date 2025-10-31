
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000)
})
  .finally(() => console.log("Promise ready")) // 先触发
  .then(result => console.log(result)); // <-- .then 显示 "value"
