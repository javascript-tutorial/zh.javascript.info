# 类型转换

大多数情况下，运算符和函数会自动转换将值转换为正确的类型。称之为“类型转换”。

比如，`alert` 会自动将任何值转换为字符串。算术运算符会将值转换为数字。

还有些例子，需要显式进行类型转换，以得到正确的结果。

```smart header="对象还未纳入讨论中"
本章并不会讨论 object 类型。先学习原始类型，之后我们会学习 object 类型。对象的类型转换在章节 <info:object-toprimitive> 介绍。
```

## ToString

当需要一个值的字符串形式，就会进行 string 类型转换。

比如，`alert(value)` 将 `value` 转换为 string 类型，然后显示这个值。

也可以显式地调用 `String(value)` 来达到这一目的：

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // 现在，值是一个字符串形式的 "true"
alert(typeof value); // string
*/!*
```

转换为 string 类型的值往往是可预见的。`false` 变成 `"false"`，`null` 变成 `"null"` 等。

## ToNumber

在算术函数和表达式中，会自动进行 number 类型转换。

比如，当使用 `/` 用于非 number 类型：

```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```

也可以使用 `Number(value)` 显式地将这个值转换为 number 类型。

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // 变成 number 类型 123

alert(typeof num); // number
```

当从 string 类型源读取值时，比如一个文本表单，但是我们期待数字输入，就经常进行显式转换。

如果字符串不是一个有效的数字，转换的结果会是 `NaN`，例如：

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

number 类型转换规则：

| 值 |  变成... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;和&nbsp;false</code> | `1` and `0` |
| `string` | 字符串开始和末尾的空白会被移除，剩下的如果是空字符串，结果为 `0`，否则 —— 从字符串中读出数字。错误返回 `NaN`。 |

例如：

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

请注意 `null` 和 `undefined` 有点不同。`null` 变成数字 `0`，`undefined` 变成 `NaN`。

````smart header="加号'+' 连接字符串"
几乎所有的算术运算符都将值转换为数字，加号 `+` 是个例外。如果其中一个运算元是字符串，则另一个也会转换为字符串。

然后，连接两者：

```js run
alert( 1 + '2' ); // '12' (字符串在加号右边)
alert( '1' + 2 ); // '12' (字符串在加号左边)
```

这仅仅发生在其中一方为字符串(译者注：或者双方都为字符串) 的情况下。其他情况下会被转换为数字。
````

## ToBoolean

转换为 boolean 类型是最为简单的一个。

逻辑操作或显式调用 `Boolean(value)` 会触发 boolean 类型转换。

转换规则如下：

- 假值，比如 `0`、空的字符串、`null`、`undefined` 和 `NaN` 变成 `false`。
- 其他值变成 `true`。

比如：

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="请注意: 包含 0 的字符串 `\"0\"` 是 `true`"
一些变成语言(比如 PHP) 视 `"0"` 为 `false`。但在 JavaScript 中，非空的字符串总是 `true`。

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 空白, 也是 true (任何非空字符串是 true)
```
````


## 总结

有三种常用的类型转换：转换为 string 类型、转换为 number 类型和转换为 boolean 类型。

**`ToString`** —— 输出内容时 `ToString` 发生转换，或通过 `String(value)` 进行显式转换。原始类型值的 string 类型转换通常是可预见的。

**`ToNumber`** -- 进行算术操作时发生 `ToNumber` 转换，或通过 `Number(value)` 进行显式转换。

`ToNumber` 转换遵循以下规则：

| 值 |  变成... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | 字符串“按原样读取”，两端的空白被忽略。空字符串变成 `0`。出错变成 `NaN`。 |

**`ToBoolean`** -- 进行逻辑操作时发生 `ToBoolean` 转换。或通过 `Boolean(value)` 进行显式转换。

`ToBoolean` 遵循以下规则：

| 值 |  变成... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|其他值| `true` |


上述的大多数规则都容易理解和记忆。经常犯错的例外有：

- `undefined` 进行 `ToNumber` 时变成 `NaN`，而非 `0`。
- `"0"` 和只有空格的字符串(比如：`"   "` )在进行 `ToBoolean` 变成 `true`。

对象的转换并未在此提及，我们会在章节 <info:object-toprimitive> 介绍，随后我们会学习 JavaScript 更多基础的细节。
