importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md
# 调用方式的差异
=======
# The difference between calls
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

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
