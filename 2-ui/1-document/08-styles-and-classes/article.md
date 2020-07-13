# 样式和类

<<<<<<< HEAD
在我们讨论 JavaScript 处理样式和类的方法之前 — 有一个重要的规则。希望它足够明显，但是我们仍然必须提到它。
=======
Before we get into JavaScript's ways of dealing with styles and classes -- here's an important rule. Hopefully it's obvious enough, but we still have to mention it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

通常有两种设置元素样式的方式：

1. 在 CSS 中创建一个类，并添加它：`<div class="...">`
2. 将属性直接写入 `style`：`<div style="...">`。

<<<<<<< HEAD
JavaScript 既可以修改类，也可以修改 `style` 属性。

相较于将样式写入 `style` 属性，我们应该首选通过 CSS 类的方式来添加样式。仅当类“无法处理”时，才应选择使用 `style` 属性的方式。

例如，如果我们动态地计算元素的坐标，并希望通过 JavaScript 来设置它们，那么使用 `style` 是可以接受的，如下所示：

```js
let top = /* 复杂的计算 */;
let left = /* 复杂的计算 */;

elem.style.left = left; // 例如 '123px'，在运行时计算出的
elem.style.top = top; // 例如 '456px'
```

对于其他情况，例如将文本设为红色，添加一个背景图标 — 可以在 CSS 中对这些样式进行描述，然后添加类（JavaScript 可以做到）。这样更灵活，更易于支持。
=======
JavaScript can modify both classes and `style` properties.

We should always prefer CSS classes to `style`. The latter should only be used if classes "can't handle it".

For example, `style` is acceptable if we calculate coordinates of an element dynamically and want to set them from JavaScript, like this:

```js
let top = /* complex calculations */;
let left = /* complex calculations */;

elem.style.left = left; // e.g '123px', calculated at run-time
elem.style.top = top; // e.g '456px'
```

For other cases, like making the text red, adding a background icon -- describe that in CSS and then add the class (JavaScript can do that). That's more flexible and easier to support.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## className 和 classList

更改类是脚本中最常见的操作之一。

在很旧以前，JavaScript 中有一个限制：像 `"class"` 这样的保留字不能用作对象的属性。这一限制现在已经不存在了，但当时就不能存在像 `elem.class` 这样的 `"class"` 属性。

因此，对于类，引入了看起来类似的属性 `"className"`：`elem.className` 对应于 `"class"` 特性（attribute）。

例如：

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

<<<<<<< HEAD
如果我们对 `elem.className` 进行赋值，它将替换类中的整个字符串。有时，这正是我们所需要的，但通常我们希望添加/删除单个类。
=======
If we assign something to `elem.className`, it replaces the whole string of classes. Sometimes that's what we need, but often we want to add/remove a single class.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

这里还有另一个属性：`elem.classList`。

<<<<<<< HEAD
`elem.classList` 是一个特殊的对象，它具有 `add/remove/toggle` 单个类的方法。
=======
The `elem.classList` is a special object with methods to `add/remove/toggle` a single class.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

例如：

```html run
<body class="main page">
  <script>
*!*
    // 添加一个 class
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // main page article
  </script>
</body>
```

因此，我们既可以使用 `className` 对完整的类字符串进行操作，也可以使用使用 `classList` 对单个类进行操作。我们选择什么取决于我们的需求。

`classList` 的方法：

<<<<<<< HEAD
- `elem.classList.add/remove(class)` — 添加/移除类。
- `elem.classList.toggle(class)` — 如果类不存在就添加类，存在就移除它。
- `elem.classList.contains(class)` — 检查给定类，返回 `true/false`。

此外，`classList` 是可迭代的，因此，我们可以像下面这样列出所有类：
=======
- `elem.classList.add/remove("class")` -- adds/removes the class.
- `elem.classList.toggle("class")` -- adds the class if it doesn't exist, otherwise removes it.
- `elem.classList.contains("class")` -- checks for the given class, returns `true/false`.

Besides, `classList` is iterable, so we can list all classes with `for..of`, like this:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main，然后是 page
    }
  </script>
