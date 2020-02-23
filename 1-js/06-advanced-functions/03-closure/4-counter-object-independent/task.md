importance: 5

---

# Counter 对象

这里通过构造器函数创建了一个 counter 对象。

它能正常工作吗？它会显示什么呢？

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

