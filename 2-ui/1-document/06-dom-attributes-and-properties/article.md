# 特性和属性（Attributes and properties）

当浏览器加载页面时，它会“读取”（或者称之为：“解析”）HTML 并从中生成 DOM 对象。对于元素节点，大多数标准的 HTML 特性（attributes）会自动变成 DOM 对象的属性（properties）。（译注：attribute 和 property 两词意思相近，为作区分，全文将 attribute 译为“特性”，property 译为“属性”，请读者注意区分。）

例如，如果标签是 `<body id="page">`，那么 DOM 对象就会有 `body.id="page"`。

但特性—属性映射并不是一一对应的！在本章，我们将带领你一起分清楚这两个概念，了解如何使用它们，了解它们何时相同何时不同。

## DOM 属性

我们已经见过了内建 DOM 属性。它们数量庞大。但是从技术上讲，没有人会限制我们，如果我们觉得这些 DOM 还不够，我们可以添加我们自己的。

DOM 节点是常规的 JavaScript 对象。我们可以 alert 它们。

例如，让我们在 `document.body` 中创建一个新的属性：

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

我们也可以像下面这样添加一个方法：

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY（这个方法中的 "this" 的值是 document.body）
```

我们还可以修改内建属性的原型，例如修改 `Element.prototype` 为所有元素添加一个新方法：

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

所以，DOM 属性和方法的行为就像常规的 Javascript 对象一样：

- 它们可以有很多值。
- 它们是大小写敏感的（要写成 `elem.nodeType`，而不是 `elem.NoDeTyPe`）。

## HTML 特性

在 HTML 中，标签可能拥有特性（attributes）。当浏览器解析 HTML 文本，并根据标签创建 DOM 对象时，浏览器会辨别 **标准的** 特性并以此创建 DOM 属性。

所以，当一个元素有 `id` 或其他 **标准的** 特性，那么就会生成对应的 DOM 属性。但是非 **标准的** 特性则不会。

例如：
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // 非标准的特性没有获得对应的属性
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

请注意，一个元素的标准的特性对于另一个元素可能是未知的。例如 `"type"` 是 `<input>` 的一个标准的特性（[HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)），但对于 `<body>`（[HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)）来说则不是。规范中对相应元素类的标准的属性进行了详细的描述。

这里我们可以看到：
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined：DOM 属性没有被创建，因为它不是一个标准的特性
*/!*
  </script>
</body>
```

所以，如果一个特性不是标准的，那么就没有相对应的 DOM 属性。那我们有什么方法来访问这些特性吗？

当然。所有特性都可以通过使用以下方法进行访问：

- `elem.hasAttribute(name)` — 检查特性是否存在。
- `elem.getAttribute(name)` — 获取这个特性值。
- `elem.setAttribute(name, value)` — 设置这个特性值。
- `elem.removeAttribute(name)` — 移除这个特性。

这些方法操作的实际上是 HTML 中的内容。

