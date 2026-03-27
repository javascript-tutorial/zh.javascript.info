
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log("resolve is ", resolve); // function() { native code }
    // 1 秒后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(console.log); // 1000ms 后显示 2
