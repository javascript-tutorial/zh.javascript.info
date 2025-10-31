
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // 如果缓存中有对应的结果
      return cache.get(x); // 从缓存中读取结果
    }

    let result = func(x);  // 否则就调用 func

    cache.set(x, result);  // 然后将结果缓存（记住）下来
    return result;
  };
}

slow = cachingDecorator(slow);

console.log( slow(1) ); // slow(1) 被缓存下来了，并返回结果
console.log( "Again: " + slow(1) ); // 返回缓存中的 slow(1) 的结果

console.log( slow(2) ); // slow(2) 被缓存下来了，并返回结果
console.log( "Again: " + slow(2) ); // 返回缓存中的 slow(2) 的结果
