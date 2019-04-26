# 代码结构

<<<<<<< HEAD
第一件需要学习的事情就是构建代码块。
=======
The first thing we'll study is the building blocks of code.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## 语句

语句是执行操作的语法结构和命令。

<<<<<<< HEAD
我们已经见过语句 `alert('Hello, world!')`，可以用来显示消息。

我们可以在代码中编写任意数量的语句。语句之间可以使用分号分割。

例如，我们将 Hello World 这条信息一分为二：
=======
We've already seen a statement, `alert('Hello, world!')`, which shows the message "Hello, world!".

We can have as many statements in our code as we want. Statements can be separated with a semicolon.

For example, here we split "Hello World" into two alerts:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run no-beautify
alert('Hello'); alert('World');
```

<<<<<<< HEAD
通常，每条语句在单独的一行书写 —— 这会提高代码的可读性。
=======
Usually, statements are written on separate lines to make the code more readable:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run no-beautify
alert('Hello');
alert('World');
```

## 分号 [#semicolon]

多数情况下，当一个分行符（line break）存在时，分号可以省略。

下面的代码也是可以的:

```js run no-beautify
alert('Hello')
alert('World')
```

<<<<<<< HEAD
此处，JavaScript 将分行符解释成“隐式”的分号。这也被称为[自动分号插入](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)。

**多数情况下，换行意味着一个分号。但是“多数情况”并不意味着“总是”！**

有很多换行并不是分号的例子，比如：
=======
Here, JavaScript interprets the line break as an "implicit" semicolon. This is called an [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In most cases, a newline implies a semicolon. But "in most cases" does not mean "always"!**

There are cases when a newline does not mean a semicolon. For example:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run no-beautify
alert(3 +
1
+ 2);
```

<<<<<<< HEAD
代码输出 `6`，因为 JavaScript 并没有在这里插入分号。 显而易见的是，如果一行以加号 `"+"` 结尾，那么这是一个“不完整的表达式”，不需要分号。所以，这个例子得到了预期的结果。
=======
The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so the semicolon is not required. And in this case that works as intended.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

**但存在 JavaScript 无法假设分号是否真正被需要的情况。**

这种情况下发生的错误是很难被找到和解决的。

````smart header="一个错误的例子"
如果你好奇于这种错误的一个具体的例子，看下面这段代码：

```js run
[1, 2].forEach(alert)
```

<<<<<<< HEAD
不需要考虑方括号 `[]` 和 `forEach` 的含义，我们接下来会学习它们，现在它们并不重要。让我们记住最终结果：先显示 `1`，然后显示 `2`。

现在我们在代码前面加入一个 `alert`，并且不用分号结束它。
=======
No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of the code: it shows `1` then `2`.

Now, let's add an `alert` before the code and *not* finish it with a semicolon:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run no-beautify
alert("There will be an error")

[1, 2].forEach(alert)
```

<<<<<<< HEAD
现在，如果我们运行代码，仅仅第一个 `alert` 显示了文本，接着我们收到了一个错误！
=======
Now if we run the code, only the first `alert` is shown and then we have an error!
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

但是，如果我们在第一个 `alert` 后加入一个分号，就工作正常了：
```js run
alert("All fine now");

[1, 2].forEach(alert)
```

<<<<<<< HEAD
现在，我们能得到 "All fine now" ，然后是 `1` 和 `2`。


出现无分号变量的错误，是因为 JavaScript 并不在方括号 `[...]` 前添加一个隐式的分号。

所以，因为分号并不会自动插入，第一个例子被视为一条简单的语句，我们从引擎看到的是这样子的：
=======
Now we have the "All fine now" message followed by `1` and `2`.


The error in the no-semicolon variant occurs because JavaScript does not assume a semicolon before square brackets `[...]`.

So, because the semicolon is not auto-inserted, the code in the first example is treated as a single statement. Here's how the engine sees it:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

<<<<<<< HEAD
但它应该是两条语句，而不是一条。这种情况下的合并是不对的，所以才会造成错误。诸如此类，还有很多。
````

如果语句被换行分割，非常建议在语句之间添加分号。这个规则被社区广泛采纳。让我们再次强调 —— 大部分时候可以省略分号，但是最好是，尤其对于新手，加上它。
=======
But it should be two separate statements, not one. Such a merging in this case is just wrong, hence the error. This can happen in other situations.
````

We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let's note once again -- *it is possible* to leave out semicolons most of the time. But it's safer -- especially for a beginner -- to use them.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## 注释

<<<<<<< HEAD
随着时间推移，程序变得越来越复杂。为代码添加**注释**来描述发生了什么（What happens）和为什么（Why），变得非常有必要了。

注释可以在脚本的任何地方添加，它们并不会影响代码的执行，因为引擎会简单地忽略它们。
=======
As time goes on, programs become more and more complex. It becomes necessary to add *comments* which describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

**单行注释以两个正斜杠字符 `//` 开始。**

这一行的剩余部分是注释。它可能占据它所拥有的整行或者跟随在一条语句的后面。

就像这样：
```js run
// 这行注释占据所拥有的整行
alert('Hello');

alert('World'); // 这行注释跟随在语句后面
```

**多行注释以一个正斜杠和星号开始 <code>"/&#42;"</code> 并以一个星号和正斜杆结束 <code>"&#42;/"</code>。**

就像这样:

```js run
/* 两个消息的例子。
这是一个多行注释。
*/
alert('Hello');
alert('World');
```

<<<<<<< HEAD
注释的内容被忽略了，所以如果我们在 <code>/&#42; ... &#42;/</code> 中放入代码，并不会执行。

有时候，可以很方便地临时禁用代码：
=======
The content of comments is ignored, so if we put code inside <code>/&#42; ... &#42;/</code>, it won't execute.

Sometimes it can be handy to temporarily disable a part of code:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
/* 注释代码
alert('Hello');
*/
alert('World');
```

<<<<<<< HEAD
```smart header="使用热键！"
在大多数的编辑器中，一行代码可以使用 `key:Ctrl+/` 热键进行单行注释，诸如 `key:Ctrl+Shift+/` 的热键可以进行多行注释（选择代码，然后按下热键）。对于 Mac 电脑，应使用 `key:Cmd` 而不是 `key:Ctrl`。
=======
```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
```

````warn header="不支持注释嵌套！"
没有 `/*...*/` 内嵌套另一个 `/*...*/`。

下面这段代码因为错误而无法执行：

```js run no-beautify
/*
  /* 嵌套注释 ?!? */
*/
alert( 'World' );
```
````

注释你的代码，请不要有任何迟疑。

<<<<<<< HEAD
注释会增加代码总量，但这一点也不是问题。有很多工具可以在你部署到服务器之前缩减代码。这些工具会移除注释，所以注释不会出现在发布的脚本中。所以，注释对我们的生产没有任何负面影响。

在进一步的教程中，会有一章 <info:coding-style> 的内容解释如何书写更好的注释。
=======
Comments increase the overall code footprint, but that's not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don't appear in the working scripts. Therefore, comments do not have negative effects on production at all.

Later in the tutorial there will be a chapter <info:code-quality> that also explains how to write better comments.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
