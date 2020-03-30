# 字符串

在 JavaScript 中，文本数据被以字符串形式存储，单个字符没有单独的类型。

字符串的内部格式始终是 [UTF-16](https://en.wikipedia.org/wiki/UTF-16)，它不依赖于页面编码。

## 引号（Quotes）

让我们回忆一下引号的种类。

字符串可以包含在单引号、双引号或反引号中：

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

<<<<<<< HEAD
单引号和双引号基本相同。但是，反引号允许我们通过 `${…}` 将任何表达式嵌入到字符串中：
=======
Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in `${…}`:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

使用反引号的另一个优点是它们允许字符串跨行：

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // 客人清单，多行
```

<<<<<<< HEAD
看起来很自然，不是吗？但是单引号和双引号可不能这样做。

如果我们使用单引号或双引号来实现字符串跨行的话，则会出现错误：
=======
Looks natural, right? But single or double quotes do not work this way.

If we use them and try to use multiple lines, there'll be an error:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

<<<<<<< HEAD
当不考虑多行字符串的需要时，单引号和双引号来自语言创建的古时代。反引号出现较晚，因此更通用。

反引号还允许我们在第一个反引号之前指定一个“模版函数”。语法是：<code>func&#96;string&#96;</code>。函数 `func` 被自动调用，接收字符串和嵌入式表达式，并处理它们。你可以在 [docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals) 中阅读更多关于它们的信息。这叫做 "tagged templates"。此功能可以更轻松地将字符串包装到自定义模版或其他函数中，但这很少使用。
=======
Single and double quotes come from ancient times of language creation when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates). 
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

## 特殊字符

<<<<<<< HEAD
我们仍然可以通过使用“换行符（newline character）”，以支持使用单引号和双引号来创建跨行字符串。换行符写作 `\n`，用来表示换行：
=======
It is still possible to create multiline strings with single and double quotes by using a so-called "newline character", written as `\n`, which denotes a line break:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // 一个多行的客人列表
```

<<<<<<< HEAD
例如，这两行描述的是一样的，只是书写方式不同：

```js run
let str1 = "Hello\nWorld"; // 使用“换行符”创建的两行字符串

// 使用反引号和普通的换行创建的两行字符串
=======
For example, these two lines are equal, just written differently:

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

<<<<<<< HEAD
还有其他不常见的“特殊”字符。

这是完整列表：
=======
There are other, less common "special" characters.

Here's the full list:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

| 字符 | 描述 |
|-----------|-------------|
<<<<<<< HEAD
|`\n`|换行|
|`\r`|回车：不单独使用。Windows 文本文件使用两个字符 `\r\n` 的组合来表示换行。|
|`\'`, `\"`|引号|
|`\\`|反斜线|
|`\t`|制表符|
|`\b`, `\f`, `\v`| 退格，换页，垂直标签 —— 为了兼容性，现在已经不使用了。 |
|`\xXX`|具有给定十六进制 Unicode `XX` 的 Unicode 字符，例如：`'\x7A'` 和 `'z'` 相同。|
|`\uXXXX`|以 UTF-16 编码的十六进制代码 `XXXX` 的 unicode 字符，例如 `\u00A9` —— 是版权符号 `©` 的 unicode。它必须正好是 4 个十六进制数字。|
|`\u{X…XXXXXX}`（1 到 6 个十六进制字符）|具有给定 UTF-32 编码的 unicode 符号。一些罕见的字符用两个 unicode 符号编码，占用 4 个字节。这样我们就可以插入长代码了。|
=======
|`\n`|New line|
|`\r`|Carriage return: not used alone. Windows text files use a combination of two characters `\r\n` to represent a line break. |
|`\'`, `\"`|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- kept for compatibility, not used nowadays. |
|`\xXX`|Unicode character with the given hexadecimal unicode `XX`, e.g. `'\x7A'` is the same as `'z'`.|
|`\uXXXX`|A unicode symbol with the hex code `XXXX` in UTF-16 encoding, for instance `\u00A9` -- is a unicode for the copyright symbol `©`. It must be exactly 4 hex digits. |
|`\u{X…XXXXXX}` (1 to 6 hex characters)|A unicode symbol with the given UTF-32 encoding. Some rare characters are encoded with two unicode symbols, taking 4 bytes. This way we can insert long codes. |
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

unicode 示例：

```js run
alert( "\u00A9" ); // ©
<<<<<<< HEAD
alert( "\u{20331}" ); // 佫，罕见的中国象形文字（长 unicode）
alert( "\u{1F60D}" ); // 😍，笑脸符号（另一个长 unicode）
=======
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

所有的特殊字符都以反斜杠字符 `\` 开始。它也被称为“转义字符”。

<<<<<<< HEAD
如果我们想要在字符串中插入一个引号，我们也会使用它。
=======
We might also use it if we wanted to insert a quote into the string.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

例如：

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

正如你所看到的，我们必须在内部引号前加上反斜杠 `\'`，否则它将表示字符串结束。

<<<<<<< HEAD
当然，只有与外部闭合引号相同的引号才需要转义。因此，作为一个更优雅的解决方案，我们可以改用双引号或者反引号：
=======
Of course, only to the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

注意反斜杠 `\` 在 JavaScript 中用于正确读取字符串，然后消失。内存中的字符串没有 `\`。你从上述示例中的 `alert` 可以清楚地看到这一点。

但是如果我们需要在字符串中显示一个实际的反斜杠 `\` 应该怎么做？

我们可以这样做，只需要将其书写两次 `\\`：

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## 字符串长度

<<<<<<< HEAD
`length` 属性表示字符串长度：
=======
The `length` property has the string length:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert( `My\n`.length ); // 3
```

注意 `\n` 是一个单独的“特殊”字符，所以长度确实是 `3`。

```warn header="`length` 是一个属性"
掌握其他编程语言的人，有时会错误地调用 `str.length()` 而不是 `str.length`。这是行不通的。

<<<<<<< HEAD
请注意 `str.length` 是一个数字属性，而不是函数。后面不需要添加括号。
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

## 访问字符

要获取在 `pos` 位置的一个字符，可以使用方括号 `[pos]` 或者调用 [str.charAt(pos)](mdn:js/String/charAt) 方法。第一个字符从零位置开始：

```js run
let str = `Hello`;

// 第一个字符
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// 最后一个字符
alert( str[str.length - 1] ); // o
```

方括号是获取字符的一种现代化方法，而 `charAt` 是历史原因才存在的。

它们之间的唯一区别是，如果没有找到字符，`[]` 返回 `undefined`，而 `charAt` 返回一个空字符串：

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // ''（空字符串）
```

我们也可以使用 `for..of` 遍历字符：

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o（char 变为 "H"，然后是 "e"，然后是 "l" 等）
}
```

## 字符串是不可变的

在 JavaScript 中，字符串不可更改。改变字符是不可能的。

我们证明一下为什么不可能：

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // 无法运行
```

