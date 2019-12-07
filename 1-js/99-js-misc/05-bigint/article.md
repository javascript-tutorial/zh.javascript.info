# BigInt

[recent caniuse="bigint"]

`BigInt` 是一种特殊的数字类型，它提供了对任意长度整数的支持。

可以用在一个整数字面量后面加 `n` 的方式定义一个 bigint，或者通过调用 `BigInt` 函数的方式用字符串，数字等来创建 bigints。

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt('1234567890123456789012345678901234567890');

const bigintFromNumber = BigInt(10); // 等同于 10n
```

## 数学运算

`BigInt` 大多数情况下可以像普通数字类型一样使用，比如：

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

请注意：除法 `5/2` 的结果经过四舍五入后，去掉了小数点后面的部分。所有与 bigints 的运算，返回的结果也是 bigints。

我们不可以把 bigints 和普通数字类型混在一起：

```js run
alert(1n + 2); // 错误：不可以把 BigInt 和其他类型混用
```

在需要的情况下，我们应该使用 `BigInt()` 或者 `Number()` 对他们进行明确地转换，像这样：

```js run
let bigint = 1n;
let number = 2;

// 数字类型转 bigint
alert(bigint + BigInt(number)); // 3

// bigint 转数字类型
alert(Number(bigint) + number); // 3
```

bigint 到数字类型的转换总是悄无声息的，但是如果因为这个 bigint 太大而无法适应数字的类型，那么多余的字节将会被截断，从而导致精度损失。

````smart header="bigints 不支持一元加法"
一元加法运算符 `+value`，是一个众所周知的，将 `value` 转换成数字类型的方法。

在 bigint 中，这是不被支持的。为了避免混淆：
```js run
let bigint = 1n;

alert( +bigint ); // 错误
```
所以我们应该用 `Number()` 来将一个 bigint 转换成一个数字。
````

## 比较

bigints 和数字类型的比较， 比如 `<`， `>`， 比较起来没有问题：

```js run
alert(2n > 1n); // 真

alert(2n > 1); // 真
```

因为数字和 bigints 属于不同类型，他们在 `==` （宽松相等）的情况下是相等的，但`===`（严格相等）的情况下不相等：

```js run
alert(1 == 1n); // 真

alert(1 === 1n); // 假
```

## 布尔运算符

当在 `if` 判断中或其他布尔运算时，bigints 表现的像数字类型一样。

打个比方，在 `if` 判断中，bigint `0n` 的判断结果为假，其他值为真：

```js run
if (0n) {
  // 不会被执行
}
```

bigints 和布尔运算符，比如 `||`，`&&` 之类的用法与数字类型类似：

```js run
alert(1n || 2); // 1 (1n 被认为是真)

alert(0n || 2); // 2 (0n 被认为是假)
```

## Polyfills

Polyfilling bigints 比较棘手。原因是许多 JavaScript 运算符，比如 `+`，`-` 之类的，在与 bigints 使用的时候表现的与和普通数字类型有所不同。

比如说，bigints 的除法总是返回整数。

想要模拟这样的行为，一个 polyfill 需要用它的功能来替换所有的这些运算符。但是这样做很麻烦，并且会耗费很多的性能。

所以，并没有一个好的，众所周知的 polyfill。

不过，[https://github.com/GoogleChromeLabs/jsbi](JSBI) 这个库的开发者们提出了另一种办法。

他们建议调用 JSBI 库来替代原生的 bigints：

| 运算 | 原生 `BigInt` | JSBI |
| --------------------— | ----------------- | ------------------------- |
| 由数字创建 | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| 加法 | `c = a + b` | `c = JSBI.add(a, b)` |
| 减法 | `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

。。。然后，对于那些支持 `BigInt` 的浏览器，用 polyfill （Babel 插件）来将 JSBI 的调用转换成原生的 bigints。

换句话说，这个方法建议我们在写代码时用 JSBI 来替换原生的 bigints。因为 JSBI 在内部像用数字类型一样用 bigints，并且严格遵循规范，所以代码已经是准备好转换成 bigint（bigint-ready）了。

## 引用

- [MDN docs on BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects)。
