# 样式和类

<<<<<<< HEAD
在我们讨论 JavaScript 处理样式和类的方法之前 —— 有一个重要的规则。尽管这足够明显的，但我们还是要提到这一点。
=======
Before we get into JavaScript's ways of dealing with styles and classes -- here's an important rule. Hopefully it's obvious enough, but we still have to mention it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

通常有两种方式来设计元素样式：

1. 在 CSS 中创建一个类并添加它：`<div class="...">`
2. 将属性直接写入 `style`：`<div style="...">`。

CSS 总是首选的方式 —— 不仅用于 HTML，在 JavaScript 中也是如此。

只有当类“无法处理时”，我们才会操作 `style` 属性。

例如，如果我们动态地计算元素的坐标并希望通过 JavaScript 来设置它们，那么 `style` 是可接受的，如下所示：

```js
let top = /* complex calculations */;
let left = /* complex calculations */;
elem.style.left = left; // e.g '123px'
elem.style.top = top; // e.g '456px'
```

对于其他情况，比如文本变红色，添加一个背景图标 —— 在 CSS 中描述这个图标，然后应用这个类。这更加灵活，更容易支持。

## className and classList

更改类在脚本中是最常见的一个操作。

在以前，JavaScript 有一个限制：像 `"class"` 这样的保留字不能作为对象属性。这一限制现在已经不存在了，但当时并不存在像 `elem.class` 这样的 `"class"` 属性。

因此对于类，引入了类似的属性 `"className"`： `elem.className` 对应于 `"class"` 特性:

例如：

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

如果我们为 `elem.className` 分配一些东西，它将替换所有的类字符串。有时，这正是我们所需要的，但我们通常希望添加/删除单个类。

还有另一个属性：`elem.classList`。

`elem.classList` 是一个特殊对象，它拥有 `add/remove/toggle` 的类方法。

例如：

```html run
<body class="main page">
  <script>
*!*
    // add a class
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // main page article
  </script>
</body>
```

因此我们既可以使用 `className` 对完整的类字符串进行操作，也可以使用使用 `classList` 对单个类进行操作。我们选择什么取决于我们的需求。

`classList` 方法：

- `elem.classList.add/remove("class")` —— 添加/移除类。
- `elem.classList.toggle("class")` —— 如果类存在就移除，否则添加。
- `elem.classList.contains("class")` —— 返回 `true/false`，检查给定类。

此外，`classList` 是可迭代的，因此我们可以像下述方法一样列出所有类：

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, and then page
    }
  </script>
</body>
```

## 元素样式

`elem.style` 属性是一个对象，它对应于 `"style"` 特性中所写的内容。对 `elem.style.width="100px"` 等价于 `style="width:100px"` 的运行效果。

对于多单词，使用 camelCase：

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

例如：

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Prefixed properties"
像 `-moz-border-radius`，`-webkit-border-radius` 这样的浏览器前缀，也遵循同样的规则，比如：

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```

即：连字符 `"-"` 变成大写。
````

## 重置样式属性

有时我们想要分配一个样式属性，然后移除它。

例如，为了隐藏一个元素，我们可以设置 `elem.style.display = "none"`。

<<<<<<< HEAD
然后，我们可能要移除 `style.display`，就像它没有被设置一样。这里不应该使用 `delete elem.style.display`，而应该使用 `elem.style.display = ""` 将其赋值为空。
=======
Then later we may want to remove the `style.display` as if it were not set. Instead of `delete elem.style.display` we should assign an empty string to it: `elem.style.display = ""`.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
// if we run this code, the <body> "blinks"
document.body.style.display = "none"; // hide

setTimeout(() => document.body.style.display = "", 1000); // 恢复正常
```

<<<<<<< HEAD
如果我们设置 `display` 为空字符串，那么浏览器一般会应用 CSS 类以及内置样式，就像根本没有这样的 `style` 属性。
=======
If we set `display` to an empty string, then the browser applies CSS classes and its built-in styles normally, as if there were no such `display` property at all.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

````smart header="用 `style.cssText` 进行重写"
通常，我们使用 `style.*` 来分配单独的样式属性。我们不能将完整的样式设置为 `div.style="color: red; width: 100px"`，因为 `div.style` 是一个对象，而且它是只读的。

以字符串的形式设置样式，可以使用特殊属性 `style.cssText`：

```html run
<div id="div">Button</div>

<script>
  // we can set special style flags like "important" here
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

<<<<<<< HEAD
我们很少使用它，因为这样的赋值会删除所有现有样式：它不会添加，而是替换它们。偶尔会移出所需的东西。但是当我们知道我们不移出一些重要的内容时，仍然可以对新元素进行处理。
=======
We rarely use it, because such assignment removes all existing styles: it does not add, but replaces them. May occasionally delete something needed. But still can be done for new elements when we know we won't delete something important.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

