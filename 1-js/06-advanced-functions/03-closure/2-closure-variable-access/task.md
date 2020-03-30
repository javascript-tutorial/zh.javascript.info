importance: 5

---

<<<<<<< HEAD
# 哪些变量可用呢？

下面的 `makeWorker` 函数创建了另一个函数并返回该函数。可以在其他地方调用这个新函数。

它是否可以从它被创建的位置或调用位置（或两者）访问外部变量？
=======
# Which variables are available?

The function `makeWorker` below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
<<<<<<< HEAD
work(); // 会显示什么？
```

会显示哪个值？"Pete" 还是 "John"？
=======
work(); // what will it show?
```

Which value it will show? "Pete" or "John"?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