通常的解决方法是创建一个新的字符串，并将其分配给 `str` 而不是以前的字符串。

例如：

```js run
let str = 'Hi';

<<<<<<< HEAD
str = 'h' + str[1];  // 替换字符串
=======
str = 'h' + str[1]; // replace the string
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

alert( str ); // hi
```

在接下来的章节，我们将看到更多相关示例。

## 改变大小写

[toLowerCase()](mdn:js/String/toLowerCase) 和 [toUpperCase()](mdn:js/String/toUpperCase) 方法可以改变大小写：

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

或者我们想要使一个字符变成小写：

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## 查找子字符串

在字符串中查找子字符串有很多种方法。

### str.indexOf

第一个方法是 [str.indexOf(substr, pos)](mdn:js/String/indexOf)。

它从给定位置 `pos` 开始，在 `str` 中查找 `substr`，如果没有找到，则返回 `-1`，否则返回匹配成功的位置。

例如：

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0，因为 'Widget' 一开始就被找到
alert( str.indexOf('widget') ); // -1，没有找到，检索是大小写敏感的

alert( str.indexOf("id") ); // 1，"id" 在位置 1 处（……idget 和 id）
```

可选的第二个参数允许我们从给定的起始位置开始检索。

例如，`"id"` 第一次出现的位置是 `1`。查询下一个存在位置时，我们从 `2` 开始检索：

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

<<<<<<< HEAD
如果我们对所有存在位置都感兴趣，可以在一个循环中使用 `indexOf`。每一次新的调用都发生在上一匹配位置之后：
=======
If we're interested in all occurrences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // 这是我们要查找的目标

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // 继续从下一个位置查找
}
```

