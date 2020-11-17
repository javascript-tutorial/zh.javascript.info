# 读取不存在的属性时出错

通常，尝试读取不存在的属性会返回 `undefined`。

创建一个代理，在尝试读取不存在的属性时，该代理抛出一个错误。

这可以帮助及早发现编程错误。

编写一个函数 `wrap(target)`，该函数接受一个 `target` 对象，并返回添加此方面功能的代理（proxy）。

其工作方式应如下：

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* 你的代码 */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: Property doesn't exist: "age"
*/!*
```
