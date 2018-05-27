当然，这没什么问题。

关键字`const`自保证对象本身不改变。 

换句话说， `user`保存着一个对对象的引用，引用不能被改变。但是对象可以。 

```js run
const user = {
  name: "John"
};

*!*
// works
user.name = "Pete";
*/!*

// error
user = 123;
```
