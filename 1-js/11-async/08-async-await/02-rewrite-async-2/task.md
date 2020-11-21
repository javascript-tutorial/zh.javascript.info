
# 使用 async/await 重写 "rethrow"

下面你可以看到 "rethrow" 的例子。让我们来用 `async/await` 重写它，而不是使用 `.then/catch`。

同时，我们可以在 `demoGithubUser` 中使用循环以摆脱递归：在 `async/await` 的帮助下很容易实现。

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
    });
}

// 询问用户名，直到 github 返回一个合法的用户
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
