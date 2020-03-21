# 修改文档（document）

DOM 修改是创建“实时”页面的关键。

在这里，我们将会看到如何“即时”创建新元素并修改现有页面内容。

## 例子：展示一条消息

让我们使用一个示例进行演示。我们将在页面上添加一条比 `alert` 更好看的消息。

它的外观如下：

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Hi there!</strong> You've read an important message.
</div>
*/!*
```

这是一个 HTML 示例。现在，让我们使用 JavaScript 创建一个相同的 `div`（假设样式在 HTML 或外部 CSS 文件中）。

## 创建一个元素

要创建 DOM 节点，这里有两种方法：

`document.createElement(tag)`
: 用给定的标签创建一个新 **元素节点（element node）**：

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: 用给定的文本创建一个 **文本节点**：

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

### 创建一条消息

在我们的例子中，消息是一个带有 `alert` 类和 HTML 的 `div`：

```js
let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

我们创建了元素，但到目前为止，它还只是在变量中。我们无法在页面上看到该元素，因为它还不是文档的一部分。

## 插入方法

为了让 `div` 显示出来，我们需要将其插入到 `document` 中的某处。例如，在 `document.body` 中。

对此有一个特殊的方法 `append`：`document.body.append(div)`。

这是完整代码：

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

*!*
  document.body.append(div);
*/!*
</script>
```

下面这些方法提供了更多的插入方式：

- `node.append(...nodes or strings)` — 在 `node` 末尾插入节点或字符串，
- `node.prepend(...nodes or strings)` — 在 `node` 开头插入节点或字符串，
- `node.before(...nodes or strings)` — 在 `node` 前面插入节点或字符串，
- `node.after(...nodes or strings)` — 在 `node` 后面插入节点或字符串，
- `node.replaceWith(...nodes or strings)` — 将 `node` 替换为给定的节点或字符串。

下面是使用这些方法将列表项添加到列表中，以及将文本添加到列表前面和后面的示例：

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // 将字符串 "before" 插入到 <ol> 前面
  ol.after('after'); // 将字符串 "after" 插入到 <ol> 后面

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // 将 liFirst 插入到 <ol> 的最开始

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // 将 liLast 插入到 <ol> 的最末尾
</script>
```

这张图片直观地显示了这些方法所做的工作：

![](before-prepend-append-after.svg)

因此，最终列表将为：

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

这些方法可以在单个调用中插入多个节点列表和文本片段。

例如，在这里插入了一个字符串和一个元素：

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

所有内容都被“作为文本”插入。

所以，最终的 HTML 为：

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

换句话说，字符串被以一种安全的方式插入到页面中，就像 `elem.textContent` 所做的一样。

所以，这些方法只能用来插入 DOM 节点或文本片段。

但是，如果我们想在所有标签和内容正常工作的情况下，将这些内容“作为 HTML” 插入到 HTML 中，就像 `elem.innerHTML` 方法一样，那有什么方法可以实现吗？

## insertAdjacentHTML/Text/Element

为此，我们可以使用另一个非常通用的方法：`elem.insertAdjacentHTML(where, html)`。

该方法的第一个参数是代码字（code word），指定相对于 `elem` 的插入位置。必须为以下之一：

- `"beforebegin"` — 将 `html` 插入到 `elem` 前插入，
- `"afterbegin"` — 将 `html` 插入到 `elem` 开头，
- `"beforeend"` — 将 `html` 插入到 `elem` 末尾，
- `"afterend"` — 将 `html` 插入到 `elem` 后。

第二个参数是 HTML 字符串，该字符串会被“作为 HTML” 插入。

例如：

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

……将导致：

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

这就是我们可以在页面上附加任意 HTML 的方式。

这是插入变体的示意图：

![](insert-adjacent.svg)

我们很容易就会注意到这张图片和上一张图片的相似之处。插入点实际上是相同的，但此方法插入的是 HTML。

这个方法有两个兄弟：

