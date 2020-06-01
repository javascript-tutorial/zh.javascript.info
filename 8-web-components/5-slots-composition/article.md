<<<<<<< HEAD
# Shadow DOM 插槽，组成

许多类型的组件，例如标签、菜单、照片库等等，需要内容去渲染。

就像浏览器内建的 `<select>` 需要 `<option>` 子项，我们的 `<custom-tabs>` 可能需要实际的标签内容来起作用。并且一个 `<custom-menu>` 可能需要菜单子项。

使用了 `<custom-menu>` 的代码如下所示：
=======
# Shadow DOM slots, composition

Many types of components, such as tabs, menus, image galleries, and so on, need the content to render.

Just like built-in browser `<select>` expects `<option>` items, our `<custom-tabs>` may expect the actual tab content to be passed. And a `<custom-menu>` may expect menu items.

The code that makes use of `<custom-menu>` can look like this:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<custom-menu>
  <title>Candy menu</title>
  <item>Lollipop</item>
  <item>Fruit Toast</item>
  <item>Cup Cake</item>
</custom-menu>
```

<<<<<<< HEAD
……之后，我们的组件应该正确地渲染成具有给定标题和项目、处理菜单事件等的漂亮菜单。

如何实现呢？

我们可以尝试分析元素内容并动态复制重新排列 DOM 节点。这是可能的，但是如果我们要将元素移动到 Shadow DOM，那么文档的 CSS 样式不能在那里应用，因此文档的视觉样式可能会丢失。看起来还需要做一些事情。

幸运的是我们不需要去做。Shadow DOM 支持 `<slot>` 元素，由 light DOM 中的内容自动填充。

## 具名插槽

让我们通过一个简单的例子看下插槽是如何工作的。

在这里 `<user-card>` shadow DOM 提供两个插槽, 从 light DOM 填充：
=======
...Then our component should render it properly, as a nice menu with given title and items, handle menu events, etc.

How to implement it?

We could try to analyze the element content and dynamically copy-rearrange DOM nodes. That's possible, but if we're moving elements to shadow DOM, then CSS styles from the document do not apply in there, so the visual styling may be lost. Also that requires some coding.

Luckily, we don't have to. Shadow DOM supports `<slot>` elements, that are automatically filled by the content from light DOM.

## Named slots

Let's see how slots work on a simple example.

Here, `<user-card>` shadow DOM provides two slots, filled from light DOM:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html run autorun="no-epub" untrusted height=80
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Name:
*!*
        <slot name="username"></slot>
*/!*
      </div>
      <div>Birthday:
*!*
        <slot name="birthday"></slot>
*/!*
      </div>
    `;
  }
});
</script>

<user-card>
  <span *!*slot="username"*/!*>John Smith</span>
  <span *!*slot="birthday"*/!*>01.01.2001</span>
</user-card>
```

<<<<<<< HEAD
在 shadow DOM 中，`<slot name="X">` 定义了一个“插入点”，一个带有 `slot="X"` 的元素被渲染的地方。

然后浏览器执行”组合“：它从 light DOM 中获取元素并且渲染到 shadow DOM 中的对应插槽中。最后，正是我们想要的 —— 一个能被填充数据的通用组件。

这是编译后，不考虑组合的 DOM 结构：
=======
In the shadow DOM, `<slot name="X">` defines an "insertion point", a place where elements with `slot="X"` are rendered.

Then the browser performs "composition": it takes elements from the light DOM and renders them in corresponding slots of the shadow DOM. At the end, we have exactly what we want -- a component that can be filled with data.

Here's the DOM structure after the script, not taking composition into account:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

<<<<<<< HEAD
我们创建了 shadow DOM，所以它当然就存在了，位于 `#shadow-root` 之下。现在元素同时拥有 light DOM 和 shadow DOM。

为了渲染 shadow DOM 中的每一个 `<slot name="...">` 元素，浏览器在 light DOM 中寻找相同名字的 `slot="..."`。这些元素在插槽内被渲染：

