importance: 5

---

# 为什么 this 会丢失

下面代码中对 `askPassword()` 的调用将会检查密码然后基于结果调用 `user.loginOk/loginFail`。

但是它导致了一个错误。为什么？

修改高亮的行来让一切开始正常运行（其它行不用修改）。

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk, user.loginFail);
*/!*
```


