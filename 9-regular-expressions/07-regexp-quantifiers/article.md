# 量词 `+,*,?` 和 `{n}`

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
假设我们有一个字符串 `+7(903)-123-45-67`，并且想要找到它包含的所有数字。但与之前不同的是，我们对单个数字不感兴趣，只对全数感兴趣：`7, 903, 123, 45, 67`。

数字是一个或多个 `\d` 的序列。用来形容我们所需要的数量的词被称为**量词**。
=======
Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `\d`. To mark how many we need, we need to append a *quantifier*.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

## 数量 {n}

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
最明显的量词便是一对引号间的数字：`pattern:{n}`。在一个字符（或一个字符类等等）后跟着一个量词，用来指出我们具体需要的数量。

它有更高级的格式，用一个例子来说明：

确切的位数：`{5}`
: `pattern:\d{5}` 表示 5 位的数字，如同 `pattern:\d\d\d\d\d`。
=======
The simplest quantifier is a number in curly braces: `pattern:{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let's see examples:

The exact count: `{5}`
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    接下来的例子将会查找一个五位数的数字：

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    我们可以添加 `\b` 来排除更多位数的数字：`pattern:\b\d{5}\b`。

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
某个范围的位数：`{3,5}`
: 我们可以将限制范围的数字放入括号中，来查找位数为 3 至 5 位的数字：`pattern:\d{3,5}`
=======
The range: `{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
    我们可以省略上限。那么正则表达式 `pattern:\d{3,}` 就会查找位数大于或等于 3 的数字：
=======
    We can omit the upper limit.

    Then a regexp `pattern:\d{3,}` looks for sequences of digits of length `3` or more:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
对于字符串 `+7(903)-123-45-67` 来说，我们如果需要一个或多个连续的数字，就使用 `pattern:\d{1,}`：
=======
Let's return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `pattern:\d{1,}`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## 缩写

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
大多数常用的量词都可以有缩写：
=======
There are shorthands for most used quantifiers:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

`+`
: 代表“一个或多个”，相当于 `{1,}`。

    例如，`pattern:\d+` 用来查找所有数字：

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`?`
: 代表“零个或一个”，相当于 `{0,1}`。换句话说，它使得符号变得可选。

    例如，模式 `pattern:ou?r` 查找 `match:o`，后跟零个或一个 `match:u`，然后是 `match:r`。

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
    所以他能够在 `subject:color` 中找到 `match:or`，以及在 `subject:colour` 中找到 `match:our`：
=======
    So, `pattern:colou?r` finds both `match:color` and `match:colour`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`*`
：代表着“零个或多个”，相当于 `{0,}`。也就是说，这个字符可以多次出现或不出现。

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
    接下来的例子将要寻找一个后跟任意数量的 0 的数字：
=======
    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    将它与 `'+'`（一个或多个）作比较：

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero
    ```

## 更多示例

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
量词是经常被使用的。它们是构成复杂的正则表达式的主要模块之一，我们接着来看更多的例子。
=======
Quantifiers are used very often. They serve as the main "building block" of complex regular expressions, so let's see more examples.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

正则表达式“浮点数”（带浮点的数字）：`pattern:\d+\.\d+`
: 实现：
    ```js run
    alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
    ```

正则表达式“打开没有属性的 HTML 标记”，比如 `<span>` 或 `<p>`：`pattern:/<[a-z]+>/i`
: 实现：

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    我们查找字符 `pattern:'<'` 后跟一个或多个英文字母，然后是 `pattern:'>'`。

正则表达式“打开没有属性的HTML标记”（改进版）：`pattern:/<[a-z][a-z0-9]*>/i`
: 更好的表达式：根据标准，HTML 标记名称可以在除了第一个位置以外的任意一个位置有一个数字，比如 `<h1>`。

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

正则表达式“打开没有属性的HTML标记”：`pattern:/<\/?[a-z][a-z0-9]*>/i`
: 我们在标记前加上了一个可选的斜杆 `pattern:/?`。必须用一个反斜杠来转义它，否则 JavaScript 就会认为它是这个模式的结束符。

    ```js run
    alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
    ```

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
```smart header="更精确意味着更复杂"
我们能够从这些例子中看到一个共同的规则：正则表达式越精确 —— 它就越长且越复杂。

例如，HTML 标记能用一个简单的正则表达式：`pattern:<\w+>`。

因为 `pattern:\w` 代表任意英文字母或数字或 `'_'`，这个正则表达式也能够匹配非标注的内容，比如 `match:<_>`。但它要比 `pattern:<[a-z][a-z0-9]*>` 简单很多。
=======
```smart header="To make a regexp more precise, we often need make it more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`.

...But because `pattern:\w` means any English letter or a digit or `'_'`, the regexp also matches non-tags, for instance `match:<_>`. So it's much simpler than `pattern:<[a-z][a-z0-9]*>`, but less reliable.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

我们能够接受 `pattern:<\w+>` 或者我们需要 `pattern:<[a-z][a-z0-9]*>`？

在现实生活中，两种方式都能接受。取决于我们对于“额外”匹配的宽容程度以及是否难以通过其他方式来过滤掉它们。
```
