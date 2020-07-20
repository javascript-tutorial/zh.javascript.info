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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
"use strict";

// 代码以现代模式工作
...
```

<<<<<<< HEAD
很快我们就会学习到函数（一种组合命令的方式），所以让我们提前注意一下，`"use strict"` 可以被放在函数体的开头。这样则可以只在该函数中启用严格模式。但通常人们会在整个脚本中启用严格模式。

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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

当你使用 [开发者控制台](info:devtools) 运行代码时，请注意它默认是不启动 `use strict` 的。

有时，当 `use strict` 会对代码产生一些影响时，你会得到错误的结果。

那么，怎么在控制台中启用 `use strict` 呢？

首先，你可以尝试搭配使用 `key:Shift+Enter` 按键去输入多行代码，然后将 `use strict` 放在代码最顶部，就像这样：

```js
'use strict'; <Shift+Enter 换行>
//  ...你的代码
<按下 Enter 以运行>
```

它在大部分浏览器中都有效，像 Firefox 和 Chrome。

如果依然不行，例如你使用的是旧版本的浏览器，那么有一种很丑但可靠的启用 `use strict` 的方法。将你的代码放在这样的包装器中：
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...你的代码...
})()
```

## 我们应该使用 "use strict" 吗？

这个问题的答案好像很显而易见，但事实并非如此。

有人可能会建议在脚本的最顶部放置 `"use strict"` 这行代码…… 但你知道更酷的方式吗？

现代 JavaScript 支持 "classes" 和 "modules" —— 高级语言结构（本教程后续章节会讲到），它们会自动启用 `use strict`。因此，如果我们使用它们，则无需添加 `"use strict"` 指令。

**因此，目前我们欢迎将 `"use strict";` 写在脚本的顶部。稍后，当你的代码全都写在了 class 和 module 中时，你则可以将 `"use strict";` 这行代码省略掉。

目前，我们已经基本了解了 `use strict`。

在接下来的章节中，当我们学习语言功能时，我们会看到严格模式与旧的模式之间的差异。幸运的是，差异其实没有那么多。并且，这些差异实际上提升了我们的编程体验。

本教程的所有例子都默认采用严格模式，除非特别指定（非常少）。
=======
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
