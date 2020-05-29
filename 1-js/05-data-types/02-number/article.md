# 数字类型

<<<<<<< HEAD
在现代 JavaScript 中，数字（number）有两种类型：

1. JavaScript 中的常规数字以 64 位的格式 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) 存储，也被称为“双精度浮点数”。这是我们大多数时候所使用的数字，我们将在本章中学习它们。
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers, to represent integers of arbitrary length. They are sometimes needed, because a regular number can't exceed <code>2<sup>53</sup></code> or be less than <code>-2<sup>53</sup></code>. As bigints are used in few special areas, we devote them a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

2. BigInt 数字，用于表示任意长度的整数。有时会需要它们，因为常规数字不能超过 <code>2<sup>53</sup></code> 或小于 <code>-2<sup>53</sup></code>。由于仅在少数特殊领域才会用到 BigInt，因此我们在特殊的章节 <info:bigint> 中对其进行了介绍。

所以，在这里我们将讨论常规数字类型。现在让我们开始学习吧。

## 编写数字的更多方法

想象一下，我们需要写 10 亿。显然的方法是：

```js
let billion = 1000000000;
```

<<<<<<< HEAD
但在现实生活中，我们通常避免写一长串零，因为它很容易打错。另外，我们很懒。我们通常会将 10 亿写成 `"1bn"`，或将 72 亿写成 `"7.3bn"`。对于大多数大的数字来说都是如此。
=======
But in real life, we usually avoid writing a long string of zeroes as it's easy to mistype. Also, we are lazy. We will usually write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

在 JavaScript 中，我们通过在数字后附加字母 "e"，并指定零的数量来缩短数字：

```js run
let billion = 1e9;  // 10 亿，字面意思：数字 1 后面跟 9 个 0

alert( 7.3e9 );  // 73 亿（7,300,000,000）
```

换句话说，`"e"` 把数字乘以 `1` 后面跟着给定数量的 0 的数字。

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```

<<<<<<< HEAD
现在让我们写一些非常小的数字。例如，1 微秒（百万分之一秒）：
=======
Now let's write something very small. Say, 1 microsecond (one millionth of a second):
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
let ms = 0.000001;
```

<<<<<<< HEAD
就像以前一样，可以使用 `"e"` 来完成。如果我们想避免显式地写零，我们可以这样写：

```js
let ms = 1e-6; // 1 的左边有 6 个 0
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could say the same as:

```js
let ms = 1e-6; // six zeroes to the left from 1
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```

如果我们数一下 `0.000001` 中的 0 的个数，是 6 个。所以自然是 `1e-6`。

换句话说，`e` 后面的负数表示除以 1 后面跟着给定数量的 0 的数字：

```js
// -3 除以 1 后面跟着 3 个 0 的数字
1e-3 = 1 / 1000 (=0.001)

// -6 除以 1 后面跟着 6 个 0 的数字
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### 十六进制，二进制和八进制数字

