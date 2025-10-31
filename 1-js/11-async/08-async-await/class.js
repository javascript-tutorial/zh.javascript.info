
class Waiter {
    async wait() {
      return await Promise.resolve(1);
    }
  }
  
  new Waiter()
    .wait()
    .then(console.log); // 1（alert 等同于 result => alert(result)）
