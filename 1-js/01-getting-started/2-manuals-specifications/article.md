
# 手册与规范

这本书是一个**教程**。它旨在帮助你逐渐掌握 JavaScript 这门语言。但是一旦你已经熟悉了这门语言的基础知识，你就会需要其他资料。

## 规范

**ECMA-262 规范**包含了大部分深入的、详细的、规范化的关于 JavaScript 的信息。这份规范明确地定义了这门语言。

但正因其规范化，对于新手来说难以理解。所以如果你需要知道关于这门语言细节最权威的信息来源，这份规范就很适合你（去阅读）。但是它并不适合日常使用。

最新的规范草案在此 <https://tc39.es/ecma262/>。

想要知道最新最前沿且将近要“标准化”的功能，请看这里的提案 <https://github.com/tc39/proposals>。

当然，如果你正在做浏览器相关的开发工作，那么本教程的 [第二节](info:browser-environment) 涵盖了其他规范。

## 手册

- **MDN（Mozilla）JavaScript 索引**是一本带有用例和其他信息的手册。它是一个获取关于个别语言函数、方法等深入信息的很好的来源。

    你可以在 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference> 找到这本手册。

    虽然，通常利用互联网搜索是最好的选择。只需在查询时输入“MDN [关键字]”，例如 <https://google.com/search?q=MDN+parseInt> 搜索 `parseInt` 函数。

- **MSDN** —— 一本微软的手册，它包含大量的信息，包括 JavaScript（在里面经常被写成 JScript）。如果有人需要关于 Internet Explorer 的规范细节，最好去看：<http://msdn.microsoft.com/>。

    我们还可以在使用互联网搜索时使用如 “RegExp MSDN” 或 “RegExp MSDN jscript” 这样的词条。

## 兼容性表

JavaScript 还是一门还在发展中的语言，经常会添加一些新的功能。

如果想要获得一些关于浏览器和其他引擎的兼容性信息，请看：

- <http://caniuse.com> —— 每个功能都列有一个支持信息表格，例如想看哪个引擎支持现代加密（cryptography）函数：<http://caniuse.com/#feat=cryptography>。
- <https://kangax.github.io/compat-table> —— 一份列有语言功能以及引擎是否支持这些功能的表格。

所有这些资源在实际开发中都有用武之地，因为他们包含了语言细节以及它们被支持的程度等非常有价值的信息。

为了不要让你在真正需要深入了解特定功能的时候捉襟见肘，请记住它们（或者这一页）。
