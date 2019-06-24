
发生了错误是因为 `ask` 的参数是没有绑定对象的 `loginOk/loginFail` 函数。

当它调用这两个函数，它们自然的会认定 `this=undefined`。

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

另一个可以用来替换的解决办法是：
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

<<<<<<< HEAD
通常情况下它也能正常运行，但是可能会在更复杂的场景下失效，例如在 asking 到运行 `() => user.loginOk()` 之间，`user` 可能会被重写。

=======
Usually that also works and looks good.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

It's a bit less reliable though in more complex situations where `user` variable might change *after* `askPassword` is called, but *before* the visitor answers and calls `() => user.loginOk()`. 
