# 运算符

<<<<<<< HEAD
我们从学校里了解到过很多运算符，比如说加号 `+`、乘号 `*`、减号 `-` 等。

在这个章节，我们将关注一些在学校数学课程中没有涵盖的运算符。
=======
We know many operators from school. They are things like addition `+`, multiplication `*`, subtraction `-`, and so on.

In this chapter, we'll concentrate on aspects of operators that are not covered by school arithmetic.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

## 术语：「一元运算符」、「二元运算符」、「运算元」

<<<<<<< HEAD
在正式开始前，我们先简单浏览一下常用术语。

- **运算元** —— 运算符应用的对象。比如说乘法运算 `5 * 2`，有两个运算元：左运算元 `5` 和右运算元 `2`。有时候人们也称其为「参数」。
- 如果一个运算符对应的只有一个运算元，那么它是 **一元运算符**。比如说一元负号运算符（unary negation）`-`，它的作用是对数字进行正负转换：
=======
Before we move on, let's grasp some common terminology.

- *An operand* -- is what operators are applied to. For instance, in the multiplication of `5 * 2` there are two operands: the left operand is `5` and the right operand is `2`. Sometimes, people call these "arguments" instead of "operands".
- An operator is *unary* if it has a single operand. For example, the unary negation `-` reverses the sign of a number:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1，一元负号运算符生效
    ```
<<<<<<< HEAD
- 如果一个运算符拥有两个运算元，那么它是 **二元运算符**。减号还存在二元运算符形式：
=======
- An operator is *binary* if it has two operands. The same minus exists in binary form as well:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2，二元运算符减号做减运算
    ```

<<<<<<< HEAD
    严格地说，在上面的示例中，我们使用一个相同的符号表征了两个不同的运算符：负号运算符，即反转符号的一元运算符，减法运算符，是从另一个数减去一个数的二进制运算符。

## 字符串连接功能，二元运算符 +

下面，让我们看一下在学校数学课程范围外的 JavaScript 运算符特性。

通常，加号 `+` 用于求和。

但是如果加号 `+` 被应用于字符串，它将合并（连接）各个字符串：
=======
    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## String concatenation, binary +

Now, let's see special features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD
注意：只要其中一个运算元是字符串，那么另一个运算元也将被转化为字符串。
=======
Note that if one of the operands is a string, the other one is converted to a string too.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

举个例子：

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD
可以看出，字符串在前和在后并不影响这个规则。简单来说：如果任一运算元是字符串，那么其它运算元也将被转化为字符串。
=======
See, it doesn't matter whether the first operand is a string or the second one. The rule is simple: if either operand is a string, the other one is converted into a string as well.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

但是，请注意：运算符的运算方向是由左至右。如果是两个数字，后面再跟一个字符串，那么两个数字会先相加，再转化为字符串：


```js run
alert(2 + 2 + '1' ); // "41" 而不是 "221"
```

<<<<<<< HEAD
字符串连接和转化是二元运算符加号 `+` 的一个特性。其它的数学运算符都只对数字有效。通常，他们会把运算元转化为数字。
=======
String concatenation and conversion is a special feature of the binary plus `+`. Other arithmetic operators work only with numbers and always convert their operands to numbers.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

举个例子，减法和除法：

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## 数字转化功能，一元运算符 +

<<<<<<< HEAD
加号 `+` 有两种形式。一种是上面我们刚刚讨论的二元运算符，还有一种是一元运算符。

一元运算符加号，或者说，加号 `+` 应用于单个值，对数字没有任何作用。但是如果运算元不是数字，加号 `+` 则会将其转化为数字。
=======
The plus `+` exists in two forms: the binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn't do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

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

<<<<<<< HEAD
它的效果和 `Number(...)` 相同，但是更加简短。

我们经常会有将字符串转化为数字的需求。比如，如果我们正在从 HTML 表单中取值，通常得到的都是字符串。如果我们想对他们求和，该怎么办？

