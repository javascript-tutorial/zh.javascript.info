<<<<<<< HEAD

# JavaScript教程
=======
# The JavaScript Tutorial
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

这个仓库托管现代 JavaScript 教程的内容，发布于 [https://javascript.info](https://javascript.info)。

## 译文

<<<<<<< HEAD
已发布：
- 俄语版：[https://github.com/iliakan/javascript-tutorial-ru](https://github.com/iliakan/javascript-tutorial-ru).

进行中：
- 中文版：在 [https://github.com/xitu/javascript-tutorial-zh](https://github.com/xitu/javascript-tutorial-zh) 进行翻译，如果你懂中文，欢迎加入。
- 西班牙语版：https://github.com/lmauromb/javascript-tutorial-es
- 德语版：https://github.com/MartinEls/javascript-tutorial-de

如果你想将它翻译至你使用的语言的话，就 fork 英文版教程并开始你的翻译吧。我可以将它发布在域名 fr.javascript.info 下并署上你的名字，或由你发布在自己的域名下。

你也可以对此文件发 PR 来表示工作正在进行中。

请注意，此教程可以用 <https://github.com/iliakan/javascript-tutorial-server/> 来达到本地运行的效果。
=======
We'd like to make the tutorial available in many languages. Please help us to translate.

Here's the list of existing ongoing translations (in alphabetical order):

| Language | Github | Translation leads | Translated (%) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last&nbsp;Commit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Published |
|----------|--------|-------------------|----------------|-------------|-----------|
| Azerbaijani | [orkhan-huseyn/javascript-tutorial-az](https://github.com/orkhan-huseyn/javascript-tutorial-az) | @orkhan-huseyn | ![](http://stats.javascript.info/translate/az.svg) | ![](https://img.shields.io/github/last-commit/orkhan-huseyn/javascript-tutorial-az.svg?maxAge=900&label=) |  |
| Chinese | [xitu/javascript-tutorial-zh](https://github.com/xitu/javascript-tutorial-zh) | @leviding | ![](http://stats.javascript.info/translate/zh.svg) | ![](https://img.shields.io/github/last-commit/xitu/javascript-tutorial-zh.svg?maxAge=900&label=) | [zh.javascript.info](https://zh.javascript.info) |
| French | [HachemiH/javascript-tutorial-fr](https://github.com/HachemiH/javascript-tutorial-fr) | @HachemiH | ![](http://stats.javascript.info/translate/fr.svg) | ![](https://img.shields.io/github/last-commit/HachemiH/javascript-tutorial-fr.svg?maxAge=900&label=) | |
| Japanese | [KenjiI/javascript-tutorial-ja](https://github.com/KenjiI/javascript-tutorial-ja) | @KenjiI | ![](http://stats.javascript.info/translate/ja.svg) | ![](https://img.shields.io/github/last-commit/KenjiI/javascript-tutorial-ja.svg?maxAge=900&label=) | [ja.javascript.info](https://ja.javascript.info) |
| Korean | [Violet-Bora-Lee/javascript-tutorial-ko](https://github.com/Violet-Bora-Lee/javascript-tutorial-ko) | @Violet-Bora-Lee | ![](http://stats.javascript.info/translate/ko.svg) | ![](https://img.shields.io/github/last-commit/Violet-Bora-Lee/javascript-tutorial-ko.svg?maxAge=900&label=) |  |
| Persian (Farsi) | [mehradsadeghi/javascript-tutorial-fa](https://github.com/mehradsadeghi/javascript-tutorial-fa) | @mehradsadeghi | started | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) | |
| Polish | [krzmaciek/javascript-tutorial-pl](https://github.com/krzmaciek/javascript-tutorial-pl) | @krzmaciek | ![](http://stats.javascript.info/translate/pl.svg) | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) |  |
| Romanian | [lighthousand/javascript-tutorial-ro](https://github.com/lighthousand/javascript-tutorial-ro) | @lighthousand | ![](http://stats.javascript.info/translate/ro.svg) | ![](https://img.shields.io/github/last-commit/lighthousand/javascript-tutorial-ro.svg?maxAge=900&label=) |  |
| Russian | [iliakan/javascript-tutorial-ru](https://github.com/iliakan/javascript-tutorial-ru) | @iliakan | * . | ![](https://img.shields.io/github/last-commit/iliakan/javascript-tutorial-ru.svg?maxAge=900&label=) | [learn.javascript.ru](https://learn.javascript.ru) |
| Turkish | [sahinyanlik/javascript-tutorial-tr](https://github.com/sahinyanlik/javascript-tutorial-tr) | @sahinyanlik | ![](http://stats.javascript.info/translate/tr.svg) | ![](https://img.shields.io/github/last-commit/sahinyanlik/javascript-tutorial-tr.svg?maxAge=900&label=) | |

`*` – the previous version is published in Russian, need to backport/translate the new one from English.

**If you'd like to translate it into your language:**

1. First, check if the translation has already started in the list above or in issues. If it exists, contact the original lead, ask him  to join efforts. If the translation is stalled, ask him to transfer the repo to you or just create a new one and continue from where they stopped.
2. If there's no such translation, create a new one. Clone the repository, change its name to `javascript-tutorial-<lang>` (by your language) and [create an issue](https://github.com/iliakan/javascript-tutorial-en/issues/new) for me to add you to the list.

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/iliakan/javascript-tutorial-server>.  
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## 赞助商

<a href="https://coding.net/?utm_source=javascript-tutorial-zh&utm_medium=banner&utm_campaign=march2019" target="_blank"><img src="https://user-images.githubusercontent.com/26959437/56273145-c56aa000-612e-11e9-9137-a1388ef18cf2.png" width="300px;" target="_blank"/></a>

## 结构

每个章节、每篇文章或每个任务都有其文件夹。

文件夹都是以 `N-url` 的方式命名，`N` 是用于分类的数字，`url` 是包含材料标题的 URL。

<<<<<<< HEAD
材料的类型由文件夹内的文件来定义：

  - `index.md` 代表一个章节
  - `article.md` 代表一篇文章
  - `task.md` 代表一个任务（解答也一定会出现在 solution.md 文件中）

每个文件都从 `# Main header` 开始。

材料所需要的资源需要处于同一文件夹内。
=======
Each of these files starts from the `# Main header`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
