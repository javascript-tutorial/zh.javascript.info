
class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      console.log(resolve);
      // 1000ms 后使用 this.num*2 进行 resolve
      setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
  }
  
  async function f() {
    // 等待 1 秒，之后 result 变为 2
    let result = await new Thenable(1);
    console.log(result);
  }
  
  f();