</body>
```

## 元素样式

<<<<<<< HEAD
`elem.style` 属性是一个对象，它对应于 `"style"` 特性（attribute）中所写的内容。`elem.style.width="100px"` 的效果等价于我们在 `style` 特性中有一个 `width:100px` 字符串。
=======
The property `elem.style` is an object that corresponds to what's written in the `"style"` attribute. Setting `elem.style.width="100px"` works the same as if we had in the attribute `style` a string `width:100px`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

对于多词（multi-word）属性，使用驼峰式 camelCase：

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

例如：

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

<<<<<<< HEAD
````smart header="前缀属性"
像 `-moz-border-radius` 和 `-webkit-border-radius` 这样的浏览器前缀属性，也遵循同样的规则：连字符 `-` 表示大写。

例如：
=======
````smart header="Prefixed properties"
Browser-prefixed properties like `-moz-border-radius`, `-webkit-border-radius` also follow the same rule: a dash means upper case.

For instance:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## 重置样式属性

有时我们想要分配一个样式属性，稍后移除它。

例如，为了隐藏一个元素，我们可以设置 `elem.style.display = "none"`。

<<<<<<< HEAD
然后，稍后我们可能想要移除 `style.display`，就像它没有被设置一样。这里不应该使用 `delete elem.style.display`，而应该使用 `elem.style.display = ""` 将其赋值为空。

```js run
// 如果我们运行这段代码，<body> 将会闪烁
document.body.style.display = "none"; // 隐藏
=======
Then later we may want to remove the `style.display` as if it were not set. Instead of `delete elem.style.display` we should assign an empty string to it: `elem.style.display = ""`.

```js run
// if we run this code, the <body> will blink
document.body.style.display = "none"; // hide
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

setTimeout(() => document.body.style.display = "", 1000); // 恢复正常
```

<<<<<<< HEAD
如果我们将 `display` 设置为空字符串，那么浏览器通常会应用 CSS 类以及内置样式，就好像根本没有这样的 `style` 属性一样。
=======
If we set `style.display` to an empty string, then the browser applies CSS classes and its built-in styles normally, as if there were no such `style.display` property at all.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

````smart header="用 `style.cssText` 进行完全的重写"
通常，我们使用 `style.*` 来对各个样式属性进行赋值。我们不能像这样的 `div.style="color: red; width: 100px"` 设置完整的属性，因为 `div.style` 是一个对象，并且它是只读的。

想要以字符串的形式设置完整的样式，可以使用特殊属性 `style.cssText`：

```html run
<div id="div">Button</div>

<script>
  // 我们可以在这里设置特殊的样式标记，例如 "important"
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

<<<<<<< HEAD
我们很少使用这个属性，因为这样的赋值会删除所有现有样式：它不是进行添加，而是替换它们。有时可能会删除所需的内容。但是，当我们知道我们不会删除现有样式时，可以安全地将其用于新元素。
=======
This property is rarely used, because such assignment removes all existing styles: it does not add, but replaces them. May occasionally delete something needed. But we can safely use it for new elements, when we know we won't delete an existing style.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

可以通过设置一个特性（attribute）来实现同样的效果：`div.setAttribute('style', 'color: red...')`。
````

## 注意单位

<<<<<<< HEAD
不要忘记将 CSS 单位添加到值上。
=======
Don't forget to add CSS units to values.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

例如，我们不应该将 `elem.style.top` 设置为 `10`，而应将其设置为 `10px`。否则设置会无效：

```html run height=100
<body>
  <script>
  *!*
    // 无效！
    document.body.style.margin = 20;
    alert(document.body.style.margin); // ''（空字符串，赋值被忽略了）
  */!*

    // 现在添加了 CSS 单位（px）— 生效了
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

<<<<<<< HEAD
请注意：浏览器在最后几行代码中对属性 `style.margin` 进行了“解包”，并从中推断出 `style.marginLeft` 和 `style.marginTop`。
=======
Please note: the browser "unpacks" the property `style.margin` in the last lines and infers `style.marginLeft` and `style.marginTop` from it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## 计算样式：getComputedStyle

<<<<<<< HEAD
修改样式很简单。但是如何 **读取** 样式呢？
=======
So, modifying a style is easy. But how to *read* it?
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

例如，我们想知道元素的 size，margins 和 color。应该怎么获取？

**`style` 属性仅对 `"style"` 特性（attribute）值起作用，而没有任何 CSS 级联（cascade）。**

因此我们无法使用 `elem.style` 读取来自 CSS 类的任何内容。

例如，这里的 `style` 看不到 margin：

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // 空的
    alert(document.body.style.marginTop); // 空的
*/!*
  </script>
