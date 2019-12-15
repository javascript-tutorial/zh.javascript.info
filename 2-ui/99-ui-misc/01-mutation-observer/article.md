
# DOM 变动观察器（Mutation observer）

`MutationObserver` 是一个内置对象，它监控 DOM 元素，在其发生变动时触发回调。

我们将首先看一下语法，然后研究实际的用例。

## 语法

`MutationObserver` 使用简单。

首先，我们创建一个带有回调函数（callback-function）的观察器：

```js
let observer = new MutationObserver(callback);
```

然后将其附加到一个 DOM 节点：

```js
observer.observe(node, config);
```

`config` 是一个带布尔选项的对象，该布尔选项表示“将对哪些变动做出反应”：
- `childList` － `node` 的直接子节点的变动，
- `subtree` － `node` 的所有后代节点的变动，
- `attributes` － `node` 的属性，
- `attributeFilter` － 一组属性名称，只监控选定的属性。
- `characterData` － 是否监测 `node.data`（文本内容），

其他几个选项：
- `attributeOldValue` － 如果为 `true`，则将属性的旧值和新值都传递给回调函数（参见下文），否则只传新值（需要 `attributes` 选项），
- `characterDataOldValue` － 如果为 `true`，则将 `node.data` 的旧值和新值都传递给回调函数（参见下文），否则只传新值（需要 `characterData` 选项）。

发生任何变动后，便执行 “回调” 函数：将变动作为一个 [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) 对象列表传入第一个参数，而观察器本身作为第二个参数。

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) 对象具有以下属性：

- `type` － 变动类型，可以是以下类型中的一个：
    - `"attributes"`：属性被修改了
    - `"characterData"`：数据被修改了，用于文本节点。
    - `"childList"`：添加/删除了子元素，
- `target` － 变动发生在何处：`"attributes"` 所在的元素，`"characterData"` 所在的文本节点，或 `"childList"` 变动了的某元素，
- `addedNodes/removedNodes`  － 添加/删除的节点
- `previousSibling/nextSibling` － 添加/删除的节点的前后相邻节点
- `attributeName/attributeNamespace` － 被更改的属性的名称/命名空间（用于 XML），
- `oldValue` － 之前的值，仅用于属性或文本变动，如果设置了相应选项 `attributeOldValue`/`characterDataOldValue`。

例如，这里有一个 `<div>`，具有 `contentEditable` 属性。该属性用于聚焦和编辑节点。

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// 监控属性外的所有变动
observer.observe(elem, {
  childList: true, // 监控直接子节点
  subtree: true, // 及其后代节点
  characterDataOldValue: true // 将旧数据传递给回调函数
});
</script>
```

现在，如果我们更改 `<b>edit</b>` 内的文本，便有了一个变动：

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // 其他属性留空
}];
```

如果我们选择并同时删除 `<b>edit</b>`，就会有多个变动。

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // 其他属性留空
}, {
  type: "characterData"
  target: <text node>
  // ……变动的详细信息取决于浏览器如何处理此类删除事件
  // 它可能是将两个相邻的文本节点 "edit " 和 ", please" 合并成一个节点，
  // 或将它们各自作为单独的文本节点
}];
```

因此，`MutationObserver` 允许对 DOM 子树中的任何更改做出反应。

## 用于集成

这在什么时候可能有用？

想象一下，当您在页面上附加了一个第三方脚本，想在页面上添加一个有用的功能，但也同时增添了一些不必要的功能，比如，显示了广告 `<div class="ads">Unwanted ads</div>`。

当然，第三方脚本不会提供删除方法。

使用 `MutationObserver`，我们可以监测到这类元素何时出现在我们的 DOM 中，然后将其删除，并同时保留有用的功能。当然，该脚本的创建者不会开心的，毕竟您拿走他们有用的东西却把广告删除了。

还有一些其他情况如，第三方脚本会将某些内容添加到我们的文档中，出现这种情况时，我们希望能监测到，并动态调整大小以适应页面等。

`MutationObserver` 可以轻松处理此问题。

## 用于架构

从架构的角度来看，`MutationObserver` 也有不错的适用场景。

假设我们在建一个有关编程的网站。自然地，文章和其他材料中可能包含源代码片段。

这些代码片段在 HTML 标记中如下所示：

```html
...
<pre class="language-javascript"><code>
  // 这里是代码
  let hello = "world";
