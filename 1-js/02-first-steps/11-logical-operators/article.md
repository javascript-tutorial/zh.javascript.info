# 逻辑运算符

JavaScript 里有三个逻辑运算符：`||` (或), `&&` (与), `!` (非)。

虽然被称为“逻辑”，这些运算符却可以被应用于任意类型的值，而不仅仅是布尔值。结果也同样可能是任意类型。

让我们来详细看一下。

## || (或)

两个竖线符号表示了“或”运算：

```js
result = a || b;
```

在传统的编程中，逻辑或仅能够操作布尔值。如果参与运算的一个参数为 `true`，结果将返回 `true`，否则返回 `false`。

在 JavaScript 中，逻辑运算符更加灵活强大。但是首先我们看一下操作数是布尔值的时候发生了什么。

下面是四种可能的逻辑组合：

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

正如我们所见，除了两个操作数都是 `false` 的情况，结果总是 `true`。

如果操作数不是布尔值，那么它将会被转化为布尔值来参与运算。

例如，数字 `1` 将会被作为 `true`，数字 `0` 则作为 `false`：

```js run
if (1 || 0) { // 工作原理相当于 if( true || false )
  alert( 'truthy!' );
}
```

大多数时间，或 `||` 会被用在 `if` 语句中，用来测试是否有**任何**给定的条件是 `true` 的。

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

## 或运算寻找第一个真值

上文提到的逻辑处理多少有些传统了。下面让我们看看 JavaScript 的“附加”特性。

拓展的算法如下所示。

给定多个参与或运算的值：

```js
result = value1 || value2 || value3;
```

或运算符 `||` 做了如下的事情：

- 从左到右依次计算操作数。
- 将每一个操作数转化为布尔值。如果结果是 `true`，就停止计算，返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `false`），返回最后一个操作数。

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

对比与“纯粹的、传统的、仅仅处理布尔值的或运算”，这个就有很有趣的用法了。

1. **获取变量列表或者表达式的第一个真值**

    假设我们有几个变量，它们可能包含某些数据或者是 `null/undefined`。我们需要选出第一个包含数据的变量。

    我们可以这样应用或运算 `||`：

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // 选出了 “John” - 第一个真值
    ```

    如果 `currentUser` 和 `defaultUser` 都是假值，那么结果就是 `"unnamed"`。
2. **短路取值。**

    操作数不仅仅可能是值，还可能是任意表达式。或运算会从左到右计算并测试每个操作数。当找到第一个真值，计算就会停止，并返回这个值。这个过程就叫做“短路取值”，因为它将从左到右的计算尽可能的少。
    
    当表达式作为第二个参数并且有一定副作用，比如变量赋值的时候，这就清楚可见了。

    如果我们运行下面的例子，`x` 将不会被赋值：

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined，因为 (x = 1) 没有被执行
    ```

    ...如果第一个参数是 `false`，或运算将会继续并计算第二个参数，也就会运行赋值操作。

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

    赋值操作只是一个很简单的情况。可能有副作用，如果计算没有到达，副作用就不会发生。

    正如我们所见，这种用法是“`if` 语句的简便方式”。第一个操作数被转化为布尔值，如果是假，那么第二个参数就会被执行。

    大多数情况下，使用正常的 `if` 语句，这样代码可读性更高，但是有时候这种方式会很简洁。

## &&（与）

两个 & 符号表示 `&&` 与操作：

```js
result = a && b;
```

传统的编程中，当两个操作数都是真值，与操作返回 `true`，否则返回 `false`：

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
  alert( 'Time is 12:30' );
}
```

就像或运算一样，与运算的操作数可以是任意类型的值：

```js run
if (1 && 0) { // 作为 true && false 来执行
  alert( "won't work, because the result is falsy" );
}
```


## 与操作寻找第一个假值

给出多个参加与运算的值：

```js
result = value1 && value2 && value3;
```

与运算 `&&` 做了如下的事情：

- 从左到右依次计算操作数。
- 将每一个操作数转化为布尔值。如果结果是 `false`，就停止计算，返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `true`），返回最后一个操作数。

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

````smart header="与运算 `&&` 在或操作符 `||` 之前执行"
与运算 `&&` 的优先级比或运算 `||` 要高。

所以代码 `a && b || c && d` 完全跟 `&&` 表达式加了括号一样： `(a && b) || (c && d)`。
````

就像或运算一样，与运算 `&&` 有时候能够代替 `if`。

例如：

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

`&&` 右边的代码只有运算抵达到那里才能被执行。也就是，当且仅当 `(x > 0)` 返回了真值。

所以我们基本可以类似的得到：

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

带 `&&` 的代码变体看上去更短。但是 `if` 的含义更明显，可读性也更高。

所以建议是根据目的选择代码的结构。需要条件判断就用 `if`，需要与运算就用 `&&`。

## !（非）

感叹符号 `!` 表示布尔非运算。

语法相当简单：

```js
result = !value;
```

操作符接受一个参数，并按如下运作：

1. 将操作数转化为布尔类型：`true/false`。
2. 返回相反的值。

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

也就是，第一个非运算将该值转化为布尔类型并取反，第二个非运算再次取反。最后我们就得到了一个任意值到布尔值的转化。

这是一个更详细的方法，完成的同样的事情 —— 一个内置的 `Boolean` 函数：

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

非运算符 `!` 的优先级在所有逻辑运算符里面最高，所以它总是在 `&&` 或者 `||` 前执行。
