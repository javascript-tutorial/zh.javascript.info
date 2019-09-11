# 现代 JavaScript 教程中文版

[![Gitter](https://badges.gitter.im/zh-javascript-info/community.svg)](https://gitter.im/zh-javascript-info/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Telegram](https://img.shields.io/badge/chat-Telegram-blue.svg)](https://t.me/TheModernJavaScriptTutorial)

| 微信扫码关注官方公众号 |
|-|
| <img src="https://user-images.githubusercontent.com/26959437/64488661-0e0d2c00-d27d-11e9-82cd-751f65346617.jpg" width="500px;" /> |

**加入读者交流群：**

- **微信群**：加微信 **`imleviding`** 或 [扫二维码](https://user-images.githubusercontent.com/26959437/64596211-0fa63380-d3e6-11e9-983d-bd788ffe2370.jpg)，验证信息填写 **`JS 教程`**。
- **QQ 群**：打开 QQ 搜索群号 **`576578767`** 或 [扫二维码](https://user-images.githubusercontent.com/26959437/64609229-12f9e900-d3ff-11e9-96e8-147335f5e264.jpg)，验证信息填写 **`JS 教程`**。

这个仓库托管了中文版的现代 JavaScript 教程。该教程发布于 [网站 https://zh.javascript.info](https://zh.javascript.info)。


<!--

## 赞助商

<a href="https://coding.net/?utm_source=javascript-tutorial-zh&utm_medium=banner&utm_campaign=march2019" target="_blank"><img src="https://user-images.githubusercontent.com/26959437/56273145-c56aa000-612e-11e9-9137-a1388ef18cf2.png" width="300px;" target="_blank"/></a>

-->


## 目录

- [翻译](#翻译)
- [贡献指南](#贡献指南)
- [文件结构](#文件结构)
- [翻译提示](#翻译提示)
  - [专有词条](#专有词条)
  - [词条含义](#词条含义)
  - [标点符号](#标点符号)
  - [代码块中的文本](#代码块中的文本)
  - [外部链接](#外部链接)
  - [诠释资料](#诠释资料)
  - [Anchors](#Anchors)
- [在本地运行](#在本地运行)


## 翻译

我们希望本教程可以以更多语言呈现。如果你感兴趣，那就快来和我们一起翻译吧。

详见[翻译](https://javascript.info/translate)。


## 贡献指南 

**翻译流程：**

- 检查[中文翻译进度 issue (Chinese Translate Progress issue)](https://github.com/javascript-tutorial/zh.javascript.info/issues/324)。
- 选择一篇还没有被选走（在[列表](https://github.com/javascript-tutorial/zh.javascript.info/issues/324#issue-433691990)中被人勾选）的文章。
- 在[该 issue](https://github.com/javascript-tutorial/zh.javascript.info/issues/324) 中添加以文章标题为内容的评论，如 `An Introduction to JavaScript`。
    - 我们的 bot 会在[列表](https://github.com/javascript-tutorial/zh.javascript.info/issues/324#issue-433691990)中勾选上对应的文章，这样其他人就知道你正在翻译该文章了。
    - 不要在该评论中添加其他说明。
- Fork 此仓库并开始翻译。完成翻译后，请提交一个 PR。
    - PR 应以文章标题命名。Bot 会添加更多信息。

请给维护者时间来审核和 merge 你的翻译，或者提出对应的修改意见。
   
如果维护者没能回复，或者你想成为一个维护者，请在[主仓库给我们提新 issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new)。
    
**如果你愿意的话，请让其他人知道你在翻译这个教程，并尝试邀请他们参与翻译。你可以通过微博或群聊来号召。**

🎉 非常感谢！

翻译版本上线后，我们会在“[关于本项目](https://zh.javascript.info/about)”页面写上你的名字和贡献。

注：<https://javascript.info/translate> 列出了完整的语言列表。


## 文件结构

每一个章节或任务都在它自己的文件夹里。

这个文件夹以 `N=url` 命名。`N` 为文章序号（文章遵循一定的顺序），`url` 是该网站上对应教程的净链接。

这个文件夹含有以下一种文件：

- `index.md` 对应一个章节，
- `article.md` 对应一个文章，
- `task.md` 对应一个任务（如果有答案的话还会有 `solution.md` 这个文件）。

每一个文件都以 `# 标题` 开始，然后是类 Markdown 格式的文本。一个简单的文字编辑器就可以编辑该文件。 

文章或任务中需要用到的资源也在同一个文件夹中。


## 翻译提示

请不要添加换行，段落或移除已有的行和段落。这样可以减少 merge 英文版中的新变化时出现的问题。

如果你觉得英文版可以被改善 —— 欢迎，请给[英文版教程发 PR](https://github.com/javascript-tutorial/en.javascript.info/compare)。


### 专有词条

- 一些具体的专有词不应被翻译。如 “Function Declaration”。
- 对于其他专有词，如 `resolved promise`、`slash` 和 `regexp` 等等，请先找找本 Repository Wiki 內的[「英文－中文」用语对照表](https://github.com/javascript-tutorial/zh.javascript.info/wiki/%E3%80%8C%E8%8B%B1%E6%96%87%EF%BC%8D%E4%B8%AD%E6%96%87%E3%80%8D%E6%9C%AF%E8%AF%AD%E5%AF%B9%E7%85%A7%E8%A1%A8)中是否已有对应的词条。
  - 若沒有对应或近似的近似，则可以寻找其他教程（如：[MDN](https://developer.mozilla.org/en-US/)）的翻译。

**补充：**

- 专有词条翻译完，在其后方以括号加英文的方式补上原词条，例如：同源政策（Same Origin Policy）或转义（transpile），等等。
    - 若一篇文章出現两次以上相同专有词条，则在第一次之后补上原词条即可。
- 若都无法找到对应的词条翻译，请直接留下原文词条。


### 词条含义

在英文中很多词条有明确的含义在內，但对于一个不了解英文的人来说，会忽略该含义。

请谨记有必要时可以多加解释或增加额外的翻译，例如：

```md
`ReadableStream` objects allows to read data chunk-by-chunk.
```

```md
`ReadableStream` objects 允許一个个资料块（chunk）地读取资料。
```


### 标点符号

- 本教程标点符号格式采用 [此份指南](https://github.com/sparanoid/chinese-copywriting-guidelines)。
- 资料链接、**增強**，都須 [留下空白](https://github.com/sparanoid/chinese-copywriting-guidelines#%E9%8F%88%E6%8E%A5%E4%B9%8B%E9%96%93%E5%A2%9E%E5%8A%A0%E7%A9%BA%E6%A0%BC)。
- 中文无斜体形式，英文的斜体翻译至中文改为 **加粗**。

- 斜线号 `/` 较为特殊，若用于分隔两同类型词条时，请维持半形斜线且两侧不加空白，**但在词汇们整体的前后要留一空白做分隔：**
    - `Increment/decrement can only be applied to variables.`：`递增/递减 只能被套用在变量上。`
    - `If the result of increment/decrement is not used, ...`：`如果 递增/递减 的結果没被使用，...`

- 语一句话只能有一个逗号，但中文无此限制，可依据语气通顺程度将一些英文句点转为逗号。

- 列举项目后的文字需加句号。<- 像这样


### 代码块中的文本

- 翻译注释。
- 翻译展示给用户的信息和用来举例的字符串。
- 不要翻译变量（variables）、类（classes）和标识符（identifiers）。
- 确保翻译后的代码可以正常运行。 :)

例：

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ 请这样翻译（翻译注解）：

```js
// 范例
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

❌ 別翻译成（不要翻译类）：

```js
// 范例
const text = 'Hello, world';
// ".hello" 是一个类
// 不要翻译
document.querySelector('.你好').innerHTML = text;
```


### 外部链接

**本翻译教程以维持原本外部连结为原则。**

但如果这个外部链接是指向 Wikipedia 的，如 `https://en.wikipedia.org/wiki/JavaScript`，并且其有质量优良的目标语言的译文，请将链接指向该译文。

例如：

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> zh):

```md
[JavaScript](https://zh.wikipedia.org/wiki/JavaScript) 是一种编程语言。
```

对于指向 MDN 的外部链接，可以使用部分翻译的版本。

如果外部链接没有翻译的版本，请不要修改该链接。


### 诠释资料

一些文件，通常是练习题，顶部会有 YAML 的诠释资料（Metadata）并以 `---` 分隔：

```md
importance: 5

---
...
```

请不要翻译 “importance”（和其他放置在顶端的诠释资料）。

### Anchors

某些标题以 `[#anchor]` 结尾，如：

```md
## 扩散运算符 [#spread-operator]
```

请不要翻译或者去掉 `[#...]` 部分，它是 URL 锚点元素的依赖。 


## 在本地运行

你可以在本地运行本教程的服务端来预览你的翻译。

运行服务端的教程请见 <https://github.com/javascript-tutorial/server>。 

我们希望与大家合作维护本教程。本教程的贡献者列表请见：<https://zh.javascript.info/about>。

---

本中文版教程的维护者们 🚀

- LeviDing [@leviding](https://github.com/leviding)
- LycheeEng [@lycheeEng](https://github.com/lycheeEng)
- Martin [@MartinsYong](https://github.com/MartinsYong)
