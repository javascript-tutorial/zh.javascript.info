
let range = {
    from: 1,
    to: 5,
  
    [Symbol.asyncIterator]() { // (1)
      return {
        current: this.from,
        last: this.to,
  
        async next() { // (2)
  
          // 注意：我们可以在 async next 内部使用 "await"
          await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
  
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  (async () => {
  
    for await (let value of range) { // (4)
      console.log(value); // 1,2,3,4,5
    }
  
  })()