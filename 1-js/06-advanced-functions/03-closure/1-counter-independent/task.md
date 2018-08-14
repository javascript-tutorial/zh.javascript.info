importance: 5

---

# counters 是独立的吗？

这里我们用相同的 `makeCounter` 函数创建了两个计数器（counters）：`counter` 和 `counter`。

它们是独立的吗？第二个 counter 要显示什么？`0,1` 或 `2,3` 还是其他？

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

