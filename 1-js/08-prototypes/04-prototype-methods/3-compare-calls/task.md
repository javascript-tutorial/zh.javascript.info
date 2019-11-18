importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md
# 调用方式的差异
=======
# The difference between calls
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

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
