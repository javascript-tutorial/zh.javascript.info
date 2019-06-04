# 现代 JavaScript 教程中文版

这个仓库托管了中文版的现代 JavaScript 教程。该教程发布于 [网站 https://zh.javascript.info](https://zh.javascript.info)。

## 赞助商

<a href="https://coding.net/?utm_source=javascript-tutorial-zh&utm_medium=banner&utm_campaign=march2019" target="_blank"><img src="https://user-images.githubusercontent.com/26959437/56273145-c56aa000-612e-11e9-9137-a1388ef18cf2.png" width="300px;" target="_blank"/></a>

## 翻译

我们希望本教程可以以更多语言呈现。如果你感兴趣，那就快来和我们一起翻译吧。

详见[翻译](https://javascript.info/translate)。

## 贡献指南 

**翻译流程**

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
- `task.md` 对应一个任务 (如果有答案的话还会有 `solution.md` 这个文件)。

每一个文件都以 `# 标题` 开始，然后是类 Markdown 格式的文本。一个简单的文字编辑器就可以编辑该文件。 

文章或任务中需要用到的资源也在同一个文件夹中。

## 翻译提示

请不要添加换行，段落或移除已有的行和段落。这样可以减少 merge 英文版中的新变化时出现的问题。

如果你觉得英文版可以被改善，请给我们发一个 [PR](https://github.com/javascript-tutorial/en.javascript.info/compare)。

### 专有词

- 一些具体的专有词不应被翻译。如”Function Declaration“。
- 对于其他专有词，如 `resolved promise`、`slash` 和 `regexp` 等，请使用一个你的语言中的同义词。如果没有意思足够相近的词，请使用教程（如：[MDN](https://developer.mozilla.org/en-US/)）中的翻译。

### 代码块中的文本

- 翻译注释。
- 翻译展示给用户的信息和用来举例的字符串。
- 不要翻译变量，类等标识符。
- 确保翻译后的代码可以正常运行。 :)

例：

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// 例
const text = '你好，世界';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// 例
const text = '你好，世界';
// ".hello" 是一个类
// 不要翻译
document.querySelector('.你好').innerHTML = text;
```

### 外部链接

如果这个外部链接是指向 Wikipedia 的，如 `https://en.wikipedia.org/wiki/JavaScript`，并且其有质量优良的目标语言的译文，请将链接指向该译文。

例：

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> zh):

```md
[JavaScript](https://zh.wikipedia.org/wiki/JavaScript) 是一种编程语言。
```

对于指向 MDN 的外部链接，可以使用部分翻译的版本。

如果外部链接没有翻译的版本，请不要修改该链接。

### 元数据

一些文件，（这些文件通常是任务），以 YAML 的元数据起始。这些元数据以“---”做分隔：

```md
importance: 5

---
...
```

请不要翻译“importance”（和其他放置在开头的元数据）。

### Anchors

某些标题以 `[#anchor]` 结尾，如：

```md
## 扩散运算符 [#spread-operator]
```

请不要翻译或者去掉 `[#...]` 部分，它是 URL 锚元素所依赖的。 

## 在本地运行

你可以在本地运行本教程的服务端来预览你的翻译。

运行服务端的教程请见 <https://github.com/javascript-tutorial/server>。 

我们希望与大家合作维护本教程。

本教程的贡献者列表请见：<https://zh.javascript.info/about>。

---

💓  
- Levi Ding [@leviding](https://github.com/leviding)
- Ilya Kantor [@iliakan](https://github.com/iliakan)
