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
  showStep: function() { // 显示当前的 step
    alert( this.step );
  }
};
```

现在，如果我们要按顺序执行几次调用，可以这样做：

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

<<<<<<< HEAD
修改 `up`，`down` 和 `showStep` 的代码，让调用可以链接，就像这样：
=======
Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
ladder.up().up().down().showStep(); // 1
```

这种方法在 JavaScript 库中被广泛使用。
