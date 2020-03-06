这是因为子类的 constructor 必须调用 `super()`。

这里是修正后的代码：

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // 现在好了
*/!*
alert(rabbit.name); // White Rabbit
```
