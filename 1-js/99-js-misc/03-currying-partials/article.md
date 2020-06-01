libs:
  - lodash

---

<<<<<<< HEAD
# 柯里化（Currying）

[柯里化（Currying）](https://en.wikipedia.org/wiki/Currying)是一种关于函数的高阶技术。它不仅被用于 JavaScript，还被用于其他编程语言。

柯里化是一种函数的转换，它是指将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`。

柯里化不会调用函数。它只是对函数进行转换。

让我们先来看一个例子，以更好地理解我们正在讲的内容，然后再进行一个实际应用。

我们将创建一个辅助函数 `curry(f)`，该函数将对两个参数的函数 `f` 执行柯里化。换句话说，对于两个参数的函数 `f(a, b)` 执行 `curry(f)` 会将其转换为以 `f(a)(b)` 形式运行的函数：

```js run
*!*
function curry(f) { // curry(f) 执行柯里化转换
=======
# Currying

[Currying](https://en.wikipedia.org/wiki/Currying) is an advanced technique of working with functions. It's used not only in JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

Currying doesn't call a function. It just transforms it.

Let's see an example first, to better understand what we're talking about, and then practical applications.

We'll create a helper function `curry(f)` that performs currying for a two-argument `f`. In other words, `curry(f)` for two-argument `f(a, b)` translates it into a function that runs as `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) does the currying transform
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

<<<<<<< HEAD
// 用法
=======
// usage
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

<<<<<<< HEAD
正如你所看到的，实现非常简单：只有两个包装器（wrapper）。

- `curry(func)` 的结果就是一个包装器 `function(a)`。
- 当它被像 `curriedSum(1)` 这样调用时，它的参数会被保存在词法环境中，然后返回一个新的包装器 `function(b)`。
- 然后这个包装器被以 `2` 为参数调用，并且，它将该调用传递给原始的 `sum` 函数。

柯里化更高级的实现，例如 lodash 库的 [_.curry](https://lodash.com/docs#curry)，会返回一个包装器，该包装器允许函数被正常调用或者以偏函数（partial）的方式调用：
=======
As you can see, the implementation is straightforward: it's just two wrappers.

- The result of `curry(func)` is a wrapper `function(a)`.
- When it is called like `curriedSum(1)`, the argument is saved in the Lexical Environment, and a new wrapper is returned `function(b)`.
- Then this wrapper is called with `2` as an argument, and it passes the call to the original `sum`.

More advanced implementations of currying, such as [_.curry](https://lodash.com/docs#curry) from lodash library, return a wrapper that allows a function to be called both normally and partially:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
function sum(a, b) {
  return a + b;
}

<<<<<<< HEAD
let curriedSum = _.curry(sum); // 使用来自 lodash 库的 _.curry

alert( curriedSum(1, 2) ); // 3，仍可正常调用
alert( curriedSum(1)(2) ); // 3，以偏函数的方式调用
```

## 柯里化？目的是什么？

要了解它的好处，我们需要一个实际中的例子。

例如，我们有一个用于格式化和输出信息的日志（logging）函数 `log(date, importance, message)`。在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志（log），在这儿我们仅使用 `alert`：
=======
let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
```

## Currying? What for?

To understand the benefits we need a worthy real-life example.

For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information. In real projects such functions have many useful features like sending logs over the network, here we'll just use `alert`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

<<<<<<< HEAD
让我们将它柯里化！
=======
Let's curry it!
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
log = _.curry(log);
```

<<<<<<< HEAD
柯里化之后，`log` 仍正常运行：
=======
After that `log` works normally:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

<<<<<<< HEAD
……但是也可以以柯里化形式运行：
=======
...But also works in the curried form:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

<<<<<<< HEAD
现在，我们可以轻松地为当前日志创建便捷函数：

```js
// logNow 会是带有固定第一个参数的日志的偏函数
let logNow = log(new Date());

// 使用它
logNow("INFO", "message"); // [HH:mm] INFO message
```

现在，`logNow` 是具有固定第一个参数的 `log`，换句话说，就是更简短的“偏应用函数（partially applied function）”或“偏函数（partial）”。

我们可以更进一步，为当前的调试日志（debug log）提供便捷函数：
=======
Now we can easily make a convenience function for current logs:

```js
// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
```

Now `logNow` is `log` with fixed first argument, in other words "partially applied function" or "partial" for short.

We can go further and make a convenience function for current debug logs:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

<<<<<<< HEAD
所以：
1. 柯里化之后，我们没有丢失任何东西：`log` 依然可以被正常调用。
2. 我们可以轻松地生成偏函数，例如用于生成今天的日志的偏函数。

## 高级柯里化实现

如果你想了解更多细节，下面是用于多参数函数的“高级”柯里化实现，我们也可以把它用于上面的示例。

它非常短：
=======
So:
1. We didn't lose anything after currying: `log` is still callable normally.
2. We can easily generate partial functions such as for today's logs.

## Advanced curry implementation

In case you'd like to get in to the details, here's the "advanced" curry implementation for multi-argument functions that we could use above.

It's pretty short:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

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

<<<<<<< HEAD
用例：
=======
Usage examples:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

<<<<<<< HEAD
alert( curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
alert( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
alert( curriedSum(1)(2)(3) ); // 6，全柯里化
```

新的 `curry` 可能看上去有点复杂，但是它很容易理解。

`curry(func)` 调用的结果是如下所示的包装器 `curried`：

```js
// func 是要转换的函数
=======
alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

The new `curry` may look complicated, but it's actually easy to understand.

The result of `curry(func)` call is the wrapper `curried` that looks like this:

```js
// func is the function to transform
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
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

<<<<<<< HEAD
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
=======
When we run it, there are two `if` execution branches:

1. Call now: if passed `args` count is the same as the original function has in its definition (`func.length`) or longer, then just pass the call to it.
2. Get a partial: otherwise, `func` is not called yet. Instead, another wrapper `pass` is returned, that will re-apply `curried` providing previous arguments together with the new ones. Then on a new call, again, we'll get either a new partial (if not enough arguments) or, finally, the result.

For instance, let's see what happens in the case of `sum(a, b, c)`. Three arguments, so `sum.length = 3`.

For the call `curried(1)(2)(3)`:

1. The first call `curried(1)` remembers `1` in its Lexical Environment, and returns a wrapper `pass`.
2. The wrapper `pass` is called with `(2)`: it takes previous args (`1`), concatenates them with what it got `(2)` and calls `curried(1, 2)` with them together. As the argument count is still less than 3, `curry` returns `pass`.
3. The wrapper `pass` is called again with `(3)`,  for the next call `pass(3)` takes previous args (`1`, `2`) and adds `3` to them, making the call `curried(1, 2, 3)` -- there are `3` arguments at last, they are given to the original function.

If that's still not obvious, just trace the calls sequence in your mind or on paper.

```smart header="Fixed-length functions only"
The currying requires the function to have a fixed number of arguments.

A function that uses rest parameters, such as `f(...args)`, can't be curried this way.
```

```smart header="A little more than currying"
By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.
```

## Summary

*Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.

Currying allows us to easily get partials. As we've seen in the logging example, after currying the three argument universal function `log(date, importance, message)` gives us partials when called with one argument (like `log(date)`) or two arguments (like `log(date, importance)`).  
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