二元运算符加号会把他们合并成字符串：
=======
It actually does the same thing as `Number(...)`, but is shorter.

The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?

The binary plus would add them as strings:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23"，二元运算符加号合并字符串
```

<<<<<<< HEAD
如果我们想把它们当做数字对待，我们需要转化它们，然后再求和：
=======
If we want to treat them as numbers, we need to convert and then sum them:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

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

<<<<<<< HEAD
从一个数学家的视角来看，大量的加号可能很奇怪。但是从一个程序员的视角，没什么好奇怪的：一元运算符加号首先起作用，他们将字符串转为数字，然后二元运算符加号对它们进行求和。

为什么一元运算符先于二元运算符作用于运算元？接下去我们将讨论到，这是由于它们拥有 **更高的优先级**。

## 运算符优先级

如果一个表达式拥有超过一个运算符，执行的顺序则由 **优先级** 决定。换句话说，所有的运算符中都隐含着优先级顺序。

从小学开始，我们就知道在表达式 `1 + 2 * 2` 中，乘法先于加法计算。这就是一个优先级问题。乘法比加法拥有 **更高的优先级**。

圆括号拥有最高优先级，所以如果我们对现有的运算顺序不满意，我们可以使用圆括号来修改运算顺序，就像这样：`(1 + 2) * 2`。

在 JavaScript 中有众多运算符。每个运算符都有对应的优先级数字。数字越大，越先执行。如果优先级相同，则按照由左至右的顺序执行。

这是一个摘抄自 Mozilla 的 [优先级表](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence)（你没有必要把这全记住，但要记住一元运算符优先级高于二元运算符）：
=======
From a mathematician's standpoint, the abundance of pluses may seem strange. But from a programmer's standpoint, there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we're going to see, that's because of their *higher precedence*.

## Operator precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here's an extract from the [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

| 优先级 | 名称 | 符号 |
|------------|------|------|
| ... | ... | ... |
| 16 | 一元加号 | `+` |
| 16 | 一元负号 | `-` |
| 14 | 乘号 | `*` |
| 14 | 除号 | `/` |
| 13 | 加号 | `+` |
| 13 | 减号 | `-` |
| ... | ... | ... |
| 3 | 赋值符 | `=` |
| ... | ... | ... |

<<<<<<< HEAD
我们可以看到，「一元运算符加号」的优先级是 `16`，高于「二元运算符加号」的优先级 `13`。这也是为什么表达式 `"+apples + +oranges"` 中的一元加号先生效，然后才是二元加法。
=======
As we can see, the "unary plus" has a priority of `16` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

## 赋值运算符

我们知道赋值符号 `=` 也是一个运算符。从优先级表中可以看到它的优先级非常低，只有 `3`。

<<<<<<< HEAD
这也是为什么，当我们赋值时，比如 `x = 2 * 2 + 1`，所有的计算先执行，然后 `=` 才执行，将计算结果存储到 `x`。
=======
That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

链式赋值也是可以的：

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

<<<<<<< HEAD
链式赋值由右向左执行。首先执行最右侧表达式 `2 + 2`，然后将结果赋值给左侧：`c`、`b`、`a`。最后，所有的变量都共享一个值。

````smart header="赋值运算符 `\"=\"` 会返回一个值"
每个运算符都有一个返回值。对于以加号 `+` 或者乘号 `*` 为例的大部分运算符而言，这一点很显然。对于赋值运算符而言，这一点同样适用。
=======
Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

````smart header="The assignment operator `\"=\"` returns a value"
An operator always returns a value. That's obvious for most of them like addition `+` or multiplication `*`. But the assignment operator follows this rule too.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

语句 `x = value` 把 `value` 的值写入 `x` **然后返回 x**。

<<<<<<< HEAD
下面是一个在复杂语句中使用赋值的例子：
=======
Here's a demo that uses an assignment as part of a more complex expression:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

<<<<<<< HEAD
上面这个例子，`(a = b + 1)` 的结果是赋给 `a` 的值（也就是 `3`）。然后该值被用于进一步的运算。

