
<<<<<<< HEAD
# DOM 变动观察器（Mutation observer）

`MutationObserver` 是一个内建对象，它观察 DOM 元素，在其发生更改时触发回调。

我们将首先看一下语法，然后探究一个实际的用例，以了解它在什么地方有用。

## 语法

`MutationObserver` 使用简单。

首先，我们创建一个带有回调函数的观察器：
=======
# Mutation observer

`MutationObserver` is a built-in object that observes a DOM element and fires a callback in case of changes.

We'll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.

## Syntax

`MutationObserver` is easy to use.

First, we create an observer with a callback-function:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
let observer = new MutationObserver(callback);
```

<<<<<<< HEAD
然后将其附加到一个 DOM 节点：
=======
And then attach it to a DOM node:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
observer.observe(node, config);
```

<<<<<<< HEAD
`config` 是一个具有布尔选项的对象，该布尔选项表示“将对哪些更改做出反应”：
- `childList` —— `node` 的直接子节点的更改，
- `subtree` —— `node` 的所有后代的更改，
- `attributes` —— `node` 的特性（attribute），
- `attributeFilter` —— 特性名称数组，只观察选定的特性。
- `characterData` —— 是否观察 `node.data`（文本内容），

其他几个选项：
- `attributeOldValue` —— 如果为 `true`，则将特性的旧值和新值都传递给回调（参见下文），否则只传新值（需要 `attributes` 选项），
- `characterDataOldValue` —— 如果为 `true`，则将 `node.data` 的旧值和新值都传递给回调（参见下文），否则只传新值（需要 `characterData` 选项）。

然后，在发生任何更改后，将执行“回调”：更改被作为一个 [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) 对象列表传入第一个参数，而观察器自身作为第二个参数。

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) 对象具有以下属性：

- `type` —— 变动类型，以下类型之一：
    - `"attributes"`：特性被修改了，
    - `"characterData"`：数据被修改了，用于文本节点，
    - `"childList"`：添加/删除了子元素。
- `target` —— 更改发生在何处：`"attributes"` 所在的元素，或 `"characterData"` 所在的文本节点，或 `"childList"` 变动所在的元素，
- `addedNodes/removedNodes` —— 添加/删除的节点，
- `previousSibling/nextSibling` —— 添加/删除的节点的上一个/下一个兄弟节点，
- `attributeName/attributeNamespace` —— 被更改的特性的名称/命名空间（用于 XML），
- `oldValue` —— 之前的值，仅适用于特性或文本更改，如果设置了相应选项 `attributeOldValue`/`characterDataOldValue`。

例如，这里有一个 `<div>`，它具有 `contentEditable` 特性。该特性使我们可以聚焦和编辑元素。
=======
`config` is an object with boolean options "what kind of changes to react on":
- `childList` -- changes in the direct children of `node`,
- `subtree` -- in all descendants of `node`,
- `attributes` -- attributes of `node`,
- `attributeFilter` -- an array of attribute names, to observe only selected ones.
- `characterData` -- whether to observe `node.data` (text content),

Few other options:
- `attributeOldValue` -- if `true`, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs `attributes` option),
- `characterDataOldValue` -- if `true`, pass both the old and the new value of `node.data` to callback (see below), otherwise only the new one (needs `characterData` option).

Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` -- mutation type, one of
    - `"attributes"`: attribute modified
    - `"characterData"`: data modified, used for text nodes,
    - `"childList"`: child elements added/removed,
- `target` -- where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,
- `addedNodes/removedNodes`  -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.

For example, here's a `<div>` with a `contentEditable` attribute. That attribute allows us to focus on it and edit.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

<<<<<<< HEAD
// 观察除了特性之外的所有变动
observer.observe(elem, {
  childList: true, // 观察直接子节点
  subtree: true, // 及其更低的后代节点
  characterDataOldValue: true // 将旧的数据传递给回调
=======
// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
});
</script>
```

<<<<<<< HEAD
如果我们在浏览器中运行上面这段代码，并聚焦到给定的 `<div>` 上，然后更改 `<b>edit</b>` 中的文本，`console.log` 将显示一个变动：
=======
If we run this code in the browser, then focus on the given `<div>` and change the text inside `<b>edit</b>`, `console.log` will show one mutation:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
<<<<<<< HEAD
  // 其他属性为空
}];
```

如果我们进行更复杂的编辑操作，例如删除 `<b>edit</b>`，那么变动事件可能会包含多个变动记录：
=======
  // other properties empty
}];
```

