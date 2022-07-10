# 变量

大多数情况下，JavaScript 应用需要处理信息。这有两个例子：
1. 一个网上商店 —— 这里的信息可能包含正在售卖的商品和购物车。
2. 一个聊天应用 —— 这里的信息可能包括用户和消息等等。

变量就是用来储存这些信息的。

## 变量

[变量](https://en.wikipedia.org/wiki/Variable_(computer_science)) 是数据的“命名存储”。我们可以使用变量来保存商品、访客和其他信息。

在 JavaScript 中创建一个变量，我们需要用到 `let` 关键字。

下面的语句创建（也可以称为 **声明** 或者 **定义**）了一个名称为 “message” 的变量：

```js
let message;
```

现在，我们可以通过赋值运算符 `=` 为变量添加一些数据：

```js
let message;

*!*
message = 'Hello'; // 将字符串 'Hello' 保存在名为 message 的变量中
*/!*
```

现在这个字符串已经保存到与该变量相关联的内存区域了，我们可以通过使用该变量名称访问它：

```js run
let message;
message = 'Hello!';

*!*
alert(message); // 显示变量内容
*/!*
```

简洁一点，我们可以将变量定义和赋值合并成一行：

```js run
let message = 'Hello!'; // 定义变量，并且赋值

alert(message); // Hello!
```

也可以在一行中声明多个变量：

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

看上去代码长度更短，但并不推荐这样。为了更好的可读性，请一行只声明一个变量。

多行变量声明有点长，但更容易阅读：

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

一些程序员采用下面的形式书写多个变量：

```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

……甚至使用“逗号在前”的形式：

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

技术上讲，这些变体都有一样的效果。所以，这是个个人品味和审美方面的问题。

````smart header="`var` 而不是 `let`"
在较老的脚本中，你也可能发现另一个关键字 `var`，而不是 `let`：

```js
*!*var*/!* message = 'Hello';
```

`var` 关键字与 `let` **大体** 相同，也用来声明变量，但稍微有些不同，也有点“老派”。

`let` 和 `var` 之间有些微妙的差别，但目前对于我们来说并不重要。我们将会在 <info:var> 章节中介绍它们。
````

## 一个现实生活的类比

如果将变量想象成一个“数据”的盒子，盒子上有一个唯一的标注盒子名字的贴纸。这样我们能更轻松地掌握“变量”的概念。

例如，变量 `message` 可以被想象成一个标有 `"message"` 的盒子，盒子里面的值为 `"Hello!"`：

![](variable.svg)

我们可以在盒子内放入任何值。

并且，这个盒子的值，我们想改变多少次，就可以改变多少次：

```js run
let message;

message = 'Hello!';

message = 'World!'; // 值改变了

alert(message);
```

当值改变的时候，之前的数据就被从变量中删除了：

![](variable-change.svg)

我们还可以声明两个变量，然后将其中一个变量的数据拷贝到另一个变量。

```js run
let hello = 'Hello world!';

let message;

*!*
// 将字符串 'Hello world' 从变量 hello 拷贝到 message
message = hello;
*/!*

// 现在两个变量保存着相同的数据
alert(hello); // Hello world!
alert(message); // Hello world!
```

````warn header="声明两次会触发 error"
一个变量应该只被声明一次。

对同一个变量进行重复声明会触发 error：

```js run
let message = "This";

// 重复 'let' 会导致 error
let message = "That"; // SyntaxError: 'message' has already been declared
```
因此，我们对同一个变量应该只声明一次，之后在不使用 `let` 的情况下对其进行引用。
````

```smart header="函数式语言"
有趣的是，也存在禁止更改变量值的 [函数式](https://en.wikipedia.org/wiki/Functional_programming) 编程语言。比如 [Scala](http://www.scala-lang.org/) 或 [Erlang](http://www.erlang.org/)。

在这种类型的语言中，一旦值保存在盒子中，就永远存在。如果你试图保存其他值，它会强制创建一个新盒子（声明一个新变量），无法重用之前的变量。

虽然第一次看上去有点奇怪，但是这些语言有很大的发展潜力。不仅如此，在某些领域，比如并行计算，这个限制有一定的好处。研究这样的一门语言（即使不打算很快就用上它）有助于开阔视野。
```

## 变量命名 [#variable-naming]

JavaScript 的变量命名有两个限制：

1. 变量名称必须仅包含字母、数字、符号 `$` 和 `_`。
2. 首字符必须非数字。

有效的命名，例如：

```js
let userName;
let test123;
```

如果命名包括多个单词，通常采用驼峰式命名法（[camelCase](https://en.wikipedia.org/wiki/CamelCase)）。也就是，单词一个接一个，除了第一个单词，其他的每个单词都以大写字母开头：`myVeryLongName`。

有趣的是，美元符号 `'$'` 和下划线 `'_'` 也可以用于变量命名。它们是正常的符号，就跟字母一样，没有任何特殊的含义。

下面的命名是有效的：

```js run untrusted
let $ = 1; // 使用 "$" 声明一个变量
let _ = 2; // 现在用 "_" 声明一个变量

alert($ + _); // 3
```

下面的变量命名不正确：

```js no-beautify
let 1a; // 不能以数字开始

let my-name; // 连字符 '-' 不允许用于变量命名
```

```smart header="区分大小写"
命名为 `apple` 和 `APPLE` 的变量是不同的两个变量。
```

````smart header="允许非英文字母，但不推荐"
可以使用任何语言，包括西里尔字母（cyrillic letters）甚至是象形文字，就像这样：

```js
let имя = '...';
let 我 = '...';
```

从技术上讲，这样没问题。这样的命名是完全允许的，但是用英文进行变量命名是国际惯例。哪怕我们正在写一个很小的脚本，它也有可能会被使用很久。某个时候，来自其他国家的人可能会需要阅读它。
````

````warn header="保留字"
有一张 [保留字列表](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)，这张表中的保留字无法用作变量命名，因为它们被用于编程语言本身了。

比如，`let`、`class`、`return`、`function` 都被保留了。

下面的代码将会抛出一个语法错误：

```js run no-beautify
let let = 5; // 不能用 "let" 来命名一个变量，错误！
let return = 5; // 同样，不能使用 "return"，错误！
```
````

````warn header="未采用 `use strict` 下的赋值"

一般，我们需要在使用一个变量前定义它。但是在早期，我们可以不使用 `let` 进行变量声明，而可以简单地通过赋值来创建一个变量。现在如果我们不在脚本中使用 `use strict` 声明启用严格模式，这仍然可以正常工作，这是为了保持对旧脚本的兼容。

```js run no-strict
// 注意：这个例子中没有 "use strict"

num = 5; // 如果变量 "num" 不存在，就会被创建

alert(num); // 5
```

上面这是个糟糕的做法，严格模式下会报错。

```js run untrusted
"use strict";

*!*
num = 5; // 错误：num 未定义
*/!*
```
````

## 常量

声明一个常数（不变）变量，可以使用 `const` 而非 `let`：

```js
const myBirthday = '18.04.1982';
```

使用 `const` 声明的变量称为“常量”。它们不能被修改，如果你尝试修改就会发现报错：

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // 错误，不能对常量重新赋值
```

当程序员能确定这个变量永远不会改变的时候，就可以使用 `const` 来确保这种行为，并且清楚地向别人传递这一事实。

### 大写形式的常数

一个普遍的做法是将常量用作别名，以便记住那些在执行之前就已知的难以记住的值。

使用大写字母和下划线来命名这些常量。

例如，让我们以所谓的“web”（十六进制）格式为颜色声明常量：

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ……当我们需要选择一个颜色
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

好处：

- `COLOR_ORANGE` 比 `"#FF7F00"` 更容易记忆。
- 比起 `COLOR_ORANGE` 而言，`"#FF7F00"` 更容易输错。
- 阅读代码时，`COLOR_ORANGE` 比 `#FF7F00` 更易懂。

什么时候该为常量使用大写命名，什么时候进行常规命名？让我们弄清楚一点。

作为一个“常数”，意味着值永远不变。但是有些常量在执行之前就已知了（比如红色的十六进制值），还有些在执行期间被“计算”出来，但初始赋值之后就不会改变。

例如：

```js
const pageLoadTime = /* 网页加载所需的时间 */;
```

`pageLoadTime` 的值在页面加载之前是未知的，所以采用常规命名。但是它仍然是个常量，因为赋值之后不会改变。

换句话说，大写命名的常量仅用作“硬编码（hard-coded）”值的别名。

## 正确命名变量

谈到变量，还有一件非常重要的事。

一个变量名应该有一个清晰、明显的含义，对其存储的数据进行描述。

变量命名是编程过程中最重要且最复杂的技能之一。快速地浏览变量的命名就知道代码是一个初学者还是有经验的开发者写的。

在一个实际项目中，大多数的时间都被用来修改和扩展现有的代码库，而不是从头开始写一些完全独立的代码。当一段时间后，我们做完其他事情，重新回到我们的代码，找到命名良好的信息要容易得多。换句话说，变量要有个好名字。

声明变量之前，多花点时间思考它的更好的命名。你会受益良多。

一些可以遵循的规则：

- 使用易读的命名，比如 `userName` 或者 `shoppingCart`。
- 离诸如 `a`、`b`、`c` 这种缩写和短名称远一点，除非你真的知道你在干什么。
- 变量名在能够准确描述变量的同时要足够简洁。不好的例子就是 `data` 和 `value`，这样的名称等于什么都没说。如果能够非常明显地从上下文知道数据和值所表达的含义，这样使用它们也是可以的。
- 脑海中的术语要和团队保持一致。如果网站的访客称为“用户”，则我们采用相关的变量命名，比如 `currentUser` 或者 `newUser`，而不要使用 `currentVisitor` 或者一个 `newManInTown`。

听上去很简单？确实如此，但是在实践中选择一个一目了然的变量名称并非如此简单。大胆试试吧。

```smart header="重用还是新建？"
最后一点，有一些懒惰的程序员，倾向于重用现有的变量，而不是声明一个新的变量。

结果是，这个变量就像是被扔进不同东西盒子，但没有改变它的贴纸。现在里面是什么？谁知道呢。我们需要靠近一点，仔细检查才能知道。

这样的程序员节省了一点变量声明的时间，但却在调试代码的时候损失数十倍时间。

额外声明一个变量绝对是利大于弊的。

现代的 JavaScript 压缩器和浏览器都能够很好地对代码进行优化，所以不会产生性能问题。为不同的值使用不同的变量可以帮助引擎对代码进行优化。
```

## 总结

我们可以使用 `var`、`let` 或 `const` 声明变量来存储数据。

- `let` — 现代的变量声明方式。
- `var` — 老旧的变量声明方式。一般情况下，我们不会再使用它。但是，我们会在 <info:var> 章节介绍 `var` 和 `let` 的微妙差别，以防你需要它们。
- `const` — 类似于 `let`，但是变量的值无法被修改。

变量应当以一种容易理解变量内部是什么的方式进行命名。