这段代码是不是很好玩儿？我们应该理解它的原理，因为我们有时会在第三方库中见到这样的写法，但我们自己不应该这样写。这样的小技巧让代码变得整洁度和可读性都很差。
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries, but shouldn't write anything like that ourselves. Such tricks definitely don't make code clearer or readable.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
````

## 求余运算符 %

<<<<<<< HEAD
求余运算符 `%` 尽管看上去是个百分号，但它和百分数没有什么关系。
=======
The remainder operator `%`, despite its appearance, is not related to percents.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

`a % b` 的结果是 `a` 除以 `b` 的余数。

举个例子：

```js run
alert( 5 % 2 ); // 1 是 5 / 2 的余数
alert( 8 % 3 ); // 2 是 8 / 3 的余数
alert( 6 % 3 ); // 0 是 6 / 3 的余数
```

## 幂运算符 **

幂运算符 `**` 是最近被加入到 JavaScript 中的。

对于自然数 `b`，`a ** b` 的结果是 `a` 与自己相乘 `b` 次。

举个例子：

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

<<<<<<< HEAD
这个运算符对于 `a` 和 `b` 是非整数的情况依然适用。

例如：
=======
The operator works for non-integer numbers as well.

For instance:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
alert( 4 ** (1/2) ); // 2 (1/2 幂相当于开方，这是数学常识)
alert( 8 ** (1/3) ); // 2 (1/3 幂相当于开三次方)
```

## 自增/自减

<!-- 在标题中我不能把 -- 写出来，因为内置的插件会把它转为 - -->

对一个数进行加一、减一是最常见的数学运算符之一。

<<<<<<< HEAD
所以，对此有一些专门的运算符：
=======
So, there are special operators for it:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

- **自增** `++` 将变量与 1 相加：

    ```js run no-beautify
    let counter = 2;
<<<<<<< HEAD
    counter++;      // 和 counter = counter + 1 效果一样，但是更简洁
=======
    counter++;        // works the same as counter = counter + 1, but is shorter
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
    alert( counter ); // 3
    ```
- **自减** `--` 将变量与 1 相减：

    ```js run no-beautify
    let counter = 2;
<<<<<<< HEAD
    counter--;      // 和 counter = counter - 1 效果一样，但是更简洁
=======
    counter--;        // works the same as counter = counter - 1, but is shorter
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
    alert( counter ); // 1
    ```

```warn
<<<<<<< HEAD
自增/自减只能应用于变量。试一下，将其应用于数值（比如 `5++`）则会报错。
```

运算符 `++` 和 `--` 可以置于变量前，也可以置于变量后。

- 当运算符置于变量后，被称为「后置形式」：`counter++`。
- 当运算符置于变量前，被称为「前置形式」：`++counter`。

两者都做同一件事：将变量 `counter` 与 `1` 相加。
=======
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

那么他们有区别吗？有，但只有当我们使用 `++/--` 的返回值时才能看到区别。

<<<<<<< HEAD
详细点说。我们知道，所有的运算符都有返回值。自增/自减也不例外。前置形式返回一个新的值，但后置返回原来的值（做加法/减法之前的值）。

为了直观看到区别，看下面的例子：
=======
Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

<<<<<<< HEAD
`(*)` 所在的行是前置形式 `++counter`，对 `counter` 做自增运算，返回的是新的值 `2`。因此 `alert` 显示的是 `2`。

下面让我们看看后置形式：
=======
In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
let counter = 1;
let a = counter++; // (*) 将 ++counter 改为 counter++

alert(a); // *!*1*/!*
```

<<<<<<< HEAD
`(*)` 所在的行是后置形式 `counter++`，它同样对 `counter` 做加法，但是返回的是 **旧值**（做加法之前的值）。因此 `alert` 显示的是 `1`。
=======
In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

总结：

