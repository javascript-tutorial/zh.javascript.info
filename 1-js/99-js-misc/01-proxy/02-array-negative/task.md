
# 用-1索引访问数组

在某些编程语言中，我们可以使用从结尾算起的负索引访问数组元素。

像这样：

```js
let array = [1, 2, 3];

array[-1]; // 3，最后一个元素
array[-2]; // 2，从末尾开始向前移动一步
array[-3]; // 1，从末尾开始向前移动两步
```

换句话说，`array[-N]` 与 `array[array.length - N]` 相同。

创建一个 proxy 来实现该行为。

那应该是这样的：

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// 其他数组也应该适用于这个功能
```
