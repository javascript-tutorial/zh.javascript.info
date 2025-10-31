
let range = {
    from: 1,
    to: 5,
  
    // for..of range 在一开始就调用一次这个方法
    [Symbol.iterator]() {
      // ...它返回 iterator object：
      // 后续的操作中，for..of 将只针对这个对象，并使用 next() 向它请求下一个值
      return {
        current: this.from,
        last: this.to,
  
        // for..of 循环在每次迭代时都会调用 next()
        next() {
          // 它应该以对象 {done:.., value :...} 的形式返回值
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  // 迭代整个 range 对象，返回从 `range.from` 到 `range.to` 范围的所有数字
  console.log([...range]); // 1,2,3,4,5