If we make more complex editing operations, e.g. remove the `<b>edit</b>`, the mutation event may contain multiple mutation records:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
<<<<<<< HEAD
  // 其他属性为空
}, {
  type: "characterData"
  target: <text node>
  // ...变动的详细信息取决于浏览器如何处理此类删除
  // 它可能是将两个相邻的文本节点 "edit " 和 ", please" 合并成一个节点，
  // 或者可能将它们留在单独的文本节点中
}];
```

因此，`MutationObserver` 允许对 DOM 子树中的任何更改作出反应。

## 用于集成

在什么时候可能有用？

想象一下，你需要添加一个第三方脚本，该脚本不仅包含有用的功能，还会执行一些我们不想要的操作，例如显示广告 `<div class="ads">Unwanted ads</div>`。

当然，第三方脚本没有提供删除它的机制。

使用 `MutationObserver`，我们可以监测到我们不需要的元素何时出现在我们的 DOM 中，并将其删除。

还有一些其他情况，例如第三方脚本会将某些内容添加到我们的文档中，并且我们希望检测出这种情况何时发生，以调整页面，动态调整某些内容的大小等。

`MutationObserver` 使我们能够实现这种需求。

## 用于架构

从架构的角度来看，在某些情况下，`MutationObserver` 有不错的作用。

假设我们正在建立一个有关编程的网站。自然地，文章和其他材料中可能包含源代码段。

在 HTML 标记（markup）中的此类片段如下所示：
=======
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
```

So, `MutationObserver` allows to react on any changes within DOM subtree.

## Usage for integration

When such thing may be useful?

Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.

Naturally, the third-party script provides no mechanisms to remove it.

Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.

There are other situations when a third-party script adds something into our document, and we'd like to detect, when it happens, to adapt our page, dynamically resize something etc.

`MutationObserver` allows to implement this.

## Usage for architecture

There are also situations when `MutationObserver` is good from architectural standpoint.

Let's say we're making a website about programming. Naturally, articles and other materials may contain source code snippets.

Such snippet in an HTML markup looks like this:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```html
...
<pre class="language-javascript"><code>
<<<<<<< HEAD
  // 这里是代码
=======
  // here's the code
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
  let hello = "world";
</code></pre>
...
```

<<<<<<< HEAD
另外，我们还将在网站上使用 JavaScript 高亮显示库，例如 [Prism.js](https://prismjs.com/)。调用 `Prism.highlightElem(pre)` 会检查此类 `pre` 元素的内容，并在其中添加特殊标签（tag）和样式，以进行彩色语法高亮显示，类似于你在本文的示例中看到的那样。

那什么时候运行该高亮显示方法呢？我们可以在 `DOMContentLoaded` 事件中或者在页面尾部运行。到那时，我们的 DOM 已准备就绪，我们可以搜索元素 `pre[class*="language"]` 并对其调用 `Prism.highlightElem`：

```js
// 高亮显示页面上的所有代码段
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

到目前为止，一切都很简单，对吧？HTML 中有 `<pre>` 代码段，我们高亮显示它们。

现在让我们继续。假设我们要从服务器动态获取资料。我们将 [在本教程的后续章节](info:fetch) 中学习进行此操作的方法。目前，只需要关心我们从网络服务器获取 HTML 文章并按需显示：

```js
let article = /* 从服务器获取新内容 */
articleElem.innerHTML = article;
```

新的 `article` HTML 可能包含代码段。我们需要对其调用 `Prism.highlightElem`，否则它们将不会被高亮显示。

**对于动态加载的文章，应该在何处何时调用 `Prism.highlightElem`？**

我们可以将该调用附加到加载文章的代码中，如下所示：

```js
let article = /* 从服务器获取新内容 */
=======
Also we'll use a JavaScript highlighting library on our site, e.g. [Prism.js](https://prismjs.com/). A call to `Prism.highlightElem(pre)` examines the contents of such `pre` elements and adds into them special tags and styles for colored syntax highlighting, similar to what you see in examples here, at this page.

When exactly to run that highlighting method? We can do it on `DOMContentLoaded` event, or at the bottom of the page. At that moment we have our DOM ready, can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Everything's simple so far, right? There are `<pre>` code snippets in HTML, we highlight them.

Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch). For now it only matters that we fetch an HTML article from a webserver and display it on demand:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won't get highlighted.

**Where and when to call `Prism.highlightElem` for a dynamically loaded article?**

We could append that call to the code that loads an article, like this:

```js
let article = /* fetch new content from server */
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

<<<<<<< HEAD
……但是，想象一下，代码中有很多地方可以加载内容：文章，测验，论坛帖子。我们是否需要在每个地方都附加一个高亮显示调用？那不太方便，也很容易忘记。

并且，如果内容是由第三方模块加载的，该怎么办？例如，我们有一个由其他人编写的论坛，该论坛可以动态加载内容，并且我们想为其添加语法高亮显示。没有人喜欢修补第三方脚本。

幸运的是，还有另一种选择。

我们可以使用 `MutationObserver` 来自动检测何时在页面中插入了代码段，并高亮显示之它们。

因此，我们在一个地方处理高亮显示功能，从而使我们无需集成它。

### 动态高亮显示示例

这是一个工作示例。

如果你运行这段代码，它将开始观察下面的元素，并高亮显示现在此处的所有代码段：
=======
...But imagine, we have many places in the code where we load contents: articles, quizzes, forum posts. Do we need to put the highlighting call everywhere? That's not very convenient, and also easy to forget.

And what if the content is loaded by a third-party module? E.g. we have a forum written by someone else, that loads contents dynamically, and we'd like to add syntax highlighting to it. No one likes to patch third-party scripts.

Luckily, there's another option.

We can use `MutationObserver` to automatically detect when code snippets are inserted in the page and highlight them.

So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.

### Dynamic highlight demo

Here's the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
<<<<<<< HEAD
    // 检查新节点，有什么需要高亮显示的吗？

    for(let node of mutation.addedNodes) {
      // 我们只跟踪元素，跳过其他节点（例如文本节点）
      if (!(node instanceof HTMLElement)) continue;

      // 检查插入的元素是否为代码段
=======
    // examine new nodes, is there anything to highlight?

    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

<<<<<<< HEAD
      // 或者可能在子树的某个地方有一个代码段？
=======
      // or maybe there's a code snippet somewhere in its subtree?
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

<<<<<<< HEAD
下面有一个 HTML 元素，以及使用 `innerHTML` 动态填充它的 JavaScript。

请先运行前面那段代码（上面那段，观察元素），然后运行下面这段代码。你将看到 `MutationObserver` 是如何检测并高亮显示代码段的。

<p id="highlight-demo" style="border: 1px solid #ddd">一个具有 <code>id="highlight-demo"</code> 的示例元素，运行上面那段代码来观察它。</p>

下面这段代码填充了其 `innerHTML`，这导致 `MutationObserver` 作出反应，并突出显示其内容：
=======
Here, below, there's an HTML-element and JavaScript that dynamically fills it using `innerHTML`.

Please run the previous code (above, observes that element), and then the code below. You'll see how `MutationObserver` detects and highlights the snippet.

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js run
let demoElem = document.getElementById('highlight-demo');

<<<<<<< HEAD
// 动态插入带有代码段的内容
demoElem.innerHTML = `下面是一个代码段：
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>另一个代码段：</div>
=======
// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

<<<<<<< HEAD
现在我们有了 `MutationObserver`，它可以跟踪观察到的元素中的，或者整个 `document` 中的所有高亮显示。我们可以在 HTML 中添加/删除代码段，而无需考虑高亮问题。

## 其他方法

有一个方法可以停止观察节点：

- `observer.disconnect()` —— 停止观察。

当我们停止观察时，观察器可能尚未处理某些更改。

- `observer.takeRecords()` —— 获取尚未处理的变动记录列表，表中记录的是已经发生，但回调暂未处理的变动。

这些方法可以一起使用，如下所示：

```js
// 我们想要停止跟踪变动
observer.disconnect();

// 处理未处理的变动
=======
Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.

## Additional methods

There's a method to stop observing the node:

- `observer.disconnect()` -- stops the observation.

When we stop the observing, it might be possible that some changes were not processed by the observer yet.

- `observer.takeRecords()` -- gets a list of unprocessed mutation records, those that happened, but the callback did not handle them.

These methods can be used together, like this:

```js
// we'd like to stop tracking changes
observer.disconnect();

// handle unprocessed some mutations
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
let mutationRecords = observer.takeRecords();
...
```

<<<<<<< HEAD
```smart header="垃圾回收"
观察器在内部对节点使用弱引用。也就是说：如果一个节点被从 DOM 中删除了，并且该节点变得不可访问，那么它就会被垃圾回收。

观察到 DOM 节点这一事实并不能阻止垃圾回收。
```

## 总结  

`MutationObserver` 可以对 DOM 的变化作出反应：特性（attribute），添加/删除的元素，文本内容。

我们可以用它来跟踪代码其他部分引入的更改，以及与第三方脚本集成。

`MutationObserver` 可以跟踪任何更改。`config` “要观察的内容”选项用于优化，避免不必要的回调调用以节省资源。
=======
```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is: if a node is removed from DOM, and becomes unreachable, then it becomes garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
```

## Summary  

`MutationObserver` can react on changes in DOM: attributes, added/removed elements, text content.

We can use it to track changes introduced by other parts of our code, as well as to integrate with third-party scripts.

`MutationObserver` can track any changes. The config "what to observe" options are used for optimizations, not to spend resources on unneeded callback invocations.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