![](shadow-dom-user-card.svg)

结果被叫做扁平化（flattened）DOM：
=======
We created the shadow DOM, so here it is, under `#shadow-root`. Now the element has both light and shadow DOM.

For rendering purposes, for each `<slot name="...">` in shadow DOM, the browser looks for `slot="..."` with the same name in the light DOM. These elements are rendered inside the slots:

![](shadow-dom-user-card.svg)

The result is called "flattened" DOM:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <!-- slotted element is inserted into the slot -->
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
```

<<<<<<< HEAD
……但是 "flattened" DOM 仅仅被创建用来渲染和事件处理，是“虚拟”的。虽然是渲染出来了，但文档中的节点事实上并没有到处移动！

如果我们调用 `querySelector` 那就很容易验证：节点仍在它们的位置。

```js
// light DOM <span> 节点位置依然不变，在 `<user-card>` 里
alert( document.querySelector('user-card span').length ); // 2
```

因此，扁平化 DOM 是通过插入插槽从 shadow DOM 派生出来的。浏览器渲染它并且用于样式继承、事件传播。但是 JavaScript 在展平前仍按原样看到文档。

````warn header="仅顶层子元素可以设置 slot=\"...\" 特性"
`slot="..."` 属性仅仅对 shadow host 的直接子代 (在我们的例子中的 `<user-card>` 元素) 有效。对于嵌套元素它将被忽略。

例如，这里的第二个 `<span>` 被忽略了(因为它不是 `<user-card>` 的顶层子元素)：
=======
...But the flattened DOM exists only for rendering and event-handling purposes. It's kind of "virtual". That's how things are shown. But the nodes in the document are actually not moved around!

That can be easily checked if we run `querySelectorAll`: nodes are still at their places.

```js
// light DOM <span> nodes are still at the same place, under `<user-card>`
alert( document.querySelectorAll('user-card span').length ); // 2
```

So, the flattened DOM is derived from shadow DOM by inserting slots. The browser renders it and uses for style inheritance, event propagation (more about that later). But JavaScript still sees the document "as is", before flattening.

````warn header="Only top-level children may have slot=\"...\" attribute"
The `slot="..."` attribute is only valid for direct children of the shadow host (in our example, `<user-card>` element). For nested elements it's ignored.

For example, the second `<span>` here is ignored (as it's not a top-level child of `<user-card>`):
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
```html
<user-card>
  <span slot="username">John Smith</span>
  <div>
    <!-- invalid slot, must be direct child of user-card -->
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```
````

<<<<<<< HEAD
如果在 light DOM 里有多个相同插槽名的元素，那么它们会被一个接一个地添加到插槽中。

例如这样：
=======
If there are multiple elements in light DOM with the same slot name, they are appended into the slot, one after another.

For example, this:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
```html
<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
```

<<<<<<< HEAD
给这个扁平化 DOM 两个元素，插入到 `<slot name="username">` 里：
=======
Gives this flattened DOM with two elements in `<slot name="username">`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John</span>
        <span slot="username">Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
</user-card>
```

<<<<<<< HEAD
## 插槽后备内容

如果我们在一个 `<slot>` 内部放点什么，它将成为后备内容。如果 light DOM 中没有相应填充物的话浏览器就展示它。

例如，在这里的 shadow DOM 中，如果 light DOM 中没有 `slot="username"` 的话 `Anonymous` 就被渲染。
=======
## Slot fallback content

If we put something inside a `<slot>`, it becomes the fallback, "default" content. The browser shows it if there's no corresponding filler in light DOM.

For example, in this piece of shadow DOM, `Anonymous` renders if there's no `slot="username"` in light DOM.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

<<<<<<< HEAD
## 默认插槽：第一个不具名的插槽

shadow DOM 中第一个没有名字的 `<slot>` 是一个默认插槽。它从 light DOM 中获取没有放置在其他位置的所有节点。

