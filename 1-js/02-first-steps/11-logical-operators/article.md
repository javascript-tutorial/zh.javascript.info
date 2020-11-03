# 逻辑运算符

JavaScript 中有三个逻辑运算符：`||`（或），`&&`（与），`!`（非）。

虽然它们被称为“逻辑”运算符，但这些运算符却可以被应用于任意类型的值，而不仅仅是布尔值。它们的结果也同样可以是任意类型。

让我们来详细看一下。

## ||（或）

两个竖线符号表示“或”运算符：

```js
result = a || b;
```

在传统的编程中，逻辑或仅能够操作布尔值。如果参与运算的任意一个参数为 `true`，返回的结果就为 `true`，否则返回 `false`。

在 JavaScript 中，逻辑运算符更加灵活强大。但是，首先让我们看一下操作数是布尔值的时候发生了什么。

下面是四种可能的逻辑组合：

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

正如我们所见，除了两个操作数都是 `false` 的情况，结果都是 `true`。

如果操作数不是布尔值，那么它将会被转化为布尔值来参与运算。

例如，数字 `1` 被作为 `true` 处理，数字 `0` 则被作为 `false`：

```js run
if (1 || 0) { // 工作原理相当于 if( true || false )
  alert( 'truthy!' );
}
```

大多数情况下，逻辑或 `||` 会被用在 `if` 语句中，用来测试是否有 **任何** 给定的条件为 `true`。

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
- 处理每一个操作数时，都将其转化为布尔值。如果结果是 `true`，就停止计算，返回这个操作数的初始值。
- 如果所有的操作数都被计算过（也就是，转换结果都是 `false`），则返回最后一个操作数。

返回的值是操作数的初始形式，不会做布尔转换。

换句话说，一个或运算 `||` 的链，将返回第一个真值，如果不存在真值，就返回该链的最后一个值。

例如：

```js run
alert( 1 || 0 ); // 1（1 是真值）

alert( null || 1 ); // 1（1 是第一个真值）
alert( null || 0 || 1 ); // 1（第一个真值）

alert( undefined || null || 0 ); // 0（都是假值，返回最后一个值）
```

与“纯粹的、传统的、仅仅处理布尔值的或运算”相比，这个规则就引起了一些很有趣的用法。

1. **获取变量列表或者表达式中的第一个真值。**

    例如，我们有变量 `firstName`、`lastName` 和 `nickName`，都是可选的（即可以是 undefined，也可以是假值）。

    我们用或运算 `||` 来选择有数据的那一个，并显示出来（如果没有设置，则用 `"Anonymous"`）：

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    如果所有变量的值都为假，结果就是 `"Anonymous"`。

2. **短路求值（Short-circuit evaluation）。**

    或运算符 `||` 的另一个用途是所谓的“短路求值”。

    这指的是，`||` 对其参数进行处理，直到达到第一个真值，然后立即返回该值，而无需处理其他参数。

    如果操作数不仅仅是一个值，而是一个有副作用的表达式，例如变量赋值或函数调用，那么这一特性的重要性就变得显而易见了。

    在下面这个例子中，只会打印第二条信息：

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

    在第一行中，或运算符 `||` 在遇到 `true` 时立即停止运算，所以 `alert` 没有运行。

    有时，人们利用这个特性，只在左侧的条件为假时才执行命令。

## &&（与）

两个 & 符号表示 `&&` 与运算符：

```js
result = a && b;
```

在传统的编程中，当两个操作数都是真值时，与运算返回 `true`，否则返回 `false`：

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

带有 `if` 语句的示例：

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


## 与运算寻找第一个假值

给出多个参加与运算的值：

```js
result = value1 && value2 && value3;
```

与运算 `&&` 做了如下的事：

- 从左到右依次计算操作数。
- 在处理每一个操作数时，都将其转化为布尔值。如果结果是 `false`，就停止计算，并返回这个操作数的初始值。
- 如果所有的操作数都被计算过（例如都是真值），则返回最后一个操作数。

换句话说，与运算返回第一个假值，如果没有假值就返回最后一个值。

上面的规则和或运算很像。区别就是与运算返回第一个假值，而或运算返回第一个真值。

例如：

```js run
// 如果第一个操作数是真值，
// 与运算返回第二个操作数：
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// 如果第一个操作数是假值，
// 与运算将直接返回它。第二个操作数会被忽略
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

我们也可以在一行代码上串联多个值。查看第一个假值是如何被返回的：

```js run
alert( 1 && 2 && null && 3 ); // null
```

如果所有的值都是真值，最后一个值将会被返回：

```js run
alert( 1 && 2 && 3 ); // 3，最后一个值
```

````smart header="与运算 `&&` 在或运算 `||` 之前进行"
与运算 `&&` 的优先级比或运算 `||` 要高。

所以代码 `a && b || c && d` 跟 `&&` 表达式加了括号完全一样：`(a && b) || (c && d)`。
````

````warn header="不要用 `||` 或 `&&` 来取代 `if`"
有时候，有人会将与运算符 `&&` 作为“简化 `if`”的一种方式。

例如：

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

`&&` 右边的代码只有运算抵达到那里才能被执行。也就是，当且仅当 `(x > 0)` 为真。

所以我们基本可以类似地得到：

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

虽然使用 `&&` 写出的变体看起来更短，但 `if` 更明显，并且往往更具可读性。因此，我们建议根据每个语法结构的用途来使用：如果我们想要 `if`，就使用 `if`；如果我们想要逻辑与，就使用 `&&`。
````


## !（非）

感叹符号 `!` 表示布尔非运算符。

语法相当简单：

```js
result = !value;
```

逻辑非运算符接受一个参数，并按如下运作：

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

有更多详细的方法可以完成同样的事 —— 一个内置的 `Boolean` 函数：

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

非运算符 `!` 的优先级在所有逻辑运算符里面最高，所以它总是在 `&&` 和 `||` 之前执行。
