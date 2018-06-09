简单的解决方案可以是：

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

这样是可以的，因为 `Math.random() - 0.5` 是一个可能是正数或负数的随机数，所以排序函数会随机地重新排序元素。

但是因为排序函数并不意味着以这种方式使用，所以并不是所有的排列都具有相同的概率。

例如，请考虑下面的代码。它运行 100 万次 `shuffle` 并计算所有可能结果：

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// 出现所有可能排列的次数
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// 显示所有可能的排列的数量
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

示例结果（V8，2017年七月）：

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

我们可以清楚地看到这种偏见：`123` 和 `213` 比其他人更频繁出现。

JavaScript 引擎的代码结果可能会有所不同，但我们已经可以看到这种方法是不可靠的。

为什么它不起作用？一般来说，`sort` 是一个“黑匣子”：我们向其中抛出一个数组和一个比较函数，并期望数组被排序。由于比较的完全随机性，黑盒子变得复杂，它究竟发生了什么取决于引擎之间的具体实现。

还有其他很好的方法来完成这项任务。例如，有一个很好的算法叫做 [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). The idea is to walk the array in the reverse order and swap each element with a random one before it:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // r 从 0 到 i 的随机索引
    [array[i], array[j]] = [array[j], array[i]]; // 交换元素
  }
}
```

让我们以相同的方式测试它：

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 出现所有可能排列的次数
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// 出现所有可能排列的次数
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

示例输出：

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

现在看起来不错：所有排列都以相同的概率出现。

另外，性能方面 Fisher — Yates 算法要好得多，没有排序开销。
