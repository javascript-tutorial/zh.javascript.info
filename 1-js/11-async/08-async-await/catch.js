
async function f() {

    try {
      let response = await fetch('http://no-such-url');
    } catch(err) {
      console.log(err); // TypeError: failed to fetch
    }
  }
  
  f();