</code></pre>
...
```

另外，我们还将在网站上使用 JavaScript 高亮显示库，例如 [Prism.js](https://prismjs.com/)。调用 `Prism.highlightElem(pre)` 会检查此类 `pre` 元素的内容，并在其中添加特殊标记和样式，进行彩色语法高亮显示，类似于您在本页面的示例中看到的那样。

那什么时候运行该高亮显示方法呢？我们可以在 `DOMContentLoaded` 事件触发时运行，或在页尾运行。到那时，DOM 已加载完毕，我们可以搜索元素 `pre[class*="language"]` 并调用 `Prism.highlightElem` ：

```js
// 在页面上高亮显示所有代码片段
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

到目前为止，一切都很简单，对吧？HTML 中有 `<pre>` 代码片段，并高亮显示了。

现在继续。假设我们要从服务器动态获取资料。我们会在 [后续教程](info:fetch) 中学习怎么做。当前我们只关心从网络服务器获取 HTML 文章后按需显示：

```js
let article = /* 从服务器获取新内容 */
articleElem.innerHTML = article;
```

新的 `article` HTML 可能包含代码片段。我们需要对其调用 `Prism.highlightElem`，否则它们将不会高亮显示。

**对于动态加载的文章，在何处何时调用 `Prism.highlightElem`？**

我们可以对加载文章的那段代码调用该方法，如下所示：

```js
let article = /* 从服务器获取新内容 */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

……但是，想象一下，代码中有很多地方可以加载内容：文章、测验、论坛帖子。我们需要在所有地方都进行高亮显示调用吗？那不太好办，也很容易遗漏。

而且，如果内容是由第三方模块加载的，怎么办？例如，我们有一个由他人编写的论坛，可以动态加载内容，我们想在论坛中添加语法高亮显示功能。没有人喜欢再接入第三方脚本。

幸运的是，还有另一种选择。

我们可以使用 `MutationObserver` ，它能自动检测何时在页面中插入了代码片段，并高亮显示之。

因此，我们在一个地方处理高亮显示功能，不再需要集成。

### 动态高亮显示示例

这是运行示例。

如果运行此代码，它将开始监测下面的元素，并高亮显示该元素处出现的任何代码段：

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // 检查新节点，是否有需要高亮的？

    for(let node of mutation.addedNodes) {
      //我们只跟踪元素，忽略其他节点（例如文本节点）
      if (!(node instanceof HTMLElement)) continue;

      // 检查插入的元素是否为代码段
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // 或在子树的某处可能有一个代码片段？
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

下面有一个 HTML 元素和 JavaScript，该脚本使用 `innerHTML` 动态填充 HTML 元素。

请先运行前面的代码（如前述，监测到该元素），然后运行下面的代码。您将看到 `MutationObserver` 如何检测并高亮显示该代码段。

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

以下代码填充了其 `innerHTML`。请先运行上面的代码，它将监测并高亮显示新内容：

```js run
let demoElem = document.getElementById('highlight-demo');

// 动态插入带有代码段的内容
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

现在我们有了 `MutationObserver`，它可以跟踪在被监测的元素或整个“文档”中的所有高亮显示。我们可以在 HTML 中随意添加/删除代码段。

## 其他方法

有一个方法可以停止监测节点：

- `observer.disconnect()` － 停止监测。

跟它经常一起使用的另一个方法：

- `mutationRecords = observer.takeRecords()` － 获取尚未处理的变动记录列表，即发生了变动但回调函数还没有处理它们。

```js
// 我们想停止监测变动
observer.disconnect();

// 它可能尚未处理某些变动
let mutationRecords = observer.takeRecords();
// 处理 mutationRecords
```

## 垃圾回收

观察器在内部对节点使用弱引用。即：如果一个节点从 DOM 中删除了，便访问不到了，那么它就成了要回收的垃圾，观察器不会阻止这种情况。

## 总结  

`MutationObserver` 可以监测 DOM 的变动如：属性、添加/删除的元素、文本内容。

我们可以用它来跟踪代码其他部分引入的更改，以及与第三方脚本集成。

`MutationObserver` 可以监测任何更改。配置选项“监测哪些内容”用于优化监测，节省不必要的回调调用。
