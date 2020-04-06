libs:
  - lodash

---

# 柯里化（Currying）

[柯里化（Currying）](https://en.wikipedia.org/wiki/Currying)是一种关于函数的高阶技术。它不仅被用于 JavaScript，还被用于其他编程语言。

柯里化是一种函数的转换，它是指将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`。

柯里化不会调用函数。它只是对函数进行转换。

让我们先来看一个例子，以更好地理解我们正在讲的内容，然后再进行一个实际应用。

我们将创建一个辅助函数 `curry(f)`，该函数将对两个参数的函数 `f` 执行柯里化。换句话说，对于两个参数的函数 `f(a, b)` 执行 `curry(f)` 会将其转换为以 `f(a)(b)` 形式运行的函数：

```js run
*!*
function curry(f) { // curry(f) 执行柯里化转换
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// 用法
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

正如你所看到的，实现非常简单：只有两个包装器（wrapper）。

- `curry(func)` 的结果就是一个包装器 `function(a)`。
- 当它被像 `curriedSum(1)` 这样调用时，它的参数会被保存在词法环境中，然后返回一个新的包装器 `function(b)`。
- 然后这个包装器被以 `2` 为参数调用，并且，它将该调用传递给原始的 `sum` 函数。

柯里化更高级的实现，例如 lodash 库的 [_.curry](https://lodash.com/docs#curry)，会返回一个包装器，该包装器允许函数被正常调用或者以偏函数（partial）的方式调用：

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // 使用来自 lodash 库的 _.curry

alert( curriedSum(1, 2) ); // 3，仍可正常调用
alert( curriedSum(1)(2) ); // 3，以偏函数的方式调用
```

## 柯里化？目的是什么？

要了解它的好处，我们需要一个实际中的例子。

例如，我们有一个用于格式化和输出信息的日志（logging）函数 `log(date, importance, message)`。在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志（log），在这儿我们仅使用 `alert`：

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

让我们将它柯里化！

```js
log = _.curry(log);
```

柯里化之后，`log` 仍正常运行：

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

……但是也可以以柯里化形式运行：

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

现在，我们可以轻松地为当前日志创建便捷函数：

```js
// logNow 会是带有固定第一个参数的日志的偏函数
let logNow = log(new Date());

// 使用它
logNow("INFO", "message"); // [HH:mm] INFO message
```

现在，`logNow` 是具有固定第一个参数的 `log`，换句话说，就是更简短的“偏应用函数（partially applied function）”或“偏函数（partial）”。

我们可以更进一步，为当前的调试日志（debug log）提供便捷函数：

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

所以：
1. 柯里化之后，我们没有丢失任何东西：`log` 依然可以被正常调用。
2. 我们可以轻松地生成偏函数，例如用于生成今天的日志的偏函数。

## 高级柯里化实现

如果你想了解更多细节，下面是用于多参数函数的“高级”柯里化实现，我们也可以把它用于上面的示例。

它非常短：

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

用例：

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
alert( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
alert( curriedSum(1)(2)(3) ); // 6，全柯里化
```

新的 `curry` 可能看上去有点复杂，但是它很容易理解。

`curry(func)` 调用的结果是如下所示的包装器 `curried`：

```js
// func 是要转换的函数
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

当我们运行它时，这里有两个 `if` 执行分支：

1. 现在调用：如果传入的 `args` 长度与原始函数所定义的（`func.length`）相同或者更长，那么只需要将调用传递给它即可。
2. 获取一个偏函数：否则，`func` 还没有被调用。取而代之的是，返回另一个包装器 `pass`，它将重新应用 `curried`，将之前传入的参数与新的参数一起传入。然后，在一个新的调用中，再次，我们将获得一个新的偏函数（如果参数不足的话），或者最终的结果。

例如，让我们看看 `sum(a, b, c)` 这个例子。它有三个参数，所以 `sum.length = 3`。

对于调用 `curried(1)(2)(3)`：

1. 第一个调用 `curried(1)` 将 `1` 保存在词法环境中，然后返回一个包装器 `pass`。
2. 包装器 `pass` 被调用，参数为 `(2)`：它会获取之前的参数 `(1)`，将它与得到的 `(2)` 连在一起，并一起调用 `curried(1, 2)`。由于参数数量仍小于 3，`curry` 函数依然会返回 `pass`。
3. 包装器 `pass` 再次被调用，参数为 `(3)`，在接下来的调用中，`pass(3)` 会获取之前的参数 (`1`, `2`) 并将 `3` 与之合并，执行调用 `curried(1, 2, 3)` — 最终有 `3` 个参数，它们被传入最原始的函数中。

如果这还不够清楚，那你可以把函数调用顺序在你的脑海中或者在纸上过一遍。

```smart header="只允许确定参数长度的函数"
柯里化要求函数具有固定数量的参数。

使用 rest 参数的函数，例如 `f(...args)`，不能以这种方式进行柯里化。
```

```smart header="比柯里化多一点"
根据定义，柯里化应该将 `sum(a, b, c)` 转换为 `sum(a)(b)(c)`。

但是，如前所述，JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以被多参数变体调用。
```

## 总结

**柯里化** 是一种转换，将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回偏函数。

柯里化让我们能够更容易地获取偏函数。就像我们在日志记录示例中看到的那样，普通函数 `log(date, importance, message)` 在被柯里化之后，当我们调用它的时候传入一个参数（如 `log(date)`）或两个参数（`log(date, importance)`）时，它会返回偏函数。
