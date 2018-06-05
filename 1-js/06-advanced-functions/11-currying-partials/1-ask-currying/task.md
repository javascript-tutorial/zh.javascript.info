importance: 5

---

# 偏函数在登陆中的应用

这个任务是比 <info:task/question-use-bind> 略微复杂的变体。

`user` 对象被修改了。现在不是两个函数 `loginOk/loginFail`,现在只有一个函数 `user.login(true/false)`。

以下代码中，向 `askPassword` 传入什么参数，使得 `user.login(true)` 结果是 `ok`，`user.login(fasle)` 结果是 `fail`？

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

你只能更改高亮部分代码。

