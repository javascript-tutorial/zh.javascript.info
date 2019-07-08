# 类型转换

<<<<<<< HEAD
大多数情况下，运算符和函数会自动转换将值转换为正确的类型。称之为“类型转换”。
=======
Most of the time, operators and functions automatically convert the values given to them to the right type. 
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

比如，`alert` 会自动将任何值转换为字符串。算术运算符会将值转换为数字。

<<<<<<< HEAD
还有些例子，需要显式进行类型转换，以得到正确的结果。

```smart header="对象还未纳入讨论中"
本章并不会讨论 object 类型。先学习原始类型，之后我们会学习 object 类型。对象的类型转换在章节 <info:object-toprimitive> 介绍。
=======
There are also cases when we need to explicitly convert a value to the expected type.

```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. Instead, we'll study primitives first. Later, after we learn about objects, we'll see how object conversion works in the chapter <info:object-toprimitive>.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
```

## ToString

当需要一个值的字符串形式，就会进行 string 类型转换。

比如，`alert(value)` 将 `value` 转换为 string 类型，然后显示这个值。

<<<<<<< HEAD
也可以显式地调用 `String(value)` 来达到这一目的：
=======
We can also call the `String(value)` function to convert a value to a string:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // 现在，值是一个字符串形式的 "true"
alert(typeof value); // string
*/!*
```

<<<<<<< HEAD
转换为 string 类型的值往往是可预见的。`false` 变成 `"false"`，`null` 变成 `"null"` 等。
=======
String conversion is mostly obvious. A `false` becomes `"false"`, `null` becomes `"null"`, etc.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

## ToNumber

在算术函数和表达式中，会自动进行 number 类型转换。

比如，当使用 `/` 用于非 number 类型：

```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```

<<<<<<< HEAD
也可以使用 `Number(value)` 显式地将这个值转换为 number 类型。
=======
We can use the `Number(value)` function to explicitly convert a `value` to a number:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // 变成 number 类型 123

alert(typeof num); // number
```

<<<<<<< HEAD
当从 string 类型源读取值时，比如一个文本表单，但是我们期待数字输入，就经常进行显式转换。

如果字符串不是一个有效的数字，转换的结果会是 `NaN`，例如：
=======
Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.

If the string is not a valid number, the result of such a conversion is `NaN`. For instance:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

number 类型转换规则：

| 输入 | 输出 |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
<<<<<<< HEAD
|<code>true&nbsp;和&nbsp;false</code> | `1` and `0` |
| `string` | 去掉首尾空格后的纯数字字符串中含有的数字。<br>如果字符串只由空格字符组成，返回 `0`。<br>如果字符串不是纯数字，则返回 `NaN`。 |
=======
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

例如：

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

<<<<<<< HEAD
请注意 `null` 和 `undefined` 有点不同。`null` 变成数字 `0`，`undefined` 变成 `NaN`。

````smart header="加号'+' 连接字符串"
几乎所有的算术运算符都将值转换为数字，加号 `+` 是个例外。如果其中一个运算元是字符串，则另一个也会转换为字符串。

然后，连接两者：
=======
Please note that `null` and `undefined` behave differently here: `null` becomes zero while `undefined` becomes `NaN`.

````smart header="Addition '+' concatenates strings"
Almost all mathematical operations convert values to numbers. A notable exception is addition `+`. If one of the added values is a string, the other one is also converted to a string.

Then, it concatenates (joins) them:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
alert( 1 + '2' ); // '12' (字符串在加号右边)
alert( '1' + 2 ); // '12' (字符串在加号左边)
```

<<<<<<< HEAD
这仅仅发生在其中一方为字符串（译者注：或者双方都为字符串）的情况下。其他情况下会被转换为数字。
=======
This only happens when at least one of the arguments is a string. Otherwise, values are converted to numbers.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
````

## ToBoolean

转换为 boolean 类型是最为简单的一个。

<<<<<<< HEAD
逻辑操作或显式调用 `Boolean(value)` 会触发 boolean 类型转换。
=======
It happens in logical operations (later we'll meet condition tests and other similar things) but can also be performed explicitly with a call to `Boolean(value)`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

转换规则如下：

<<<<<<< HEAD
- 假值，比如 `0`、空的字符串、`null`、`undefined` 和 `NaN` 变成 `false`。
- 其他值变成 `true`。
=======
- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

比如：

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

<<<<<<< HEAD
````warn header="请注意: 包含 0 的字符串 `\"0\"` 是 `true`"
一些编程语言（比如 PHP）视 `"0"` 为 `false`。但在 JavaScript 中，非空的字符串总是 `true`。
=======
````warn header="Please note: the string with zero `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript, a non-empty string is always `true`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 空白, 也是 true (任何非空字符串是 true)
```
````


## 总结

<<<<<<< HEAD
有三种常用的类型转换：转换为 string 类型、转换为 number 类型和转换为 boolean 类型。

**`ToString`** —— 输出内容时 `ToString` 发生转换，或通过 `String(value)` 进行显式转换。原始类型值的 string 类型转换通常是可预见的。

**`ToNumber`** -- 进行算术操作时发生 `ToNumber` 转换，或通过 `Number(value)` 进行显式转换。
=======
The three most widely used type conversions are to string, to number, and to boolean.

**`ToString`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`ToNumber`** -- Occurs in math operations. Can be performed with `Number(value)`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

`ToNumber` 转换遵循以下规则：

| 值 |  变成... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | 字符串“按原样读取”，两端的空白被忽略。空字符串变成 `0`。出错变成 `NaN`。 |

<<<<<<< HEAD
**`ToBoolean`** -- 进行逻辑操作时发生 `ToBoolean` 转换。或通过 `Boolean(value)` 进行显式转换。
=======
**`ToBoolean`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

`ToBoolean` 遵循以下规则：

| 值 |  变成... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|其他值| `true` |


上述的大多数规则都容易理解和记忆。经常犯错的例外有：

- `undefined` 进行 `ToNumber` 时变成 `NaN`，而非 `0`。
- `"0"` 和只有空格的字符串(比如：`"   "` )在进行 `ToBoolean` 变成 `true`。

<<<<<<< HEAD
对象的转换并未在此提及，我们会在章节 <info:object-toprimitive> 介绍，随后我们会学习 JavaScript 更多基础的细节。
=======
Objects aren't covered here. We'll return to them later in the chapter <info:object-toprimitive> that is devoted exclusively to objects after we learn more basic things about JavaScript.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
