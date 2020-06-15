<<<<<<< HEAD
# 给 Shadow DOM 添加样式

shadow DOM 可以包含 `<style>` 和 `<link rel="stylesheet" href="…">` 标签。在后一种情况下，样式表是 HTTP 缓存的，因此不会为使用同一模板的多个组件重新下载样式表。

一般来说，局部样式只在 shadow 树内起作用，文档样式在 shadow 树外起作用。但也有少数例外。

## :host

 `:host` 选择器允许选择 shadow 宿主（包含 shadow 树的元素）。

例如，我们正在创建 `<custom-dialog>` 元素，并且想使它居中。为此，我们需要对 `<custom-dialog>` 元素本身设置样式。

这正是 `:host` 所能做的：
=======
# Shadow DOM styling

Shadow DOM may include both `<style>` and `<link rel="stylesheet" href="…">` tags. In the latter case, stylesheets are HTTP-cached, so they are not redownloaded for multiple components that use same template.

As a general rule, local styles work only inside the shadow tree, and document styles work outside of it. But there are few exceptions.

## :host

The `:host` selector allows to select the shadow host (the element containing the shadow tree).

For instance, we're making `<custom-dialog>` element that should be centered. For that we need to style the `<custom-dialog>` element itself.

That's exactly what `:host` does:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
<<<<<<< HEAD
    /* 这些样式将从内部应用到 custom-dialog 元素上 */
=======
    /* the style will be applied from inside to the custom-dialog element */
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

<<<<<<< HEAD
## 级联

shadow 宿主（ `<custom-dialog>` 本身）驻留在 light DOM 中，因此它受到文档 CSS 规则的影响。

如果在局部的 `:host` 和文档中都给一个属性设置样式，那么文档样式优先。

例如，如果在文档中我们有如下样式：

=======
## Cascading

The shadow host (`<custom-dialog>` itself) resides in the light DOM, so it's affected by document CSS rules.

If there's a property styled both in `:host` locally, and in the document, then the document style takes precedence.

For instance, if in the document we had:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
<<<<<<< HEAD
……那么 `<custom-dialog>` 将没有 padding。

这是非常有利的，因为我们可以在其 `:host` 规则中设置 “默认” 组件样式，然后在文档中轻松地覆盖它们。

唯一的例外是当局部属性被标记 `!important` 时，对于这样的属性，局部样式优先。
=======
...Then the `<custom-dialog>` would be without padding.

It's very convenient, as we can setup "default" component styles in its `:host` rule, and then easily override them in the document.

The exception is when a local property is labelled `!important`, for such properties, local styles take precedence.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6


## :host(selector)

<<<<<<< HEAD
与 `:host` 相同，但仅在 shadow 宿主与 `selector` 匹配时才应用样式。

例如，我们希望仅当 `<custom-dialog>` 具有 `centered` 属性时才将其居中:
=======
Same as `:host`, but applied only if the shadow host matches the `selector`.

For example, we'd like to center the `<custom-dialog>` only if it has `centered` attribute:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Centered!
</custom-dialog>

<custom-dialog>
  Not centered.
</custom-dialog>
```

<<<<<<< HEAD
现在附加的居中样式只应用于第一个对话框：`<custom-dialog centered>`。

## :host-context(selector)

与 `:host` 相同，但仅当外部文档中的 shadow 宿主或它的任何祖先节点与 `selector` 匹配时才应用样式。

例如，`:host-context(.dark-theme)` 只有在 `<custom-dialog>` 或者 `<custom-dialog>` 的任何祖先节点上有 `dark-theme` 类时才匹配：
=======
Now the additional centering styles are only applied to the first dialog: `<custom-dialog centered>`.

## :host-context(selector)

Same as `:host`, but applied only if the shadow host or any of its ancestors in the outer document matches the `selector`.

E.g. `:host-context(.dark-theme)` matches only if there's `dark-theme` class on `<custom-dialog>` on anywhere above it:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html
<body class="dark-theme">
  <!--
<<<<<<< HEAD
    :host-context(.dark-theme) 只应用于 .dark-theme 内部的 custom-dialog
=======
    :host-context(.dark-theme) applies to custom-dialogs inside .dark-theme
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
  -->
  <custom-dialog>...</custom-dialog>
</body>
```

<<<<<<< HEAD
总之，我们可以使用 `:host`-family 系列的选择器来对组件的主元素进行样式设置，具体取决于上下文。这些样式（除 `!important` 外）可以被文档样式覆盖。

## 给占槽（ slotted ）内容添加样式

现在让我们考虑有插槽的情况。

占槽元素来自 light DOM，所以它们使用文档样式。局部样式不会影响占槽内容。

在下面的例子中，按照文档样式，占槽的 `<span>` 是粗体，但是它不从局部样式中获取 `background`：

=======
To summarize, we can use `:host`-family of selectors to style the main element of the component, depending on the context. These styles (unless `!important`) can be overridden by the document.

## Styling slotted content

Now let's consider the situation with slots.

Slotted elements come from light DOM, so they use document styles. Local styles do not affect slotted content.

In the example below, slotted `<span>` is bold, as per document style, but does not take `background` from the local style:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

<<<<<<< HEAD
结果是粗体，但不是红色。

如果我们想要在我们的组件中设置占槽元素的样式，有两种选择。

首先，我们可以对 `<slot>` 本身进行样式化，并借助 CSS 继承：
=======
The result is bold, but not red.

If we'd like to style slotted elements in our component, there are two choices.

First, we can style the `<slot>` itself and rely on CSS inheritance:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

<<<<<<< HEAD
这里 `<p>John Smith</p>` 变成粗体，因为 CSS 继承在 `<slot>` 和它的内容之间有效。但是在 CSS 中，并不是所有的属性都是继承的。

