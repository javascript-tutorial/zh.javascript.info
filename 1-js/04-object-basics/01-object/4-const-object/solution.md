当然，这没什么问题。

关键字 `const` 保证存储对象的变量不改变。

换句话说，`user` 保存着一个对对象的引用，引用不能被改变。但是对象可以。

```js run
const user = {
  name: "John"
};

*!*
// 成功
user.name = "Pete";
*/!*

// 错误
user = 123;
```
