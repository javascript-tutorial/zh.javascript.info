<<<<<<< HEAD
# 模式（Patterns）和修饰符（flags）

正则表达式是搜索和替换字符串的一种强大方式。

在 JavaScript 中，正则表达式通过内置的“RegExp”类的对象来实现，并与字符串集成。

请注意，在各编程语言之间，正则表达式是有所不同的。在本教程中，我们只专注于 JavaScript。当然，它们有很多共同点，但在 Perl、Ruby 和 PHP 等语言下会有所不同。

## 正则表达式

正则表达式（可叫作“regexp”或者“reg”）包含 **模式** 和可选的 **修饰符**。

创建一个正则表达式对象有两种语法。

较长一点的语法：
=======
# Patterns and flags

Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.

## Regular Expressions

A regular expression (also "regexp", or just "reg") consists of a *pattern* and optional *flags*.

There are two syntaxes that can be used to create a regular expression object.

The "long" syntax:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js
regexp = new RegExp("pattern", "flags");
```

<<<<<<< HEAD
...较短一点的语法，使用斜杠 `"/"`：

```js
regexp = /pattern/; // 没有修饰符
regexp = /pattern/gmi; // 伴随修饰符 g、m 和 i（后面会讲到）
```

斜杠 `"/"` 会告诉 JavaScript 我们正在创建一个正则表达式。它的作用类似于字符串的引号。

## 用法

如果要在字符串中进行搜索，可以使用 [search](mdn:js/String/search) 方法。

下面是示例：

```js run
let str = "I love JavaScript!"; // 将在这里搜索

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

`str.search` 方法会查找模式 `pattern:/love/`，然后返回匹配项在字符串中的位置。我们可以猜到，`pattern:/love/` 是最简单的模式。它所做的就是简单的子字符串的查找。

上面的代码等同于：

```js run
let str = "I love JavaScript!"; // 将在这里搜索

let substr = 'love';
alert( str.search(substr) ); // 2
```

所以搜索 `pattern:/love/` 与搜索 `"love"` 是等价的。

但这只是暂时的。很快我们就会接触更复杂的正则表达式，其搜索功能将更强大。

```smart header="配色"
本文中的配色方案如下：

- regexp -- `pattern:red`
- string（我们要搜索的）-- `subject:blue`
- result -- `match:green`
```


````smart header="什么时候使用 `new RegExp`?"
通常我们使用的都是简短语法 `/.../`。但是它不接受任何变量插入，所以我们必须在写代码的时候就知道确切的 regexp。

另一方面，`new RegExp` 允许从字符串中动态地构造模式。

所以我们可以找出需要搜索的字段，然后根据搜索字段创建 `new RegExp`：

```js run
let search = prompt("What you want to search?", "love");
let regexp = new RegExp(search);

// 找到用户想要的任何东西
alert( "I love JavaScript".search(regexp));
```
````


## 修饰符

正则表达式的修饰符可能会影响搜索结果。

在 JavaScript 中，有 5 个修饰符：

`i`
: 使用此修饰符后，搜索时不区分大小写: `A` 和 `a` 没有区别（具体看下面的例子）。

`g`
: 使用此修饰符后，搜索时会查找所有的匹配项，而不只是第一个（在下一章会讲到）。

`m`
: 多行模式（详见章节 <info:regexp-multiline>）。

`u`
: 开启完整的 unicode 支持。该修饰符能够修正对于代理对的处理。更详细的内容见章节 <info:regexp-unicode>。

`y`
: 粘滞模式（详见 [下一章节](info:regexp-methods#y-flag)）


## “i”修饰符

最简单的修饰符就是 `i` 了。

示例代码如下：

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/) ); // -1（没找到）
alert( str.search(/LOVE/i) ); // 2
```

1. 第一个搜索返回的是 `-1`（也就是没找到），因为搜索默认是区分大小写的。
2. 使用修饰符 `pattern:/LOVE/i`，在字符串的第 2 个位置上搜索到了 `match:love`。

相比与简单的子字符串查找，`i` 修饰符已经让正则表达式变得更加强大了。但是这还不够。我们会在下一章节讲述其它修饰符和特性。


## 总结

- 一个正则表达式包含模式和可选修饰符：`g`、`i`、`m`、`u`、`y`。
- 如果不使用我们在后面将要学到的修饰符和特殊标志，正则表达式的搜索就等同于子字符串查找。
- `str.search(regexp)` 方法返回的是找到的匹配项的索引位置，如果没找到则返回 `-1`。
=======
And the "short" one, using slashes `"/"`:

```js
regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)
```

Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp`, is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first match is returned.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)

```smart header="Colors"
From here on the color scheme is:

- regexp -- `pattern:red`
- string (where we search) -- `subject:blue`
- result -- `match:green`
```

## Searching: str.match

As mentioned previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to always be an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).

For instance:

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.

Full information about the methods is given in the article <info:regexp-methods>.

## Summary

- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
