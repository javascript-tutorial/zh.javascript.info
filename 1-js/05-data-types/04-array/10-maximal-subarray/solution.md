<<<<<<< HEAD
# 慢的解决方案
=======
# Slow solution
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

我们可以计算所有可能的子集的和。

最简单的方法就是获取每个元素然后计算从它开始所有子数组的和。

以 `[-1, 2, 3, -9, 11]` 为例：

```js no-beautify
// 从 -1 开始：
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// 从 2 开始：
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// 从 3 开始：
3
3 + (-9)
3 + (-9) + 11

// 从 -9 开始：
-9
-9 + 11

<<<<<<< HEAD
// 从 -11 开始：
-11
=======
// Starting from 11
11
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
```

这样写出来的代码实际上是一个嵌套循环：外部循环遍历数组所有元素，然后内部循环计算从当前元素之后的所有子数组集的和。

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // 如果没有取到任何元素，就返回 0

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

该方案的时间复杂度是 [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation)。也就是说，如果我们把数组大小增加 2 倍，那么算法的运行时间将会延长4倍。

<<<<<<< HEAD
对于大型数组（1000，10000 或者更多项）这种算法会导致严重的时间消耗。
=======
For big arrays (1000, 10000 or more items) such algorithms can lead to a serious sluggishness.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

# 快的解决方案

让我们遍历数组，将当前局部元素的和保存为变量 `s`。如果 `s` 在某一点变成负数了，就重新分配 `s=0`。所有 `s` 中的最大值就是答案。

如果文字描述不太好理解，就直接看下面的代码吧，真的很短：

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // arr 中的每个 item
    partialSum += item; // 将其添加到 partialSum
    maxSum = Math.max(maxSum, partialSum); // 记住最大值
    if (partialSum < 0) partialSum = 0; // 如果是负数就置为 0
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

该算法只需要遍历1轮数组，所以时间复杂度是 O(n)。

你也可以在此获取更多该算法的细节信息：[Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem)。如果还是不明白，那就调试上面的例子，观察它是怎样工作的，说得再多也没有自己去调试好使。
