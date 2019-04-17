# 逻辑运算符

JavaScript 里有三个逻辑运算符：`||` (或), `&&` (与), `!` (非)。

<<<<<<< HEAD
虽然被称为“逻辑”，这些运算符却可以被应用于任意类型的值，而不仅仅是布尔值。结果也同样可能是任意类型。
=======
Although they are called "logical", they can be applied to values of any type, not only boolean. Their result can also be of any type.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

让我们来详细看一下。

## || (或)

两个竖线符号表示了“或”运算：

```js
result = a || b;
```

<<<<<<< HEAD
在传统的编程中，逻辑或仅能够操作布尔值。如果参与运算的一个参数为 `true`，结果将返回 `true`，否则返回 `false`。

在 JavaScript 中，逻辑运算符更加灵活强大。但是首先我们看一下操作数是布尔值的时候发生了什么。
=======
In classical programming, the logical OR is meant to manipulate boolean values only. If any of its arguments are `true`, it returns `true`, otherwise it returns `false`.

In JavaScript, the operator is a little bit trickier and more powerful. But first, let's see what happens with boolean values.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

下面是四种可能的逻辑组合：

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

正如我们所见，除了两个操作数都是 `false` 的情况，结果总是 `true`。

<<<<<<< HEAD
如果操作数不是布尔值，那么它将会被转化为布尔值来参与运算。

例如，数字 `1` 将会被作为 `true`，数字 `0` 则作为 `false`：
=======
If an operand is not a boolean, it's converted to a boolean for the evaluation.

For instance, the number `1` is treated as `true`, the number `0` as `false`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
if (1 || 0) { // 工作原理相当于 if( true || false )
  alert( 'truthy!' );
}
```

<<<<<<< HEAD
大多数时间，或 `||` 会被用在 `if` 语句中，用来测试是否有**任何**给定的条件是正确的。
=======
Most of the time, OR `||` is used in an `if` statement to test if *any* of the given conditions is `true`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

例如：

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

我们可以传入更多的条件：

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // 是周末
}
```

<<<<<<< HEAD
## 或运算寻找第一个真值

上文提到的逻辑处理多少有些传统了。下面让我们看看 JavaScript 的“附加”特性。
=======
## OR finds the first truthy value

The logic described above is somewhat classical. Now, let's bring in the "extra" features of JavaScript.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

拓展的算法如下所示。

给定多个参与或运算的值：

```js
result = value1 || value2 || value3;
```

或运算符 `||` 做了如下的事情：

<<<<<<< HEAD
- 从左到右依次计算操作数。
- 将每一个操作数转化为布尔值。如果结果是 `true`，就停止计算，返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `false`），返回最后一个操作数。
=======
- Evaluates operands from left to right.
- For each operand, converts it to boolean. If the result is `true`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were `false`), returns the last operand.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

返回的值是操作数的初始形式，不会做布尔转换。

也就是，一个或 `"||"` 运算的链将返回第一个真值，如果这样的值不存在就返回该链的最后一个值。

例如：

```js run
alert( 1 || 0 ); // 1（1 是真值）
alert( true || 'no matter what' ); //（true 是真值）

alert( null || 1 ); // 1（1 是第一个真值）
alert( null || 0 || 1 ); // 1（第一个真值）
alert( undefined || null || 0 ); // 0（所有的转化结果都是 false，返回最后一个值）
```

<<<<<<< HEAD
对比与“纯粹的、传统的、仅仅处理布尔值的或运算”，这个就有很有趣的用法了。

1. **获取变量列表或者表达式的第一个真值**

    假设我们有几个变量，它们可能包含某些数据或者是 `null/undefined`。我们需要选出第一个包含数据的变量。

    我们可以这样应用或运算 `||`：
=======
This leads to some interesting usage compared to a "pure, classical, boolean-only OR".

1. **Getting the first truthy value from a list of variables or expressions.**

    Imagine we have several variables which can either contain data or be `null/undefined`. How can we find the first one with data?

    We can use OR `||`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // 选出了 “John” - 第一个真值
    ```

<<<<<<< HEAD
    如果 `currentUser` 和 `defaultUser` 都是假值，那么结果就是 `"unnamed"`。
2. **短路取值。**

    操作数不仅仅可能是值，还可能是任意表达式。或运算会从左到右计算并测试每个操作数。当找到第一个真值，计算就会停止，并返回这个值。这个过程就叫做“短路取值”，因为它将从左到右的计算尽可能的少。
    
    当表达式作为第二个参数并且有一定副作用，比如变量赋值的时候，这就清楚可见了。

    如果我们运行下面的例子，`x` 将不会被赋值：
=======
    If both `currentUser` and `defaultUser` were falsy, `"unnamed"` would be the result.
2. **Short-circuit evaluation.**

    Operands can be not only values, but arbitrary expressions. OR evaluates and tests them from left to right. The evaluation stops when a truthy value is reached, and the value is returned. This process is called "a short-circuit evaluation" because it goes as short as possible from left to right.

    This is clearly seen when the expression given as the second argument has a side effect like a variable assignment.

    In the example below, `x` does not get assigned:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined，因为 (x = 1) 没有被执行
    ```

