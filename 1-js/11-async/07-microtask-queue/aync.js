
let promise = Promise.resolve();

promise.then(() => console.log("promise done!"));

console.log("code finished"); // 这个 alert 先显示
