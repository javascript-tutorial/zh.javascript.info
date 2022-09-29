# 模式（Patterns）和修饰符（flags）

正则表达式是提供了一种在文本中进行搜索和替换的强大的方式的模式。

在 JavaScript 中，我们可以通过 [RegExp](mdn:js/RegExp) 对象使用它们，也可以与字符串方法结合使用。

## 正则表达式

正则表达式（可叫作 "regexp"，或 "reg"）包扩 **模式** 和可选的 **修饰符**。

有两种创建正则表达式对象的语法。

较长一点的语法：

```js
regexp = new RegExp("pattern", "flags");
```

较短一点的语法，使用斜线 `"/"`：

```js
regexp = /pattern/; // 没有修饰符
regexp = /pattern/gmi; // 带有修饰符 g、m 和 i（后面会讲到）
```

斜线 `pattern:/.../` 告诉 JavaScript 我们正在创建一个正则表达式。它的作用与字符串引号的作用相同。

在这两种情况下，`regexp` 都会成为内建类 `RegExp` 的一个实例。

这两种语法之间的主要区别在于，使用斜线 `/.../` 的模式不允许插入表达式（如带有 `${...}` 的字符串模板）。它是完全静态的。

在我们写代码时就知道正则表达式时则会使用斜线的方式 —— 这是最常见的情况。当我们需要从动态生成的字符串“动态”创建正则表达式时，更经常使用 `new RegExp`。例如：

```js
let tag = prompt("What tag do you want to find?", "h2");
​
let regexp = new RegExp(`<${tag}>`); // 如果在上方输入到 prompt 中的答案是 "h2"，则与 /<h2>/ 相同
```

## 修饰符

正则表达式可能会有的会影响搜索结果的修饰符。

在 JavaScript 中，有 6 个修饰符：

`pattern:i`
: 使用此修饰符后，搜索时不区分大小写：`A` 和 `a` 之间没有区别（请参见下面的示例）。

`pattern:g`
: 使用此修饰符后，搜索时会寻找所有的匹配项 —— 没有它，则仅返回第一个匹配项。

`pattern:m`
: 多行模式（详见 <info:regexp-multiline-mode>）。

`pattern:s`
: 启用 "dotall" 模式，允许点 `pattern:.` 匹配换行符 `\n`（在 <info:regexp-character-classes> 中有详细介绍）。

`pattern:u`
: 开启完整的 Unicode 支持。该修饰符能够正确处理代理对。详见 <info:regexp-unicode>。

`pattern:y`
: 粘滞模式，在文本中的确切位置搜索（详见 <info:regexp-sticky>）


```smart header="颜色"
接下来，各部分的颜色如下：
​
- 正则表达式 —— `pattern:red`
- 字符串（我们搜索的地方）—— `subject:blue`
- 结果 —— `match:green`
```

## 搜索：str.match

正如前面所提到的，将正则表达式和字符串方法结合一起使用。

`str.match(regexp)` 方法在字符串 `str` 中寻找 `regexp` 的所有匹配项。

它有 3 种工作模式：

1. 如果正则表达式具有修饰符 `pattern:g`，它返回一个由所有匹配项所构成的数组：
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we（由两个匹配的子字符串构成的数组）
    ```
    请注意，`match:We` 和 `match:we` 都被找到了，因为修饰符 `pattern:i` 使得正则表达式在进行搜索时不区分大小写。

2. 如果没有这样的修饰符，它则会以数组形式返回第一个匹配项，索引 `0` 处保存着完整的匹配项，返回的结果的属性中还有一些其他详细信息：
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // 没有修饰符 g

    alert( result[0] );     // We（第一个匹配项）
    alert( result.length ); // 1

    // 详细信息：
    alert( result.index );  // 0（匹配项的位置）
    alert( result.input );  // We will, we will rock you（源字符串）
    ```
    如果正则表达式中有一部分内容被包在括号里，那么返回的数组可能会有 `0` 以外的索引。我们将在 <info:regexp-groups> 中学习这部分相关内容。

3. 最后，如果没有匹配项，则返回 `null`（无论是否有修饰符 `pattern:g`）。

    这是一个非常重要的细微差别。如果没有匹配项，我们不会收到一个空数组，而是会收到 `null`。忘了这一点可能会导致错误，例如：

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    如果我们希望结果始终是一个数组，我们可以这样写：

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // 现在可以了
    }
    ```

## 替换：str.replace

`str.replace(regexp, replacement)` 方法使用 `replacement` 替换在字符串 `str` 中找到的 `regexp` 的匹配项（如果带有修饰符 `pattern:g` 则替换所有匹配项，否则只替换第一个）。

例如：

```js run
// 没有修饰符 g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// 带有修饰符 g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

第二个参数是字符串 `replacement`。我们可以在其中使用特殊的字符组合来对匹配项进行插入：

| 符号 | 在替换字符串中的行为 |
|--------|--------|
|`$&`|插入整个匹配项|
|<code>$&#096;</code>|插入字符串中匹配项之前的字符串部分|
|`$'`|插入字符串中匹配项之后的字符串部分|
|`$n`|如果 `n` 是一个 1-2 位的数字，则插入第 n 个分组的内容，详见 <info:regexp-groups>|
|`$<name>`|插入带有给定 `name` 的括号内的内容，详见 <info:regexp-groups>|
| `$$` | 插入字符 `$` |

带有 `pattern:$&` 的一个示例：

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## 测试：regexp.test

`regexp.test(str)` 方法寻找至少一个匹配项，如果找到了，则返回 `true`，否则返回 `false`。

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

在后面的章节中，我们会学习更多正则表达式，通过更多的例子，也会遇到其他的方法。

关于这些方法的完整信息请见 <info:regexp-methods>。

## 总结

- 正则表达式由模式和可选择修饰符构成：`pattern:g`、`pattern:i`、`pattern:m`、`pattern:u`、`pattern:s` 和 `pattern:y`。
- 没有修饰符和特殊符号（稍后我们会学到），那么正则表达式的搜索和子字符串的搜索相同。
- `str.match(regexp)` 方法寻找匹配项：如果带有修饰符 `pattern:g`，则会返回所有匹配项，否则只会返回第一个匹配项。
- `str.replace(regexp, replacement)` 方法使用 `replacement` 替换 `regexp` 的匹配项：如果带有修饰符 `pattern:g`，则会替换所有匹配项，否则只会替换第一个匹配项。
- `regexp.test(str)` 方法用于测试，如果找到至少一个匹配项则返回 `true`，否则返回 `false`。
