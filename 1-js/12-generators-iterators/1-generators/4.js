
let range = {
    from: 1,
    to: 5,
  
    *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
      for(let value = this.from; value <= this.to; value++) {
        yield value;
      }
    }
  };
  
  console.log( [...range] ); // 1,2,3,4,5