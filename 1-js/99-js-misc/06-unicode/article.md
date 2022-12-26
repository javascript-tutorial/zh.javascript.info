
# Unicode —— 字符串内幕

```warn header="进阶知识"
本节将更深入地介绍字符串的内部原理。如果你打算处理表情符号（emoji）、罕见的数学或象形文字字符，或其他罕见字符，这些知识将对你很有用。
```

正如我们所知，JavaScript 的字符串是基于 [Unicode](https://en.wikipedia.org/wiki/Unicode) 的：每个字符由 1-4 个字节的字节序列表示。

JavaScript 允许我们通过下述三种表示方式之一将一个字符以其十六进制 Unicode 编码的方式插入到字符串中：

- `\xXX`

    `XX` 必须是介于 `00` 与 `FF` 之间的两位十六进制数，`\xXX` 表示 Unicode 编码为 `XX` 的字符。

    因为 `\xXX` 符号只支持两位十六进制数，所以它只能用于前 256 个 Unicode 字符。

    这前 256 个字符包括拉丁字母、最基本的语法字符和其他一些字符。例如，`"\x7A"` 表示 `"z"` (Unicode 编码为 `U+007A`)。

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // © (版权符号)
    ```

- `\uXXXX`
    `XXXX` 必须是 4 位十六进制数，值介于 `0000` 和 `FFFF` 之间。此时，`\uXXXX` 便表示 Unicode 编码为 `XXXX` 的字符。

    Unicode 值大于 `U+FFFF` 的字符也可以用这种方法来表示，但在这种情况下，我们要用到代理对（我们将在本章的后面讨论它）。

    ```js run
    alert( "\u00A9" ); // ©, 等同于 \xA9，只是使用了四位十六进制数表示而已
    alert( "\u044F" ); // я（西里尔字母）
    alert( "\u2191" ); // ↑（上箭头符号）
    ```

- `\u{X…XXXXXX}`

    `X…XXXXXX` 必须是介于 `0` 和 `10FFFF`（Unicode 定义的最高码位）之间的 1 到 6 个字节的十六进制值。这种表示方式让我们能够轻松地表示所有现有的 Unicode 字符。

    ```js run
    alert( "\u{20331}" ); // 佫, 一个不常见的中文字符（长 Unicode）
    alert( "\u{1F60D}" ); // 😍, 一个微笑符号（另一个长 Unicode）
    ```

## 代理对

所有常用字符都有对应的 2 字节长度的编码（4 位十六进制数）。大多数欧洲语言的字母、数字、以及基本统一的 CJK 表意文字集（CJK —— 来自中文、日文和韩文书写系统）中的字母，均有对应的 2 字节长度的 Unicode 编码。

最初，JavaScript 是基于 UTF-16 编码的，只允许每个字符占 2 个字节长度。但 2 个字节只允许 65536 种组合，这对于表示 Unicode 里每个可能符的号来说，是不够的。

因此，需要使用超过 2 个字节长度来表示的稀有符号，我们则使用一对 2 字节长度的字符编码，它被称为“代理对”（surrogate pair）。

这种做也有副作用 —— 这些符号的长度为 `2`：

```js run
alert( '𝒳'.length ); // 2, 大写的数学符号 X
alert( '😂'.length ); // 2, 笑哭的表情
alert( '𩷶'.length ); // 2, 一个少见的中文字符
```

这是因为在 JavaScript 被创造出来的时候，代理对这个概念并不存在，因此语言并没有正确处理它们！

虽然上面的每个字符串都只有一个字符，但其 `length` 属性显示其长度为 `2`。

如何获取这些符号，也是一个棘手的问题：因为编程语言的大部分功能都将代理对当作两个字符对待。

举个例子，我们可以在输出中看到两个奇怪的字符：

```js run
alert( '𝒳'[0] ); // 显示出了一个奇怪的符号...
alert( '𝒳'[1] ); // ...代理对的片段
```

代理对被分开后，就失去意义了。 所以上面示例中，由 `alert()` 打印出的内容，其实就是没有任何意义的垃圾。

从技术层面上讲，可以通过代码来检测到代理对的存在：如果一个字符的代码在 `0xd800..0xdbff` 这个区间内，那么它就是代理对的前一部分。 下一个字符（第二部分）的代码必须在区间 `0xdc00..0xdfff` 内。 这些区间是标准专门为代理对预留的，

所以，方法 [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) 和 [str.codePointAt](https://developer. mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 被添加到 JavaScript，以处理代理对。

它们本质上与 [String.fromCharCode](mdn:js/String/fromCharCode) 和 [str.charCodeAt](mdn:js/String/charCodeAt) 相同，但它们可以正确地处理代理对。

在这里可以看出它们的区别：

```js run
// charCodeAt 不会考虑代理对, 所以返回了 𝒳 前半部分的代码:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt 会正确处理代理对
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, 读取到了完整的代理对
```

也就是说，如果我们从字符串的位置 1 开始获取 `charCode` 与 `codePoint` （这么做是不对的），那么这两个方法调用后，都只返回了该代理对的后半部分：

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// 无意义的代理对后半部分
```

你将会在 <info:iterable> 一章找到更多处理代理对的方法。 如今可能会有专门处理代理对的库，但没有足够流行到让我们可以在这里安利的库。

````warn header="注意：在任意点拆分字符串是危险的"
我们不能只在任意位置拆分字符串，例如 从 `str.slice(0, 4)` 取出一个字符串，并期待它是一个有效的字符串，例如：

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```

在这里，我们看到一个没有意义的垃圾字符被打印了出来（微笑表情代理对的前半部分）。

如果你打算可靠地使用代理对，请注意这一点。 这可能并不是什么大问题，但至少你应该得明白什么会发生。
````

## 变音符号与规范化

许多语言会有由基本字符以及上标记/下标记组成的符号。

举个例子，`àáâäãåā` 这些字符是基于字母 `a` 得来的。

常见的“复合”字符在 Unicode 表中都有自己的代码。 但不是所有这些字符都有自己的代码，因为可能的组合有太多了。

为了支持任意的组合，Unicode 标准允许我们使用多个 Unicode 字符：基本字符后跟一个或多个“装饰”它的“标记”字符。

例如，如果我们在 `S` 后跟特殊的“上句点”字符（代码为 `\u0307`），则显示为 Ṡ。

```js run
alert( 'S\u0307' ); // Ṡ
```

我们只需添加必要的标记字符，便可在字母上方（或下方）添加额外的标记。

例如，如果我们附加一个字符“下句点”（代码 `\u0323`），那么我们将得到“有上下句点的 S”：`Ṩ`。

如下代码所示：

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

这非常灵活，但也带来了一个有趣的问题：两个字符在我们眼里看起来虽然相同，却用着不同的 Unicode 组合表示。

举个例子：

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + 上句点 + 下句点
let s2 = 'S\u0323\u0307'; // Ṩ, S + 下句点 + 上句点

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // 这两个字符在我们眼里看起来是相同的，却打印出了 false（？！）
```

“Unicode 规范化”算法可以解决这个问题，该算法将每个字符串转换为单一的“规范的”形式。

可以借助 [str.normalize()](mdn:js/String/normalize) 实现这一点。

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

有意思的是，在我们这个例子中，`normalize()` 将 3 个字符的序列合并为了一个字符：`\u1e68`（带有上下两个点的 S）。

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

但实际并非总是如此。出现这种情况的原因是符号 `Ṩ` 是“足够常见的”，所以 Unicode 创建者将其囊括在了 Unicode 主表中，并为其提供了对应的编码。

如果你想了解关于 Unicode 规范化规则和变体的更多信息，可以参阅 Unicode 标准的附录中的内容：[Unicode 规范化形式](https://www.unicode.org/reports/tr15/)。但就实用而言，本节中的信息就已经足够了。