另一个选项是使用 `::slotted(selector)` 伪类。它根据两个条件来匹配元素：

1. 这是一个占槽元素，来自于 light DOM。插槽名并不重要，任何占槽元素都可以，但只能是元素本身，而不是它的子元素 。
2. 该元素与 `selector` 匹配。

在我们的例子中，`::slotted(div)` 正好选择了 `<div slot="username">` ，但是没有选择它的子元素：
=======
Here `<p>John Smith</p>` becomes bold, because CSS inheritance is in effect between the `<slot>` and its contents. But in CSS itself not all properties are inherited.

Another option is to use `::slotted(selector)` pseudo-class. It matches elements based on two conditions:

1. That's a slotted element, that comes from the light DOM. Slot name doesn't matter. Just any slotted element, but only the element itself, not its children.
2. The element matches the `selector`.

In our example, `::slotted(div)` selects exactly `<div slot="username">`, but not its children:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

<<<<<<< HEAD
请注意，`::slotted` 选择器不能用于任何插槽中更深层的内容。下面这些选择器是无效的：

```css
::slotted(div span) {
  /* 我们插入的 <div> 不会匹配这个选择器 */
}

::slotted(div) p {
  /* 不能进入 light DOM 中选择元素 */
}
```

此外，`::sloated` 只能在 CSS 中使用，不能在 `querySelector` 中使用。

## 用自定义 CSS 属性作为勾子

如何在主文档中设置组件的内建元素的样式?

像 `:host` 这样的选择器应用规则到 `<custom-dialog>` 元素或 `<user-card>`，但是如何设置在它们内部的 shadow DOM 元素的样式呢？

没有选择器可以从文档中直接影响 shadow DOM 样式。但是，正如我们暴露用来与组件交互的方法那样，我们也可以暴露 CSS 变量（自定义 CSS 属性）来对其进行样式设置。

**自定义 CSS 属性存在于所有层次，包括 light DOM 和 shadow DOM。**

例如，在 shadow DOM 中，我们可以使用 `--user-card-field-color` CSS 变量来设置字段的样式，而外部文档可以设置它的值：
=======
Please note, `::slotted` selector can't descend any further into the slot. These selectors are invalid:

```css
::slotted(div span) {
  /* our slotted <div> does not match this */
}

::slotted(div) p {
  /* can't go inside light DOM */
}
```

Also, `::slotted` can only be used in CSS. We can't use it in `querySelector`.

## CSS hooks with custom properties

How do we style internal elements of a component from the main document?

Selectors like `:host` apply rules to `<custom-dialog>` element or `<user-card>`, but how to style shadow DOM elements inside them?

There's no selector that can directly affect shadow DOM styles from the document. But just as we expose methods to interact with our component, we can expose CSS variables (custom CSS properties) to style it.

**Custom CSS properties exist on all levels, both in light and shadow.**

For example, in shadow DOM we can use `--user-card-field-color` CSS variable to  style fields, and the outer document can set its value:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
<<<<<<< HEAD
    /* 如果 --user-card-field-color 没有被声明过，则取值为 black */
=======
    /* if --user-card-field-color is not defined, use black color */
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
</style>
```

<<<<<<< HEAD
然后，我们可以在外部文档中为 `<user-card>` 声明此属性：
=======
Then, we can declare this property in the outer document for `<user-card>`:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```css
user-card {
  --user-card-field-color: green;
}
```

<<<<<<< HEAD
自定义 CSS 属性穿透 shadow DOM，它们在任何地方都可见，因此内部的 `.field` 规则将使用它。

以下是完整的示例：
=======
Custom CSS properties pierce through shadow DOM, they are visible everywhere, so the inner `.field` rule will make use of it.

Here's the full example:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

<<<<<<< HEAD
## 小结

shadow DOM 可以引入样式，如 `<style>` 或 `<link rel="stylesheet">`。

局部样式可以影响：

- shadow 树,
- shadow 宿主（通过 `:host`-family 系列伪类），
- 占槽元素（来自 light DOM），`::slotted(selector)` 允许选择占槽元素本身，但不能选择它们的子元素。

文档样式可以影响：
- shadow 宿主（因为它位于外部文档中）
- 占槽元素及占槽元素的内容（因为它们同样位于外部文档中）

当 CSS 属性冲突时，通常文档样式具有优先级，除非属性被标记为 `!important`，那么局部样式优先。

CSS 自定义属性穿透 shadow DOM。它们被用作 “勾子” 来设计组件的样式：

1. 组件使用自定义 CSS 属性对关键元素进行样式设置，比如 `var(--component-name-title, <default value>)` 。
2. 组件作者为开发人员发布这些属性，它们和其他公共的组件方法一样重要。
3. 当开发人员想要对一个标题进行样式设计时，他们会为 shadow 宿主或宿主上层的元素赋值 `--component-name-title` CSS 属性。
4. 奥力给！
=======


## Summary

Shadow DOM can include styles, such as `<style>` or `<link rel="stylesheet">`.

Local styles can affect:
- shadow tree,
- shadow host with `:host`-family pseudoclasses,
- slotted elements (coming from light DOM), `::slotted(selector)` allows to select  slotted elements themselves, but not their children.

Document styles can affect:
- shadow host (as it lives in the outer document)
- slotted elements and their contents (as that's also in the outer document)

When CSS properties conflict, normally document styles have precedence, unless the property is labelled as `!important`. Then local styles have precedence.

CSS custom properties pierce through shadow DOM. They are used as "hooks" to style the component:

1. The component uses a custom CSS property to style key elements, such as `var(--component-name-title, <default value>)`.
2. Component author publishes these properties for developers, they are same important as other public component methods.
3. When a developer wants to style a title, they assign `--component-name-title` CSS property for the shadow host or above.
4. Profit!
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
