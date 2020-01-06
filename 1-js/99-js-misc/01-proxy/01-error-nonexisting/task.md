<<<<<<< HEAD
# 读取不存在的属性时出错

通常，尝试读取不存在的属性会返回 `undefined`。

创建一个代理，在尝试读取不存在的属性时该代理抛出错误。

这可以帮助及早发现编程错误。

编写一个接受 `target` 对象，并返回添加此方面功能的 proxy 的 `wrap(target)` 函数。

应满足如下结果：
=======
# Error on reading non-existant property

Usually, an attempt to read a non-existant property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existant property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
<<<<<<< HEAD
      /* 你的代码 */
=======
      /* your code */
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
<<<<<<< HEAD
alert(user.age); // 错误：属性不存在
=======
alert(user.age); // ReferenceError: Property doesn't exist "age"
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*/!*
```
