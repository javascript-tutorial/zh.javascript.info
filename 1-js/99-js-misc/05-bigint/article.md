# BigInt

[recent caniuse="bigint"]

<<<<<<< HEAD
`BigInt` 是一种特殊的数字类型，它提供了对任意长度整数的支持。

创建 bigint 的方式有两种：在一个整数字面量后面加 `n` 或者调用 `BigInt` 函数，该函数从字符串、数字等中生成 bigint。
=======
`BigInt` is a special numeric type that provides support for integers of arbitrary length.

A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

<<<<<<< HEAD
const bigintFromNumber = BigInt(10); // 与 10n 相同
```

## 数学运算符

`BigInt` 大多数情况下可以像常规数字类型一样使用，例如：
=======
const bigintFromNumber = BigInt(10); // same as 10n
```

## Math operators

`BigInt` can mostly be used like a regular number, for example:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

<<<<<<< HEAD
请注意：除法 `5/2` 的结果向零进行舍入，舍入后得到的结果没有了小数部分。对 bigint 的所有操作，返回的结果也是 bigint。

我们不可以把 bigint 和常规数字类型混合使用：
=======
Please note: the division `5/2` returns the result rounded towards zero, without the decimal part. All operations on bigints return bigints.

We can't mix bigints and regular numbers:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

<<<<<<< HEAD
如果有需要，我们应该显式地转换它们：使用 `BigInt()` 或者 `Number()`，像这样：
=======
We should explicitly convert them if needed: using either `BigInt()` or `Number()`, like this:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
let bigint = 1n;
let number = 2;

<<<<<<< HEAD
// 将 number 转换为 bigint
alert(bigint + BigInt(number)); // 3

// 将 bigint 转换为 number
alert(Number(bigint) + number); // 3
```

转换操作始终是静默的，绝不会报错，但是如果 bigint 太大而数字类型无法容纳，则会截断多余的位，因此我们应该谨慎进行此类转换。

````smart header="BigInt 不支持一元加法"
一元加法运算符 `+value`，是大家熟知的将 `value` 转换成数字类型的方法。

为了避免混淆，在 bigint 中不支持一元加法：
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
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```js run
let bigint = 1n;

alert( +bigint ); // error
```
<<<<<<< HEAD
所以我们应该用 `Number()` 来将一个 bigint 转换成一个数字类型。
````

## 比较运算符

比较运算符，例如 `<` 和 `>`，使用它们来对 bigint 和 number 类型的数字进行比较没有问题：
=======
So we should use `Number()` to convert a bigint to a number.
````

## Comparisons

Comparisons, such as `<`, `>` work with bigints and numbers just fine:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

<<<<<<< HEAD
但是请注意，由于 number 和 bigint 属于不同类型，它们可能在进行 `==` 比较时相等，但在进行 `===`（严格相等）比较时不相等：
=======
Please note though, as numbers and bigints belong to different types, they can be equal `==`, but not strictly equal `===`:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

<<<<<<< HEAD
## 布尔运算

当在 `if` 或其他布尔运算中时，bigint 的行为类似于 number。

例如，在 `if` 中，bigint `0n` 为 `false`，其他值为 `true`：

```js run
if (0n) {
  // 永远不会执行
}
```

布尔运算符，例如 `||`，`&&` 和其他运算符，处理 bigint 的方式也类似于 number：

```js run
alert( 1n || 2 ); // 1（1n 被认为是 true）

alert( 0n || 2 ); // 2（0n 被认为是 false）
```

## Polyfill

Polyfilling bigint 比较棘手。原因是许多 JavaScript 运算符，比如 `+` 和 `-` 等，在对待 bigint 的行为上与常规 number 相比有所不同。

例如，bigint 的除法总是返回 bigint（如果需要，会进行舍入）。

想要模拟这种行为，polyfill 需要分析代码，并用其函数替换所有此类运算符。但是这样做很麻烦，并且会耗费很多性能。

所以，目前并没有一个众所周知的好用的 polyfill。

不过，[JSBI](https://github.com/GoogleChromeLabs/jsbi) 库的开发者提出了另一种解决方案。

该库使用自己的方法实现了大的数字。我们可以使用它们替代原生的 bigint：

| 运算 | 原生 `BigInt` | JSBI |
|-----------|-----------------|------|
| 从 Number 创建 | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| 加法 | `c = a + b` | `c = JSBI.add(a, b)` |
| 减法 | `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

……然后，对于那些支持 bigint 的浏览器，可以使用 polyfill（Babel 插件）将 JSBI 调用转换为原生的 bigint。

换句话说，这个方法建议我们在写代码时使用 JSBI 替代原生的 bigint。但是 JSBI 在内部像使用 bigint 一样使用 number，并最大程度按照规范进行模拟，所以代码已经是准备好转换成 bigint 的了（bigint-ready）。

对于不支持 bigint 的引擎，我们可以“按原样”使用此类 JSBI 代码，对于那些支持 bigint 的引擎 — polyfill 会将调用转换为原生的 bigint。

## 参考

- [MDN 文档对 BigInt 的介绍](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。
- [ECMA262 规范](https://tc39.es/ecma262/#sec-bigint-objects)。
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
```

## Polyfills

Polyfilling bigints is tricky. The reason is that many JavaScript operators, such as `+`, `-` and so on behave differently with bigints compared to regular numbers.

For example, division of bigints always returns a bigint (rounded if necessary).

To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with its functions. But doing so is cumbersome and would cost a lot of performance.

So, there's no well-known good polyfill.

Although, the other way around is proposed by the developers of [JSBI](https://github.com/GoogleChromeLabs/jsbi) library.

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
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