- `elem.insertAdjacentText(where, text)` — 语法一样，但是将 `text` 字符串“作为文本”插入而不是作为 HTML，
- `elem.insertAdjacentElement(where, elem)` — 语法一样，但是插入的是一个元素。

它们的存在主要是为了使语法“统一”。实际上，大多数时候只使用 `insertAdjacentHTML`。因为对于元素和文本，我们有 `append/prepend/before/after` 方法 — 它们也可以用于插入节点/文本片段，但写起来更短。

所以，下面是显示一条消息的另一种变体：

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

## 节点移除

想要移除一个节点，可以使用 `node.remove()`。

让我们的消息在一秒后消失：

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

请注意：如果我们要将一个元素 **移动** 到另一个地方，则无需将其从原来的位置中删除。

**所有插入方法都会自动从旧位置删除该节点。**

例如，让我们进行元素交换：

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // 无需调用 remove
  second.after(first); // 获取 #second，并在其后面插入 #first
</script>
```

## 克隆节点：cloneNode

如何再插入一条类似的消息？

我们可以创建一个函数，并将代码放在其中。但是另一种方法是 **克隆** 现有的 `div`，并修改其中的文本（如果需要）。

当我们有一个很大的元素时，克隆的方式可能更快更简单。

调用 `elem.cloneNode(true)` 来创建元素的一个“深”克隆 — 具有所有特性（attribute）和子元素。如果我们调用 `elem.cloneNode(false)`，那克隆就不包括子元素。

一个拷贝消息的示例：

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong> You've read an important message.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // 克隆消息
  div2.querySelector('strong').innerHTML = 'Bye there!'; // 修改克隆

  div.after(div2); // 在已有的 div 后显示克隆
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` 是一个特殊的 DOM 节点，用作来传递节点列表的包装器（wrapper）。

我们可以向其附加其他节点，但是当我们将其插入某个位置时，则会插入其内容。

例如，下面这段代码中的 `getListContent` 会生成带有 `<li>` 列表项的片段，然后将其插入到 `<ul>` 中：

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

请注意，在最后一行 `(*)` 我们附加了 `DocumentFragment`，但是它和 `ul` “融为一体（blends in）”了，所以最终的文档结构应该是：

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` 很少被显式使用。如果可以改为返回一个节点数组，那为什么还要附加到特殊类型的节点上呢？重写示例：

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operator = friends!
*/!*
</script>
```

我们之所以提到 `DocumentFragment`，主要是因为它上面有一些概念，例如 [template](info:template-element) 元素，我们将在以后讨论。

## 老式的 insert/remove 方法

[old]

由于历史原因，还存在“老式”的 DOM 操作方法。

这些方法来自真正的远古时代。如今，没有理由再使用它们了，因为诸如 `append`，`prepend`，`before`，`after`，`remove`，`replaceWith` 这些现代方法更加灵活。

我们在这儿列出这些方法的唯一原因是，你可能会在许多就脚本中遇到它们。

`parentElem.appendChild(node)`
: 将 `node` 作为 `parentElem` 最后一个子元素。

    可以看到增加了一个 `<li>` 在 `<ol>` 的最末尾：

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: 在 `parentElem` 的 `nextSibling` 插入 `node`。

    下面这段代码在第二个 `<li>` 标签前面插入一个新列表项：

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    如果需要把 `newLi` 插入成为第一个子元素，我们可以这样做：

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: 将 `parentElem` 的 `oldChild` 替换为 `node`。

所有这些插入节点的操作都会返回节点。换句话说，`parentElem.appendChild(node)` 返回 `node`。但是通常返回的节点都没有用，只是插入方法的默认返回值。

以上方法都是“旧三板斧”：它们从很早就存在，我们在老的脚本里能看到它们的影子。很不幸的是它们不够灵活。

例如，我们怎样在 **html** 插入字符串呢？又或者，给定你一个节点，如何在不引用其父节点的情况下删除它？虽然也能完成需求开发，总归不是那么优雅的解决方式。

