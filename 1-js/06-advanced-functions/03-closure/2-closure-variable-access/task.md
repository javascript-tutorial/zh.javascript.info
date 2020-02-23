importance: 5

---

# 哪些变量可用呢？

下面的 `makeWorker` 函数创建了另一个函数并返回该函数。可以在其他地方调用这个新函数。

它是否可以从它被创建的位置或调用位置（或两者）访问外部变量？

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
work(); // 会显示什么？
```

会显示哪个值？"Pete" 还是 "John"？
