当然，有效，没有问题。

关键字 `const` 只保护变量本身不被改变。

换句话说，`user` 保存的是对象的引用。引用不能被改变。但是对象可以。

```js run
const user = {
  name: "John"
};

*!*
// 成功
user.name = "Pete";
*/!*

// 报错
user = 123;
```
