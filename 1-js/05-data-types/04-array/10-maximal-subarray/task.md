importance: 2

---

# 最大子数组

输入是以数字组成的数组，例如 `arr = [1, -2, 3, 4, -9, 6]`.

任务是：找出所有项的和最大的 `arr` 数组的连续子数组。

写出函数 `getMaxSubSum(arr)`，用其找出并返回最大和。

例如：

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5（高亮项的加和）
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6（所有项的和）
```

如果所有项都是负数，那就一个项也不取（子数组是空的），所以返回的是 0：

```js
getMaxSubSum([-1, -2, -3]) = 0
```

请尝试想出一个快速的解决方案：复杂度可以是 [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation)，有能力达到 O(n) 则更好。