相同的算法可以简写：

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

<<<<<<< HEAD
```smart header="`str.lastIndexOf(substr, pos)`"
还有一个类似的方法 [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf)，它从字符串的末尾开始搜索到开头。
=======
```smart header="`str.lastIndexOf(substr, position)`"
There is also a similar method [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) that searches from the end of a string to its beginning.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

它会以相反的顺序列出这些事件。
```

在 `if` 测试中 `indexOf` 有一点不方便。我们不能像这样把它放在 `if` 中：

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // 不工作！
}
```

上述示例中的 `alert` 不会显示，因为 `str.indexOf("Widget")` 返回 `0`（意思是它在起始位置就查找到了匹配项）。是的，但是 `if` 认为 `0` 表示 `false`。

因此我们应该检查 `-1`，像这样：

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // 现在工作了！
}
```

<<<<<<< HEAD
#### 按位（bitwise）NOT 技巧

这里使用的一个老技巧是 [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` 运算符。它将数字转换为 32-bit 整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反。

实际上，这意味着一件很简单的事儿：对于 32-bit 整数，`~n` 等于 `-(n+1)`。
=======
#### The bitwise NOT trick

One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.

In practice, that means a simple thing: for 32-bit integers `~n` equals `-(n+1)`.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

例如：

```js run
alert( ~2 ); // -3，和 -(2+1) 相同
alert( ~1 ); // -2，和 -(1+1) 相同
alert( ~0 ); // -1，和 -(0+1) 相同
*!*
alert( ~-1 ); // 0，和 -(-1+1) 相同
*/!*
```

<<<<<<< HEAD
正如我们看到这样，只有当 `n == -1` 时，`~n` 才为零（适用于任何 32-bit 带符号的整数 `n`）。

因此，仅当 `indexOf` 的结果不是 `-1` 时，检查 `if ( ~str.indexOf("...") )` 才为真。换句话说，当有匹配时。
=======
As we can see, `~n` is zero only if `n == -1` (that's for any 32-bit signed integer `n`).

So, the test `if ( ~str.indexOf("...") )` is truthy only if the result of `indexOf` is not `-1`. In other words, when there is a match.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

人们用它来简写 `indexOf` 检查：

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // 正常运行
}
```

通常不建议以非显而易见的方式使用语言特性，但这种特殊技巧在旧代码中仍被广泛使用，所以我们应该理解它。

<<<<<<< HEAD
只要记住：`if (~str.indexOf(...))` 读作 "if found"。
=======
Just remember: `if (~str.indexOf(...))` reads as "if found".

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check is correct only if a string is not that long.

Right now we can see this trick only in the old code, as modern JavaScript provides `.includes` method (see below).
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

确切地说，由于 `~` 运算符将大数字截断为 32 位，因此存在给出 `0` 的其他数字，最小的数字是 `~4294967295=0`。这使得这种检查只有在字符串没有那么长的情况下才是正确的。

现在我们只会在旧的代码中看到这个技巧，因为现代 JavaScript 提供了 `.includes` 方法（见下文）。

### includes，startsWith，endsWith

更现代的方法 [str.includes(substr, pos)](mdn:js/String/includes) 根据 `str` 中是否包含 `substr` 来返回 `true/false`。

如果我们需要检测匹配，但不需要它的位置，那么这是正确的选择：

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

`str.includes` 的第二个可选参数是开始搜索的起始位置：

```js run
<<<<<<< HEAD
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, 从位置 3 开始没有 "id"
=======
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

方法 [str.startsWith](mdn:js/String/startsWith) 和 [str.endsWith](mdn:js/String/endsWith) 的功能与其名称所表示的意思相同：

