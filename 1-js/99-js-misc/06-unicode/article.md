
# Unicode, 字符串的内部

```warn header="高阶知识"
本节的内容将深入到字符串内部。如果你打算处理表情符号、罕见的数学或象形文字字符或其他罕见的符号，这些知识将对你有用。
```

正如我们已经知道的，JavaScript 中的字符串基于[Unicode](https://en.wikipedia.org/wiki/Unicode): 每个字符由1-4字节的字节序列表示。


JavaScript允许我们通过使用以下三种符号之一指定十六进制Unicode代码，将字符插入字符串：

- `\xXX`

    `XX`必须是两个十六进制数字，其值介于`00`和`FF`之间。`\xXX`是Unicode代码为`XX`的字符。

    因为`\xXX`表示法只支持两个十六进制数字，所以只能用于前256个Unicode字符。

    前256个字符包括拉丁字母、最基本的语法字符和其他一些字符。例如，`\x7A`与`z`（Unicode `U+007A`）相同。

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, 版权符号
    ```

- `\uXXXX`

    `XXXX`必须正好是4个十六进制数字，值介于`0000`和`FFFF`之间。`\uXXXX`是Unicode代码为`XXXX`的字符。

    Unicode值大于`U+FFFF`的字符也可以用这种符号表示，但在这种情况下，我们需要使用所谓的代理对（我们将在本章后面讨论代理对）。

    ```js run
    alert( "\u00A9" ); // ©, 与 \xA9 相同, 使用4位十六进制数字表示
    alert( "\u044F" ); // я, 西里尔字母
    alert( "\u2191" ); // ↑, 上箭头符号
    ```

- `\u{X…XXXXXX}`

    `X…XXXXXX` 必须是介于`0`和`10FFFF`（Unicode定义的最高代码点）之间的1到6字节的十六进制值。这种表示法允许我们轻松地表示所有现有的Unicode字符。

    ```js run
    alert( "\u{20331}" ); // 佫, 一个罕见的汉字（长Unicode）
    alert( "\u{1F60D}" ); // 😍, 笑脸符号（另一个长Unicode）
    ```

## 代理对


所有常用字符都有2字节代码（4个十六进制数字）。大多数欧洲语言中的字母、数字和基本统一的中日韩表意文字集（CJK——来自汉语、日语和韩语书写系统）都有2字节的表示。

最初，JavaScript基于UTF-16编码，每个字符只允许2个字节。但是2个字节只允许65536个组合，这对于Unicode的每个可能的符号来说都是不够的。

因此，需要用超过2个字节来表示的罕见符号用一对称为“代理对”的2字节字符编码。

作为副作用，这种符号的长度为`2`：

```js run
alert( '𝒳'.length ); // 2, 数学脚本中大写的 x
alert( '😂'.length ); // 2, “笑哭”表情
alert( '𩷶'.length ); // 2, 一个罕见的汉字
```

这是因为在创建JavaScript时还不存在代理对，因此它们没有被语言正确处理！

实际上，在上面的每个字符串中都只有一个符号，但`length`属性显示的长度为`2`。

获取符号也可能很棘手，因为大多数语言特性将代理对视为两个字符。

例如，我们可以在输出中看到两个奇怪的字符：

```js run
alert( '𝒳'[0] ); // 一个奇怪的符号...
alert( '𝒳'[1] ); // ...代理对的片段
```

代理对的片段没有彼此就没有意义。
因此，上面示例中的`alert`实际上显示的是垃圾字符。

从技术上讲，代理对也可以通过它们的代码来检测：如果一个字符在`0xd800..0xdbff`的范围内，那么它就是代理对的第一部分。下一个字符（第二部分）必须在`0xdc00..0xdfff`内。根据标准，这些间隔仅为代理对保留。

所以，为处理代理对， [String.fromCodePoint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) 和 [str.codePointAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 方法被加入到 JavaScript 中。

它们与 [String.fromCharCode](mdn:js/String/fromCharCode)、[str.charCodeAt](mdn:js/String/charCodeAt) 相同，但它们可以正确处理代理对。

这里可以看出区别：

```js run
// charCodeAt 无法正确处理代理对，因此它给出了𝒳的第一部分的代码:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt 支持代理对
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, 读出了代理对的两部分
```

也就是说，如果我们从位置1开始（在这里相当不正确），那么它们都只返回代理对的第二部分：

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// 无意义的第二部分
```

稍后，您将在 <info:iterable> 一章中找到处理代理对的更多方法。可能也有专门的库来做这件事，但没有什么值得推荐的。

````warn header="注意：在任意位置拆分字符串是危险的"
我们不能只在任意位置拆分字符串，例如，取 `str.slice(0, 4)` 并期望它是有效的字符串，例如：

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```

在这里，我们可以看到输出中的垃圾字符（😂代理对的前半部分）。

如果你打算可靠地使用代理对，请注意这一点。这可能不是什么大问题，但至少你应该了解发生了什么。
````

## 变音符号和规范化

在许多语言中，有一些符号是由基础字符组成的，上面/下面有一个标记。

例如，字母a可以是这些字符的基本字符： `àáâäãåā`.

最常见的“复合”字符在Unicode表中有自己的代码。但并不是所有的字符都有，因为有太多可能的组合。

为了支持任意组合，Unicode标准允许我们使用几个Unicode字符“修饰”基础字符：基础字符后面跟着一个或多个“标记”字符，这些字符“修饰”了它。

例如，如果`S`后跟特殊的“dot above”字符 (code `\u0307`), 则显示为 Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

如果我们需要在字母上方（或下方）附加一个标记，没问题，只需添加必要的标记字符即可。

例如，如果我们再添加一个字符“dot below”（代码\u0323），那么我们将得到“S with dots above and below“：Ṩ。

例如：

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

这提供了极大的灵活性，但同时也是一个有趣的问题：两个字符可能在视觉上看起来相同，但用不同的Unicode组合表示。

例如：

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false ，尽管这两个字符看起来一样 (?!)
```

为了解决这个问题，存在一种“Unicode规范化”算法，它将每个字符串转换为单个“标准”形式。

它由 [str.normalize()](mdn:js/String/normalize) 实现。

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

有趣的是，在我们的情况下， `normalize()` 实际上将3个字符的序列合并为一个: `\u1e68` (S with two dots)。

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

事实上，情况并非总是如此。原因是这个符号`Ṩ `“足够常见”，因此Unicode创建者将其包含在主表中并给出代码。

如果您想了解更多关于规范化规则和变体的信息，请参见Unicode标准的附录：[Unicode 规范化表单](https://www.unicode.org/reports/tr15/)。但对于大多数实际用途，本节中的信息已经足够了。

