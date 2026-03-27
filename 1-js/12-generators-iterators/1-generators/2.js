
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  let generator = generateSequence();
  
  for(let value of generator) {
    console.log(value); // 1，然后是 2，然后是 3
  }