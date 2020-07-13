importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md
# 调用方式的差异
=======
# The difference between calls
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

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

以下调用做的是相同的事儿还是不同的？

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
