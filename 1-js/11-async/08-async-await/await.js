
async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // 等待，直到 promise resolve (*)
  
    console.log(result); // "done!"
  }
  
f();