<<<<<<< HEAD
    ...如果第一个参数是 `false`，或运算将会继续并计算第二个参数，也就会运行赋值操作。
=======
    If, instead, the first argument is `false`, `||` evaluates the second one, thus running the assignment:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

<<<<<<< HEAD
    赋值操作只是一个很简单的情况，其他副作用同样可以被包含进来。

    正如我们所见，这种用法是“`if` 语句的简便方式”。第一个操作数被转化为布尔值，如果是假，那么第二个参数就会被执行。

    大多数情况下，使用正常的 `if` 语句，这样代码可读性更高，但是有时候这种方式会很简洁。
=======
    An assignment is a simple case. Other side effects can also be involved.

    As we can see, such a use case is a "shorter way of doing `if`". The first operand is converted to boolean. If it's false, the second one is evaluated.

    Most of time, it's better to use a "regular" `if` to keep the code easy to understand, but sometimes this can be handy.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## &&（与）

两个 & 符号表示 `&&` 与操作：

```js
result = a && b;
```

<<<<<<< HEAD
传统的编程中，当两个操作数都是真值，与操作返回 `true`，否则返回 `false`：
=======
In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

使用 `if` 语句的例子：

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

<<<<<<< HEAD
就像或运算一样，与运算的操作数可以是任意类型的值：
=======
Just as with OR, any value is allowed as an operand of AND:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
if (1 && 0) { // 作为 true && false 来执行
  alert( "won't work, because the result is falsy" );
}
```


<<<<<<< HEAD
## 与操作寻找第一个假值
=======
## AND finds the first falsy value
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

给出多个参加与运算的值：

```js
result = value1 && value2 && value3;
```

与运算 `&&` 做了如下的事情：

<<<<<<< HEAD
- 从左到右依次计算操作数。
- 将每一个操作数转化为布尔值。如果结果是 `false`，就停止计算，返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `true`），返回最后一个操作数。
=======
- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

换句话说，与操作符返回第一个假值，如果没有假值就返回最后一个值。

上面的规则和或运算很像。区别就是与运算返回第一个假值而或操作返回第一个真值。

例如：

```js run
// 如果第一个操作符是真值，
// 与操作返回第二个操作数：
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// 如果第一个操作符是假值，
// 与操作直接返回它。第二个操作数被忽略
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

我们也可以在一行代码上串联多个值。查看第一个假值是否被返回：

```js run
alert( 1 && 2 && null && 3 ); // null
```

如果所有的值都是真值，最后一个值将会被返回：

```js run
alert( 1 && 2 && 3 ); // 3，最后一个值
```

<<<<<<< HEAD
````smart header="与运算 `&&` 在或操作符 `||` 之前执行"
与运算 `&&` 的优先级比或运算 `||` 要高，所以它将会比或运算先执行。

下面代码中的，`1 && 0` 将会首先被运算：

```js run
alert( 5 || 1 && 0 ); // 5
```
=======
````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
````

就像或运算一样，与运算 `&&` 有时候能够代替 `if`。

例如：

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

<<<<<<< HEAD
`&&` 右边的代码只有运算抵达到那里才能被执行。也就是，当且仅当 `(x > 0)` 返回了真值。
=======
The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

所以我们基本可以类似的得到：

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

<<<<<<< HEAD
带 `&&` 的代码变体看上去更短。但是 `if` 的含义更明显，可读性也更高。

所以建议是根据目的选择代码的结构。需要条件判断就用 `if`，需要与运算就用 `&&`。
=======
The variant with `&&` appears shorter. But `if` is more obvious and tends to be a little bit more readable.

So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## !（非）

感叹符号 `!` 表示布尔非运算。

语法相当简单：

```js
result = !value;
```

操作符接受一个参数，并按如下运作：

<<<<<<< HEAD
1. 将操作数转化为布尔类型：`true/false`。
2. 返回相反的值。
=======
1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

例如：

```js run
alert( !true ); // false
alert( !0 ); // true
```

两个非运算 `!!` 有时候用来将某个值转化为布尔类型：

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

<<<<<<< HEAD
也就是，第一个非运算将该值转化为布尔类型并取反，第二个非运算再次取反。最后我们就得到了一个任意值到布尔值的转化。
=======
That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

这是一个更详细的方法，完成的同样的事情 -- 一个内置的 `Boolean` 函数：

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
