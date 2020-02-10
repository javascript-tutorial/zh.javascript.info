
<<<<<<< HEAD
# 用-1索引访问数组

在某些编程语言中，我们可以使用从结尾算起的负索引访问数组元素。

像这样：
=======
# Accessing array[-1]

In some programming languages, we can access array elements using negative indexes, counted from the end.

Like this:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
let array = [1, 2, 3];

<<<<<<< HEAD
array[-1]; // 3，最后一个元素
array[-2]; // 2，从末尾开始向前移动一步
array[-3]; // 1，从末尾开始向前移动两步
```

换句话说，`array[-N]` 与 `array[array.length - N]` 相同。

创建一个 proxy 来实现该行为。

那应该是这样的：
=======
array[-1]; // 3, the last element
array[-2]; // 2, one step from the end
array[-3]; // 1, two steps from the end
```

In other words, `array[-N]` is the same as `array[array.length - N]`.

Create a proxy to implement that behavior.

That's how it should work:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

<<<<<<< HEAD
// 其他数组也应该适用于这个功能
=======
// Other array functionality should be kept "as is"
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```