```js run
<<<<<<< HEAD
alert( "Widget".startsWith("Wid") ); // true，"Widget" 以 "Wid" 开始
alert( "Widget".endsWith("get") ); // true，"Widget" 以 "get" 结束
=======
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

## 获取子字符串

JavaScript 中有三种获取字符串的方法：`substring`、`substr` 和 `slice`。

`str.slice(start [, end])`
: 返回字符串从 `start` 到（但不包括）`end` 的部分。

    例如：

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin'，从 0 到 5 的子字符串（不包括 5）
    alert( str.slice(0, 1) ); // 's'，从 0 到 1，但不包括 1，所以只有在 0 处的字符
    ```

    如果没有第二个参数，`slice` 会一直运行到字符串末尾：

    ```js run
    let str = "st*!*ringify*/!*";
<<<<<<< HEAD
    alert( str.slice(2) ); // 从第二个位置直到结束
=======
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    ```

    `start/end` 也有可能是负值。它们的意思是起始位置从字符串结尾计算：

    ```js run
    let str = "strin*!*gif*/!*y";

<<<<<<< HEAD
    // 从右边的第四个位置开始，在右边的第一个位置结束
=======
    // start at the 4th position from the right, end at the 1st from the right
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: 返回字符串在 `start` 和 `end` **之间** 的部分。

    这与 `slice` 几乎相同，但它允许 `start` 大于 `end`。

<<<<<<< HEAD
    例如：

=======
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    ```js run
    let str = "st*!*ring*/!*ify";

    // 这些对于 substring 是相同的
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ……但对 slice 是不同的：
    alert( str.slice(2, 6) ); // "ring"（一样）
    alert( str.slice(6, 2) ); // ""（空字符串）

    ```

<<<<<<< HEAD
    不支持负参数（不像 slice），它们被视为 `0`。
=======
    Negative arguments are (unlike slice) not supported, they are treated as `0`.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

`str.substr(start [, length])`
: 返回字符串从 `start` 开始的给定 `length` 的部分。

    与以前的方法相比，这个允许我们指定 `length` 而不是结束位置：

    ```js run
    let str = "st*!*ring*/!*ify";
<<<<<<< HEAD
    alert( str.substr(2, 4) ); // 'ring'，从位置 2 开始，获取 4 个字符
=======
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    ```

    第一个参数可能是负数，从结尾算起：

    ```js run
    let str = "strin*!*gi*/!*fy";
<<<<<<< HEAD
    alert( str.substr(-4, 2) ); // 'gi'，从第 4 位获取 2 个字符
=======
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    ```

我们回顾一下这些方法，以免混淆：

| 方法 | 选择方式…… | 负值参数 |
|--------|-----------|-----------|
| `slice(start, end)` | 从 `start` 到 `end`（不含 `end`）| 允许 |
| `substring(start, end)` | `start` 与 `end` 之间（包括 `start`，但不包括 `end`） | 负值代表 `0` |
| `substr(start, length)` | 从 `start` 开始获取长为 `length` 的字符串 | 允许 `start` 为负数 |

<<<<<<< HEAD
```smart header="使用哪一个？"
它们可以完成这项工作。形式上，`substr` 有一个小缺点：它不是在 JavaScript 核心规范中描述的，而是在附录 B 中，它涵盖了主要由于历史原因而存在的仅浏览器特性。因此，非浏览器环境可能无法支持它。但实际上它在任何地方都有效。

相较于其他两个变体，`slice` 稍微灵活一些，它允许以负值作为参数并且写法更简短。因此仅仅记住这三种方法中的 `slice` 就足够了。
=======
```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

## 比较字符串

正如我们从 <info:comparison> 一章中了解到的，字符串按字母顺序逐字比较。

不过，也有一些奇怪的地方。

1. 小写字母总是大于大写字母：

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. 带变音符号的字母存在“乱序”的情况：

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    如果我们对这些国家名进行排序，可能会导致奇怪的结果。通常，人们会期望 `Zealand` 在名单中的 `Österreich` 之后出现。

为了明白发生了什么，我们回顾一下在 JavaScript 中字符串的内部表示。

所有的字符串都使用 [UTF-16](https://en.wikipedia.org/wiki/UTF-16) 编码。即：每个字符都有对应的数字代码。有特殊的方法可以获取代码表示的字符，以及字符对应的代码。

`str.codePointAt(pos)`
: 返回在 `pos` 位置的字符代码 :

    ```js run
    // 不同的字母有不同的代码
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: 通过数字 `code` 创建字符

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    我们还可以用 `\u` 后跟十六进制代码，通过这些代码添加 unicode 字符：

    ```js run
    // 在十六进制系统中 90 为 5a
    alert( '\u005a' ); // Z
    ```

