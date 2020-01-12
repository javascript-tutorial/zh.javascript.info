# 数字类型

JavaScript 中的所有数字都以 64 位格式 [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) 存储，也称为“双精度”。

让我们回顾一下并展开我们目前了解的内容。

## 编写数字的更多方法

想象一下，我们需要写 10 亿。显而易见的方法是：

```js
let billion = 1000000000;
```

但在现实生活中，我们通常避免写一长串零，因为它很容易输入错误。另外，我们很懒。我们通常会为十亿或七十三亿写一些类似于 `1bn` 的数字，为 `7.3bn`。对于大多数人来说也是如此。

在 JavaScript 中，我们通过在数字后附加字母 "e" 来缩短数字，并指定零的数量来计数：

```js run
let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

alert( 7.3e9 );  // 7.3 billions (7,300,000,000)
```

换句话说，`"e"` 把数字乘以 `1` 后面跟着指定数量的 0。

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000 
```


现在让我们写一些非常小的东西。例如：1 微秒（百万分之一秒）：
```js
let ms = 0.000001;
```

就像以前一样，使用 `"e"` 可以提供帮助。如果我们想避免明确地写零，我们可以说：

```js
let ms = 1e-6; // six zeroes to the left from 1 
```


如果我们计算 `0.000001` 中的零，则有 6 个。所以自然是 `1e-6`。

换句话说，`e` 后面的负数表示除以 1 后面跟着给定数量的 0：

```js
// -3 divides by 1 with 3 zeroes
1e-3 = 1 / 1000 (=0.001)

// -6 divides by 1 with 6 zeroes
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### 十六进制，二进制和八进制数字

