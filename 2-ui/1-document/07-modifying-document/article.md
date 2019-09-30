# 修改文档内容

DOM（document object model 文档对象模型，此文中全部以缩写 DOM 表示）的可修改性是网页能“实时”刷新的关键。

以下的例子向我们展示如何创建一个“弹幕”新元素并且修改它在页面中展示的内容。

<<<<<<< HEAD
这里我们先展示出一个简单的例子，随后会逐一向你说明。

## 例子：展示一条信息

首先，我们可以看到一条信息，它看起来像是一个美化版的 `alert`。
=======
## Example: show a message

Let's see the methods on example. We'll add a message on the page that looks nicer than `alert`.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

这里是它的样式：

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

<<<<<<< HEAD
在上面这个 HTML 例子中，使用 JavaScript 创建一个像 `div` 一样的元素（假定 CSS 样式是 HTML 中的内联样式或者是从外部引用 CSS 文件）。
=======
That was an HTML example. Now let's create the same `div` with JavaScript (assuming that the styles are in the HTML or an external CSS file).
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

## 生成一个元素

<<<<<<< HEAD

这两种方法都可以创建 DOM 节点：

`document.createElement(tag)`
: 用给定的标签创建一个新*元素节点（element node）*：
=======
To create DOM nodes, there are two methods:

`document.createElement(tag)`
: Creates a new *element node* with the given tag:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: 用给定的文本创建一个**文本节点**

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

### 生成一条信息

<<<<<<< HEAD
在这个例子中，我们想要为 `div` 设定我们需要的类名和文字信息：
=======
In our case the message is a `div` with `alert` class and the HTML in it:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```js
let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

<<<<<<< HEAD
之后，我们就有拥有一个 DOM 元素。现在这个元素仅仅存于一个变量中，我们还不能在页面上看到它。因为它还没有被插入到页面中。
=======
We created the element, but as of now it's only in a variable. We can't see the element on the page, as it's not yet a part of the document.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

## 插值方法

为了让 `div` 显示我们想要的内容，我们需要在 `document` 中找个合适的位置插值，这里我们选择 `document.body`。

<<<<<<< HEAD
这里有个特定的方法 `appendChild` 来完成这一步：`document.body.appendChild(div)`。
=======
There's a special method `append` for that: `document.body.append(div)`.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

这里是完整代码：

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

<<<<<<< HEAD
这里有一个简短的列表，我们把一个节点插入到父元素中（用 `parentElem` 指代父元素）：

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

### 在开头插入/在末尾插入/在前面插入/在后面插入

This set of methods provides more flexible insertions:
=======
This set of methods provides more ways to insert:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

- `node.append(...nodes or strings)` —— 在 `node` 末尾插入节点或者字符串，
- `node.prepend(...nodes or strings)` —— 在 `node` 开头插入节点或者字符串，
- `node.before(...nodes or strings)` —— 在 `node` 前面插入节点或者字符串，
- `node.after(...nodes or strings)` —— 在 `node` 后面插入节点或者字符串，
- `node.replaceWith(...nodes or strings)` —— 将 `node` 替换为节点或者字符串。

所有这些方法都接受 DOM 节点或者文本字符串列表形式。如果给定的是一个字符串，那么它将以文本节点（text node）形式插入。

<<<<<<< HEAD
下面例子是使用以上提到的方法在列表项前面或后面插入文本：
=======
Here's an example of using these methods to add items to a list and the text before/after it:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // insert string "before" before <ol>
  ol.after('after'); // insert string "after" after <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insert liLast at the end of <ol>
</script>
```

<<<<<<< HEAD
这张图片展示插入方法的工作方式：
=======
Here's a visual picture what methods do:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

![](before-prepend-append-after.svg)

列表最后表现为：

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

这些方法通过简单的调用就能插入多个节点或者字符串。

例如，这里将字符串和一个元素插入到 `div` 前面：

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

所有字符串都会作为“文本”插入。

所以最后的 HTML 表现为：

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

换句话说，字符串以安全的方式插入到页面中，就像调用 `elem.textContent` 方法一样。

所以这些方法只能用来插入 DOM 节点或者文本块。

如果我们想在 HTML 页面中插入一个标签，有没有这样的方法，就像调用 `elem.innerHTML` 方法一样？

<<<<<<< HEAD
### 在相邻的 HTML 标签中插入/文本/元素

接下来登场的这个方法就可以做到：`elem.insertAdjacentHTML(where, html)`。

该方法第一个参数是代码字符串，指定相对于 `elem` 的插入位置，必须是以下四个值之一：

- `"beforebegin"` —— 在 `elem` 开头位置前插入 `html`，
- `"afterbegin"` —— 在 `elem` 开头位置后插入 `html`（译注：即 `elem` 元素内部的第一个子节点之前），
- `"beforeend"` —— 在 `elem` 结束位置前插入 `html`（译注：即 `elem` 元素内部的最后一个子节点之后），
- `"afterend"` —— 在 `elem` 结束位置后插入 `html`。

