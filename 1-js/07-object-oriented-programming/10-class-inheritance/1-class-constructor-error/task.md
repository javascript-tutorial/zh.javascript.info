importance: 5

---

# 创建实例时出错

这里有一份代码，是 `Rabbit` 继承 `Animal`。

不幸的是，`Rabbit` 无法被创建，是哪里出错了呢？请解决这个问题

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


