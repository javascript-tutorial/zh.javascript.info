
<<<<<<< HEAD
# 访问 array[-1]

在某些编程语言中，我们可以使用从尾端算起的负值索引访问数组元素。

像这样：
=======
# Accessing array[-1]

In some programming languages, we can access array elements using negative indexes, counted from the end.

Like this:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let array = [1, 2, 3];

<<<<<<< HEAD
array[-1]; // 3，最后一个元素
array[-2]; // 2，从尾端开始向前移动一步
array[-3]; // 1，从尾端开始向前移动两步
```

换句话说，`array[-N]` 与 `array[array.length - N]` 相同。

创建一个 proxy 来实现该行为。

其工作方式应如下：
=======
array[-1]; // 3, the last element
array[-2]; // 2, one step from the end
array[-3]; // 1, two steps from the end
```

In other words, `array[-N]` is the same as `array[array.length - N]`.

Create a proxy to implement that behavior.

That's how it should work:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let array = [1, 2, 3];

array = new Proxy(array, {
<<<<<<< HEAD
  /* 你的代码 */
=======
  /* your code */
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

<<<<<<< HEAD
// 其他数组功能应保持“原样”
=======
// Other array functionality should be kept "as is"
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```
