
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
  }
  
  let generator = generateSequence();
  
  let res;
  res = generator.next();
  console.log(JSON.stringify(res)); // {value: 1, done: false}

  res = generator.next();
  console.log(JSON.stringify(res));

  res = generator.next();
  console.log(JSON.stringify(res));

/*
{"value":1,"done":false}
{"value":2,"done":false}
{"value":3,"done":true}
*/

  res = generator.next();
  console.log(JSON.stringify(res));
  /*
  {"done":true}
*/

  res = generator.next();
  console.log(JSON.stringify(res));
  /*
  {"done":true}
*/
