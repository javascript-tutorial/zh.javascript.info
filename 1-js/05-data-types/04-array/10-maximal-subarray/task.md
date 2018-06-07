importance: 2

---

# 最大子数组

输入是以数字组成的数组，e.g. `arr = [1, -2, 3, 4, -9, 6]`.

任务是：找出连续的`arr`的子数组，其里面所有项的和最大。

写出函数`getMaxSubSum(arr)` 找出并返回最大和。

例如：

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) = 5 (高亮项的加和)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) = 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) = 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) = 100
getMaxSubSum([*!*1, 2, 3*/!*]) = 6 (所有的)
```

如果所有项都是负数，这就意味着没有取到符合条件的（数组是空的），所以返回的是0：

```js
getMaxSubSum([-1, -2, -3]) = 0
```

请尝试想出一个快速的解决方案：如果可以的话，复杂度最好是[O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) 或者甚至是 O(n).