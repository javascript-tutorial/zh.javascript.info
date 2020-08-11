
第一个调用中 `this == rabbit`，其他的 `this` 等同于 `Rabbit.prototype`，因为 `this` 就是点符号前面的对象。

所以，只有第一个调用显示 `Rabbit`，其他的都显示的是 `undefined`：

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
