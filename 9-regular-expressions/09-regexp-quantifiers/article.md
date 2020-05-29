<<<<<<< HEAD
# 量词 `+,*,?` 和 `{n}`

假设我们有一个字符串 `+7(903)-123-45-67`，并且想要找到它包含的所有数字。但与之前不同的是，我们对单个数字不感兴趣，只对全数感兴趣：`7, 903, 123, 45, 67`。

数字是一个或多个 `\d` 的序列。用来形容我们所需要的数量的词被称为**量词**。

## 数量 {n}

最明显的量词便是一对引号间的数字：`pattern:{n}`。在一个字符（或一个字符类等等）后跟着一个量词，用来指出我们具体需要的数量。

它有更高级的格式，用一个例子来说明：

确切的位数：`{5}`
: `pattern:\d{5}` 表示 5 位的数字，如同 `pattern:\d\d\d\d\d`。

    接下来的例子将会查找一个五位数的数字：
=======
# Quantifiers +, *, ? and {n}

Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `pattern:\d`. To mark how many we need, we can append a *quantifier*.

## Quantity {n}

The simplest quantifier is a number in curly braces: `pattern:{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let's see examples:

The exact count: `pattern:{5}`
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.

    The example below looks for a 5-digit number:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

<<<<<<< HEAD
    我们可以添加 `\b` 来排除更多位数的数字：`pattern:\b\d{5}\b`。

某个范围的位数：`{3,5}`
: 我们可以将限制范围的数字放入括号中，来查找位数为 3 至 5 位的数字：`pattern:\d{3,5}`
=======
    We can add `\b` to exclude longer numbers: `pattern:\b\d{5}\b`.

The range: `pattern:{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

<<<<<<< HEAD
    我们可以省略上限。那么正则表达式 `pattern:\d{3,}` 就会查找位数大于或等于 3 的数字：
=======
    We can omit the upper limit.

    Then a regexp `pattern:\d{3,}` looks for sequences of digits of length `3` or more:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

<<<<<<< HEAD
对于字符串 `+7(903)-123-45-67` 来说，我们如果需要一个或多个连续的数字，就使用 `pattern:\d{1,}`：
=======
Let's return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `pattern:\d{1,}`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

<<<<<<< HEAD
## 缩写

大多数常用的量词都可以有缩写：

`+`
: 代表“一个或多个”，相当于 `{1,}`。

    例如，`pattern:\d+` 用来查找所有数字：
=======
## Shorthands

There are shorthands for most used quantifiers:

`pattern:+`
: Means "one or more", the same as `pattern:{1,}`.

    For instance, `pattern:\d+` looks for numbers:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

<<<<<<< HEAD
`?`
: 代表“零个或一个”，相当于 `{0,1}`。换句话说，它使得符号变得可选。

    例如，模式 `pattern:ou?r` 查找 `match:o`，后跟零个或一个 `match:u`，然后是 `match:r`。

    所以他能够在 `subject:color` 中找到 `match:or`，以及在 `subject:colour` 中找到 `match:our`：
=======
`pattern:?`
: Means "zero or one", the same as `pattern:{0,1}`. In other words, it makes the symbol optional.

    For instance, the pattern `pattern:ou?r` looks for `match:o` followed by zero or one `match:u`, and then `match:r`.

    So, `pattern:colou?r` finds both `match:color` and `match:colour`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

<<<<<<< HEAD
`*`
: 代表着“零个或多个”，相当于 `{0,}`。也就是说，这个字符可以多次出现或不出现。

    接下来的例子将要寻找一个后跟任意数量的 0 的数字：
=======
`pattern:*`
: Means "zero or more", the same as `pattern:{0,}`. That is, the character may repeat any times or be absent.

    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes (may be many or none):
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

<<<<<<< HEAD
    将它与 `'+'`（一个或多个）作比较：

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    ```

## 更多示例

量词是经常被使用的。它们是构成复杂的正则表达式的主要模块之一，我们接着来看更多的例子。

正则表达式“浮点数”（带浮点的数字）：`pattern:\d+\.\d+`
: 实现：
    ```js run
    alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
    ```

正则表达式“打开没有属性的 HTML 标记”，比如 `<span>` 或 `<p>`：`pattern:/<[a-z]+>/i`
: 实现：
=======
    Compare it with `pattern:+` (one or more):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero
    ```

## More examples

Quantifiers are used very often. They serve as the main "building block" of complex regular expressions, so let's see more examples.

**Regexp for decimal fractions (a number with a floating point): `pattern:\d+\.\d+`**

In action:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Regexp for an "opening HTML-tag without attributes", such as `<span>` or `<p>`.**

1. The simplest one: `pattern:/<[a-z]+>/i`
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

<<<<<<< HEAD
    我们查找字符 `pattern:'<'` 后跟一个或多个英文字母，然后是 `pattern:'>'`。

正则表达式“打开没有属性的HTML标记”（改进版）：`pattern:/<[a-z][a-z0-9]*>/i`
: 更好的表达式：根据标准，HTML 标记名称可以在除了第一个位置以外的任意一个位置有一个数字，比如 `<h1>`。
=======
    The regexp looks for character `pattern:'<'` followed by one or more Latin letters, and then  `pattern:'>'`.

2. Improved: `pattern:/<[a-z][a-z0-9]*>/i`

    According to the standard, HTML tag name may have a digit at any position except the first one, like `<h1>`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

<<<<<<< HEAD
正则表达式“打开没有属性的HTML标记”：`pattern:/<\/?[a-z][a-z0-9]*>/i`
: 我们在标记前加上了一个可选的斜杆 `pattern:/?`。必须用一个反斜杠来转义它，否则 JavaScript 就会认为它是这个模式的结束符。

    ```js run
    alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
    ```

```smart header="更精确意味着更复杂"
我们能够从这些例子中看到一个共同的规则：正则表达式越精确 —— 它就越长且越复杂。

例如，HTML 标记能用一个简单的正则表达式：`pattern:<\w+>`。

因为 `pattern:\w` 代表任意英文字母或数字或 `'_'`，这个正则表达式也能够匹配非标注的内容，比如 `match:<_>`。但它要比 `pattern:<[a-z][a-z0-9]*>` 简单很多。

我们能够接受 `pattern:<\w+>` 或者我们需要 `pattern:<[a-z][a-z0-9]*>`？

在现实生活中，两种方式都能接受。取决于我们对于“额外”匹配的宽容程度以及是否难以通过其他方式来过滤掉它们。
=======
**Regexp "opening or closing HTML-tag without attributes": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

We added an optional slash `pattern:/?` near the beginning of the pattern. Had to escape it with a backslash, otherwise JavaScript would think it is the pattern end.

```js run
alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="To make a regexp more precise, we often need make it more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`. But as HTML has stricter restrictions for a tag name, `pattern:<[a-z][a-z0-9]*>` is more reliable.

Can we use `pattern:<\w+>` or we need `pattern:<[a-z][a-z0-9]*>`?

In real life both variants are acceptable. Depends on how tolerant we can be to "extra" matches and whether it's difficult or not to remove them from the result by other means.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```
