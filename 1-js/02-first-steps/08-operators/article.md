# Basic operators, maths

我们从学校里了解到过很多运算符，比如说加号 `+`、乘号 `*`、减号 `-` 等。

In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.

## 术语：“一元运算符”，“二元运算符”，“运算元”

在正式开始前，我们先简单浏览一下常用术语。

- **运算元** —— 运算符应用的对象。比如说乘法运算 `5 * 2`，有两个运算元：左运算元 `5` 和右运算元 `2`。有时候人们也称其为“参数”而不是“运算元”。
- 如果一个运算符对应的只有一个运算元，那么它是 **一元运算符**。比如说一元负号运算符（unary negation）`-`，它的作用是对数字进行正负转换：

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1，一元负号运算符生效
    ```
- 如果一个运算符拥有两个运算元，那么它是 **二元运算符**。减号还存在二元运算符形式：

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2，二元运算符减号做减运算
    ```

    严格地说，在上面的示例中，我们使用一个相同的符号表征了两个不同的运算符：负号运算符，即反转符号的一元运算符，减法运算符，是从另一个数减去一个数的二进制运算符。

## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, a remainder of 5 divided by 2
alert( 8 % 3 ); // 2, a remainder of 8 divided by 3
```

### Exponentiation **

The exponentiation operator `a ** b` multiplies `a` by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 multiplied by itself 2 times)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 times)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 times)
```

Mathematically, the exponentiation is defined for non-integer numbers as well. For example, a square root is an exponentiation by `1/2`:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet features of JavaScript operators that are beyond school arithmetics.

通常，加号 `+` 用于求和。

但是如果加号 `+` 被应用于字符串，它将合并（连接）各个字符串：

```js
let s = "my" + "string";
alert(s); // mystring
```

注意：只要任意一个运算元是字符串，那么另一个运算元也将被转化为字符串。

举个例子：

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

See, it doesn't matter whether the first operand is a string or the second one.

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = 41`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## 数字转化，一元运算符 +

加号 `+` 有两种形式。一种是上面我们刚刚讨论的二元运算符，还有一种是一元运算符。

一元运算符加号，或者说，加号 `+` 应用于单个值，对数字没有任何作用。但是如果运算元不是数字，加号 `+` 则会将其转化为数字。

例如：

```js run
// 对数字无效
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// 转化非数字
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

它的效果和 `Number(...)` 相同，但是更加简短。

我们经常会有将字符串转化为数字的需求。比如，如果我们正在从 HTML 表单中取值，通常得到的都是字符串。如果我们想对他们求和，该怎么办？

二元运算符加号会把他们合并成字符串：

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23"，二元运算符加号合并字符串
```

如果我们想把它们当做数字对待，我们需要转化它们，然后再求和：

```js run
let apples = "2";
let oranges = "3";

*!*
// 在二元运算符加号起作用之前，所有的值都被转化为了数字
alert( +apples + +oranges ); // 5
*/!*

// 更长的写法
// alert( Number(apples) + Number(oranges) ); // 5
```

从一个数学家的视角来看，大量的加号可能很奇怪。但是从一个程序员的视角，没什么好奇怪的：一元运算符加号首先起作用，他们将字符串转为数字，然后二元运算符加号对它们进行求和。

为什么一元运算符先于二元运算符作用于运算元？接下去我们将讨论到，这是由于它们拥有 **更高的优先级**。

## 运算符优先级

如果一个表达式拥有超过一个运算符，执行的顺序则由 **优先级** 决定。换句话说，所有的运算符中都隐含着优先级顺序。

从小学开始，我们就知道在表达式 `1 + 2 * 2` 中，乘法先于加法计算。这就是一个优先级问题。乘法比加法拥有 **更高的优先级**。

圆括号拥有最高优先级，所以如果我们对现有的运算顺序不满意，我们可以使用圆括号来修改运算顺序，就像这样：`(1 + 2) * 2`。

在 JavaScript 中有众多运算符。每个运算符都有对应的优先级数字。数字越大，越先执行。如果优先级相同，则按照由左至右的顺序执行。

这是一个摘抄自 Mozilla 的 [优先级表](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence)（你没有必要把这全记住，但要记住一元运算符优先级高于二元运算符）：

| 优先级 | 名称 | 符号 |
|------------|------|------|
| ... | ... | ... |
| 17 | 一元加号 | `+` |
| 17 | 一元负号 | `-` |
| 16 | exponentiation | `**` |
| 15 | 乘号 | `*` |
| 15 | 除号 | `/` |
| 13 | 加号 | `+` |
| 13 | 减号 | `-` |
| ... | ... | ... |
| 3 | 赋值符 | `=` |
| ... | ... | ... |

我们可以看到，“一元加号运算符”的优先级是 `17`，高于“二元加号运算符”的优先级 `13`。这也是为什么表达式 `"+apples + +oranges"` 中的一元加号先生效，然后才是二元加法。

## 赋值运算符

我们知道赋值符号 `=` 也是一个运算符。从优先级表中可以看到它的优先级非常低，只有 `3`。

这也是为什么，当我们赋值时，比如 `x = 2 * 2 + 1`，所有的计算先执行，然后 `=` 才执行，将计算结果存储到 `x`。

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

Most operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.

语句 `x = value` 将值 `value` 写入 `x` **然后返回 x**。

下面是一个在复杂语句中使用赋值的例子：

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

上面这个例子，`(a = b + 1)` 的结果是赋给 `a` 的值（也就是 `3`）。然后该值被用于进一步的运算。

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## 自增/自减

<!-- 在标题中无法写出 --，因为内置的解析器会将其转换为“长破折号” —— -->

对一个数进行加一、减一是最常见的数学运算符之一。

所以，对此有一些专门的运算符：

- **自增** `++` 将变量与 1 相加：

    ```js run no-beautify
    let counter = 2;
    counter++;      // 和 counter = counter + 1 效果一样，但是更简洁
    alert( counter ); // 3
    ```
- **自减** `--` 将变量与 1 相减：

    ```js run no-beautify
    let counter = 2;
    counter--;      // 和 counter = counter - 1 效果一样，但是更简洁
    alert( counter ); // 1
    ```

```warn
自增/自减只能应用于变量。试一下，将其应用于数值（比如 `5++`）则会报错。
```

运算符 `++` 和 `--` 可以置于变量前，也可以置于变量后。

- 当运算符置于变量后，被称为“后置形式”：`counter++`。
- 当运算符置于变量前，被称为“前置形式”：`++counter`。

两者都做同一件事：将变量 `counter` 与 `1` 相加。

那么他们有区别吗？有，但只有当我们使用 `++/--` 的返回值时才能看到区别。

详细点说。我们知道，所有的运算符都有返回值。自增/自减也不例外。前置形式返回一个新的值，但后置返回原来的值（做加法/减法之前的值）。

为了直观看到区别，看下面的例子：

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

`(*)` 所在的行是前置形式 `++counter`，对 `counter` 做自增运算，返回的是新的值 `2`。因此 `alert` 显示的是 `2`。

下面让我们看看后置形式：

```js run
let counter = 1;
let a = counter++; // (*) 将 ++counter 改为 counter++