例如，让我们把默认插槽添加到 `<user-card>`，该位置可以收集有关用户的所有未开槽（unslotted）的信息：
=======
## Default slot: first unnamed

The first `<slot>` in shadow DOM that doesn't have a name is a "default" slot. It gets all nodes from the light DOM that aren't slotted elsewhere.

For example, let's add the default slot to our `<user-card>` that shows all unslotted information about the user:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html run autorun="no-epub" untrusted height=140
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
*!*
      <slot></slot>
*/!*
    </fieldset>
    `;
  }
});
</script>

<user-card>
*!*
  <div>I like to swim.</div>
*/!*
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
*!*
  <div>...And play volleyball too!</div>
*/!*
</user-card>
```

<<<<<<< HEAD
所有未被插入的 light DOM 内容进入 “其他信息” 字段集。

元素一个接一个的附加到插槽中，因此这两个未插入插槽的信息都在默认插槽中。

扁平化的 DOM 看起来像这样：
=======
All the unslotted light DOM content gets into the "Other information" fieldset.

Elements are appended to a slot one after another, so both unslotted pieces of information are in the default slot together.

The flattened DOM looks like this:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>About me</legend>
*!*
      <slot>
        <div>Hello</div>
        <div>I am John!</div>
      </slot>
*/!*
    </fieldset>
</user-card>
```

## Menu example

<<<<<<< HEAD
现在让我们回到在本章开头提到的 `<custom-menu>` 。

我们可以使用插槽来分配元素。

这是 `<custom-menu>`：
=======
Now let's back to `<custom-menu>`, mentioned at the beginning of the chapter.

We can use slots to distribute elements.

Here's the markup for `<custom-menu>`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<custom-menu>
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
  <li slot="item">Cup Cake</li>
</custom-menu>
```

<<<<<<< HEAD
带有适当插槽的 shadow DOM 模版：
=======
The shadow DOM template with proper slots:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

<<<<<<< HEAD
1. `<span slot="title">` 进入 `<slot name="title">`。
2. 模版中有许多 `<li slot="item">`，但是只有一个 `<slot name="item">`。因此所有带有 `slot="item"` 的元素都一个接一个地附加到 `<slot name="item">` 上，从而形成列表。

扁平化的 DOM 变为：
=======
1. `<span slot="title">` goes into `<slot name="title">`.
2. There are many `<li slot="item">` in the template, but only one `<slot name="item">` in the template. So all such `<li slot="item">` are appended to `<slot name="item">` one after another, thus forming the list.

The flattened DOM becomes:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html
<custom-menu>
  #shadow-root
    <style> /* menu styles */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Candy menu</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Lollipop</li>
          <li slot="item">Fruit Toast</li>
          <li slot="item">Cup Cake</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

<<<<<<< HEAD
可能会注意到，在有效的 DOM 中，`<li>` 必须是 `<ul>` 的直接子代。但这是扁平化的 DOM，它描述了组件的渲染方式，这样的事情在这里自然发生。

我们只需要添加一个 `click` 事件处理程序来打开/关闭列表，并且 `<custom-menu>` 准备好了：
=======
One might notice that, in a valid DOM, `<li>` must be a direct child of `<ul>`. But that's flattened DOM, it describes how the component is rendered, such thing happens naturally here.

