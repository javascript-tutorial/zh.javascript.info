
( async function(){

let user = {
    name: 'John',
    surname: 'Smith'
  };
  
  let response = await fetch('https://zh.javascript.info/article/fetch/post/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();
  console.log(result.message);
  console.dir(result);

} )();