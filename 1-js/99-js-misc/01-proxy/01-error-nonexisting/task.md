<<<<<<< HEAD
# 读取不存在的属性时出错

通常，尝试读取不存在的属性会返回 `undefined`。

创建一个代理，在尝试读取不存在的属性时，该代理抛出一个错误。

这可以帮助及早发现编程错误。

编写一个函数 `wrap(target)`，该函数接受一个 `target` 对象，并返回添加此方面功能的代理（proxy）。

其工作方式应如下：
=======
# Error on reading non-existent property

Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: Property doesn't exist "age"
*/!*
```
