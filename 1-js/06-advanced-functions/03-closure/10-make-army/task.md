importance: 5

---

# 函数大军

下列的代码创建了一个 `shooters` 数组。

每个函数都应该输出其编号。但好像出了点问题……

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // 创建一个 shooter 函数，
      alert( i ); // 应该显示其编号
    };
    shooters.push(shooter); // 将此 shooter 函数添加到数组中
    i++;
  }

  // ……返回 shooters 数组
  return shooters;
}

let army = makeArmy();

*!*
// ……所有的 shooter 显示的都是 10，而不是它们的编号 0, 1, 2, 3...
army[0](); // 编号为 0 的 shooter 显示的是 10
army[1](); // 编号为 1 的 shooter 显示的是 10
army[2](); // 10，其他的也是这样。
*/!*
```

为什么所有的 shooter 显示的都是同样的值？

修改代码以使得代码能够按照我们预期的那样工作。
