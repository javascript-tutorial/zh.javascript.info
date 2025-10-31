
// must await, otherwise won't get result

// ERR

let response = fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// 获取一个 header
console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8

// 迭代所有 header
for (let [key, value] of response.headers) {
  console.log(`${key} = ${value}`);
}
