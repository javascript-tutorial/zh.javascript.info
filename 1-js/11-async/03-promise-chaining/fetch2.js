
fetch('https://zh.javascript.info/article/promise-chaining/user.json')
.then(response => response.json())
.then(user => console.log(user.name)); // iliakan，获取到了用户名