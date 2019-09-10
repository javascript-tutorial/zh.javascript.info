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

JavaScript 不会在括号 `(user.go)()` 前自动插入分号，所以解析的代码如下：

```js no-beautify
let user = { go:... }(user.go)()
```

那么，我们可以看到这样一个连接的表达式，在语法构成上，把对象 `{ go: ... }` 作为一个方法调用，并且传递的参数为 `(user.go)`。并且让 `let user`在同一行赋值，因此 `user` 没被定义（之前）就会出现错误 

如果我们插入该分号，一切都会正常：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

要注意的是 `(user.go)` 内的括号没有什么意义。通常用它们来设置操作的顺序，但在这里点 `.` 总是会先执行，所以并没有什么影响。分号是唯一重要的。






