**错误**!

试一下：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

大多数浏览器中的错误信息并不能说明出现了什么问题。

**出现此错误是因为在 `user = {...}` 之后遗漏了一个分号。**

<<<<<<< HEAD
JavaScript 不会在括号 `(user.go)()` 前自动插入分号，所以解析的代码如下：
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD
那么，我们可以看到这样一个连接的表达式，在语法构成上，把对象 `{ go: ... }` 作为一个方法调用，并且传递的参数为 `(user.go)`。并且让 `let user`在同一行赋值，因此 `user` 没被定义（之前）就会出现错误 
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

如果我们插入该分号，一切都会正常：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD
要注意的是 `(user.go)` 内的括号没有什么意义。通常用它们来设置操作的顺序，但在这里点 `.` 总是会先执行，所以并没有什么影响。分号是唯一重要的。






=======
Please note that brackets around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
