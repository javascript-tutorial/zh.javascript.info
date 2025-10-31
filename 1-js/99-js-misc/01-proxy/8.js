
let range = {
    start: 1,
    end: 10
  };
  
  range = new Proxy(range, {
    has(target, prop) {
      return prop >= target.start && prop <= target.end;
    }
  });
  
  console.log(5 in range); // true
  console.log(50 in range); // false
