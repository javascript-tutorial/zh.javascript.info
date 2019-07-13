
# 用 async/await 来重写「rethrow」

下面你可以看到 <info:promise-chaining> 章节中的「rethrow」例子。让我们来用 `async/await` 来替换 `.then/catch`。

同时我们可以在 `demoGithubUser` 中用循环代替递归：`async/await` 让这将变得更加容易。

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// 查询用户名直到 github 返回一个合法的用户
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