现在我们看一下代码为 `65..220` 的字符（拉丁字母和一些额外的字符），方法是创建一个字符串：

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

<<<<<<< HEAD
看到没？先是大写字符，然后是一些特殊字符，然后是小写字符，而 `Ö` 几乎是最后输出。
=======
See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.

Now it becomes obvious why `a > Z`.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

现在很明显为什么 `a > Z`。

字符通过数字代码进行比较。越大的代码意味着字符越大。`a`（97）的代码大于 `Z`（90）的代码。

<<<<<<< HEAD
- 所有小写字母追随在大写字母之后，因为它们的代码更大。
- 一些像 `Ö` 的字母与主要字母表不同。这里，它的代码比任何从 `a` 到 `z` 的代码都要大。

### 正确的比较

执行字符串比较的“正确”算法比看起来更复杂，因为不同语言的字母都不相同。
=======
### Correct comparisons

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

因此浏览器需要知道要比较的语言。

<<<<<<< HEAD
幸运的是，所有现代浏览器（IE10- 需要额外的库 [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) 都支持国际化标准 [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf)。
=======
Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

它提供了一种特殊的方法来比较不同语言的字符串，遵循它们的规则。

<<<<<<< HEAD
调用 [str.localeCompare(str2)](mdn:js/String/localeCompare) 会根据语言规则返回一个整数，这个整数能表明 `str` 是否在 `str2` 前，后或者等于它：

- 如果 `str` 小于 `str2` 则返回负数。
- 如果 `str` 大于 `str2` 则返回正数。
- 如果它们相等则返回 `0`。
=======
The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

例如：

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

<<<<<<< HEAD
这个方法实际上在 [文档](mdn:js/String/localeCompare) 中指定了两个额外的参数，这两个参数允许它指定语言（默认语言从环境中获取，字符顺序视语言不同而不同）并设置诸如区别大小之类的附加规则，或应该将 `"a"` 和 `"á"` 看作相等情况等。
=======
This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

## 内部，Unicode

<<<<<<< HEAD
```warn header="进阶内容"
这部分会深入字符串内部。如果你计划处理 emoji、罕见的数学或象形文字或其他罕见的符号，这些知识会对你有用。
=======
```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

如果你不打算支持它们，你可以跳过这一部分。
```

### 代理对

<<<<<<< HEAD
所有常用的字符都是一个 2 字节的代码。大多数欧洲语言，数字甚至大多数象形文字中的字母都有 2 字节的表示形式。
=======
All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

但 2 字节只允许 65536 个组合，这对于表示每个可能的符号是不够的。所以稀有的符号被称为“代理对”的一对 2 字节的符号编码。

这些符号的长度是 `2`：

```js run
<<<<<<< HEAD
alert( '𝒳'.length ); // 2，大写数学符号 X
alert( '😂'.length ); // 2，笑哭表情
alert( '𩷶'.length ); // 2，罕见的中国象形文字
=======
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

注意，代理对在 JavaScript 被创建时并不存在，因此无法被编程语言正确处理！

我们实际上在上面的每个字符串中都有一个符号，但 `length` 显示长度为 `2`。

`String.fromCodePoint` 和 `str.codePointAt` 是几种处理代理对的少数方法。它们最近才出现在编程语言中。在它们之前，只有 [String.fromCharCode](mdn:js/String/fromCharCode) 和 [str.charCodeAt](mdn:js/String/charCodeAt)。这些方法实际上与 `fromCodePoint/codePointAt` 相同，但是不适用于代理对。

