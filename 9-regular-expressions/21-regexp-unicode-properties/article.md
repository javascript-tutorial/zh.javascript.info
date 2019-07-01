<<<<<<< HEAD
# Unicode 属性匹配（\p）

JavaScript 中字符串使用的编码格式 Unicode 对于不同的字符（更严谨地说，码位）有大量的类别。这些类别描述了这个字符的“种类”和技术性细节。

在正则表达式中可以使用 `\p{…}` 来设置这些类别。注意此时 `'u'` flag 不可缺少。

举个例子，`\p{letter}` 在任何一个语言中都表示一个字母。`\p{L}` 是它的简写形式。

以下是所有主要类别：

* 字母 `L`：
  * 小写字母 `Ll`，修饰语 `Lm`，大写首字母 `Lt`，全部大写 `Lu`，其他 `Lo`
* 数字 `N`：
  * 数字 `Nd`，字母 `Nl`，其他 `No`
* 标点 `P`：
  * 连接词 `Pc`，中划线 `Pd`，引号 `Pi`，引回 `Pf`，开始 `Ps`，结束 `Pe`，其他 `Po`
* 标记（变音等）`M`：
  * 组合字符（有一定间隔）`Mc`，包围字符（一个或多个字符被另一些字符包围）`Me`，组合字符（无间隔）`Mn`
* 标志 `S`：
  * 货币 `Sc`，修饰符号 `Sk`，数学 `Sm`，其他 `So`
* 分隔符 `Z`：
  * 换行符 `Zl`，段落 `Zp`，空格 `Zs`
* 其他 `C`：
  * 控制符 `Cc`，格式符 `Cf`，未提供的 `Cn`，非公用的 `Co`，帮助符 `Cs`

```smart header="更多信息"
在 http://cldr.unicode.org/unicode-utilities/list-unicodeset 中你可以看到各种类别下的字符。

你也可以在 [Character Property Index](http://unicode.org/cldr/utility/properties.jsp) 探索这些类别。

在 https://www.unicode.org/Public/UCD/latest/ucd/ ，你可以看到完整的 Unicode 数据库（包含对类别的说明）。
```

还有其他的一些派生类别，如：

* `Alphabetic`（`Alpha`），它包括字母 `L`，用字母表示的数字 `Nl`（如罗马数字 Ⅻ），还有一些其他的符号 `Other_Alphabetic`（`OAltpa`）。
* `Hex_Digit` 包含十六进制中用到的“数字”：`0-9`，`a-f`。
* ...Unicode 非常庞大，它还包含了很多类别。

举个例子，这个六位十六进制数：

```js run
let reg = /\p{Hex_Digit}{6}/u; // flag 'u' is required （注意 flag 'u' 是必须的）
=======

# Unicode character properties \p

[Unicode](https://en.wikipedia.org/wiki/Unicode), the encoding format used by JavaScript strings, has a lot of properties for different characters (or, technically, code points). They describe which "categories" character belongs to, and a variety of technical details.

In regular expressions these can be set by `\p{…}`. And there must be flag `'u'`.

For instance, `\p{Letter}` denotes a letter in any of language. We can also use `\p{L}`, as `L` is an alias of `Letter`, there are shorter aliases for almost every property.

Here's the main tree of properties:

- Letter `L`:
  - lowercase `Ll`, modifier `Lm`, titlecase `Lt`, uppercase `Lu`, other `Lo`
- Number `N`:
  - decimal digit `Nd`, letter number `Nl`, other `No`
- Punctuation `P`:
  - connector `Pc`, dash `Pd`, initial quote `Pi`, final quote `Pf`, open `Ps`, close `Pe`, other `Po`
- Mark `M` (accents etc):
  - spacing combining `Mc`, enclosing `Me`, non-spacing `Mn`
- Symbol `S`:
  - currency `Sc`, modifier `Sk`, math `Sm`, other `So`
- Separator `Z`:
  - line `Zl`, paragraph `Zp`, space `Zs`
- Other `C`:
  - control `Cc`, format `Cf`, not assigned `Cn`, private use `Co`, surrogate `Cs`

```smart header="More information"
Interested to see which characters belong to a property? There's a tool at <http://cldr.unicode.org/unicode-utilities/list-unicodeset> for that.

