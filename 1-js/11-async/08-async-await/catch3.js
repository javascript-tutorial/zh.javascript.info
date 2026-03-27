
async function f() {
    let response = await fetch('http://no-such-url');
  }
  
  // f() 变成了一个 rejected 的 promise
  f().catch(console.log); // TypeError: failed to fetch // (*)
