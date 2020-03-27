importance: 5

---

# 函数大军

下列的代码创建一个 `shooters` 数组。

每个函数都应该输出其编号。但好像出了点问题……

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter 函数
      alert( i ); // 应该显示其编号
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 编号为 0 的 shooter 值为 10
army[5](); // 编号为 5 的 shooter 值也是 10……
// ... 所有的 shooter 的值都是 10，而不是他们的编号 0, 1, 2, 3...
```

为什么所有的 shooter 显示同样的值？修改代码以让代码正常工作。

