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

这样是可以的，因为 `Math.random() - 0.5` 是一个可能是正数或负数的随机数，因此排序函数会随机地对数组中的元素进行重新排序。

但是，由于排序函数并非旨在以这种方式使用，因此并非所有的排列都具有相同的概率。

例如，请考虑下面的代码。它运行 100 万次 `shuffle` 并计算所有可能结果的出现次数：

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// 所有可能排列的出现次数
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

// 显示所有可能排列的出现次数
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

示例结果（取决于 Javascript 引擎）：

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

我们可以清楚地看到这种倾斜：`123` 和 `213` 的出现频率比其他情况高得多。

使用不同的 JavaScript 引擎运行这个示例代码得到的结果可能会有所不同，但是我们已经可以看到这种方法是不可靠的。

为什么它不起作用？一般来说，`sort` 是一个“黑匣子”：我们将一个数组和一个比较函数放入其中，并期望其对数组进行排序。但是由于比较的完全随机性，这个黑匣子疯了，它发疯地确切程度取决于引擎中的具体实现方法。

还有其他很好的方法可以完成这项任务。例如，有一个很棒的算法叫作 [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)。其思路是：逆向遍历数组，并将每个元素与其前面的随机的一个元素互换位置：

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 从 0 到 i 的随机索引

    // 交换元素 array[i] 和 array[j]
    // 我们使用“解构分配（destructuring assignment）”语法来实现它
    // 你将在后面的章节中找到有关该语法的更多详细信息
    // 可以写成：
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

让我们以相同的方式测试一下：

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 所有可能排列的出现次数
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

// 显示所有可能排列的出现次数
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

另外，在性能方面，Fisher — Yates 算法要好得多，没有“排序”开销。