第二个参数是 HTML 字符串，会以 HTML 的形式插入到页面中。
=======
## insertAdjacentHTML/Text/Element

For that we can use another, pretty versatile method: `elem.insertAdjacentHTML(where, html)`.

The first parameter is a code word, specifying where to insert relative to `elem`. Must be one of the following:

- `"beforebegin"` -- insert `html` immediately before `elem`,
- `"afterbegin"` -- insert `html` into `elem`, at the beginning,
- `"beforeend"` -- insert `html` into `elem`, at the end,
- `"afterend"` -- insert `html` immediately after `elem`.

The second parameter is an HTML string, that is inserted "as HTML".
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

例如：

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

...将会表现为：

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

<<<<<<< HEAD
通过这个方法我们可以随意在 HTML任何位置插入值。
=======
That's how we can append an arbitrary HTML to the page.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

这里有一张图片描述插入方式：

![](insert-adjacent.svg)

通过跟前面的图片做比较可以看出，两个方法的插入方式是一样的，只不过后者是插入 HTML 标签。

这个方法还有两个变种：

<<<<<<< HEAD
- `elem.insertAdjacentText(where, text)` —— 一样的语法，只不过把 `text` 作为“文本”直接插入到 HTML 中，
- `elem.insertAdjacentElement(where, elem)` —— 一样的语法，只不过插入的是一个元素。

他们存在的意义更多是为了使语法“整齐划一”，在实践中，通常只使用 `insertAdjacentHTML`，因为插入文本和元素的方法可以使用 `append/prepend/before/after` —— 同样的效果这样写起来更简洁。
=======
- `elem.insertAdjacentText(where, text)` -- the same syntax, but a string of `text` is inserted "as text" instead of HTML,
- `elem.insertAdjacentElement(where, elem)` -- the same syntax, but inserts an element.

They exist mainly to make the syntax "uniform". In practice, only `insertAdjacentHTML` is used most of the time. Because for elements and text, we have methods `append/prepend/before/after` -- they are shorter to write and can insert nodes/text pieces.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

这里有一个展示一条信息的变种写法：

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

<<<<<<< HEAD
## 克隆节点：cloneNode
=======
## Node removal

To remove a node, there's a method `node.remove()`.

Let's make our message disappear after a second:

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

Please note: if we want to *move* an element to another place -- there's no need to remove it from the old one.

**All insertion methods automatically remove the node from the old place.**

For instance, let's swap elements:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // no need to call remove
  second.after(first); // take #second and after it insert #first
</script>
```

## Cloning nodes: cloneNode
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

怎么插入多条相同的信息？

我们可以声明一个函数来实现这个方法。但是怎样通过**克隆**的方式来替换掉那些原本存在的 `div` 并且更改里面的文本（如果有这样一个需求）。

如果我们有一个很大的元素，克隆的方式要远比创建后插入来的更简单，性能也更好。

- `elem.cloneNode(true)` 方法用来对一个元素进行“深”克隆 —— 包括所有特性和子元素。`elem.cloneNode(false)` 方法只克隆该元素本身，不对子元素进行克隆。

一个复制信息的例子：

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
  let div2 = div.cloneNode(true); // 克隆信息
  div2.querySelector('strong').innerHTML = 'Bye there!'; // 改变克隆信息

  div.after(div2); // 显示克隆信息在已经存在的 div 后
*/!*
</script>
```


## 文档片段（DocumentFragment） [#document-fragment]

`DocumentFragment` 是一个特殊的 DOM 节点，用于传递节点列表的包装器。

我们可以将其他节点附加到它上面，但是当我们将其插入到某个地方的时候，会以其内容的形式插入。

例如，下面的代码中的 `getListContent` 函数生成一个具有 `<li>` 列表的片段，然后将它插入到 `<ul>` 中：

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

请注意，在最后一行以 `(*)` 标示的位置，我们附加上 `DocumentFragment`，但是它和 `ul` “融为一体（blends in）”了，所以最终的文档结构应该是：

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

我们很少明确使用 `DocumentFragment`。如果可以返回一个节点数组，有什么必要附加到特殊类型的节点？下面我们就来看个例子：

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
ul.append(...getListContent()); // append + “...” 操作符 = 一对好朋友！
*/!*
</script>
```

<<<<<<< HEAD
我们在这里提及 `DocumentFragment` 主要是因为有一些概念是基于它的，比如 [模板](info:template-element) 元素，我们将在后面的章节中详细介绍它。


## 移除

想要移除节点，可以通过以下方法：
=======
## DocumentFragment [#document-fragment]
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

`DocumentFragment` is a special DOM node that serves as a wrapper to pass around lists of nodes.

<<<<<<< HEAD
`parentElem.removeChild(node)`
: 从 `parentElem` 中移除 `node`（假设它是元素中的子元素）。

`node.remove()`
: 从当前位置移除 `node`。

能看出第二个方法更加简洁，第一个方法的存在是有其历史原因的。

````smart
如果我们想要**移动**一个元素到另一个地方 —— 不需要移除旧的元素。

**所有插入操作都会从节点原来的位置把节点移除掉。**

例如，这里有一些嵌套的元素：

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // 没有用到移除方法
  second.after(first); //在 id 为 #second 的元素后插入id为 #first 的元素
=======
We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

For example, `getListContent` below generates a fragment with `<li>` items, that are later inserted into `<ul>`:

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
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
</script>
```

