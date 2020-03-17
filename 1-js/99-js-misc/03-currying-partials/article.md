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

正如你所看到的，实现非常简单：只有两个包装器（wapper）。

- `curry(func)` 的结果就是一个包装器 `function(a)`。
- 当它被像 `sum(1)` 这样调用时，它的参数被保存在词法环境中，然后返回一个新的包装器 `function(b)`。
- 然后这个包装器被以 `2` 为参数调用，并且，它将该调用传递给原始的 `sum` 函数。

柯里化更高级的实现，例如 lodash 库的 [_.curry](https://lodash.com/docs#curry)，返回一个包装器，该包装器允许函数被正常调用或者 partially 调用：

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // 使用来自 lodash 库的 _.curry

alert( curriedSum(1, 2) ); // 3，仍可正常调用
alert( curriedSum(1)(2) ); // 3，partially 调用
```

## 柯里化？目的是什么？

要了解它的好处，我们需要一个真实的例子。

例如，我们有一个用于格式化和输出信息的记录（logging）函数 `log(date, importance, message)`。在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志，在这儿我们仅使用 `alert`：

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

让我们将它柯里化！

```js
log = _.curry(log);
```

柯里化之后，`log` 依正常运行：

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

……但是也可以以柯里化形式运行：

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

让我们来创建一个获取今天的日志的简易函数：

```js
// todayLog 会是一个首个参数确定的偏函数
let todayLog = log(new Date());

// 使用它
todayLog("INFO", "message"); // [HH:mm] INFO message
```

接下来是提供今天的调试信息的简便函数：

```js
let todayDebug = todayLog("DEBUG");

todayDebug("message"); // [HH:mm] DEBUG message
```

那么：
1. 柯里化之后我们没有丢失任何东西：`log` 依然可以被正常调用。
2. 在很多情况下我们可以很方便生成偏函数。

## 高级柯里化实现

由于你可能感兴趣，下面是我们可以使用的「高级」柯里化实现

```js run
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

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

// 依然可以被正常调用
alert( curriedSum(1, 2, 3) ); // 6

// 得到 curried(1) 的偏函数，然后用另外两个参数调用它
alert( curriedSum(1)(2,3) ); // 6

// 完全柯里化形式
alert( curriedSum(1)(2)(3) ); // 6
```

新的「柯里函数」看上去有点复杂，但是它很容易理解。

`curry(func)` 的结果是 `curried` 函数的封装，结果如下：

```js
// func 是被转化的函数
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

当我们运行它的时候，有两种结果：

1. 立刻执行：当传入的 `args` 的长度和初始函数中所定义的（`func.length`）相同或者更长，那么直接将它传入需要执行的函数。
2. 得到一个偏函数：当传入的 args 的长度小于初始函数中所定义的（`func.length`），`func` 暂时不被调用，取而代之的是，返回另外一层封装 `pass`，其中，将之前传入的参数合并新传入的参数一起应用于 `curried` 函数。虽然再次调用。我们要么得到一个新的偏函数（如果参数数量不够），要么，最终得到结果。

举个例子，让我们看看用例 `sum(a, b, c)` 中发生了什么。三个参数，那么 `sum.length = 3`。

执行 `curried(1)(2)(3)`

1. 首先调用 `curried(1)` 将 `1` 保存在词法环境中，然后返回一层封装 `pass`。
2. 封装函数 `pass` 被调用，参数为 `(2)`：它会获取之前的参数 `(1)`，将它与 `(2)` 合并，一起调用 `curried(1, 2)`。

    由于参数数量依然少于 3，`curry` 函数依然返回 `pass`。
3. `pass` 再次被调用，参数为 `(3)`, 在接下去的调用中 `pass(3)` 获取之前的参数 (`1`, `2`) 并将 `3` 与之合并，执行调用 `curried(1, 2, 3)` —— 最终有 `3` 个参数，它们被传入最原始的函数中。

如果这还不够清楚，那么将函数调用依次在你脑海中或者纸上过一遍。

```smart header="只允许确定参数长度的函数"
柯里化要求对应的函数，拥有已知确定数量的参数。
```

```smart header="柯里化深入一点"
根据定义，柯里化应该将 `sum(a, b, c)` 转化为 `sum(a)(b)(c)`。

但是在 JavaScript 中大多数的实现更加高级，就像所描述的那样：它们使得函数可以被多种形式的参数调用。
```

## 总结

- **柯里化**是将 `f(a,b,c)` 可以被以 `f(a)(b)(c)` 的形式被调用的转化。JavaScript 实现版本通常保留函数被正常调用和在参数数量不够的情况下返回偏函数这两个特性。

    当我们想要简单偏函数的时候，柯里化很棒。正如我们在 logging 例子中所看到的那样：通用函数 `log(date, importance, message)` 在柯里化之后，当我们在调用它的时候传入一个参数如 `log(date)` 或者两个参数 `log(date, importance)` 的时候，返回了偏函数。
