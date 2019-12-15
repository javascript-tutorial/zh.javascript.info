# 读取不存在的属性时出错

通常，尝试读取不存在的属性会返回 `undefined`。

创建一个代理，在尝试读取不存在的属性时该代理抛出错误。

这可以帮助及早发现编程错误。

编写一个接受 `target` 对象的 `wrap(target)` 函数并返回添加此方面功能的 proxy。

应满足如下结果：

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* your code */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // Error: Property doesn't exist
*/!*
```
