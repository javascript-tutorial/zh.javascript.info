
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 拦截写入属性操作
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 添加成功
numbers.push(2); // 添加成功
console.log("Length is: " + numbers.length); // 2

numbers.push("test"); // TypeError（proxy 的 'set' 返回 false）

console.log("This line is never reached (error in the line above)");