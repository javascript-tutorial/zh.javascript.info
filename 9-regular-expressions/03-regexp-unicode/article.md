# Unicode: flag "u" and class \p{...}
# Unicode: 修饰符“u”和 class \p{...}

JavaScript uses [Unicode encoding](https://en.wikipedia.org/wiki/Unicode) for strings. Most characters are encoding with 2 bytes, but that allows to represent at most 65536 characters.
JavaScript 使用 [Unicode 编码](https://en.wikipedia.org/wiki/Unicode) （Unicode encoding）对字符串进行编码。但这种方式只能编码最多 65536 个字符。

That range is not big enough to encode all possible characters, that's why some rare characters are encoded with 4 bytes, for instance like `𝒳` (mathematical X) or `😄` (a smile), some hieroglyphs and so on.
这个范围不足以对所有可能的字符进行编码，这就是为什么一些罕见的字符使用 4 个字节进行编码，比如 `𝒳` （数学符号 X）或者 `😄` （笑脸），一些象形文字等等。

Here are the unicode values of some characters:
以下是一些字符对应的 unicode 编码：

| 字符         | Unicode   | unicode 中的字节数     |
| ------------ | --------- | ---------------------- |
| a            | `0x0061`  | 2                      |
| ≈            | `0x2248`  | 2                      |
| 𝒳            | `0x1d4b3` | 4                      |
| 𝒴            | `0x1d4b4` | 4                      |
| 😄           | `0x1f604` | 4                      |

So characters like `a` and `≈` occupy 2 bytes, while codes for `𝒳`, `𝒴` and `😄` are longer, they have 4 bytes.
所以像 `a` 和 `≈` 这样的字符占用 2 个字节，而 `𝒳`，`𝒴` 和 `😄` 的对应编码则更长，它们具有 4 个字节的长度。

Long time ago, when JavaScript language was created, Unicode encoding was simpler: there were no 4-byte characters. So, some language features still handle them incorrectly.
很久以前，当 JavaScript 被发明出来的时候，Unicode 的编码要更加简单：当时并没有 4 个字节长的字符。所以，一部分语言特性在现在仍旧对无法对 unicode 进行正确的处理。

For instance, `length` thinks that here are two characters:
比如 `length` 认为这里的输入有 2 个字符：

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...But we can see that there's only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That's incorrect, because they must be considered only together (so-called "surrogate pair", you can read about them in the article <info:string>).
...但我们可以清楚地认识到输入的字符只有一个，对吧？关键在于 `length` 把 4 个字节当成了 2 个 2 字节长的字符。这是不对的，因为它们必须被当作一个整体来考虑。（即所谓的“代理伪字符”（surrogate pair），你可以在这里进一步阅读有关的的信息 <info:string>）。

By default, regular expressions also treat 4-byte "long characters" as a pair of 2-byte ones. And, as it happens with strings, that may lead to odd results. We'll see that a bit later, in the article <info:regexp-character-sets-and-ranges>.
默认情况下，正则表达式同样把一个 4 个字节的“长字符”当成一对 2 个字节长的字符。正如在字符串中遇到的情况，这将导致一些奇怪的结果。我们将很快在后面的文章中遇到 <info:regexp-character-sets-and-ranges>.

Unlike strings, regular expressions have flag `pattern:u` that fixes such problems. With such flag, a regexp handles 4-byte characters correctly. And also Unicode property search becomes available, we'll get to it next.
与字符串有所不同的是，正则表达式有一个修饰符 `pattern:u` 被用以解决此类问题。当一个正则表达式使用这个修饰符后，4 个字节长的字符将被正确地处理。同时也能够用上 Unicode 属性（Unicode property）来进行查找了。我们接下来就来了解这方面的内容。

## Unicode properties \p{...}

```warn header="Not supported in Firefox and Edge"
Despite being a part of the standard since 2018, unicode proeprties are not supported in Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1361876)) and Edge ([bug](https://github.com/Microsoft/ChakraCore/issues/2969)).

There's [XRegExp](http://xregexp.com) library that provides "extended" regular expressions with cross-browser support for unicode properties.
```

Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.

For instance, if a character has `Letter` property, it means that the character belongs to an alphabet (of any language). And `Number` property means that it's a digit: maybe Arabic or Chinese, and so on.

We can search for characters with a property, written as `pattern:\p{…}`. To use `pattern:\p{…}`, a regular expression must have flag `pattern:u`.

For instance, `\p{Letter}` denotes a letter in any of language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgean and Korean.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (no matches, as there's no flag "u")
```

Here's the main character categories and their subcategories:

- Letter `L`:
  - lowercase `Ll`
  - modifier `Lm`,
  - titlecase `Lt`,
  - uppercase `Lu`,
  - other `Lo`.
- Number `N`:
  - decimal digit `Nd`,
  - letter number `Nl`,
  - other `No`.
- Punctuation `P`:
  - connector `Pc`,
  - dash `Pd`,
  - initial quote `Pi`,
  - final quote `Pf`,
  - open `Ps`,
  - close `Pe`,
  - other `Po`.
- Mark `M` (accents etc):
  - spacing combining `Mc`,
  - enclosing `Me`,
  - non-spacing `Mn`.
- Symbol `S`:
  - currency `Sc`,
  - modifier `Sk`,
  - math `Sm`,
  - other `So`.
- Separator `Z`:
  - line `Zl`,
  - paragraph `Zp`,
  - space `Zs`.
- Other `C`:
  - control `Cc`,
  - format `Cf`,
  - not assigned `Cn`,
  -- private use `Co`,
  - surrogate `Cs`.


So, e.g. if we need letters in lower case, we can write `pattern:\p{Ll}`, punctuation signs: `pattern:\p{P}` and so on.

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. Ⅻ - a character for the roman number 12), plus some other symbols `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- ...And so on.

Unicode supports many different properties, their full list would require a lot of space, so here are the references:

- List all properties by a character: <https://unicode.org/cldr/utility/character.jsp>.
- List all characters by a property: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Short aliases for properties: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A full base of Unicode characters in text format, with all properties, is here: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Example: hexadecimal numbers

For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..1 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

### Example: Chinese hieroglyphs

Let's look for Chinese hieroglyphs.

There's a unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list]("https://en.wikipedia.org/wiki/Script_(Unicode)").

To look for characters in a given writing system we should use `pattern:Script=<value>`, e.g. for Cyrillic letters: `pattern:\p{sc=Cyrillic}`, for Chinese hieroglyphs: `pattern:\p{sc=Han}`, and so on:

```js run
let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Example: currency

Characters that denote a currency, such as `$`, `€`, `¥`, have unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.

Let's use it to look for prices in the format "currency, followed by a digit":

```js run
let regexp = /\p{Sc}\d/gu;

let  str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Later, in the article <info:regexp-quantifiers> we'll see how to look for numbers that contain many digits.

## Summary

Flag `pattern:u` enables the support of Unicode in regular expressions.

That means two things:

1. Characters of 4 bytes are handled correctly: as a single character, not two 2-byte characters.
2. Unicode properties can be used in the search: `\p{…}`.

With Unicode properties we can look for words in given languages, special characters (quotes, currencies) and so on.