[十六进制](https://en.wikipedia.org/wiki/Hexadecimal) 数字在 JavaScript 中被广泛用于表示颜色，编码字符以及其他许多东西。所以自然地，有一种较短的写方法：`0x`，然后是数字。

例如：

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255（一样，大小写没影响）
```

二进制和八进制数字系统很少使用，但也支持使用 `0b` 和 `0o` 前缀：


```js run
let a = 0b11111111; // 二进制形式的 255
let b = 0o377; // 八进制形式的 255

alert( a == b ); // true，两边是相同的数字，都是 255
```

只有这三种进制支持这种写法。对于其他进制，我们应该使用函数 `parseInt`（我们将在本章后面看到）。

## toString(base)

方法 `num.toString(base)` 返回在给定 `base` 进制数字系统中 `num` 的字符串表示形式。

举个例子：
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` 的范围可以从 `2` 到 `36`。默认情况下是 `10`。

常见的用例如下：

- **base=16** 用于十六进制颜色，字符编码等，数字可以是 `0..9` 或 `A..F`。
- **base=2** 主要用于调试按位操作，数字可以是 `0` 或 `1`。
- **base=36** 是最大进制，数字可以是 `0..9` 或 `A..Z`。所有拉丁字母都被用于了表示数字。对于 `36` 进制来说，一个有趣且有用的例子是，当我们需要将一个较长的数字标识符转换成较短的时候，例如做一个短的 URL。可以简单地使用基数为 `36` 的数字系统表示：

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="使用两个点来调用一个方法"
请注意 `123456..toString(36)` 中的两个点不是打错了。如果我们想直接在一个数字上调用一个方法，比如上面例子中的 `toString`，那么我们需要在它后面放置两个点 `..`。

如果我们放置一个点：`123456.toString(36)`，那么就会出现一个 error，因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。

也可以写成 `(123456).toString(36)`。
```

## 舍入

舍入（rounding）是使用数字时最常用的操作之一。

这里有几个对数字进行舍入的内建函数：

`Math.floor`
: 向下舍入：`3.1` 变成 `3`，`-1.1` 变成 `-2`。

`Math.ceil`
: 向上舍入：`3.1` 变成 `4`，`-1.1` 变成 `-1`。

`Math.round`
: 向最近的整数舍入：`3.1` 变成 `3`，`3.6` 变成 `4`，`-1.1` 变成 `-1`。

`Math.trunc`（IE 浏览器不支持这个方法）
: 移除小数点后的所有内容而没有舍入：`3.1` 变成 `3`，`-1.1` 变成 `-1`。

这个是总结它们之间差异的表格：

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


这些函数涵盖了处理数字小数部分的所有可能方法。但是，如果我们想将数字舍入到小数点后 `n` 位，该怎么办？

例如，我们有 `1.2345`，并且想把它舍入到小数点后两位，仅得到 `1.23`。

有两种方式可以实现这个需求：

1. 乘除法

    例如，要将数字舍入到小数点后两位，我们可以将数字乘以 `100`，调用舍入函数，然后再将其除回。
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

<<<<<<< HEAD
2. 函数 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 将数字舍入到小数点后 `n` 位，并以字符串形式返回结果。
        
=======
2. The method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to `n` digits after the point and returns a string representation of the result.

>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    这会向上或向下舍入到最接近的值，类似于 `Math.round`：

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    请注意 `toFixed` 的结果是一个字符串。如果小数部分比所需要的短，则在结尾添加零：

    ```js run
    let num = 12.34;
<<<<<<< HEAD
    alert( num.toFixed(5) ); // "12.34000"，在结尾添加了 0，以达到小数点后五位
=======
    alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    ```

    我们可以使用一元加号或 `Number()` 调用，将其转换为数字：`+ num.toFixed(5)`。

## 不精确的计算

<<<<<<< HEAD
在内部，数字是以 64 位格式 [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) 表示的，所以正好有 64 位可以存储一个数字：其中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号。
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers), and 1 bit is for the sign.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

如果一个数字太大，则会溢出 64 位存储，并可能会导致无穷大：

```js run
alert( 1e500 ); // Infinity
```

这可能不那么明显，但经常会发生的是，精度的损失。

考虑下这个（falsy！）测试：

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

<<<<<<< HEAD
没错，如果我们检查 `0.1` 和 `0.2` 的总和是否为 `0.3`，我们会得到 `false`。
=======
That's right, if we check whether the sum of `0.1` and `0.2` is `0.3`, we get `false`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

奇了怪了！如果不是 `0.3`，那能是啥？

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
哎哟！这个错误比不正确的比较的后果更严重。想象一下，你创建了一个电子购物网站，如果访问者将价格为 `¥ 0.10` 和 `¥ 0.20` 的商品放入了他的购物车。订单总额将是 `¥ 0.30000000000000004`。这会让任何人感到惊讶。
=======
Ouch! There are more consequences than an incorrect comparison here. Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

但为什么会这样呢？

<<<<<<< HEAD
一个数字以其二进制的形式存储在内存中，一个 1 和 0 的序列。但是在十进制数字系统中看起来很简单的 `0.1`，`0.2` 这样的小数，实际上在二进制形式中是无限循环小数。

换句话说，什么是 `0.1`？`0.1` 就是 `1` 除以 `10`，`1/10`，即十分之一。在十进制数字系统中，这样的数字表示起来很容易。将其与三分之一进行比较：`1/3`。三分之一变成了无限循环小数 `0.33333(3)`。
=======
A number is stored in memory in its binary form, a sequence of bits - ones and zeroes. But fractions like `0.1`, `0.2` that look simple in the decimal numeric system are actually unending fractions in their binary form.

In other words, what is `0.1`? It is one divided by ten `1/10`, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

在十进制数字系统中，可以保证以 `10` 的整数次幂作为除数能够正常工作，但是以 `3` 作为除数则不能。也是同样的原因，在二进制数字系统中，可以保证以 `2` 的整数次幂作为除数时能够正常工作，但 `1/10` 就变成了一个无限循环的二进制小数。

使用二进制数字系统无法 **精确** 存储 *0.1* 或 *0.2*，就像没有办法将三分之一存储为十进制小数一样。

<<<<<<< HEAD
IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题。这些舍入规则通常不允许我们看到“极小的精度损失”，但是它确实存在。
=======
The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

我们可以看到：
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

当我们对两个数字进行求和时，它们的“精度损失”会叠加起来。

这就是为什么 `0.1 + 0.2` 不等于 `0.3`。

```smart header="不仅仅是 JavaScript"
许多其他编程语言也存在同样的问题。

<<<<<<< HEAD
PHP，Java，C，Perl，Ruby 给出的也是完全相同的结果，因为它们基于的是相同的数字格式。
```

我们能解决这个问题吗？当然，最可靠的方法是借助方法 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 对结果进行舍入：
=======
PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format.
```

Can we work around the problem? Sure, the most reliable method is to round the result with the help of a method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

<<<<<<< HEAD
请注意，`toFixed` 总是返回一个字符串。它确保小数点后有 2 位数字。如果我们有一个电子购物网站，并需要显示 `¥ 0.30`，这实际上很方便。对于其他情况，我们可以使用一元加号将其强制转换为一个数字：
=======
Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That's actually convenient if we have an e-shopping and need to show `$0.30`. For other cases, we can use the unary plus to coerce it into a number:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

<<<<<<< HEAD
我们可以将数字临时乘以 100（或更大的数字），将其转换为整数，进行数学运算，然后再除回。当我们使用整数进行数学运算时，误差会有所减少，但仍然可以在除法中得到：
=======
We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we're doing maths with integers, the error somewhat decreases, but we still get it on division:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
因此，乘/除法可以减少误差，但不能完全消除误差。

有时候我们可以尝试完全避免小数。例如，我们正在创建一个电子购物网站，那么我们可以用角而不是元来存储价格。但是，如果我们要打 30% 的折扣呢？实际上，完全避免小数处理几乎是不可能的。只需要在必要时剪掉其“尾巴”来对其进行舍入即可。
=======
So, multiply/divide approach reduces the error, but doesn't remove it totally.

Sometimes we could try to evade fractions at all. Like if we're dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut "tails" when needed.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

````smart header="有趣的事儿"
尝试运行下面这段代码：

```js run
<<<<<<< HEAD
// Hello！我是一个会自我增加的数字！
alert( 9999999999999999 ); // 显示 10000000000000000
=======
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```

出现了同样的问题：精度损失。有 64 位来表示该数字，其中 52 位可用于存储数字，但这还不够。所以最不重要的数字就消失了。

JavaScript 不会在此类事件中触发 error。它会尽最大努力使数字符合所需的格式，但不幸的是，这种格式不够大到满足需求。
````

```smart header="两个零"
数字内部表示的另一个有趣结果是存在两个零：`0` 和 `-0`。

<<<<<<< HEAD
这是因为在存储时，使用一位来存储符号，因此对于包括零在内的任何数字，可以设置这一位或者不设置。
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

在大多数情况下，这种区别并不明显，因为运算符将它们视为相同的值。
```

<<<<<<< HEAD
## 测试：isFinite 和 isNaN

还记得这两个特殊的数值吗？

- `Infinity`（和 `-Infinity`）是一个特殊的数值，比任何数值都大（小）。
- `NaN` 代表一个 error。
=======
## Tests: isFinite and isNaN

Remember these two special numeric values?

- `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
- `NaN` represents an error.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

它们属于 `number` 类型，但不是“普通”数字，因此，这里有用于检查它们的特殊函数：


- `isNaN(value)` 将其参数转换为数字，然后测试它是否为 `NaN`：

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    但是我们需要这个函数吗？我们不能只使用 `=== NaN` 比较吗？不好意思，这不行。值 "NaN" 是独一无二的，它不等于任何东西，包括它自身：

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` 将其参数转换为数字，如果是常规数字，则返回 `true`，而不是 `NaN/Infinity/-Infinity`：

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false，因为是一个特殊的值：NaN
    alert( isFinite(Infinity) ); // false，因为是一个特殊的值：Infinity
    ```

有时 `isFinite` 被用于验证字符串值是否为常规数字：


```js run
let num = +prompt("Enter a number", '');

// 结果会是 true，除非你输入的是 Infinity、-Infinity 或不是数字
alert( isFinite(num) );
```

请注意，在所有数字函数中，包括 `isFinite`，空字符串或仅有空格的字符串均被视为 `0`。

```smart header="与 `Object.is` 进行比较"

<<<<<<< HEAD
有一个特殊的内建方法 [`Object.is`](mdn:js/Object/is)，它类似于 `===` 一样对值进行比较，但它对于两种边缘情况更可靠：

1. 它适用于 `NaN`：`Object.is（NaN，NaN）=== true`，这是件好事。
2. 值 `0` 和 `-0` 是不同的：`Object.is（0，-0）=== false`，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。

在所有其他情况下，`Object.is(a，b)` 与 `a === b` 相同。
=======
There is a special built-in method [`Object.is`](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's true, because internally the number has a sign bit that may be different even if all other bits are zeroes.

In all other cases, `Object.is(a, b)` is the same as `a === b`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

这种比较方式经常被用在 JavaScript 规范中。当内部算法需要比较两个值是否完全相同时，它使用 `Object.is`（内部称为 [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)）。
```


## parseInt 和 parseFloat

使用加号 `+` 或 `Number()` 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：

```js run
alert( +"100px" ); // NaN
```

唯一的例外是字符串开头或结尾的空格，因为它们会被忽略。

但在现实生活中，我们经常会有带有单位的值，例如 CSS 中的 `"100px"` 或 `"12pt"`。并且，在很多国家，货币符号是紧随金额之后的，所以我们有 `"19€"`，并希望从中提取出一个数值。

这就是 `parseInt` 和 `parseFloat` 的作用。

<<<<<<< HEAD
它们可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。函数 `parseInt` 返回一个整数，而 `parseFloat` 返回一个浮点数：
=======
They "read" a number from a string until they can't. In case of an error, the gathered number is returned. The function `parseInt` returns an integer, whilst `parseFloat` will return a floating-point number:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12，只有整数部分被返回了
alert( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取
```

某些情况下，`parseInt/parseFloat` 会返回 `NaN`。当没有数字可读时会发生这种情况：

```js run
alert( parseInt('a123') ); // NaN，第一个符号停止了读取
```

````smart header="parseInt(str, radix)` 的第二个参数"
`parseInt()` 函数具有可选的第二个参数。它指定了数字系统的基数，因此 `parseInt` 还可以解析十六进制数字、二进制数字等的字符串：

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，没有 0x 仍然有效

alert( parseInt('2n9c', 36) ); // 123456
```
````

## 其他数学函数

JavaScript 有一个内建的 [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象，它包含了一个小型的数学函数和常量库。

几个例子：

`Math.random()`
: 返回一个从 0 到 1 的随机数（不包括 1）

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (任何随机数)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: 从任意数量的参数中返回最大/最小值。

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: 返回 `n` 的给定（power）次幂

    ```js run
    alert( Math.pow(2, 10) ); // 2 的 10 次幂 = 1024
    ```

<<<<<<< HEAD
`Math` 对象中还有更多函数和常量，包括三角函数，你可以在 [Math 函数文档](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 中找到这些内容。

## 总结
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object.

## Summary

To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

要写有很多零的数字：

<<<<<<< HEAD
- 将 `"e"` 和 0 的数量附加到数字后。就像：`123e6` 与 `123` 后面接 6 个 0 相同。
- `"e"` 后面的负数将使数字除以 1 后面接着给定数量的零的数字。例如 `123e-6` 表示 `0.000123`（`123` 的百万分之一）。
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

对于不同的数字系统：

<<<<<<< HEAD
- 可以直接在十六进制（`0x`），八进制（`0o`）和二进制（`0b`）系统中写入数字。
- `parseInt(str，base)` 将字符串 `str` 解析为在给定的 `base` 数字系统中的整数，`2 ≤ base ≤ 36`。
- `num.toString(base)` 将数字转换为在给定的 `base` 数字系统中的字符串。
=======
- Use `parseInt/parseFloat` for the "soft" conversion, which reads a number from a string and then returns the value they could read before the error.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

要将 `12pt` 和 `100px` 之类的值转换为数字：

- 使用 `parseInt/parseFloat` 进行“软”转换，它从字符串中读取数字，然后返回在发生 error 前可以读取到的值。

小数：

<<<<<<< HEAD
- 使用 `Math.floor`，`Math.ceil`，`Math.trunc`，`Math.round` 或 `num.toFixed(precision)` 进行舍入。
- 请确保记住使用小数时会损失精度。

更多数学函数：

- 需要时请查看 [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象。这个库很小，但是可以满足基本的需求。
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small, but can cover basic needs.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