所以诞生了两种优雅插入方法来代替这些繁琐的插入操作。











## 聊一聊 "document.write"

`document.write` 是一个很老的方法，用来为 web 页面添加内容。

语法如下：

```html run
<p>Somewhere in the page...</p>
*!*
<script>
  document.write('<b>Hello from JS</b>');
</script>
*/!*
<p>The end</p>
```

调动 `document.write(html)` 时意味着将 `html` “就地并马上”放入到页面中。`html` 字符串会动态的创建，所以它以自动伸缩的方式放入到页面中。我们可以通过 JavaScript 创建一个完整的 HTML 页面并写入浏览器窗口中。

这个方法的起源于没有 DOM，没有 Web 标准的上古时期……，但是这个方法依旧保留了下来，因为很多的脚本使用它来实现一些功能。

现代的脚本已经很少再看到这个方法，因为使用它有一个很重要的局限性：

**只能在页面加载的时候调用 `document.write`。**

如果在加载完成以后，渲染好的页面会被擦除。

例如：

```html run
<p>After one second the contents of this page will be replaced...</p>
*!*
<script>
  // 在一秒后调用 document.write
  // 页面已经加载完毕，所以会被擦除
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
*/!*
```

所以，不像其他 DOM 操作一样，一旦页面“加载完毕”最好就不使用 document.write 方法。

这是它的缺陷。

从技术上讲，当浏览器正在读取（“解析”）传入的 HTML ，此时再调用 `document.write` 方法向文档中写入一些东西，浏览器会像它本来就在整个 HTML 文本的那个位置上（调用 document.write 的地方）一样处理它。
“ it were initially there”

反过来说这也是一个优势 —— 它性能出奇的快，因为它不用**修改 DOM 结构**。它直接在 DOM 结构构建之前，对整个页面直接进行重写，再交给浏览器去构建 DOM 结构。

所以如果我们需要在 HTML 加载阶段动态的添加很多文本，它会很高效。不过能用到的机会不多就是了。在一些很老的脚本里倒是能经常看到。

## 总结

创建节点的方法：

- `document.createElement(tag)` —— 用给定标签创建一个节点，
- `document.createTextNode(value)` —— 创建一个文本节点（很少使用），
- `elem.cloneNode(deep)` —— 如果参数 `deep==true` 将元素及后代子元素进行克隆。  

插入和移除节点的方法：

- 从 parent
  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  这些方法都返回 `node`。

- 添加一些节点和字符串：
  - `node.append(...nodes or strings)` —— 在 `node` 末尾位置增加，
  - `node.prepend(...nodes or strings)` —— 在 `node`开头位置增加 ，
  - `node.before(...nodes or strings)` —— 在 `node` 之前位置增加，
  - `node.after(...nodes or strings)` —— 在 `node` 之后位置增加，
  - `node.replaceWith(...nodes or strings)` —— 替换 `node`。
  - `node.remove()` —— 移除 `node`。

  把字符串当成“文本”插入。

- 在 HTML 中添加内容 `elem.insertAdjacentHTML(where, html)`，在 where 位置进行操作：
  - `"beforebegin"` —— 将 `html` 插入 `elem` 到开头的前面位置，
  - `"afterbegin"` —— 将 `html` 插入 `elem` 到开头的后面位置，
  - `"beforeend"` —— 将 `html` 插入 `elem` 到结尾的前面位置，
  - `"afterend"` —— 将 `html` 插入 `elem` 到结尾的后面位置。

  `elem.insertAdjacentText` 和 `elem.insertAdjacentElement` 跟 `elem.insertAdjacentHTML` 很相似，只不过他们一个用来插入字符串，一个用来插入元素，但是很少使用这两个方法。

- 在页面加载完成之前添加 HTML 到页面中：
  - `document.write(html)`

  如果是在页面加载完成以后调用会擦除加载完毕的内容。通常在很老的脚本才会使用这个方法了。
