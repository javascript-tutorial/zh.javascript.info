# 变量

<<<<<<< HEAD
大多数情况下，JavaScript 应用需要处理信息。这有两个例子：
1. 一个网上商店 —— 这里的信息可能包含正在售卖的商品和购物车。
2. 一个聊天应用 —— 这里的信息可能包括用户和消息等等。
=======
Most of the time, a JavaScript application needs to work with information. Here are two examples:
1. An online shop -- the information might include goods being sold and a shopping cart.
2. A chat application -- the information might include users, messages, and much more.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

变量就是用来储存这些信息的。

## 变量

<<<<<<< HEAD
[变量](https://en.wikipedia.org/wiki/Variable_(computer_science)) 是数据的“命名存储”。我们可以使用变量来保存商品、访客和其他信息。

在 JavaScript 中创建一个变量，我们需要用到 `let` 关键字。

下面的语句创建（也可以称为 **声明** 或者 **定义**）了一个名称为 “message” 的变量：
=======
A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the `let` keyword.

The statement below creates (in other words: *declares*) a variable with the name "message":
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
let message;
```

<<<<<<< HEAD
现在，我们可以通过赋值运算符 `=` 为变量添加一些数据：
=======
Now, we can put some data into it by using the assignment operator `=`:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
let message;

*!*
message = 'Hello'; // 保存字符串
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

<<<<<<< HEAD
简洁一点，我们可以将变量定义和赋值合并成一行：
=======
To be concise, we can combine the variable declaration and assignment into a single line:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let message = 'Hello!'; // 定义变量，并且赋值

alert(message); // Hello!
```

也可以在一行中声明多个变量：

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

<<<<<<< HEAD
看上去代码长度更短，但并不推荐这样。为了更好的可读性，请一行只声明一个变量。
=======
That might seem shorter, but we don't recommend it. For the sake of better readability, please use a single line per variable.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

多行变量声明有点长，但更容易阅读：

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<<<<<<< HEAD
一些程序员采用下面的形式书写多个变量：
=======
Some people also define multiple variables in this multiline style:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
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

<<<<<<< HEAD
技术上讲，这些变体都有一样的效果。所以，这是个个人品味和审美方面的问题。


````smart header="`var` 而不是 `let`"
在较旧的脚本中，你也可能发现另一个关键字 `var`，而不是 `let`：
=======
Technically, all these variants do the same thing. So, it's a matter of personal taste and aesthetics.

````smart header="`var` instead of `let`"
In older scripts, you may also find another keyword: `var` instead of `let`:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
*!*var*/!* message = 'Hello';
```

<<<<<<< HEAD
`var` 关键字与 `let` **大体** 相同，也用来声明变量，但稍微有些不同，也有点“老派”。

`let` 和 `var` 之间有些微妙的差别，但目前对于我们来说并不重要。我们将会在 <info:var> 章节中介绍它们。
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable, but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter for us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
````

## 一个现实生活的类比

如果将变量想象成一个“数据”的盒子，盒子上有一个唯一的标注盒子名字的贴纸。这样我们能更轻松地掌握“变量”的概念。

例如，变量 `message` 可以被想象成一个标有 `"message"` 的盒子，盒子里面的值为 `"Hello!"`：

![](variable.svg)

<<<<<<< HEAD
我们可以在盒子内放入任何值。

并且，这个盒子的值，我们想改变多少次，就可以改变多少次：
=======
We can put any value in the box.

We can also change it as many times as we want:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
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

<<<<<<< HEAD
```smart header="函数式语言"
有趣的是，也存在禁止更改变量值的 [函数式](https://en.wikipedia.org/wiki/Functional_programming) 编程语言。比如 [Scala](http://www.scala-lang.org/) 或 [Erlang](http://www.erlang.org/)。
=======
````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
It's interesting to note that there exist [functional](https://en.wikipedia.org/wiki/Functional_programming) programming languages, like [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/) that forbid changing variable values.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

在这种类型的语言中，一旦值保存在盒子中，就永远存在。如果你试图保存其他值，它会强制创建一个新盒子（声明一个新变量），无法重用之前的变量。

<<<<<<< HEAD
虽然第一次看上去有点奇怪，但是这些语言有很大的发展潜力。不仅如此，在某些领域，比如并行计算，这个限制有一定的好处。研究这样的一门语言（即使不打算很快就用上它）有助于开阔视野。
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits. Studying such a language (even if you're not planning to use it soon) is recommended to broaden the mind.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
```

## 变量命名 [#variable-naming]

<<<<<<< HEAD
JavaScript 的变量命名有两个限制：

1. 变量名称必须仅包含字母，数字，符号 `$` 和 `_`。
2. 首字符必须非数字。

有效的命名，例如：
=======
There are two limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
let userName;
let test123;
```

<<<<<<< HEAD
如果命名包括多个单词，通常采用驼峰式命名法（[camelCase](https://en.wikipedia.org/wiki/CamelCase)）。也就是，单词一个接一个，除了第一个单词，其他的每个单词都以大写字母开头：`myVeryLongName`。
=======
When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word except first starting with a capital letter: `myVeryLongName`.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

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

<<<<<<< HEAD
let my-name; // 连字符 '-' 不允许用于变量命名
```

```smart header="区分大小写"
命名为 `apple` 和 `AppLE` 的变量是不同的两个变量。
```

````smart header="允许非英文字母，但不推荐"
可以使用任何语言，包括西里尔字母（cyrillic letters）甚至是象形文字，就像这样：
=======
let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `AppLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including cyrillic letters or even hieroglyphs, like this:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
技术上讲，完全没有错误，这样的命名是完全允许的，但是用英文进行变量命名是国际传统。哪怕我们正在写一个很小的脚本，它也有可能有很长的生命周期。某个时候，来自其他国家的人可能会阅读它。
````

````warn header="保留字"
有一张 [保留字列表](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)，这张表中的保留字无法用作变量命名，因为它们被用于编程语言本身了。

比如，`let`、`class`、`return`、`function` 都被保留了。
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it some time.
````

````warn header="Reserved names"
There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

下面的代码将会抛出一个语法错误：

```js run no-beautify
let let = 5; // 不能用 "let" 来命名一个变量，错误！
let return = 5; // 同样，不能使用 "return"，错误！
```
````

````warn header="未采用 `use strict` 下的赋值"

<<<<<<< HEAD
一般，我们需要在使用一个变量前定义它。但是在早期，我们可以不使用 `let` 进行变量声明，而可以简单地通过赋值来创建一个变量。现在如果我们不在脚本中使用 `use strict` 声明启用严格模式，这仍然可以正常工作，这是为了保持对旧脚本的兼容。
=======
Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using `let`. This still works now if we don't put `use strict` in our scripts to maintain compatibility with old scripts.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run no-strict
// 注意：这个例子中没有 "use strict"

<<<<<<< HEAD
num = 5; // 如果变量 "num" 不存在，就会被创建
=======
num = 5; // the variable "num" is created if it didn't exist
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

alert(num); // 5
```

<<<<<<< HEAD
上面这是个糟糕的做法，严格模式下会报错。
=======
This is a bad practice and would cause an error in strict mode:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
"use strict";

*!*
num = 5; // 错误：num 未定义
*/!*
```
````

## 常量

<<<<<<< HEAD
声明一个常数（不变）变量，可以使用 `const` 而非 `let`：
=======
To declare a constant (unchanging) variable, use `const` instead of `let`:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
const myBirthday = '18.04.1982';
```

<<<<<<< HEAD
使用 `const` 声明的变量称为“常量”。它们不能被修改，如果你尝试修改就会发现报错：
=======
Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // 错误，不能对常量重新赋值
```

<<<<<<< HEAD
当程序员能确定这个变量永远不会改变的时候，就可以使用 `const` 来确保这种行为，并且清楚地向别人传递这一事实。
=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and clearly communicate that fact to everyone.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8


### 大写形式的常数

一个普遍的做法是将常量用作别名，以便记住那些在执行之前就已知的难以记住的值。

使用大写字母和下划线来命名这些常量。

<<<<<<< HEAD
例如，让我们以所谓的“web”（十六进制）格式为颜色声明常量：
=======
For instance, let's make constants for colors in so-called "web" (hexadecimal) format:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

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

<<<<<<< HEAD
- `COLOR_ORANGE` 比 `"#FF7F00"` 更容易记忆。
- 比起 `COLOR_ORANGE` 而言，`"#FF7F00"` 更容易输错。
- 阅读代码时，`COLOR_ORANGE` 比 `#FF7F00` 更易懂。

什么时候该为常量使用大写命名，什么时候进行常规命名？让我们弄清楚一点。

作为一个“常数”，意味着值永远不变。但是有些常量在执行之前就已知了（比如红色的十六进制值），还有些在执行期间被“计算”出来，但初始赋值之后就不会改变。
=======
- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

例如：
```js
const pageLoadTime = /* 网页加载所需的时间 */;
```

<<<<<<< HEAD
`pageLoadTime` 的值在页面加载之前是未知的，所以采用常规命名。但是它仍然是个常量，因为赋值之后不会改变。
=======
The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant because it doesn't change after assignment.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

换句话说，大写命名的常量仅用作“硬编码（hard-coded）”值的别名。

## 正确命名变量

谈到变量，还有一件非常重要的事。

<<<<<<< HEAD
一个变量名应该有一个清晰、明显的含义，对其存储的数据进行描述。

变量命名是编程过程中最重要且最复杂的技能之一。快速地浏览变量的命名就知道代码是一个初学者还是有经验的开发者写的。

在一个实际项目中，大多数的时间都被用来修改和扩展现有的代码库，而不是从头开始写一些完全独立的代码。当一段时间后，我们做完其他事情，重新回到我们的代码，找到命名良好的信息要容易得多。换句话说，变量要有个好名字。

声明变量之前，多花点时间思考它的更好的命名。你会受益良多。
=======
A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

一些可以遵循的规则：

<<<<<<< HEAD
- 使用易读的命名，比如 `userName` 或者 `shoppingCart`。
- 离诸如 `a`、`b`、`c` 这种缩写和短名称远一点，除非你真的知道你在干什么。
- 变量名在能够准确描述变量的同时要足够简洁。不好的例子就是 `data` 和 `value`，这样的名称等于什么都没说。如果能够非常明显地从上下文知道数据和值所表达的含义，这样使用它们也是可以的。
- 脑海中的术语要和团队保持一致。如果网站的访客称为“用户”，则我们采用相关的变量命名，比如 `currentUser` 或者 `newUser`，而不要使用 `currentVisitor` 或者一个 `newManInTown`。

听上去很简单？确实如此，但是在实践中选择一个一目了然的变量名称并非如此简单。大胆试试吧。

```smart header="重用还是新建？"
最后一点，有一些懒惰的程序员，倾向于重用现有的变量，而不是声明一个新的变量。

结果是，这个变量就像是被扔进不同东西盒子，但没有改变它的贴纸。现在里面是什么？谁知道呢。我们需要靠近一点，仔细检查才能知道。

这样的程序员节省了一点变量声明的时间，但却在调试代码的时候损失数十倍时间。
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

额外声明一个变量绝对是利大于弊的。

<<<<<<< HEAD
现代的 JavaScript 压缩器和浏览器都很够很好地对代码进行优化，所以不会产生性能问题。为不同的值使用不同的变量可以帮助引擎对代码进行优化。
=======
Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
```

## 总结

<<<<<<< HEAD
我们可以使用 `var`、`let` 或 `const` 声明变量来存储数据。

- `let` — 现代的变量声明方式。
- `var` — 老旧的变量声明方式。一般情况下，我们不会再使用它。但是，我们会在 <info:var> 章节介绍 `var` 和 `let` 的微妙差别，以防你需要它们。
- `const` — 类似于 `let`，但是变量的值无法被修改。

变量应当以一种容易理解变量内部是什么的方式进行命名。
=======
We can declare variables to store data by using the `var`, `let`, or `const` keywords.

- `let` -- is a modern variable declaration.
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.

Variables should be named in a way that allows us to easily understand what's inside them.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
