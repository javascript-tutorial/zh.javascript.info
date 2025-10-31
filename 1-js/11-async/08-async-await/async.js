
function f0() {
    return 1;
  }

async function f() {
    return 1;
  }
  
f0();
// console.log(f0.prototype);
// console.log(f0.__proto__);

f().then(console.log); // 1
