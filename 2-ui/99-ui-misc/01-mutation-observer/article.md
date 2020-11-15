
# DOM 变动观察器（Mutation observer）

`MutationObserver` 是一个内建对象，它观察 DOM 元素，并在检测到更改时触发回调。

我们将首先看一下语法，然后探究一个实际的用例，以了解它在什么地方有用。

## 语法

`MutationObserver` 使用简单。

首先，我们创建一个带有回调函数的观察器：

```js
let observer = new MutationObserver(callback);
```

然后将其附加到一个 DOM 节点：

```js
observer.observe(node, config);
```

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

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// 观察除了特性之外的所有变动
observer.observe(elem, {
  childList: true, // 观察直接子节点
  subtree: true, // 及其更低的后代节点
  characterDataOldValue: true // 将旧的数据传递给回调
});
</script>
```

如果我们在浏览器中运行上面这段代码，并聚焦到给定的 `<div>` 上，然后更改 `<b>edit</b>` 中的文本，`console.log` 将显示一个变动：

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // 其他属性为空
}];
```

如果我们进行更复杂的编辑操作，例如删除 `<b>edit</b>`，那么变动事件可能会包含多个变动记录：

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
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

```html
...
<pre class="language-javascript"><code>
  // 这里是代码
  let hello = "world";
</code></pre>
...
```

为了提高可读性，同时对其进行美化，我们将在我们的网站上使用 JavaScript 语法高亮显示库，例如 [Prism.js](https://prismjs.com/)。为了使用 Prism 对以上代码片段进行语法高亮显示，我们调用了 `Prism.highlightElem(pre)`，它会检查此类 `pre` 元素的内容，并为这些元素添加特殊的标签（tag）和样式，以进行彩色语法高亮显示，类似于你在本文的示例中看到的那样。

那么，我们应该在什么时候执行该高亮显示方法呢？我们可以在 `DOMContentLoaded` 事件中执行，或者将脚本放在页面的底部。DOM 就绪后，我们可以搜索元素 `pre[class*="language"]` 并对其调用 `Prism.highlightElem`：

```js
// 高亮显示页面上的所有代码段
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

到目前为止，一切都很简单，对吧？我们找到 HTML 中的代码片段并高亮显示它们。

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
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

……但是，想象一下，如果代码中有很多地方都是在加载内容：文章，测验和论坛帖子等。我们是否需要在每个地方都附加一个高亮显示调用，以在内容加载完成后，高亮内容中的代码。那很不方便。

并且，如果内容是由第三方模块加载的，该怎么办？例如，我们有一个由其他人编写的论坛，该论坛可以动态加载内容，并且我们想为其添加语法高亮显示。没有人喜欢修补第三方脚本。

幸运的是，还有另一种选择。

我们可以使用 `MutationObserver` 来自动检测何时在页面中插入了代码段，并高亮显示它们。

因此，我们在一个地方处理高亮显示功能，从而使我们无需集成它。

### 动态高亮显示示例

这是一个工作示例。

如果你运行这段代码，它将开始观察下面的元素，并高亮显示现在此处的所有代码段：

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // 检查新节点，有什么需要高亮显示的吗？

    for(let node of mutation.addedNodes) {
      // 我们只跟踪元素，跳过其他节点（例如文本节点）
      if (!(node instanceof HTMLElement)) continue;

      // 检查插入的元素是否为代码段
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // 或者可能在子树的某个地方有一个代码段？
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

下面有一个 HTML 元素，以及使用 `innerHTML` 动态填充它的 JavaScript。

请先运行前面那段代码（上面那段，观察元素），然后运行下面这段代码。你将看到 `MutationObserver` 是如何检测并高亮显示代码段的。

<p id="highlight-demo" style="border: 1px solid #ddd">一个具有 <code>id="highlight-demo"</code> 的示例元素，运行上面那段代码来观察它。</p>

下面这段代码填充了其 `innerHTML`，这导致 `MutationObserver` 作出反应，并突出显示其内容：

```js run
let demoElem = document.getElementById('highlight-demo');

// 动态插入带有代码段的内容
demoElem.innerHTML = `下面是一个代码段：
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>另一个代码段：</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

现在我们有了 `MutationObserver`，它可以跟踪观察到的元素中的，或者整个 `document` 中的所有高亮显示。我们可以在 HTML 中添加/删除代码段，而无需考虑高亮问题。

## 其他方法

有一个方法可以停止观察节点：

- `observer.disconnect()` —— 停止观察。

当我们停止观察时，观察器可能尚未处理某些更改。在种情况下，我们使用：

- `observer.takeRecords()` —— 获取尚未处理的变动记录列表，表中记录的是已经发生，但回调暂未处理的变动。

这些方法可以一起使用，如下所示：

```js
// 如果你关心可能未处理的近期的变动
// 那么，应该在 disconnect 前调用获取未处理的变动列表
let mutationRecords = observer.takeRecords();

// 停止跟踪变动
observer.disconnect();
...
```


```smart header="`observer.takeRecords()` 返回的记录被从处理队列中移除"
回调函数不会被 `observer.takeRecords()` 返回的记录调用。
```

```smart header="垃圾回收"
观察器在内部对节点使用弱引用。也就是说，如果一个节点被从 DOM 中移除了，并且该节点变得不可访问，那么它就可以被垃圾回收。

观察到 DOM 节点这一事实并不能阻止垃圾回收。
```

## 总结  

`MutationObserver` 可以对 DOM 的变化作出反应 —— 特性（attribute），文本内容，添加/删除元素。

我们可以用它来跟踪代码其他部分引入的更改，以及与第三方脚本集成。

`MutationObserver` 可以跟踪任何更改。`config` “要观察的内容”选项用于优化，避免不必要的回调调用以节省资源。