通过设置属性：`div.setAttribute('style', 'color: red...')` 也可以实现同样的目的。
````

## 注意单位

样式值中必须附上 CSS 单位。

例如，我们不应该将 `elem.style.top` 设置为 `10`，而应将其设置为 `10px`。否则会无效：

```html run height=100
<body>
  <script>
  *!*
    // doesn't work!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (empty string, the assignment is ignored)
  */!*

    // now add the CSS unit (px) - and it works
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

请注意浏览器如何“解压”最后一行中的 `style.margin` 属性，并从其中推断 `style.marginLeft` 和 `style.marginTop`（以及其他部分边距）。

## 计算样式：getComputedStyle

修改样式很简单，但是如何**读取**它呢？

例如，我们想知道元素的大小、边距、颜色。应该怎么获取？

**`style` 属性仅对 `"style"` 属性值进行操作，而不是任何 CSS 级联。**

因此我们不能使用 `elem.style` 来读取来自 CSS 类的任何内容。

例如，这里的 `style` 看不到边距：

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // empty
    alert(document.body.style.marginTop); // empty
*/!*
  </script>
</body>
```

<<<<<<< HEAD
...但如果我们需要，比如说，把边距增加 20px 呢？那么需要当前值作为开始。
=======
...But what if we need, say, to increase the margin by 20px? We would want the current value of it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

还有另一种方法：`getComputedStyle`。

语法是：

```js
getComputedStyle(element[, pseudo])
```

element
: 用来读取样式值的的元素。

pseudo
: 假如给定一个伪元素，例如：`::before`。空字符串或无参意味着元素本身。

结果是一个具有样式属性的对象，像 `elem.style`，但现在对于所有的 CSS 类来说都是如此。

例如：

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // 现在我们可以读出页边距和颜色了

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="计算值和解析值"
以下是 [CSS](https://drafts.csswg.org/cssom/#resolved-values) 中的两个概念：

1. **computed** 样式值是应用所有 CSS 规则和 CSS 继承之后的值，这是 CSS 级联的结果。它可以是 `height:1em` 或者 `font-size:125%`。
2. **resolved** 样式值最终应用于元素值。像 `1em` 或者 `125%` 这样的值都是相对的。浏览器会进行值计算，然后对其进行 fixed 和 absolute，例如：`height:20px` 或 `font-size:16px`。对于几何属性，解析值可能是一个浮点，如 `width:50.5px`。

以前，为了获取计算值而创建 `getComputedStyle`，但是事实证明解析值会更加方便，标准也因此发生了变化。

因此，现在 `getComputedStyle` 实际上返回的是属性的解析值。
```

````warn header="`getComputedStyle` 需要完整的属性名"
我们应该总是要求得到我们想要的确切的属性，例如 `paddingLeft`、`marginTop` 或者 `borderTopWidth`。否则，就不能保证正确的结果。

例如，如果有 `paddingLeft/paddingTop` 属性，那么对于 `getComputedStyle(elem).padding`，我们应该得到什么？什么也没有，或者是从已知的填充中“生成”值？这里没有标准规则。

仍存在其他的不一致。比如，一些浏览器（Chrome）在下述文档中显示 `10px`，一些浏览器（Firefox）—— 则效果不同：

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // 在 Firefox 中是空字符串
</script>
```
````

```smart header="\"Visited\" links styles are hidden!"
访问过的链接可以使用 `:visited` CSS 伪类着色。

但 `getComputedStyle` 不允许访问该颜色，否则任意页面都可以通过在页面上创建连接并通过检查样式来确定用户是否访问了连接。

<<<<<<< HEAD
JavaScript 中我们看不到 `:visited` 应用的样式。此外，CSS 中也有一个限制，禁止在 `:visited` 中应用更改几何的样式。这是为了保证一个不好的页面没有办法来测试是否访问了链接，从而窥探隐私。
=======
JavaScript may not see the styles applied by `:visited`. And also, there's a limitation in CSS that forbids to apply geometry-changing styles in `:visited`. That's to guarantee that there's no sideway for an evil page to test if a link was visited and hence to break the privacy.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
```

## 总结

在管理 class 时，有两个 DOM 属性：

- `className` —— 字符串值可以很好地管理整个类集合。
- `classList` —— 拥有 `add/remove/toggle/contains` 方法的对象可以很好地支持单独的类。

改变样式：

- `style` 属性是一个带有 camelCased 样式的对象。对它的读取和修改 `"style"` 属性中的单个属性等价。要留意如果应用 `important` 和其他稀有内容 ——  在 [MDN](mdn:api/CSSStyleDeclaration) 上有一个方法列表。

- `style.cssText` 属性对应于整个“样式”属性，即完整的样式字符串。

获取已经解析的样式（对应于所有类，在应用所有 CSS 并计算最终值后）：

- `getComputedStyle(elem[, pseudo])` 返回与 `style` 对象类似且包含了所有类的对象，是只读的。
