# BigInt

[recent caniuse="bigint"]

<<<<<<< HEAD
`BigInt` 是一种特殊的数字类型，它提供了对任意长度整数的支持。

创建 bigint 的方式有两种：在一个整数字面量后面加 `n` 或者调用 `BigInt` 函数，后者从字符串、数字等生成 bigints。
=======
`BigInt` is a special numeric type that provides support for integers of arbitrary length.

A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

<<<<<<< HEAD
const bigintFromNumber = BigInt(10); // 等同于 10n
```

## 数学运算

`BigInt` 大多数情况下可以像普通数字类型一样使用，比如：
=======
const bigintFromNumber = BigInt(10); // same as 10n
```

## Math operators

`BigInt` can mostly be used like a regular number, for example:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

<<<<<<< HEAD
请注意：除法 `5/2` 的结果经过四舍五入后，去掉了小数点后面的部分。bigints 上的所有运算，其返回结果也是 bigints。

我们不可以把 bigints 和普通数字类型混在一起：
=======
Please note: the division `5/2` returns the result rounded towards zero, without the decimal part. All operations on bigints return bigints.

We can't mix bigints and regular numbers:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

<<<<<<< HEAD
在需要的情况下，我们应该使用 `BigInt()` 或者 `Number()` 对它们进行明确地转换，像这样：
=======
We should explicitly convert them if needed: using either `BigInt()` or `Number()`, like this:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
let bigint = 1n;
let number = 2;

<<<<<<< HEAD
// 数字转 bigint
alert(bigint + BigInt(number)); // 3

// bigint 转数字
alert(Number(bigint) + number); // 3
```

bigint 到数字的转换通常都不会报错，但是如果这个 bigint 太大而不适合数字类型，那么多余的字节将会被截断，从而导致精度损失。

````smart header="bigints 不支持一元加法"
一元加法运算符 `+value`，是大家熟知的将 `value` 转换成数字的方法。

在 bigint 中，这是不被支持的。为了避免混淆：
```js run
let bigint = 1n;

alert( +bigint ); // 错误
```
所以我们应该用 `Number()` 来将一个 bigint 转换成一个数字。
````

## 比较

bigints 和数字类型的比较， 比如 `<`， `>`， 比较起来没有问题：
=======
// number to bigint
alert(bigint + BigInt(number)); // 3

// bigint to number
alert(Number(bigint) + number); // 3
```

The conversion operations are always silent, never give errors, but if the bigint is too huge and won't fit the number type, then extra bits will be cut off, so we should be careful doing such conversion.

````smart header="The unary plus is not supported on bigints"
The unary plus operator `+value` is a well-known way to convert `value` to a number.

On bigints it's not supported, to avoid confusion:
```js run
let bigint = 1n;

alert( +bigint ); // error
```
So we should use `Number()` to convert a bigint to a number.
````

## Comparisons

Comparisons, such as `<`, `>` work with bigints and numbers just fine:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

<<<<<<< HEAD
因为数字和 bigints 属于不同类型，它们可能在`==`的情况下相等，但在`===`（严格相等）的情况下不相等：
=======
Please note though, as numbers and bigints belong to different types, they can be equal `==`, but not strictly equal `===`:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

<<<<<<< HEAD
## 布尔运算符

当在 `if` 判断或其他布尔运算中时，bigints 和数字用法一样。

打个比方，在 `if` 判断中，bigint `0n` 的判断结果为假，其他值为真：

```js run
if (0n) {
  // 不会被执行
}
```

bigints 和布尔运算符，比如 `||`、`&&` 之类的用法与数字类型类似：

```js run
alert( 1n || 2 ); // 1 (1n 被认为是真)

alert( 0n || 2 ); // 2 (0n 被认为是假)
=======
## Boolean operations

When inside `if` or other boolean operations, bigints behave like numbers.

For instance, in `if`, bigint `0n` is falsy, other values are truthy:

```js run
if (0n) {
  // never executes
}
```

Boolean operators, such as `||`, `&&` and others also work with bigints similar to numbers:

```js run
alert( 1n || 2 ); // 1 (1n is considered truthy)

alert( 0n || 2 ); // 2 (0n is considered falsy)
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
```

## Polyfills

<<<<<<< HEAD
Polyfilling bigints 比较棘手。原因是许多 JavaScript 运算符，比如 `+`、`-` 之类的，用于 bigints 的时候与用在普通数字类型有所不同。

比如说，bigints 的除法总是返回整数。

想要模拟这样的行为，polyfill 需要写函数来替换所有这些运算符。但是这样做很麻烦，并且会耗费很多的性能。

所以，并没有一个众所周知且好用的 polyfill。

不过，[JSBI](https://github.com/GoogleChromeLabs/jsbi) 这个库的开发者们提出了另一种办法。

他们建议调用 JSBI 库来替代原生的 bigints：

| 运算        | 原生 `BigInt`      | JSBI                      |
| -----------| ----------------- | ------------------------- |
| 由数字创建   | `a = BigInt(789)` | `a = JSBI.BigInt(789)`    |
| 加法        | `c = a + b`       | `c = JSBI.add(a, b)`      |
| 减法        | `c = a - b`       | `c = JSBI.subtract(a, b)` |
| ...        | ...               | ...                       |

然后，对于那些支持 `BigInt` 的浏览器，用 polyfill（Babel 插件）来将 JSBI 的调用转换成原生的 bigints。

换句话说，这个方法建议我们在写代码时用 JSBI 来替换原生的 bigints。因为 JSBI 在内部像用数字类型一样用 bigints，并且严格遵循规范，所以代码已经是准备好转换成 bigint（bigint-ready）了。

## 参考

- [MDN docs on BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects)。
=======
Polyfilling bigints is tricky. The reason is that many JavaScript operators, such as `+`, `-` and so on behave differently with bigints compared to regular numbers.

For example, division of bigints always returns a bigint (rounded if necessary).

To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with its functions. But doing so is cumbersome and would cost a lot of performance.

So, there's no well-known good polyfill.

Although, the other way around is proposed by the developers of [https://github.com/GoogleChromeLabs/jsbi](JSBI) library.

This library implements big numbers using its own methods. We can use them instead of native bigints:

| Operation | native `BigInt` | JSBI |
|-----------|-----------------|------|
| Creation from Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Addition | `c = a + b` | `c = JSBI.add(a, b)` |
| Subtraction	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...And then use the polyfill (Babel plugin) to convert JSBI calls to native bigints for those browsers that support them.

In other words, this approach suggests that we write code in JSBI instead of native bigints. But JSBI works with numbers as with bigints internally, emulates them closely following the specification, so the code will be "bigint-ready".

We can use such JSBI code "as is" for engines that don't support bigints and for those that do support - the polyfill will convert the calls to native bigints.

## References

- [MDN docs on BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects).
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
