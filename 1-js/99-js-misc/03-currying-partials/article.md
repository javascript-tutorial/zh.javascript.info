libs:
  - lodash

---

# 柯里化和偏函数

到目前为止，对于 bind 我们只讨论过 bind `this`。让我们深入探讨一下 bind。

我们能够绑定的不只是 `this`，还有参数。尽管很少这样做，但是有时候却很方便。

`bind` 的完整语法：

```js
let bound = func.bind(context, arg1, arg2, ...);
```

可以看出，它允许将上下文绑定到 `this`，以及函数的前几个参数。

举个例子，我们有一个做乘法运算的函数 `mul(a,b)`：

```js
function mul(a, b) {
  return a * b;
}
```

基于它，我们利用 `bind` 创造一个新函数 `double`：

```js run
*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

`mul.bind(null, 2)` 创造了一个新函数 `double`，传递调用到 `mul` 函数，以 `null` 为上下文，`2` 为第一个参数。之后的参数等待传入。

这就是 [偏函数应用](https://en.wikipedia.org/wiki/Partial_application) —— 我们创造了一个新函数，同时将部分参数替换成特定值。

请注意通常我们不在这里使用 `this`，但是 `bind` 需要一个值，我们必须传入，那么可以是 `null` 这样的值。

以下代码中的 `triple` 函数对一个值做三倍运算：

```js run
*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

为什么我们经常会创建一个偏函数？

这里，我们从中受益的是我们创建了一个独立的非匿名函数（`double`，`triple`）。我们可以使用它，而不需要每次都传入第一个参数，因为 `bind` 帮我们搞定了。

在其他的场景中，当我们有一个非常通用的函数，并且想要方便地获取它的特定变体，偏函数也是非常有用。

举个例子，我们拥有函数 `send(from, to, text)`。然后，在 `user` 对象中，我们想要使用它的偏函数变体：`sendTo(to, text)`，该函数表明发送自一个当前的用户。

## 无上下文使用偏函数

如果我们想要输入一些参数，但是不想绑定 `this`，该怎么做？

原生的 `bind` 不允许这样。我们不能忽略上下文，直接跳到参数。

幸运的是，一个只绑定参数的 `偏函数` 很容易实现。

就像这样：

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// 用法：
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// 添加一个偏函数方法，现在 say 这个函数可以作为第一个函数
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// 结果就像这样：
// [10:00] John: Hello!
```

`partial(func[, arg1, arg2...])` 调用的结果是一个基于 `func` 的封装函数，以及：
- 和它传入的函数一致的 `this` (对于 `user.sayNow` 调用是 `user`)
- 然后传入 `...argsBound` —— 来自偏函数调用传入的参数（`"10:00"`）
- 然后传入 `...args` —— 传入封装函数的参数（`Hello`）

利用扩展操作符，一切都是那么简单，不是吗？

同样这里有一个 lodash 库实现的偏函数[_.partial](https://lodash.com/docs#partial)

## 柯里化

有时候人们会把偏函数应用和另一个名为「柯里化」的东西混淆。那是另一个和函数有关的有趣的技术，我们在这里不得不提。

[Currying](https://en.wikipedia.org/wiki/Currying) 是一项将一个调用形式为 `f(a, b, c)` 的函数转化为调用形式为 `f(a)(b)(c)` 的技术。

接下来让我们创建将两个函数连接起来的「柯里」函数。换句话说，它将 `f(a, b)` 转化为 `f(a)(b)`：

```js run
*!*
function curry(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}
*/!*

// 用法
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```

你可以看到，它的实现就是一系列的封装。

- `curry(func)` 的结果就是一层封装 `function(a)`。
- 当它被调用，就像 `sum(1)` 这样，它的参数被保存在词法环境中，然后返回一层新的封装 `function(b)`。
- 然后 `sum(1)(2)` 最后调用 `function(b)`，传入参数 `2`，它将调用传递给初始的多参数函数 `sum`。

关于柯里函数更多高级的实现，比如 lodash 库 [_.curry](https://lodash.com/docs#curry) 所做的那样，它们更加复杂。它们会返回一个封装，允许函数提供所有的参数时被正常调用**或者**返回一个偏函数。

```js
function curry(f) {
  return function(...args) {
    // 如果 args.length == f.length（args 和 f 的参数数量相同）
    // 那么调用 f
    // 否则的话返回一个偏函数，将 args 作为第一个参数      
  };
}
```

## 柯里化？目的是什么？

高级的柯里化同时允许函数正常调用和获取偏函数。为了理解这样的好处，我们确实需要一个好的现实例子。

举个例子，我们有一个打印函数 `log(date, importance, message)` 格式化和输出信息。在真实的项目中，这样的函数有很多有用的特性，比如：通过网络传输或者筛选：

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

让我们将它柯里化！

```js
log = _.curry(log);
```

操作之后 `log` 依然正常运行：

```js
log(new Date(), "DEBUG", "some debug");
```

但是也可以用柯里化格式调用：

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

- 当我们确定一个函数的一些参数时，返回的函数（更加特定）被称为**偏函数**。我们可以使用 `bind` 来获取偏函数，但是也有其他方式获取。

    当我们不想一遍又一遍重复相同的参数时，偏函数很方便。比如我们有函数 `send(from, to)`，并且在我们的任务中 `from` 始终是相同的，那么我们可以构造一个偏函数然后对它进行操作。

- **柯里化**是将 `f(a,b,c)` 可以被以 `f(a)(b)(c)` 的形式被调用的转化。JavaScript 实现版本通常保留函数被正常调用和在参数数量不够的情况下返回偏函数这两个特性。

    当我们想要简单偏函数的时候，柯里化很棒。正如我们在 logging 例子中所看到的那样：通用函数 `log(date, importance, message)` 在柯里化之后，当我们在调用它的时候传入一个参数如 `log(date)` 或者两个参数 `log(date, importance)` 的时候，返回了偏函数。