<<<<<<< HEAD
使信息一秒后消失：
=======
Please note, at the last line `(*)` we append `DocumentFragment`, but it "blends in", so the resulting structure will be:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` is rarely used explicitly. Why append to a special kind of node, if we can return an array of nodes instead? Rewritten example:

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

<<<<<<< HEAD
## 聊一聊 "document.write"
=======
We mention `DocumentFragment` mainly because there are some concepts on top of it, like [template](info:template-element) element, that we'll cover much later.

## Old-school insert/remove methods

[old]

There are also "old school" DOM manipulation methods, existing for historical reasons.

These methods come from really ancient times. Nowadays, there's no reason to use them, as modern methods, such as `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, are more flexible.

The only reason we list these methods here is that you can find them in many old scripts:

`parentElem.appendChild(node)`
: Appends `node` as the last child of `parentElem`.

    The following example adds a new `<li>` to the end of `<ol>`:

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
: Inserts `node` before `nextSibling` into `parentElem`.

    The following code inserts a new list item before the second `<li>`:

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
    To insert `newLi` as the first element, we can do it like this:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Replaces `oldChild` with `node` among children of `parentElem`.

`parentElem.removeChild(node)`
: Removes `node` from `parentElem` (assuming `node` is its child).

    The following example removes first `<li>` from `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

All these methods return the inserted/removed node. In other words, `parentElem.appendChild(node)` returns `node`. But usually the returned value is not used, we just run the method.

## A word about "document.write"
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

<<<<<<< HEAD
这个方法的起源于没有 DOM，没有 Web 标准的上古时期……，但是这个方法依旧保留了下来，因为很多的脚本使用它来实现一些功能。
=======
The method comes from times when there was no DOM, no standards... Really old times. It still lives, because there are scripts using it.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

<<<<<<< HEAD
这是它的缺陷。

从技术上讲，当浏览器正在读取（“解析”）传入的 HTML ，此时再调用 `document.write` 方法向文档中写入一些东西，浏览器会像它本来就在整个 HTML 文本的那个位置上（调用 document.write 的地方）一样处理它。
“ it were initially there”

反过来说这也是一个优势 —— 它性能出奇的快，因为它不用**修改 DOM 结构**。它直接在 DOM 结构构建之前，对整个页面直接进行重写，再交给浏览器去构建 DOM 结构。
=======
That's the downside.

There's an upside also. Technically, when `document.write` is called while the browser is reading ("parsing") incoming HTML, and it writes something, the browser consumes it just as if it were initially there, in the HTML text.

So it works blazingly fast, because there's *no DOM modification* involved. It writes directly into the page text, while the DOM is not yet built.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

所以如果我们需要在 HTML 加载阶段动态的添加很多文本，它会很高效。不过能用到的机会不多就是了。在一些很老的脚本里倒是能经常看到。

## 总结

<<<<<<< HEAD
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
=======
- Methods to create new nodes:
    - `document.createElement(tag)` -- creates an element with the given tag,
    - `document.createTextNode(value)` -- creates a text node (rarely used),
    - `elem.cloneNode(deep)` -- clones the element, if `deep==true` then with all descendants.  

- Insertion and removal:
    - `node.append(...nodes or strings)` -- insert into `node`, at the end,
    - `node.prepend(...nodes or strings)` -- insert into `node`, at the beginning,
    - `node.before(...nodes or strings)` –- insert right before `node`,
    - `node.after(...nodes or strings)` –- insert right after `node`,
    - `node.replaceWith(...nodes or strings)` –- replace `node`.
    - `node.remove()` –- remove the `node`.

    Text strings are inserted "as text".

- There are also "old school" methods:
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    All these methods return `node`.

- Given a piece of HTML: `elem.insertAdjacentHTML(where, html)`, inserts depending on `where`:
    - `"beforebegin"` -- insert `html` right before `elem`,
    - `"afterbegin"` -- insert `html` into `elem`, at the beginning,
    - `"beforeend"` -- insert `html` into `elem`, at the end,
    - `"afterend"` -- insert `html` right after `elem`.

    Also there are similar methods `elem.insertAdjacentText` and `elem.insertAdjacentElement`, they insert text strings and elements, but they are rarely used.

- To append HTML to the page before it has finished loading:
    - `document.write(html)`

    After the page is loaded such a call erases the document. Mostly seen in old scripts.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
