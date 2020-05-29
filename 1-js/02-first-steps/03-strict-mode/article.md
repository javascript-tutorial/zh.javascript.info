# 现代模式，"use strict"

<<<<<<< HEAD
长久以来，JavaScript 不断向前发展且并未带来任何兼容性问题。新的特性被加入，旧的功能也没有改变。

这么做有利于兼容旧代码，但缺点是 JavaScript 创造者的任何错误或不完善的决定也将永远被保留在 JavaScript 语言中。

这种情况一直持续到 2009 年 ECMAScript 5 (ES5) 的出现。ES5 规范增加了新的语言特性并且修改了一些已经存在的特性。为了保证旧的功能能够使用，大部分的修改是默认不生效的。你需要一个特殊的指令 —— `"use strict"` 来明确地激活这些特性。

## "use strict"

这个指令看上去像一个字符串 `"use strict"` 或者 `'use strict'`。当它处于脚本文件的顶部时，则整个脚本文件都将以“现代”模式进行工作。

比如：
=======
For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn't change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript's creators got stuck in the language forever.

This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.

## "use strict"

The directive looks like a string: `"use strict"` or `'use strict'`. When it is located at the top of a script, the whole script works the "modern" way.

For example:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
"use strict";

// 代码以现代模式工作
...
```

<<<<<<< HEAD
稍后我们才会学习函数（一种组合命令的方式）。

但我们可以提前了解一下，`"use strict"` 可以被放在函数主体的开头，而不是整个脚本的开头。这样则可以只在该函数中启用严格模式。但通常人们会在整个脚本中启用严格模式。

````warn header="确保 \"use strict\" 出现在最顶部"
请确保 `"use strict"` 出现在脚本的最顶部，否则严格模式可能无法启用。

这里的严格模式就没有被启用：

```js no-strict
alert("some code");
// 下面的 "use strict" 会被忽略，必须在最顶部。
=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.

````warn header="Ensure that \"use strict\" is at the top"
Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn't enabled here:

```js no-strict
alert("some code");
// "use strict" below is ignored--it must be at the top
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

"use strict";

// 严格模式没有被激活
```

只有注释可以出现在 `"use strict"` 的上面。
````

<<<<<<< HEAD
```warn header="没有办法取消 `use strict`"
没有类似于 `"no use strict"` 这样的指令可以使程序返回默认模式。

一旦进入了严格模式，就没有回头路了。
```

## 浏览器控制台

以后，当你使用浏览器控制台去测试功能时，请注意 `use strict` 默认不会被启动。

有时，使用 `use strict` 会产生一些不一样的影响，你会得到错误的结果。

你可以试试按下 `key:Shift+Enter` 去输入多行代码，然后将 `use strict` 置顶，就像这样：

```js
'use strict'; <Shift+Enter 换行>
//  ...你的代码
<按下 Enter 以运行>
```

它在大部分浏览器中都有效，像 Firefox 和 Chrome。

如果依然不行，那确保 `use strict` 被开启的最可靠的方法是，像这样将代码输入到控制台：

```js
(function() {
  'use strict';

  // ...你的代码...
})()
```

## 总是使用 "use strict"

我们还没说到使用 `"use strict"` 与“默认”模式的区别。

在接下来的章节中，当我们学习语言功能时，我们会标注严格模式与默认模式的差异。幸运的是，差异其实没有那么多。并且这些差异可以让我们更好地编程。

当前，一般来说了解这些就够了：

1. `"use strict"` 指令将浏览器引擎转换为“现代”模式，改变一些内建特性的行为。我们会在之后的学习中了解这些细节。
2. 严格模式通过将 `"use strict"` 放置在整个脚本或函数的顶部来启用。一些新语言特性诸如 "classes" 和 "modules" 也会自动开启严格模式。
3. 所有的现代浏览器都支持严格模式。
4. 我们建议始终使用 `"use strict"` 启动脚本。本教程的所有例子都默认采用严格模式，除非特别指定（非常少）。
=======
```warn header="There's no way to cancel `use strict`"
There is no directive like `"no use strict"` that reverts the engine to old behavior.

Once we enter strict mode, there's no going back.
```

## Browser console

When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.

Sometimes, when `use strict` makes a difference, you'll get incorrect results.

So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

It works in most browsers, namely Firefox and Chrome.

If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:

```js
(function() {
  'use strict';

  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
