# 简单但错误的解决方案

最简单但错误的解决方案是生成一个范围在 `min` 到 `max` 的值，并取对其进行四舍五入后的值：

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

这个函数是能起作用的，但不正确。获得边缘值 `min` 和 `max` 的概率比其他值低两倍。

如果你将上面这个例子运行多次，你会很容易看到 `2` 出现的频率最高。

发生这种情况是因为 `Math.round()` 从范围 `1..3` 中获得随机数，并按如下所示进行四舍五入：

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

现在我们可以清楚地看到 `1` 的值比 `2` 少两倍。和 `3` 一样。

# 正确的解决方案

这个题目有很多正确的解决方案。其中之一是调整取值范围的边界。为了确保相同的取值范围，我们可以生成从 0.5 到 3.5 的值，从而将所需的概率添加到取值范围的边界：

```js run
*!*
function randomInteger(min, max) {
  // 现在范围是从  (min-0.5) 到 (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

另一种方法是使用 `Math.floor` 来取范围从 `min` 到 `max+1` 的随机数：

```js run
*!*
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

现在所有间隔都以这种方式映射：

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

所有间隔的长度相同，从而使最终能够均匀分配。