<<<<<<< HEAD
- 如果自增/自减的值不会被使用，那么两者形式没有区别：
=======
- If the result of increment/decrement is not used, there is no difference in which form to use:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2，以上两行作用相同
    ```
<<<<<<< HEAD
- 如果我们想要对变量进行自增操作，**并且** 需要立刻使用自增后的值，那么我们需要使用前置形式：
=======
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
<<<<<<< HEAD
- 如果我们想要将一个数加一，但是我们想使用其自增之前的值，那么我们需要使用后置形式：
=======
- If we'd like to increment a value but use its previous value, we need the postfix form:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

<<<<<<< HEAD
````smart header="自增/自减和其它运算符的对比"
`++/--` 运算符同样可以在表达式内部使用。它们的优先级比绝大部分的算数运算符要高。
=======
````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

举个例子：

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

与下方例子对比：

```js run
let counter = 1;
alert( 2 * counter++ ); // 2，因为 counter++ 返回的是「旧值」
```

<<<<<<< HEAD
尽管从技术层面上来说可行，但是这样的写法会降低代码的可阅读性。在一行上做多个操作 —— 这样并不好。

当阅读代码时，快速的视觉「纵向」扫描会很容易漏掉 `counter++`，这样的自增操作并不明显。

我们建议「一行一个操作」模式：
=======
Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

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

<<<<<<< HEAD
这些操作使用得非常少。为了理解它们，我们需要探讨底层的数字表达形式，现在不是做这个的最好时机。尤其是我们现在不会立刻使用它。如果你感兴趣，可以阅读 MDN 中的 [位运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 相关文章。当有相关实际需求的时候再去阅读是更明智的选择。
=======
These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

## 修改并替换

<<<<<<< HEAD
我们经常需要对一个变量进行操作，并把计算得到的新结果存储在这个变量中。
=======
We often need to apply an operator to a variable and store the new result in that same variable.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

举个例子：

```js
let n = 2;
n = n + 5;
n = n * 2;
```

<<<<<<< HEAD
这个操作可以通过使用运算符 `+=` 和 `*=` 进行简化：
=======
This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
let n = 2;
n += 5; // now n = 7 (同 n = n + 5)
n *= 2; // now n = 14 (同n = n * 2)

alert( n ); // 14
```

<<<<<<< HEAD
简短的「修改并替换」 运算符对所有的运算符包括位运算符都有效：`/=`、`-=`等等。
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

这些运算符和正常的赋值运算符拥有相同的优先级，因此它们会在其它大部分运算完成之后运行：

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16（右侧计算首先进行，和 n *= 8 相同）
```

## 逗号运算符

<<<<<<< HEAD
逗号运算符 `,` 是最少见最不常使用的运算符之一。有时候它会被用来写更简短的代码，因此为了能够理解代码，我们需要了解它。

逗号运算符能让我们处理多个语句，使用 `,` 将它们分开。每个语句都运行了，但是只有最后的语句的结果会被返回。
=======
The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

举个例子：

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7（3 + 4 的结果）
```

<<<<<<< HEAD
这里，第一个语句 `1 + 2` 运行了，但是它的结果被丢弃了。随后计算 `3 + 4`，并且该计算结果被返回。
=======
Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```smart header="逗号运算符的优先级非常低"
请注意逗号运算符的优先级非常低，比 `=` 还要低，因此上面你的例子中圆括号非常重要。

<<<<<<< HEAD
如果没有圆括号：`a = 1 + 2, 3 + 4` 会先执行 `+`，将数值相加得到 `a = 3, 7`，然后赋值运算符 `=` 执行, 'a = 3'，然后逗号之后的数值 `7` 不会再执行，它被忽略掉了。相当于 `(a = 1 + 2), 3 + 4`。
```

为什么我们需要这样一个运算符，它只返回最后一个值呢？

有时候，人们会使用它把几个操作放在一行上来进行复杂的运算。
=======
Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

举个例子：

```js
// 一行上有三个运算符
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD
这样的技巧在许多 JavaScript 框架中都有使用，这也是为什么我们提到它。但是通常它并不能提升代码的可读性，使用它之前，我们要想清楚。
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