We just need to add a `click` handler to open/close the list, and the `<custom-menu>` is ready:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl is the shadow DOM template (above)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // we can't select light DOM nodes, so let's handle clicks on the slot
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // open/close the menu
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
```

<<<<<<< HEAD
这是完整的演示：

[iframe src="menu" height=140 edit]

当然我们可以为它添加更多的功能：事件、方法等。

## 更新插槽

如果外部代码想动态 添加/移除 菜单项怎么办？

**如果 添加/删除 了插槽元素，浏览器将监视插槽并更新渲染。**

另外，由于不复制 light DOM 节点，而是仅在插槽中进行渲染，所以内部的变化是立即可见的。

因此我们无需执行任何操作即可更新渲染。但是如果组件想知道插槽的更改，那么可以用 `slotchange` 事件。

例如，这里的菜单项在 1 秒后动态插入，而且标题在 2 秒后改变。
=======
Here's the full demo:

[iframe src="menu" height=140 edit]

Of course, we can add more functionality to it: events, methods and so on.

## Updating slots

What if the outer code wants to add/remove menu items dynamically?

**The browser monitors slots and updates the rendering if slotted elements are added/removed.**

Also, as light DOM nodes are not copied, but just rendered in slots, the changes inside them immediately become visible.

So we don't have to do anything to update rendering. But if the component code wants to know about slot changes, then `slotchange` event is available.

For example, here the menu item is inserted dynamically after 1 second, and the title changes after 2 seconds:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html run untrusted height=80
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot can't have event handlers, so using the first child
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lollipop</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "New menu";
}, 2000);
</script>
```

<<<<<<< HEAD
菜单每次都会更新渲染而无需我们干预。

这里有两个 `slotchange` 事件：

1. 在初始化时:

    `slotchange: title` 立即触发, 因为来自 light DOM 的 `slot="title"` 进入了相应的插槽。
2. 1 秒后:

    `slotchange: item` 触发, 当一个新的 `<li slot="item">` 被添加。

请注意：2 秒后，如果修改了 `slot="title"` 的内容，则不会发生 `slotchange` 事件。因为没有插槽更改。我们修改了 slotted 元素的内容，这是另一回事。

如果我们想通过 JavaScript 跟踪 light DOM 的内部修改，也可以使用更通用的机制: [MutationObserver](info:mutation-observer)。

## 插槽 API

最后让我们来谈谈与插槽相关的 JavaScript 方法。

正如我们之前所见，JavaScript 会查看真实的 DOM，不展开。但是如果 shadow 树有 `{mode: 'open'}` ，那么我们可以找出哪个元素被放进一个插槽，反之亦然，哪个插槽分配了给这个元素：

- `node.assignedSlot` -- 返回 `node` 分配给的 `<slot>` 元素。
- `slot.assignedNodes({flatten: true/false})` -- 分配给插槽的 DOM 节点。默认情况下，`flatten` 选项为 `false`。如果显式地设置为 `true`，则它将更深入地查看扁平化 DOM ，如果嵌套了组件，则返回嵌套的插槽，如果未分配节点，则返回备用内容。
- `slot.assignedElements({flatten: true/false})` -- 分配给插槽的 DOM 元素（与上面相同，但仅元素节点）。

当我们不仅需要显示已插入内容的内容，还需要在 JavaScript 中对其进行跟踪时，这些方法非常有用。

例如，如果 `<custom-menu>` 组件想知道它所显示的内容，那么它可以跟踪 `slotchange` 并从 `slot.assignedElements` 获取：
=======
The menu rendering updates each time without our intervention.

There are two `slotchange` events here:

1. At initialization:

    `slotchange: title` triggers immediately, as the `slot="title"` from the light DOM gets into the corresponding slot.
2. After 1 second:

    `slotchange: item` triggers, when a new `<li slot="item">` is added.

Please note: there's no `slotchange` event after 2 seconds, when the content of `slot="title"` is modified. That's because there's no slot change. We modify the content inside the slotted element, that's another thing.

If we'd like to track internal modifications of light DOM from JavaScript, that's also possible using a more generic mechanism: [MutationObserver](info:mutation-observer).

## Slot API

Finally, let's mention the slot-related JavaScript methods.

As we've seen before, JavaScript looks at the "real" DOM, without flattening. But, if the shadow tree has `{mode: 'open'}`, then we can figure out which elements assigned to a slot and, vise-versa, the slot by the element inside it:

