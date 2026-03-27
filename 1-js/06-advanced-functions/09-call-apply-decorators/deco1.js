
let worker = {

  someMethod() {
    return 1;
  },

  slow(x) {
    // 可怕的 CPU 过载任务
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  }

};

// 和之前例子中的代码相同
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }

    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

console.log( worker.slow(1) ); // 原始方法有效

worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存

console.log( worker.slow(2) ); // 蛤！Error: Cannot read property 'someMethod' of undefined
