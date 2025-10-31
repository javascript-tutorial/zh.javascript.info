
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 500);
});

promise.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function(result) {
  console.log(result); // 1
  return result * 2;
});