alert(a); // *!*1*/!*
```

`(*)` 所在的行是后置形式 `counter++`，它同样对 `counter` 做加法，但是返回的是 **旧值**（做加法之前的值）。因此 `alert` 显示的是 `1`。

总结：

- 如果自增/自减的值不会被使用，那么两者形式没有区别：

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2，以上两行作用相同
    ```
- 如果我们想要对变量进行自增操作，**并且** 需要立刻使用自增后的值，那么我们需要使用前置形式：

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- 如果我们想要将一个数加一，但是我们想使用其自增之前的值，那么我们需要使用后置形式：

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="自增/自减和其它运算符的对比"
`++/--` 运算符同样可以在表达式内部使用。它们的优先级比绝大部分的算数运算符要高。

举个例子：

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

与下方例子对比：

```js run
let counter = 1;
alert( 2 * counter++ ); // 2，因为 counter++ 返回的是“旧值”
```

尽管从技术层面上来说可行，但是这样的写法会降低代码的可阅读性。在一行上做多个操作 —— 这样并不好。

当阅读代码时，快速的视觉“纵向”扫描会很容易漏掉 `counter++`，这样的自增操作并不明显。

我们建议用“一行一个行为”的模式：

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## 位运算符

位运算符把运算元当做 32 位整数，并在它们的二进制表现形式上操作。

这些运算符不是 JavaScript 特有的。大部分的编程语言都支持这些运算符。

下面是位运算符：

- 按位与 ( `&` )
- 按位或 ( `|` )
- 按位异或 ( `^` )
- 按位非 ( `~` )
- 左移 ( `<<` )
- 右移 ( `>>` )
- 无符号右移 ( `>>>` )

These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN when a need arises.

## 逗号运算符

逗号运算符 `,` 是最少见最不常使用的运算符之一。有时候它会被用来写更简短的代码，因此为了能够理解代码，我们需要了解它。

逗号运算符能让我们处理多个语句，使用 `,` 将它们分开。每个语句都运行了，但是只有最后的语句的结果会被返回。

举个例子：

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7（3 + 4 的结果）
```

这里，第一个语句 `1 + 2` 运行了，但是它的结果被丢弃了。随后计算 `3 + 4`，并且该计算结果被返回。

```smart header="逗号运算符的优先级非常低"
请注意逗号运算符的优先级非常低，比 `=` 还要低，因此上面你的例子中圆括号非常重要。

如果没有圆括号：`a = 1 + 2, 3 + 4` 会先执行 `+`，将数值相加得到 `a = 3, 7`，然后赋值运算符 `=` 执行, 'a = 3'，然后逗号之后的数值 `7` 不会再执行，它被忽略掉了。相当于 `(a = 1 + 2), 3 + 4`。
```

为什么我们需要这样一个运算符，它只返回最后一个值呢？

有时候，人们会使用它把几个行为放在一行上来进行复杂的运算。

举个例子：

```js
// 一行上有三个运算符
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

这样的技巧在许多 JavaScript 框架中都有使用，这也是为什么我们提到它。但是通常它并不能提升代码的可读性，使用它之前，我们要想清楚。
