<<<<<<< HEAD
# 现代 JavaScript 教程中文版

这个仓库托管了现代 JavaScript 教程的中文版内容，发布于 [https://zh.javascript.info](https://zh.javascript.info)。

## 赞助商
=======
# The Modern JavaScript Tutorial

This repository hosts the English content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

<a href="https://coding.net/?utm_source=javascript-tutorial-zh&utm_medium=banner&utm_campaign=march2019" target="_blank"><img src="https://user-images.githubusercontent.com/26959437/56273145-c56aa000-612e-11e9-9137-a1388ef18cf2.png" width="300px;" target="_blank"/></a>

<<<<<<< HEAD
## 翻译

我们希望提供本教程的多语言版本。如果你感兴趣，那就快来和我们一起翻译吧。

详见：https://javascript.info/translate

## 贡献

**That's how you can contribute:**

- See the [Chinese Translate Progress](https://github.com/javascript-tutorial/zh.javascript.info/issues/324) issue.
- Choose an unchecked article you'd like to translate.
- Add a comment with the article title to the issue, e.g. `An Introduction to JavaScript`.
    - Our bot will mark it in the issue, for everyone to know that you're translating it.
    - Your comment should contain only the title.
- Fork the repository, translate and send a PR when done.
    - PR title should match article title, the bot will write it's number into the issue.

Please kindly allow maintainers to review and merge or request changes in your translation.
   
If maintainers do not respond, or if you'd like to become a maintainer, write us at the [main repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new).
    
**Let others know what you're translating, in message boards or chats in your language. Invite them to join!**

🎉 Thank you!

Your name and the contribution size will appear in the "About project" page when the translation gets published.

P.S. The full list of languages can be found at <https://javascript.info/translate>.
=======
We'd like to make the tutorial available in many languages. Please help us to translate.

See <https://javascript.info/translate> for the details.

## Contributions

We'd also like to collaborate on the tutorial with other people.

Something's wrong? A topic is missing? Explain it to people, add as PR 👏

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.  

The list of contributors is available at <https://javascript.info/about#contributors>.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## Structure

Every chapter, an article or a task resides in its own folder.

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

A file starts with the `# Title Header`, and then the text in Markdown-like format, editable in a simple text editor. 

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

Please keep line breaks and paragraphs "as is": don't add newlines and don't remove existing ones. Makes it easy to merge future changes from the English version into the translation. 

If you see that the English version can be improved – great, please send a PR to it.

### Terms

- Some specification terms are not to be translated, e.g. "Function Declaration" can be left "as is".
- For other terms like `resolved promise`, `slash`, `regexp`, and so on - look for a glossary, hopefully there's one for your language already. If not, look for translations in manuals, such as [MDN](https://developer.mozilla.org/en-US/).

### Text in Code Blocks

- Translate comments.
- Translate user-messages and example strings.
- Don't translate variables, classes, identifiers.
- Ensure that the code works after the translation :)

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### External Links

If an external link is to Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, and a version of that article exists in your language that is of decent quality, link to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, a partially translated version is ok.

If a linked article has no translated version, leave the link "as is".

### Metadata

Some files, usually tasks, have YAML metadata at the top, delimited by `---`:

```md
importance: 5

---
...
```

Please don't translate "importance" (and other top metadata).

### Anchors

Some headers have `[#anchor]` at the end, e.g.

```md
## Spread operator [#spread-operator]
```

Please don't translate or remove the `[#...]` part, it's for URL anchors.

## Running locally

You can run the tutorial server locally to see how the translation looks.

The server and install instructions are at <https://github.com/javascript-tutorial/server>. 

我们希望与大家合作维护本教程。

本教程的贡献者列表详见：<https://zh.javascript.info/about>。

---

<<<<<<< HEAD
💓  
- Levi Ding [@leviding](https://github.com/leviding)
- Ilya Kantor [@iliakan](https://github.com/iliakan)
=======
It's very easy to add something new.

---
💓  
Ilya Kantor @iliakan
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
