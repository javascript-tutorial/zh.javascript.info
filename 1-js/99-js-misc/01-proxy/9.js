
function delay(f, ms) {
    return new Proxy(f, 
        {
            apply(target, thisArg, args) {
                setTimeout(() => target.apply(thisArg, args), ms);
            }
        }
    );
  }
  
  function sayHi(user) {
    console.log(`Hello, ${user}!`);
  }

  console.log(sayHi.length);
  // 1
  
  sayHi = delay(sayHi, 1000);
  
  console.log(sayHi.length); // 1 (*) proxy 将“获取 length”的操作转发给目标对象
  
  sayHi("John"); // Hello, John!（3 秒后）
