# 特性和属性

<<<<<<< HEAD
> 译注：原文标题为“Attributes and properties”。两词意思相近，为作区分，将 Attribute 译为“特性”，Property 译为“属性”。
=======
When the browser loads the page, it "reads" (another word: "parses") the HTML and generates DOM objects from it. For element nodes, most standard HTML attributes automatically become properties of DOM objects.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

当浏览器加载页面时，它会“读取”（或者称之为：“解析”）HTML 文本并生成 DOM 对象。对于元素节点，大多数 HTML 特性会自动变成 DOM 对象的属性。

在这个例子中，如果标签是 `<body id="page">`，那么 DOM 对象会生成这样一个属性 `body.id="page"`。

但是特性 — 属性并不总是一一对应的！在这一篇文章中将带领你一起分清楚这两个概念，了解它们的具体作用，明白它们什么时候会相同什么时候会不同。

## DOM 属性

我们已经见过内置的 DOM 属性了。它的数量很庞大，但是 DOM 技术实现上没有限制我们对这个对象进行添加 —— 如果我们需要额外的属性的话。

DOM 节点是一个标准的 JavaScript 对象。我们可以 alert 它。

在这个例子中，让我们在 `document.body` 创建一个新的属性：

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

我们也能像下面这样添加一个方法：

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY（这个方法中的 "this" 指 document.body）
```

我们还可以修改内置属性的原型，比如修改 `Element.prototype` 会给所有元素添加一个方法：

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

所以，DOM 上的属性和方法其实就像是一个标准的 Javascript 对象：

- 它可以有很多值。
- 它是大小写敏感的（要写成 `elem.nodeType`，而不是 `elem.NoDeTyPe`）。

## HTML 特性

<<<<<<< HEAD
在 HTML 语言中，标签可能拥有特性。当浏览器读取 HTML 文本并根据标签生成 DOM 对象，它会辨别**标准化**特性然后以此创建 DOM 属性。
=======
In HTML, tags may have attributes. When the browser parses the HTML to create DOM objects for tags, it recognizes *standard* attributes and creates DOM properties from them.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

因此当一个元素有 `id` 或其他**标准化**特性，会生相应的 DOM 属性。但是非**标准化**的特性则会被忽略。

例如：
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // 非标准特性不会生成相应属性
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

请留意不是每一个元素的标准化特性都是相同的，`"type"` 是 `<input>` 的一个标准化特性（[HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)），但是 `<body>` 则没有（[HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)）。每一个元素的标准化特性都有确切的规范描述。

以下我们可以看到：
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined：DOM 属性不存在，因为这不是一个标准化的特性。
*/!*
  </script>
</body>
```

<<<<<<< HEAD
如果一个特性不是标准化的，DOM 属性就不存在这个特性。那我们有没办法获取到这个特性？

答案是肯定的。以下几个方法是针对元素特性的操作：
=======
So, if an attribute is non-standard, there won't be a DOM-property for it. Is there a way to access such attributes?

Sure. All attributes are accessible by using the following methods:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

- `elem.hasAttribute(name)` —— 检验是否拥这个特性。
- `elem.getAttribute(name)` —— 获取到这个特性值。
- `elem.setAttribute(name, value)` —— 设置这个特性值。
- `elem.removeAttribute(name)` —— 移除这个特性。

以上的几个方法实际上也是 HTML 的原生方法。

我们可以通过 `elem.attributes` 读取到该元素的所有特性：这些特性都被一个名为 [Attr](https://dom.spec.whatwg.org/#attr) 的内置类以 `name` 和 `value` 这样的键-值对收集起来。

下面是一个如何读取非标准化特性的 demo：

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

HTML 特性有几个特征：

- 它们的书写是大小写不敏感的（`id` 也可以写作 `ID`）。
- 他们的值只能是字符串。

下面是一个延伸出来的 demo，它描述了特性是怎么工作的：

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), see it's there

    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

请注意：

<<<<<<< HEAD
1. `getAttribute('About')` —— 这里的第一个字母是大写的，但是在 HTML 里是全小写表示。这也就说明：特性的键名是大小写不敏感的。
2. 我们可以赋予它任何值，这里我们把 `"123"` 作为它的值。
3. 所有特性都有一个 `outerHTML` 给我们设置它在页面上的展示内容。
4. `attributes` 以 `name` 和 `value` 这样的键—值对收集在一个可迭代对象里。
=======
1. `getAttribute('About')` -- the first letter is uppercase here, and in HTML it's all lowercase. But that doesn't matter: attribute names are case-insensitive.
2. We can assign anything to an attribute, but it becomes a string. So here we have `"123"` as the value.
3. All attributes including ones that we set are visible in `outerHTML`.
4. The `attributes` collection is iterable and has all the attributes of the element (standard and non-standard) as objects with `name` and `value` properties.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## 属性—特性的同步

当一个标准化的特性被改变，相应的属性随之改变（有极个别除外），反之亦然。

下面这个例子中 `id` 这个特性被改变了，我们可以看到属性也被改变了。反过来也是同样的效果。

```html run
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('id', 'id');
  alert(input.id); // id（更新了）

  // 属性 => 特性
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId（更新了）
</script>
```

