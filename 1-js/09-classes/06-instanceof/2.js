
// 特定于环境的对象和类的 toStringTag：
// console.log( window[Symbol.toStringTag]); // Window
// console.log( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

console.log( {}.toString.call(window) ); // [object Window]
console.log( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
