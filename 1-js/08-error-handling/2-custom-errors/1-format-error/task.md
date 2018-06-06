importance: 5

---

# 继承 SyntaxError

创造一个继承自内置类 `SyntaxError` 的 `FormatError` 类。

它应该支持 `message`、 `name` 和 `stack` 属性。

用例：

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // truea
alert( err instanceof SyntaxError ); // true (因为它继承自 SyntaxError)
``` 
