这里有一行报错代码：

```js
Rabbit.prototype = Animal.prototype;
```

这里 `Rabbit.prototype` 和 `Animal.prototype` 变成了同样的对象。所以这两个类的方法都混合在了这个对象中。

结果， `Rabbit.prototype.walk` 重写了 `Animal.prototype.walk`，所以所有动物都开始跳：

```js run
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = Animal.prototype;
*/!*

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};

*!*
let animal = new Animal("pig");
animal.walk(); // pig bounces!
*/!*
```

正确的变体是：

```js
Rabbit.prototype.__proto__ = Animal.prototype;
// or like this:
Rabbit.prototype = Object.create(Animal.prototype);
```

这使原型分开，每个原型都存储相应类的方法，但是 `Rabbit.prototype` 继承自 `Animal.prototype`。
