
async function f() {

    try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
    } catch(err) {
      // 捕获到 fetch 和 response.json 中的错误
      console.log(err);
    }
  }
  
  f();