这里有一些特殊情况下的例子，`input.value` 只能从特性同步到属性，反过来则不行：

```html run
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // 这操作无效 属性 => 特性
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text（没有更新！）
*/!*
</script>
```

通过这两个例子可以看出：
- 改变特性值 `value` 会更新到属性上。
- 但是直接改变属性的值却不会作用在特性的值上。

<<<<<<< HEAD
这种“特征”是相当便利的，因为用户可能会经常修改 `value`，假设我们想要覆盖 HTML上“原始值”，只需要修改特性的值。
=======
That "feature" may actually come in handy, because the user actions may lead to `value` changes, and then after them, if we want to recover the "original" value from HTML, it's in the attribute.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## DOM 属性的类型

DOM 并不总是字符串。例如 `input.checked` 属性（多选框）是一个布尔类型的值。

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // 特性值是：空字符串
  alert(input.checked); // 属性的值是：true
</script>
```

类似的例子还有，`style` 特性值是一个字符串，但 `style` 属性是一个对象：

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

<<<<<<< HEAD
还有一个非常重要的不同点。DOM 属性的字符串可能跟特性值的字符串所表示的不是同一个东西！

例如 `href` DOM 属性总是一个绝对路径的，而特性值只包含相对路径或者只包含 `#hash` 这一部分。
=======
Most properties are strings though.

Quite rarely, even if a DOM property type is a string, it may differ from the attribute. For instance, the `href` DOM property is always a *full* URL, even if the attribute contains a relative URL or just a `#hash`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

这里有一个例子：

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // 特性
  alert(a.getAttribute('href')); // #hello

  // 属性
  alert(a.href ); // 绝对路径 http://site.com/page#hello
</script>
```

如果我们需要 HTML 中的 `href` 的值，可以用 `getAttribute` 获取到。


## 非标准化的特性，dataset

当我们编写 HTML，会用到很多标准特性。但是哪些是标准化的哪些不是，怎么区分它们？首先，看看它们是否起作用？

有时候非标准化特性常常用于在 HTML 中定义一些 JavaScript 数据，或者是给 HTML 元素打上“标记”。

像这样：

```html run
<!-- 标记这个 div 中要显示 "name" -->
<div *!*show-info="name"*/!*></div>
<!-- 这里要显示 "age" -->
<div *!*show-info="age"*/!*></div>

<script>
  // 这段代码是找到该元素并且按照给定数据展示到页面上
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // 插入相应的数据
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // Pete，然后是年龄
  }
</script>
```

我们还可以应用在元素的样式上。

例如，我们通过 `order-state` 设置不同状态下的颜色：

```html
<style>
  /* 按照 "order-state" 的设定产生对应样式 */
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

为什么使用特性值比使用 `.order-state-new`，`.order-state-pending`，`order-state-canceled` 这些样式类要好？

因为特性值更容易管理，我们可以轻易的通过特性值的改变切换样式，比如下面这样：

```js
// 可以轻易的移除或者添加一个新的类名。
div.setAttribute('order-state', 'canceled');
```

但是自定义的特性也存在问题。如果我们使用了一个非标准化的特性，之后却变成了一个标准化的值并用来做其他事情，HTML 语言一直在发展，越来越多的标准化特性解决了开发者的开发需求。这就是一个不可控的例子。

为了解决这个冲突产生了 [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) 这个特性。

**所有以 "data-" 开头的特性值可以给编程人员正常使用，同时它还是 `dataset` 合法值。**

例如, 如果一个 `elem` 有一个键名是 `"data-about"` 的特性，那么可以通过 `elem.dataset.about` 取到这个合法值。

像这样：

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

像 `data-order-state` 的多字特性键名可以写成驼峰式 `dataset.orderState`。

这里是一个 "order state" 重构版：

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

使用 `data-*` 的特性值是一个合法值，保存着自定义数据。

请注意我们不但可以读取，还能修改 data-attributes。上面这个例子的最后一行：`(*)` 会变成蓝色。

## 总结

- 特性 —— 写在 HTML 中。
- 属性 —— 是一个 DOM 对象。

简略的对比：

|            | 属性 | 特性 |
|------------|------------|------------|
|类型|一些值，标准化的属性值在规范中有类型描述|字符串|
|名字|键名大小写敏感|键名大小写不敏感|

操作特性的一些方法：

- `elem.hasAttribute(name)` —— 检查是否存在这个特性
- `elem.getAttribute(name)` —— 获取这个特性
- `elem.setAttribute(name, value)` —— 把这个特性设置为 name 值
- `elem.removeAttribute(name)` —— 移除这个特性
- `elem.attributes` —— 所有特性的集合

<<<<<<< HEAD
对于大多数需求，DOM 属性已经可以给予很好的支持。应当在 DOM 属性实在无法满足开发需求的情况下才使用特性，比如以下情况：
=======
For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

- 我们需要一个非标准化的特性。但是如果我们用 `data-` 来设置特性值，那就要使用 `dataset` 来获取属性值。
- 我们想要读取到 HTML 的展示内容。比如 `href` 属性总是一个绝对路径，但是我们只想要相对路径。