</body>
```

<<<<<<< HEAD
……但如果我们需要，例如，将 margin 增加 20px 呢？那么我们需要 margin 的当前值。
=======
...But what if we need, say, to increase the margin by `20px`? We would want the current value of it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

对于这个需求，这里有另一种方法：`getComputedStyle`。

语法如下：

```js
getComputedStyle(element, [pseudo])
```

element
: 需要被读取样式值的元素。

pseudo
: 伪元素（如果需要），例如 `::before`。空字符串或无参数则意味着元素本身。

<<<<<<< HEAD
结果是一个具有样式属性的对象，像 `elem.style`，但现在对于所有的 CSS 类来说都是如此。
=======
The result is an object with styles, like `elem.style`, but now with respect to all CSS classes.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

例如：

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // 现在我们可以读取它的 margin 和 color 了

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="计算值和解析值"
在 [CSS](https://drafts.csswg.org/cssom/#resolved-values) 中有两个概念：

<<<<<<< HEAD
1. **计算 (computed)** 样式值是所有 CSS 规则和 CSS 继承都应用后的值，这是 CSS 级联（cascade）的结果。它看起来像 `height:1em` 或 `font-size:125%`。
2. **解析 (resolved)** 样式值是最终应用于元素的样式值值。诸如 `1em` 或 `125%` 这样的值是相对的。浏览器将使用计算（computed）值，并使所有单位均为固定的，且为绝对单位，例如：`height:20px` 或 `font-size:16px`。对于几何属性，解析（resolved）值可能具有浮点，例如：`width:50.5px`。
=======
1. A *computed* style value is the value after all CSS rules and CSS inheritance is applied, as the result of the CSS cascade. It can look like `height:1em` or `font-size:125%`.
2. A *resolved* style value is the one finally applied to the element. Values like `1em` or `125%` are relative. The browser takes the computed value and makes all units fixed and absolute, for instance: `height:20px` or `font-size:16px`. For geometry properties resolved values may have a floating point, like `width:50.5px`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

很久以前，创建了 `getComputedStyle` 来获取计算（computed）值，但事实证明，解析（resolved）值要方便得多，标准也因此发生了变化。

<<<<<<< HEAD
所以，现在 `getComputedStyle` 实际上返回的是属性的解析值（resolved）。
=======
So nowadays `getComputedStyle` actually returns the resolved value of the property, usually in `px` for geometry.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```

````warn header="`getComputedStyle` 需要完整的属性名"
我们应该总是使用我们想要的确切的属性，例如 `paddingLeft`、`marginTop` 或 `borderTopWidth`。否则，就不能保证正确的结果。

例如，如果有 `paddingLeft/paddingTop` 属性，那么对于 `getComputedStyle(elem).padding`，我们会得到什么？什么都没有，或者是从已知的 padding 中“生成”的值？这里没有标准的规则。

还有其他不一致的地方。例如，在下面这个例子中，某些浏览器（Chrome）会显示 `10px`，而某些浏览器（Firefox）则没有：

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

<<<<<<< HEAD
```smart header="应用于 `:visited` 链接的样式被隐藏了！"
可以使用 CSS 伪类 `:visited` 对被访问过的链接进行着色。
=======
```smart header="Styles applied to `:visited` links are hidden!"
Visited links may be colored using `:visited` CSS pseudoclass.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

但 `getComputedStyle` 没有给出访问该颜色的方式，因为否则，任意页面都可以通过在页面上创建它，并通过检查样式来确定用户是否访问了某链接。

<<<<<<< HEAD
JavaScript 看不到 `:visited` 所应用的样式。此外，CSS 中也有一个限制，即禁止在 `:visited` 中应用更改几何形状的样式。这是为了确保一个不好的页面无法测试链接是否被访问，进而窥探隐私。
=======
JavaScript may not see the styles applied by `:visited`. And also, there's a limitation in CSS that forbids applying geometry-changing styles in `:visited`. That's to guarantee that there's no side way for an evil page to test if a link was visited and hence to break the privacy.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```

## 总结

要管理 class，有两个 DOM 属性：

- `className` — 字符串值，可以很好地管理整个类的集合。
- `classList` — 具有 `add/remove/toggle/contains` 方法的对象，可以很好地支持单个类。

要改变样式：

- `style` 属性是具有驼峰（camelCased）样式的对象。对其进行读取和修改与修改 `"style"` 特性（attribute）中的各个属性具有相同的效果。要了解如何应用 `important` 和其他特殊内容 — 在 [MDN](mdn:api/CSSStyleDeclaration) 中有一个方法列表。

- `style.cssText` 属性对应于整个 `"style"` 特性（attribute），即完整的样式字符串。

要读取已解析的（resolved）样式（对于所有类，在应用所有 CSS 并计算最终值之后）：

<<<<<<< HEAD
- `getComputedStyle(elem, [pseudo])` 返回与 `style` 对象类似的，且包含了所有类的对象。只读。
=======
- The `getComputedStyle(elem, [pseudo])` returns the style-like object with them. Read-only.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
