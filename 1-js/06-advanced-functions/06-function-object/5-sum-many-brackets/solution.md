
1. 为了使整个程序无论如何都能正常工作，`sum` 的结果必须是函数。
2. 这个函数必须将两次调用之间的当前值保存在内存中。
3. 根据这个题目，当函数被用于 `==` 比较时必须转换成数字。函数是对象，所以转换规则会按照 <info:object-toprimitive> 章节所讲的进行，我们可以提供自己的方法来返回数字。

代码如下：

```js run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

请注意 `sum` 函数只工作一次，它返回了函数 `f`。

然后，接下来的每一次子调用，`f` 都会把自己的参数加到求和 `currentSum` 上，然后 `f` 自身。

**在 `f` 的最后一行没有递归。**

递归是这样子的：

```js
function f(b) {
  currentSum += b;
  return f(); // <-- 递归调用
}
```

在我们的例子中，只是返回了函数，并没有调用它：

```js
function f(b) {
  currentSum += b;
  return f; // <-- 没有调用自己，只是返回了自己
}
```

这个 `f` 会被用于下一次调用，然后再次返回自己，按照需要重复。然后，当它被用做数字或字符串时 —— `toString` 返回 `currentSum`。我们也可以使用 `Symbol.toPrimitive` 或者 `valueOf` 来实现转换。