<<<<<<< HEAD
获取符号可能会非常麻烦，因为代理对被认为是两个字符：
=======
Getting a symbol can be tricky, because surrogate pairs are treated as two characters:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
alert( '𝒳'[0] ); // 奇怪的符号……
alert( '𝒳'[1] ); // ……代理对的一块
```

请注意，代理对的各部分没有任何意义。因此，上述示例中的 alert 显示的实际上是垃圾信息。

技术角度来说，代理对也是可以通过它们的代码检测到的：如果一个字符的代码在 `0xd800..0xdbff` 范围内，那么它是代理对的第一部分。下一个字符（第二部分）必须在 `0xdc00..0xdfff` 范围中。这些范围是按照标准专门为代理对保留的。

在上述示例中：

```js run
// charCodeAt 不理解代理对，所以它给出了代理对的代码

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835，在 0xd800 和 0xdbff 之间
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, 在 0xdc00 和 0xdfff 之间
```

本章节后面的 <info:iterable> 章节中，你可以找到更多处理代理对的方法。可能也专门的库，这里没有什么足够好的建议了。

### 变音符号与规范化

在许多语言中，都有一些由基本字符组成的符号，在其上方/下方有一个标记。

例如，字母 `a` 可以是 `àáâäãåā` 的基本字符。最常见的“复合”字符在 UTF-16 表中都有自己的代码。但不是全部，因为可能的组合太多。

<<<<<<< HEAD
为了支持任意组合，UTF-16 允许我们使用多个 unicode 字符：基本字符紧跟“装饰”它的一个或多个“标记”字符。
=======
To support arbitrary compositions, UTF-16 allows us to use several unicode characters: the base character followed by one or many "mark" characters that "decorate" it.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

例如，如果我们 `S` 后跟有特殊的 "dot above" 字符（代码 `\u0307`），则显示 Ṡ。

```js run
alert( 'S\u0307' ); // Ṡ
```

如果我们需要在字母上方（或下方）添加额外的标记 —— 没问题，只需要添加必要的标记字符即可。

例如，如果我们追加一个字符 "dot below"（代码 `\u0323`），那么我们将得到“S 上面和下面都有点”的字符：`Ṩ`。

例如：

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

这在提供良好灵活性的同时，也存在一个有趣的问题：两个视觉上看起来相同的字符，可以用不同的 unicode 组合表示。

例如：

```js run
<<<<<<< HEAD
let s1 = 'S\u0307\u0323'; // Ṩ，S + 上点 + 下点
let s2 = 'S\u0323\u0307'; // Ṩ，S + 下点 + 上点

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false，尽管字符看起来相同（?!）
=======
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

为了解决这个问题，有一个 “unicode 规范化”算法，它将每个字符串都转化成单个“通用”格式。

它由 [str.normalize()](mdn:js/String/normalize) 实现。

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

有趣的是，在实际情况下，`normalize()` 实际上将一个由 3 个字符组成的序列合并为一个：`\u1e68`（S 有两个点）。

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

<<<<<<< HEAD
事实上，情况并非总是如此，因为符号 `Ṩ` 是“常用”的，所以 UTF-16 创建者把它包含在主表中并给它了对应的代码。

如果你想了解更多关于规范化规则和变体的信息 —— 它们在 Unicode 标准附录中有详细描述：[Unicode 规范化形式](http://www.unicode.org/reports/tr15/)，但对于大多数实际目的来说，本文的内容就已经足够了。

## 总结

- 有 3 种类型的引号。反引号允许字符串跨越多行并可以使用 `${…}` 在字符串中嵌入表达式。
- JavaScript 中的字符串使用的是 UTF-16 编码。
- 我们可以使用像 `\n` 这样的特殊字符或通过使用 `\u...` 来操作它们的 unicode 进行字符插入。 
- 获取字符时，使用 `[]`。
- 获取子字符串，使用 `slice` 或 `substring`。
- 字符串的大/小写转换，使用：`toLowerCase/toUpperCase`。
- 查找子字符串时，使用 `indexOf` 或 `includes/startsWith/endsWith` 进行简单检查。
- 根据语言比较字符串时使用 `localeCompare`，否则将按字符代码进行比较。
=======
In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

还有其他几种有用的字符串方法：

<<<<<<< HEAD
- `str.trim()` —— 删除字符串前后的空格 ("trims")。
- `str.repeat(n)` —— 重复字符串 `n` 次。
- ……更多内容细节请参见 [手册](mdn:js/String)。

字符串还具有使用正则表达式进行搜索/替换的方法。但这个话题很大，因此我们将在本教程中单独的 <info:regular-expressions> 章节中进行讨论。
=======
- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
