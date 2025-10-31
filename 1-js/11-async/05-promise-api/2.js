
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
  ];
  
  // 将每个 url 映射（map）到 fetch 的 promise 中
  let requests = urls.map(url => fetch(url));
  
  // Promise.all 等待所有任务都 resolved
  Promise.all(requests)
    .then(responses => responses.forEach(
      response => console.log(`${response.url}: ${response.status}`)
    ));
