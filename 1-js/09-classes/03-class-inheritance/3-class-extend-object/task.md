importance: 5

---

# 类继承自对象？

正如我们所知道的那样，所有的对象通常都继承自 `Object.prototype`，并且可以访问像 `hasOwnProperty` 那样的通用方法。

举个例子:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty 方法来自 Object.prototype
// rabbit.__proto__ === Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

但是如果我们明确的拼出 `"class Rabbit extends Object"`，那么结果会和简单的 `"class Rabbit"` 有所不同么？

如果有的话，不同之处又在哪？

这里是示例代码（它确实无法运行了，原因是什么？请解决它）：

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```


