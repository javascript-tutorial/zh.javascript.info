# 读取不存在的属性时出错

通常，尝试读取不存在的属性会返回 `undefined`。

创建一个代理，在尝试读取不存在的属性时该代理抛出错误。

这可以帮助及早发现编程错误。

编写一个接受 `target` 对象，并返回添加此方面功能的 proxy 的 `wrap(target)` 函数。

应满足如下结果：

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
alert(user.age); // 错误：属性不存在
*/!*
```