You could also explore properties at [Character Property Index](http://unicode.org/cldr/utility/properties.jsp).

For the full Unicode Character Database in text format (along with all properties), see <https://www.unicode.org/Public/UCD/latest/ucd/>.
```

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. roman numbers Ⅻ), plus some other symbols `Other_Alphabetic` (`OAltpa`).
- `Hex_Digit` includes hexadimal digits: `0-9`, `a-f`.
- ...Unicode is a big beast, it includes a lot of properties.

For instance, let's look for a 6-digit hex number:

```js run
let reg = /\p{Hex_Digit}{6}/u; // flag 'u' is required
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

alert("color: #123ABC".match(reg)); // 123ABC
```

<<<<<<< HEAD
还有有值的类别。如，Unicode "Script"（脚本，一种书写方式）可以表达西里尔字母、希腊文、阿拉伯语和中文等等。

要对一个单一的书写系统进行搜索，就要另外提供 `Script=<value>`。如，要搜索西里尔字母，应使用 `\p{sc=Cyrillic}`，而对于汉字，应使用 `\p{sc=Han}`，等等。以下是使用这种特性的代码片段：

```js run
let regexp = /\p{sc=Han}+/gu; // get chinese words （获得中文字符）
=======
There are also properties with a value. For instance, Unicode "Script" (a writing system) can be Cyrillic, Greek, Arabic, Han (Chinese) etc, the [list is long]("https://en.wikipedia.org/wiki/Script_(Unicode)").

To search for characters in certain scripts ("alphabets"), we should supply `Script=<value>`, e.g. to search for cyrillic letters: `\p{sc=Cyrillic}`, for Chinese glyphs: `\p{sc=Han}`, etc:

```js run
let regexp = /\p{sc=Han}+/gu; // get chinese words
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你好
```

<<<<<<< HEAD
## 写对于所有语言都适用的 \w

请给所有的语言写一个“全面的” `pattern:\w` 的正则表达式。这一问题在很多有针对 Unicode 优化的正则表达式特性的编程语言中都有标准解决方式，如 Perl。
=======
## Building multi-language \w

The pattern `pattern:\w` means "wordly characters", but doesn't work for languages that use non-Latin alphabets, such as Cyrillic and others. It's just a shorthand for `[a-zA-Z0-9_]`, so `pattern:\w+` won't find any Chinese words etc.

Let's make a "universal" regexp, that looks for wordly characters in any language. That's easy to do using Unicode properties:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js
/[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]/u
```

<<<<<<< HEAD
请跟我一起对它进行分析。由于 `pattern:\w` 其实就是 `pattern:[a-zA-Z0-9_]`，

所以这个字符集包含了：

* `Alphabetic` 字母，
* `Mark` 重音，因为重音在 Unicode 中可能被表示为多个码位，
* `Decimal_Number` 数字，
* `Connector_Punctuation` '_'（下划线）和类似它（下划线）的字符，
* `Join_Control` —— 用于将字连起形成连字（如在阿拉伯语中使用）的两个特殊的码位（hex 分别为 `200c` 和 `200d`）

或者，如果换用缩写（[缩写列表](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)）：
=======
Let's decipher. Just as `pattern:\w` is the same as `pattern:[a-zA-Z0-9_]`, we're making a set of our own, that includes:

- `Alphabetic` for letters,
- `Mark` for accents, as in Unicode accents may be represented by separate code points,
- `Decimal_Number` for numbers,
- `Connector_Punctuation` for the `'_'` character and alike,
- `Join_Control` -– two special code points with hex codes `200c` and `200d`, used in ligatures e.g. in arabic.

Or, if we replace long names with aliases (a list of aliases [here](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)):
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let regexp = /([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)/gu;

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // Hello,Привет,你好,123_456
```