[十六进制](https://en.wikipedia.org/wiki/Hexadecimal)数字在 JavaScript 中被广泛用于表示颜色，编码字符以及其他许多事物。所以很自然地，写一个更简短的方法：`0x` 然后是数字。

例如：

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (the same, case doesn't matter)
```

虽然二进制和八进制数字系统很少使用，但也支持使用 `0b` 和 `0o` 前缀：


```js run
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

alert( a == b ); // true, the same number 255 at both sides
```

只有这三种进制支持这种写法。对于其他进制，我们应该使用函数 `parseInt`（我们将在本章后面看到）。

## toString(base)

方法 `num.toString(base)` 返回带有给定 `base` 的进制中 `num` 的字符串表示。

举个例子：
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` 可以从 `2` 变到 `36`。默认情况下它是 `10`。

常见的用例如下：

- **base=16** 用于十六进制颜色，字符编码等，数字可以是 `0..9` 或 `A..F`。
- **base=2** 主要用于调试按位操作，数字可以是 `0` 或 `1`。
- **base=36** 是最大值，数字可以是 `0..9` 或 `A..Z`。整个拉丁字母用来表示一个数字。对于 `36` 来说，一个有趣而有用的例子是，当我们需要将一个较长的数字标识符变成较短的时候，例如做一个简短的URL。可以简单地用基数为 `36` 的数字系统表示：

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="调用方法的两个点"
请注意 `123456..toString(36)` 中的两个点不是拼写错误。如果我们想直接在一个数字上调用一个方法，比如上面例子中的 `toString`，那么我们需要在它后面放置两个点 `..`。

如果我们放置一个点：`123456.toString(36)`，那么会出现错误，因为 JavaScript 语法暗示了第一个点之后的小数部分。如果我们再放一个点，那么 JavaScript 知道小数部分是空的，现在进入方法。

也可以写 `(123456).toString(36)`。
```

## 数值修约（Rounding）

使用数字时最常用的操作之一是数值修约。

有几个内置的数值修约函数：

`Math.floor`
: 向下舍入：`3.1` 变成 `3`，`-1.1` 变成 `-2`。

`Math.ceil`
: 向上舍入：`3.1` 变成 `4`，`-1.1` 变成 `-1`。

`Math.round`
: 向最近的整数舍入：`3.1` 变成 `3`, 3.6` 变成 `4`，`-1.1` 变成 `-1`。

`Math.trunc`（IE 浏览器不支持这个方法）
: 删除小数点后的所有内容而不舍入：`3.1` 变成 `3`，`-1.1` 变成 `-1`。

以下是总结它们之间差异的表格：

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


这些函数涵盖处理数字小数部分的所有可能方法。但是如果我们想在十进制后将数字四舍五入到 `n` 位呢？

例如，我们有 `1.2345`，并且想把它舍入到 2 位数，只得到 `1.23`。

有两种方法可以这样做：

1. 乘法和除法

    例如，要将数字四舍五入到小数点后的第二个数字，我们可以将数字乘以 100，调用舍入函数，然后再将其除回 100。
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. 函数 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 将点数后的数字四舍五入到 `n` 个数字并返回结果的字符串表示。
        
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
    alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits 
    ```

    我们可以使用一元加号或 `Number()` 调用将其转换为数字：`+ num.toFixed(5)`。

## 不精确计算

在 js 内部，一个数字以 64 位格式 [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) 表示，所以正好有 64 位可以存储一个数字：其中 52 个被使用存储这些数字，其中 11 个存储小数点的位置（它们对于整数为零），1 位用于符号。

如果一个数字太大，它会溢出 64 位存储，可能会输出无穷大：

```js run
alert( 1e500 ); // Infinity 
```

可能不那么明显，但经常会发生精度的损失。

考虑下这个（falsy！）测试：

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

没错，如果我们检查 `0.1` 和 `0.2` 的总和是否为 `0.3`，们会得到 `false`。

奇怪！那么如果不是 `0.3`，那么又是什么呢？

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

哎哟!这里的错误有更大的误差。想象一下，你正在制作一个电子购物网站，访问者将 `0.10 美元` 和 `0.20 美元` 商品放入他的图表中。订单总额将是 `$ 0.30000000000000004`。这会让任何人感到惊讶。

但为什么会发生这样的事呢？

一个数字以二进制形式存储在内存中，一个 1 和 0 的序列。但是像十进制数字系统看起来很简单的 `0.1`，`0.2` 这样的小数实际上是二进制形式的循环小数。

换句话说，什么是 `0.1`？`0.1` 就是把 1 除以 10 `1/10`，即十分之一。在十进制数字系统中，这些数字很容易表示。将它比作三分之一：`1/3`。它变成了循环小数 `0.33333(3)`。

所以，按这种用 `10` 划分可以保证在十进制系统中运行良好，但用 `3` 划分不是。出于同样的原因，在二进制数字系统中，`2` 的幂的分割保证工作，但 `1/10` 变成一个无限的二进制小数。

使用二进制系统无法*精确*存储 *0.1* 或 *0.2*，就像没有办法将三分之一存储为十进制小数一样。

数字格式 IEEE-754 通过四舍五入到最接近的可能数字来解决此问题。这些舍入规则通常不允许我们看到 `极小的精确度损失`，因此数字显示为 `0.3`。但要小心，损失依然存在。

我们可以看到这一点：
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

当我们给两个数字求和时，他们的“精度损失”会加起来。

这就是为什么 `0.1 + 0.2` 不等于 `0.3` 的原因。

```smart header="不仅仅是 JavaScript"
许多其他编程语言也存在同样的问题。

PHP, Java, C, Perl, Ruby 给出完全相同的结果，因为它们基于相同的数字格式。
```

我们能解决这个问题吗？当然，有很多方法：

1. 我们可以在特定函数的帮助下对结果进行四舍五入 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)：

    ```js run
    let sum = 0.1 + 0.2;
    alert( sum.toFixed(2) ); // 0.30
    ```

    请注意 `toFixed` 总是返回一个字符串。它确保它在小数点后有 2 位数字。如果我们有电子购物并需要显示 `0.30 美元`，这实际上很方便。对于其他情况，我们可以使用一元加号将它强制为一个数字：

    ```js run
    let sum = 0.1 + 0.2;
    alert( +sum.toFixed(2) ); // 0.3
    ```

2. 我们可以暂时将数字转换为数学整数，然后将其恢复。它是这样工作的：

    ```js run
    alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
    alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
    ```

    这是有效的，因为当我们做 `0.1 * 10 = 1` 和 `0.2 * 10 = 2` 时，那么这两个数字就变成了整数，并且没有精度损失。

3. 如果我们在与一家商店打交道，那么最激进的解决方案就是将所有价格存储在美分中，并且根本不使用分数。但是，如果我们应用 30％ 的折扣呢？在实践中，完全回避分数是很难实现的，所以上述解决方案有助于避免这种缺陷。

````smart header="有趣的事情"
尝试运行这个：

```js run
// Hello! I'm a self-increasing number! 
alert( 9999999999999999 ); // shows 10000000000000000
```

出现了同样的问题：精度的损失。该号码有 64 位，其中 52 位可用于存储数字，但这还不够。所以最不重要的数字就消失了。

JavaScript 在这种事件中不会触发错误。它尽最大努力使数字符合所需的格式，但不幸的是，这种格式不够大到满足需求。
````

```smart header="两个零"
数字内部表示的另一个有趣结果是存在两个零：`0` 和 `-0`。

这是因为一个符号由一个位表示，所以每个数字可以是正数或负数，包括零。 

在大多数情况下，这种区别并不明显，因为操作员可以将它们视为相同。
```



## 测试：isFinite 和 isNaN

还记得这两个特殊的数值吗？

- `Infinity`（和 `-Infinity`）是一个特殊的数值，比任何数值都大（小）。
- `NaN` 代表一个错误。

它们属于 `数字` 类型，但不是 `普通` 数字，因此有特殊函数可以检查它们：


- `isNaN(value)` 将其参数转换为数字，然后测试它是否为 `NaN`：

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    但是我们需要这个功能吗？我们不能只使用比较 `=== NaN` 吗？对不起，但答案是否定的。值 "NaN" 是独一无二的，它不等于任何东西，包括它本身：

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` 将其参数转换为数字，如果是常规数字，则返回 `true`，而不是 `NaN / Infinity / -Infinity`：

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

有时 `isFinite` 用于验证字符串值是否为常规数字：


```js run
let num = +prompt("Enter a number", '');

// 结果会是 true，除非你输入无穷大，无穷大或不是数字
alert( isFinite(num) );
```

请注意，所有数字函数（包括 `isFinite`）中的空字符串或空格字符串均被视为 `0`。

```smart header="与 Object.is 进行比较"

有一种特殊的内置方法 [Object.is](mdn:js/Object/is)，它可以比较 `===` 等值，但对于两种边缘情况更可靠： 

1. 它适用于 `NaN`： `Object.is（NaN，NaN）=== true`，这是件好事。
2. 值 `0` 和 `-0` 是不同的：`Object.is（0，-0）=== false`，它不是很重要，但这些值在技术上是不同的。

在所有其他情况下，`Object.is(a，b)` 与 `a === b` 相同。

这种比较方式经常用于 JavaScript 规范。当内部算法需要比较两个值完全相同时，它使用 Object.is（内部称为 [同值相等（SameValue）](https://tc39.github.io/ecma262/#sec-samevalue)）。
```


## parseInt 和 parseFloat

使用加号 `+` 或 `Number()` 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：

```js run
alert( +"100px" ); // NaN
```

唯一的例外是字符串开头或结尾的空格，因为它们会被忽略。

但在现实生活中，我们经常以单位表示值，比如 CSS 中的 `"100px"` 或 `"12pt"`。在许多国家，货币符号也超过了金额，所以我们有 `"19€"`，并希望从中提取一个数值。

这就是 `parseInt` 和 `parseFloat` 的作用。

它们从字符串中“读出”一个数字，直到无法读取为止。如果发生错误，则返回收集的数字。函数 `parseInt` 返回一个整数，而 `parseFloat` 将返回一个浮点数：

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

有时候 `parseInt / parseFloat` 会返回 `NaN`。一般发生在没有数字可读的情况下：

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

````smart header="parseInt(str, radix)` 的第二个参数"
`parseInt()` 函数有一个可选的第二个参数。它指定了数字系统的基础，因此 `parseInt` 还可以解析十六进制数字，二进制数字等字符串：

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```
````

## 其他数学函数

JavaScript 有一个内置的 [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象，它包含了一个小型的数学函数和常量库。

几个例子：

`Math.random()`
: 返回从 0 到 1 的随机数（不包括 1）

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: 从任意数量的参数中返回最大/最小值。

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: 返回 n 的 power 次幂，即 n<sup>power</sup>

    ```js run
    alert( Math.pow(2, 10) ); // 2 的 10 次幂 = 1024
    ```

这里有 `Math` 对象中的更多函数和常量，包括三角函数，你可以在这里找到它 [docs for the Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)。

## 总结

写非常大的数字：

- 附加 `"e"` 来省略 0，e 后面的数字就是零的个数。就像：`123e6` 是 `123` 后面接 6 个零。
- `"e"` 后面的负数将导致数字除以 1 后面接着给定数量的零。e-6 那是一百万分之一。

对于不同的进制：

- 可以在十六进制（`0x`），八进制（`0o`）和二进制（`0b`）系统中直接写入数字。
- `parseInt(str，base)` 解析来自任何数字系统的整数，其基数为：`2≤base≤36`。
- `num.toString(base)` 将数字转换为数字系统中具有给定 `base` 的字符串。

将 `12pt` 和 `100px` 等值转换为数字：

- 使用 `parseInt / parseFloat` 进行 `软` 转换，它从字符串中读取一个数字，然后返回错误发生前可以读取的值。

分数：

- 使用 `Math.floor`、`Math.ceil`、`Math.trunc`、`Math.round` 或 `num.toFixed(precision)` 截取。
- 请记住，使用分数时会损失精度。

更多的数学函数：

- 需要时请参阅 [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象,虽然这个文档非常小,但是它可以满足基础的要求。
