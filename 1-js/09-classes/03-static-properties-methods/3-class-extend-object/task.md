importance: 3

---

# 类扩展自对象？

正如我们所知道的，所有的对象通常都继承自 `Object.prototype`，并且可以访问“通用”对象方法，例如 `hasOwnProperty` 等。

例如：

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty 方法来自于 Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

但是，如果我们像这样 `"class Rabbit extends Object"` 把它明确地写出来，那么结果会与简单的 `"class Rabbit"` 有所不同么？

不同之处在哪里？

下面是此类的示例代码（它无法正常运行 —— 为什么？修复它？）：

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
