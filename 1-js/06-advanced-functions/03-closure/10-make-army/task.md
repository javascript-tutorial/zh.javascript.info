importance: 5

---

# 函数大军

下列的代码创建一组 `shooters`。

每个函数输出它的数字。但有些不对...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter 函数
      alert( i ); // 应该显示它自己的数字
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 第 0 号 shooter 显示 10
army[5](); // 第 5 号也输出 10...
// ... 所有的 shooters 都显示 10 而不是它们的 0, 1, 2, 3...
```

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/8-make-army/task.md
为什么所有的 shooter 函数显示得都一样呢？修改代码让代码正常工作。
=======
Why do all of the shooters show the same value? Fix the code so that they work as intended.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38:1-js/06-advanced-functions/03-closure/10-make-army/task.md

