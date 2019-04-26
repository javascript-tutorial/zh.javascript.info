这是因为子类的构造函数必须调用 `super()`。

这里是正确的代码：

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
let rabbit = new Rabbit("White Rabbit"); // ok now
*/!*
alert(rabbit.name); // White Rabbit
```


