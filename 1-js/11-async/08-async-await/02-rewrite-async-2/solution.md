
这里没有什么技巧，只需要将 `demoGithubUser` 中的 `.catch` 替换为 `try...catch`，然后在需要的地方加上 `async/await` 即可：

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// 查询用户名直到 github 返回一个合法的用户
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("输入用户名？", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // 没有错误，退出循环
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // 循环将在警告后继续
        alert("没有此用户，请重新输入。");
      } else {
        // 未知错误, rethrow
        throw err;
      }
    }      
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
