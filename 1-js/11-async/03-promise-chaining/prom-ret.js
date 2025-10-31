
new Promise(function(resolve, reject) {
    // console.log(this);

  setTimeout(() => resolve(1), 500);

}).then(function(result) {

  console.log(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 500);
  });

}).then(function(result) { // (**)

  console.log(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 500);
  });

}).then(function(result) {

  console.log(result); // 4

});
