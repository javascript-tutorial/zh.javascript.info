
async function* generateSequence(start, end) {

    for (let i = start; i <= end; i++) {
  
      // 哇，可以使用 await 了！
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      yield i;
    }
  
  }
  
  (async () => {
  
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
      console.log(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 console.log 之间有延迟）
    }
  
  })();