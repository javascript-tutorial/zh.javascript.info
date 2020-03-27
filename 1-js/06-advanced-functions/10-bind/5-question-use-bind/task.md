importance: 5

---

# 修复丢失了 "this" 的函数

下面代码中对 `askPassword()` 的调用将会检查 password，然后基于结果调用 `user.loginOk/loginFail`。

但是它导致了一个错误。为什么？

修改高亮的行，以使所有内容都能正常工作（其它行不用修改）。

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
