
function makeCounter() {
  // 不需要这个了
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let ct = makeCounter();
console.log( ct() ); // 0
console.log( ct() ); // 1
