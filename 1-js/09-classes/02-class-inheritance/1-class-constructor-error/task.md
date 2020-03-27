importance: 5

---

# 创建实例时出错

这里有一份 `Rabbit` 扩展 `Animal` 的代码。

不幸的是，`Rabbit` 对象无法被创建。是哪里出错了呢？请解决它。
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
