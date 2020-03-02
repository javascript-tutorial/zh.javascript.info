
发生了错误是因为 `ask` 获得的是没有绑定对象的 `loginOk/loginFail` 函数。

当 `ask` 调用这两个函数时，它们自然会认定 `this=undefined`。

让我们 `bind` 上下文：

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
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

现在它能正常工作了。

另一个可替换解决方案是：
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

通常这也能正常工作，也看起来挺好的。

但是可能会在更复杂的场景下失效，例如变量 `user` 在调用 `askPassword` 之后但在访问者应答和调用 `() => user.loginOk()` 之前被修改。
