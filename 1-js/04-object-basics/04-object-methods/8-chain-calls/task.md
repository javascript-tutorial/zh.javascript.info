importance: 2

---

# 链式（调用）

有一个可以上下移动的 `ladder` 对象：

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};
```

现在如果我们要依次执行几次调用，可以这样做：

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

<<<<<<< HEAD
修改 `up` 和 `down` 的代码让调用可以链接，就像这样：
=======
Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js
ladder.up().up().down().showStep(); // 1
```

此种方法在 JavaScript 库中被广泛使用。
