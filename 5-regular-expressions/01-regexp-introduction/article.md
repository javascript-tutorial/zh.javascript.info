# 模式（Patterns）和修饰符（flags）

正则表达式是搜索和替换字符串的一种强大方式。

在JavaScript中，正则表达式使用内置的“RegExp”类的对象实现，并与字符串集成。

请注意，在各编程语言之间，正则表达式是有所不同的。在本教程中，我们只专注于 JavaScript。当然，它们有很多共同点，但在 Perl、Ruby 和 PHP 等语言下会有所不同。

## 正则表达式

正则表达式（可叫作”regexp“或者”reg“）包含 **模式** 和可选的 **修饰符**。

创建一个正则表达式对象有两种语法。

较长一点的语法：

```js
regexp = new RegExp("pattern", "flags");
```

...较短一点的使用斜杠 `"/"`:

```js
regexp = /pattern/; // 没有修饰符
regexp = /pattern/gmi; // 伴随修饰符 g、m 和 i (后面会讲到)
```

斜杠会 `"/"` 告诉 JavaScript 我们正在创建一个正则表达式。它的作用类似于字符串的引号。

## 用法

如果要在字符串中进行搜索，可以使用 [search](mdn:js/String/search) 方法。

下面是示例：

```js run
let str = "I love JavaScript!"; // 会在这里搜索

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

`str.search` 方法会查找模式 `pattern:/love/`，然后返回匹配项在字符串中的位置。我们可以猜到，`pattern:/love/` 是最简单的模式。它所做的就是简单的子字符串的查找。

上面的代码等同于：

```js run
let str = "I love JavaScript!"; // 会在这里搜索

let substr = 'love';
alert( str.search(substr) ); // 2
```

所以搜索 `pattern:/love/` 与搜索 `"love"` 是等价的。

但这只是暂时的。很快我们就会接触更复杂的正则表达式，其搜索功能将更强大。

```smart header="配色"
本文中的配色方案如下:

- regexp -- `pattern:red`
- string（我们要搜索的） -- `subject:blue`
- result -- `match:green`
```


````smart header="什么时候使用 `new RegExp`?"
通常我们使用的都是简短语法 `/.../`。但是它不接受任何变量插入，所以我们必须在写代码的时候就知道确切的 regexp。

另一方面，`new RegExp` 允许从字符串中动态地构造模式。

所以我们可以找出需要搜索的字段，然后从这里创建 `new RegExp`：

```js run
let search = prompt("What you want to search?", "love");
let regexp = new RegExp(search);

// 找到用户想要的任何东西
alert( "I love JavaScript".search(regexp));
```
````


## 修饰符

正则表达式的修饰符可能会影响搜索结果。

在 JavaScript 中，有5个修饰符：

`i`
: 使用此修饰符后，搜索的大小写不敏感: `A` 和 `a` 没有区别 (具体看下面的例子).

`g`
: 使用此修饰符后，搜索会查找所有的匹配项，而不只是第一个（在下一章会讲到）

`m`
: 多行模式（详见 章节 <info:regexp-multiline>）

`u`
: 开启完整的 unicode 支持。该修饰符能够修正对于代理对的处理。更详细的内容见章节 <info:regexp-unicode>。

`y`
: 粘滞模式（详见 [下一章节](info:regexp-methods#y-flag)）


## ”i“修饰符

最简单的修饰符就是 `i` 了。

示例代码如下：

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/) ); // -1 (not found)
alert( str.search(/LOVE/i) ); // 2
```

1. 第一个搜索返回的是 `-1`（也就是没找到），因为搜索默认是大小写敏感的。
2. 使用修饰符 `pattern:/LOVE/i`，搜索结果为位置为 2 的 `match:love`。

相比与简单的子字符串查找，`i` 修饰符已经让正则表达式变得更加强大了。但是这还不够。我们会在下一章节讲述其它修饰符和特性。


## 总结

- 一个正则表达式包含模式和可选修饰符： `g`、`i`、`m`、`u`、`y`。
- 如果不使用后面所学的修饰符和特殊标志，正则表达式的搜索就等同于子字符串查找。
- `str.search(regexp)` 方法返回的是找到的匹配项的索引位置，如果没找到则返回 `-1`。
