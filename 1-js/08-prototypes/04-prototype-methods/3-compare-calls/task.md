importance: 5

---

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/3-compare-calls/task.md
# 调用方式的差异
=======
# The difference between calls
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

让我们创建一个新的 `rabbit` 对象：

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

以下调用得到的结果是否相同？

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
