**错误**!

试一下：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

大多数浏览器中的错误信息并不能说明是什么出现了问题。

**出现此错误是因为在 `user = {...}` 后面漏了一个分号。**

JavaScript 不会在括号 `(user.go)()` 前自动插入分号，所以解析的代码如下：

```js no-beautify
let user = { go:... }(user.go)()
```

然后我们还可以看到，这样的联合表达式在语法上是将对象 `{ go: ... }` 作为参数为 `(user.go)` 的函数。这发生在 `let user` 的同一行上，因此 `user` 对象是甚至还没有被定义，因此出现了错误。

如果我们插入该分号，一切都变得正常：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

要注意的是，`(user.go)` 外边这层括号在这没有任何作用。通常用它们来设置操作的顺序，但在这里点符号 `.` 总是会先执行，所以并没有什么影响。分号是唯一重要的。