我们也可以使用 `elem.attributes` 读取所有特性：属于内建 [Attr](https://dom.spec.whatwg.org/#attr) 类的对象的集合，具有 `name` 和 `value` 属性。

下面是一个读取非标准的特性的示例：

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // 非标准的
*/!*
  </script>
</body>
```

HTML 特性有以下几个特征：

- 它们的名字是大小写不敏感的（`id` 与 `ID` 相同）。
- 它们的值总是字符串类型的。

下面是一个使用特性的扩展示例：

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant'，读取

    elem.setAttribute('Test', 123); // (2) 写入

    alert( elem.outerHTML ); // (3) 查看特性是否在 HTML 中（在）

    for (let attr of elem.attributes) { // (4) 列出所有
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

请注意：

1. `getAttribute('About')` — 这里的第一个字母是大写的，但是在 HTML 中，它们都是小写的。但这没有影响：特性的名称是大小写不敏感的。
2. 我们可以将任何东西赋值给特性，但是这些东西会变成字符串类型的。所以这里我们的值为 `"123"`。
3. 所有特性，包括我们设置的那个特性，在 `outerHTML` 中都是可见的。
4. `attributes` 集合是可迭代对象，该对象将所有元素的特性（标准和非标准的）作为 `name` 和 `value` 属性存储在对象中。

## 属性—特性同步

当一个标准的特性被改变，对应的属性也会自动更新，（除了几个特例）反之亦然。

在下面这个示例中，`id` 被修改为特性，我们可以看到对应的属性也发生了变化。然后反过来也是同样的效果：

```html run
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('id', 'id');
  alert(input.id); // id（被更新了）

  // 属性 => 特性
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId（被更新了）
</script>
```

但这里也有些例外，例如 `input.value` 只能从特性同步到属性，反过来则不行：

```html run
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // 这个操作无效，属性 => 特性
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text（没有被更新！）
*/!*
</script>
```

在上面这个例子中：
- 改变特性值 `value` 会更新属性。
- 但是属性的更改不会影响特性。

这个“功能”在实际中会派上用场，因为用户行为可能会导致 `value` 的更改，然后在这些操作之后，如果我们想从 HTML 中恢复“原始”值，那么该值就在特性中。

## DOM 属性是多类型的

DOM 属性不总是字符串类型的。例如，`input.checked` 属性（对于 checkbox 的）是布尔型的。

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // 特性值是：空字符串
  alert(input.checked); // 属性值是：true
</script>
```

还有其他的例子。`style` 特性是字符串类型的，但 `style` 属性是一个对象：

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // 字符串
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // 对象
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

尽管大多数 DOM 属性都是字符串类型的。

有一种非常少见的情况，即使一个 DOM 属性是字符串类型的，但它可能和 HTML 特性也是不同的。例如，`href` DOM 属性一直是一个 **完整的** URL，即使该特性包含一个相对路径或者包含一个 `#hash`。

这里有一个例子：

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // 特性
  alert(a.getAttribute('href')); // #hello

  // 属性
  alert(a.href ); // http://site.com/page#hello 形式的完整 URL 
</script>
```

如果我们需要 `href` 特性的值，或者其他与 HTML 中所写的完全相同的特性，则可以使用 `getAttribute`。


## 非标准的特性，dataset

当编写 HTML 时，我们会用到很多标准的特性。但是非标准的，自定义的呢？首先，让我们看看它们是否有用？用来做什么？

有时，非标准的特性常常用于将自定义的数据从 HTML 传递到 JavaScript，或者用于为 JavaScript “标记” HTML 元素。

像这样：

```html run
<!-- 标记这个 div 以在这显示 "name" -->
<div *!*show-info="name"*/!*></div>
<!-- 标记这个 div 以在这显示 "age" -->
<div *!*show-info="age"*/!*></div>

<script>
  // 这段代码找到带有标记的元素，并显示需要的内容
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // 在字段中插入相应的信息
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // 首先 "name" 变为 Pete，然后 "age" 变为 25
  }
</script>
```

它们还可以用来设置元素的样式。

例如，这里使用 `order-state` 特性来设置订单状态：

```html run
<style>
  /* 样式依赖于自定义特性 "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

为什么使用特性比使用 `.order-state-new`，`.order-state-pending`，`.order-state-canceled` 这些样式类要好？

因为特性值更容易管理。我们可以轻松地更改状态：

```js
// 比删除旧的或者添加一个新的类要简单一些
div.setAttribute('order-state', 'canceled');
```

但是自定义的特性也存在问题。如果我们出于我们的目的使用了非标准的特性，之后它被引入到了标准中并有了其自己的用途，该怎么办？HTML 语言是在不断发展的，并且更多的特性出现在了标准中，以满足开发者的需求。在这种情况下，自定义的属性可能会产生意料不到的影响。

为了避免冲突，存在 [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) 特性。

**所有以 "data-" 开头的特性均被保留供程序员使用。它们可在 `dataset` 属性中使用。**

例如，如果一个 `elem` 有一个名为 `"data-about"` 的特性，那么可以通过 `elem.dataset.about` 取到它。

像这样：

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

像 `data-order-state` 这样的多词特性可以以驼峰式进行调用：`dataset.orderState`。

这里是 "order state" 那个示例的重构版：

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // 读取
  alert(order.dataset.orderState); // new

  // 修改
  order.dataset.orderState = "pending"; // (*)
</script>
```

使用 `data-*` 特性是一种合法且安全的传递自定义数据的方式。

请注意，我们不仅可以读取数据，还可以修改数据属性（data-attributes）。然后 CSS 会更新相应的视图：在上面这个例子中的最后一行 `(*)` 将颜色更改为了蓝色。

## 总结

- 特性（attribute）— 写在 HTML 中的内容。
- 属性（property）— DOM 对象中的内容。

简略的对比：

|            | 属性 | 特性 |
|------------|------------|------------|
|类型|任何值，标准的属性具有规范中描述的类型|字符串|
|名字|名字（name）是大小写敏感的|名字（name）是大小写不敏感的|

操作特性的方法：

- `elem.hasAttribute(name)` — 检查是否存在这个特性。
- `elem.getAttribute(name)` — 获取这个特性值。
- `elem.setAttribute(name, value)` — 设置这个特性值。
- `elem.removeAttribute(name)` — 移除这个特性。
- `elem.attributes` — 所有特性的集合。

在大多数情况下，最好使用 DOM 属性。仅当 DOM 属性无法满足开发需求，并且我们真的需要特性时，才使用特性，例如：

- 我们需要一个非标准的特性。但是如果它以 `data-` 开头，那么我们应该使用 `dataset`。
- 我们想要读取 HTML 中“所写的”值。对应的 DOM 属性可能不同，例如 `href` 属性一直是一个 **完整的** URL，但是我们想要的是“原始的”值。