- `node.assignedSlot` -- returns the `<slot>` element that the `node` is assigned to.
- `slot.assignedNodes({flatten: true/false})` -- DOM nodes, assigned to the slot. The `flatten` option is `false` by default. If explicitly set to `true`, then it looks more deeply into the flattened DOM, returning nested slots in case of nested components and the fallback content if no node assigned.
- `slot.assignedElements({flatten: true/false})` -- DOM elements, assigned to the slot (same as above, but only element nodes).

These methods are useful when we need not just show the slotted content, but also track it in JavaScript.

For example, if `<custom-menu>` component wants to know, what it shows, then it could track `slotchange` and get the items from `slot.assignedElements`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

<<<<<<< HEAD
    // 插槽能被添加/删除/代替
=======
    // slottable is added/removed/replaced
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
*!*
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
*/!*
  }
});

<<<<<<< HEAD
// items 在 1 秒后更新
=======
// items update after 1 second
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
}, 1000);
</script>
```


<<<<<<< HEAD
## 小结

通常，如果一个元素含有 shadow DOM，那么其 light DOM 就不会被展示出来。插槽允许在 shadow DOM 中显示 light DOM 子元素。

插槽有两种：

- 具名插槽：`<slot name="X">...</slot>` - 使用 `slot="X"` 获取 light 子元素。
- 默认插槽：第一个没有名字的 `<slot>`（随后的未命名插槽将被忽略）- 接受不是插槽的 light 子元素。
- 如果同一插槽中有很多元素 - 它们会被一个接一个地添加。
- `<slot>` 元素的内容作为备用。如果插槽没有 light 型的子元素，就会显示。

在其槽内渲染插槽元素的过程称为“组合”。结果称为“扁平化 DOM”。

组合不会真实的去移动节点，从 JavaScript 的视角看 DOM 仍然是相同的。

JavaScript 可以使用以下的方法访问插槽：
- `slot.assignedNodes/Elements()` - 返回插槽内的 节点/元素。
- `node.assignedSlot` - 相反的方法，返回一个节点的插槽。

如果我们想知道显示的内容，可以使用以下方法跟踪插槽位的内容：
- `slotchange` 事件 - 在插槽第一次填充时触发，并且在插槽元素的 添加/删除/替换 操作（而不是其子元素）时触发，插槽是 `event.target` 。
- 使用 [MutationObserver](info:mutation-observer) 来深入了解插槽内容，并查看其中的更改。

现在，在 shadow DOM 中有来自 light DOM 的元素时，让我们看看如何正确的设置样式。基本规则是 shadow 元素在内部设置样式，light 元素在外部设置样式，但是有一些例外。

我们将在下一章中看到详细内容。
=======
## Summary

Usually, if an element has shadow DOM, then its light DOM is not displayed. Slots allow to show elements from light DOM in specified places of shadow DOM.

There are two kinds of slots:

- Named slots: `<slot name="X">...</slot>` -- gets light children with `slot="X"`.
- Default slot: the first `<slot>` without a name (subsequent unnamed slots are ignored) -- gets unslotted light children.
- If there are many elements for the same slot -- they are appended one after another.
- The content of `<slot>` element is used as a fallback. It's shown if there are no light children for the slot.

The process of rendering slotted elements inside their slots is called "composition". The result is called a "flattened DOM".

Composition does not really move nodes, from JavaScript point of view the DOM is still same.

JavaScript can access slots using methods:
- `slot.assignedNodes/Elements()` -- returns nodes/elements inside the `slot`.
- `node.assignedSlot` -- the reverse meethod, returns slot by a node.

If we'd like to know what we're showing, we can track slot contents using:
- `slotchange` event -- triggers the first time a slot is filled, and on any add/remove/replace operation of the slotted element, but not its children. The slot is `event.target`.
- [MutationObserver](info:mutation-observer) to go deeper into slot content, watch changes inside it.

Now, as we know how to show elements from light DOM in shadow DOM, let's see how to style them properly. The basic rule is that shadow elements are styled inside, and light elements -- outside, but there are notable exceptions.

We'll see the details in the next chapter.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
