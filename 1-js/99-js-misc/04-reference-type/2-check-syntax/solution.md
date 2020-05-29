**错误**!

试一下：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
大多数浏览器中的错误信息并不能说明是什么出现了问题。
=======
The error message in most browsers does not give us much of a clue about what went wrong.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

**出现此错误是因为在 `user = {...}` 后面漏了一个分号。**

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
JavaScript 不会在括号 `(user.go)()` 前自动插入分号，所以解析的代码如下：
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
然后我们还可以看到，这样的联合表达式在语法上是将对象 `{ go: ... }` 作为参数为 `(user.go)` 的函数。这发生在 `let user` 的同一行上，因此 `user` 对象是甚至还没有被定义，因此出现了错误。
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

如果我们插入该分号，一切都变得正常：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
要注意的是，`(user.go)` 外边这层括号在这没有任何作用。通常用它们来设置操作的顺序，但在这里点符号 `.` 总是会先执行，所以并没有什么影响。分号是唯一重要的。
=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
