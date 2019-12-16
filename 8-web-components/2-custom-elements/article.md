
# Custom elements

<<<<<<< HEAD
我们可以通过描述带有自己的方法、属性和事件等的类来创建自定义 HTML 元素。

在 custom elements （自定义标签）定义完成之后，我们可以将其和 HTML 的内置标签一同使用。

这是一件好事，因为虽然 HTML 有非常多的标签，但仍然是有穷尽的。如果我们需要像 `<easy-tabs>`、`<sliding-carousel>`、`<beautiful-upload>`…… 这样的标签，内置标签并不能满足我们。

我们可以把上述的标签定义为特殊的类，然后使用它们，就好像它们本来就是 HTML 的一部分一样。

Custom elements 有两种：

1. **Autonomous custom elements （自主自定义标签）** —— "全新的" 元素, 继承自 `HTMLElement` 抽象类.
2. **Customized built-in elements （自定义内置元素）** —— 继承内置的 HTML 元素，比如自定义 `HTMLButtonElement` 等。

我们将会先创建 autonomous 元素，然后再创建 customized built-in 元素。

在创建 custom elements 的时候，我们需要告诉浏览器一些细节，包括：如何展示它，以及在添加元素到页面和将其从页面移除的时候需要做什么，等等。

通过创建一个带有几个特殊方法的类，我们可以完成这件事。这非常容易实现，我们只需要添加几个方法就行了，同时这些方法都不是必须的。

下面列出了这几个方法的概述：
=======
We can create custom HTML elements, described by our class, with its own methods and properties, events and so on.

Once a custom element is defined, we can use it on par with built-in HTML elements.

That's great, as HTML dictionary is rich, but not infinite. There are no `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Just think of any other tag we might need.

We can define them with a special class, and then use as if they were always a part of HTML.

There are two kinds of custom elements:

1. **Autonomous custom elements** -- "all-new" elements, extending the abstract `HTMLElement` class.
2. **Customized built-in elements** -- extending built-in elements, like a customized button, based on `HTMLButtonElement` etc.

First we'll cover autonomous elements, and then move to customized built-in ones.

To create a custom element, we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page, etc.

That's done by making a class with special methods. That's easy, as there are only few methods, and all of them are optional.

Here's a sketch with the full list:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
<<<<<<< HEAD
    // 元素在这里创建
  }

  connectedCallback() {
    // 在元素被添加到文档之后，浏览器会调用这个方法
    //（如果一个元素被反复添加到文档／移除文档，那么这个方法会被多次调用）
  }

  disconnectedCallback() {
    // 在元素从文档移除到时候，浏览器会调用这个方法
    // （如果一个元素被反复添加到文档／移除文档，那么这个方法会被多次调用）
  }

  static get observedAttributes() {
    return [/* 属性数组，这些属性的变化会被被监视 */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 当上面数组里面的属性变化的时候，这个方法会被调用
  }

  adoptedCallback() {
    // 在元素被移动到新的文档的时候，这个方法会被调用
    // （document.adoptNode 会用到, 非常少见）
  }

  // 还可以添加更多的元素方法和属性
}
```

在申明了上面几个方法之后，我们需要注册元素：

```js
// 让浏览器知道我们新定义的类是为 <my-element> 服务的
customElements.define("my-element", MyElement);
```

现在当任何带有 `<my-element>` 标签的元素被创建的时候，一个 `MyElement` 的实例也会被创建，并且前面提到的方法也会被调用。我们同样可以使用 `document.createElement('my-element')` 在 JavaScript 里创建元素。

```smart header="Custom element 名称必须包括一个短横线 `-`"
Custom element 名称必须包括一个短横线 `-`, 比如 `my-element` 和 `super-button` 都是有效的元素名，但 `myelement` 并不是。

这是为了确保 custom element 和内置 HTML 元素之间不会发生命名冲突。
```

## 例子: "time-formatted"

举个例子，HTML 里面已经有 `<time>` 元素了，用于显示日期／时间。但是这个标签本身并不会对时间进行任何格式化处理。

让我们来创建一个可以展示适用于当前浏览器语言的时间格式的 `<time-formatted>` 元素：
=======
    // element created
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
```

After that, we need to register the element:

```js
// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
```

Now for any HTML elements with tag `<my-element>`, an instance of `MyElement` is created, and the aforementioned methods are called. We also can `document.createElement('my-element')` in JavaScript.

```smart header="Custom element name must contain a hyphen `-`"
Custom element name must have a hyphen `-`, e.g. `my-element` and `super-button` are valid names, but `myelement` is not.

That's to ensure that there are no name conflicts between built-in and custom HTML elements.
```

## Example: "time-formatted"

For example, there already exists `<time>` element in HTML, for date/time. But it doesn't do any formatting by itself.

Let's create `<time-formatted>` element that displays the time in a nice, language-aware format:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd


```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

<<<<<<< HEAD
1. 这个类只有一个方法 `connectedCallback()` —— 在 `<time-formatted>` 元素被添加到页面的时候，浏览器会调用这个方法（或者当 HTML 解析器检测到它的时候），它使用了内置的时间格式化工具 [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)，这个工具可以非常好地展示格式化之后的时间，在各浏览器中兼容性都非常好。
2. 我们需要通过 `customElements.define(tag, class)` 来注册这个新元素。
3. 接下来在任何地方我们都可以使用这个新元素了。


```smart header="Custom elements 升级"
如果浏览器在 `customElements.define` 之前的任何地方见到了 `<time-formatted>` 元素，并不会报错。但会把这个元素当作未知元素，就像任何非标准标签一样。

`:not(:defined)` CSS 选择器可以对这样「未定义」的元素加上样式。

当 `customElement.define` 被调用的时候，他们被「升级」了：一个新的 `TimeFormatted` 元素为每一个标签创建了，并且 `connectedCallback` 被调用。 他们变成了 `:defined`。

我们可以通过这些方法来获取更多的自定义标签的信息：
- `customElements.get(name)` —— 返回指定 custom element  `name` 的类。
- `customElements.whenDefined(name)` -- 返回一个 promise，将会在这个具有给定 `name` 的 custom element 变为已定义状态的时候 resolve（不带值）。

```

```smart header="在 `connectedCallback` 中渲染，而不是 `constructor` 中"
在上面的例子中，元素里面的内容是在 `connectedCallback` 中渲染（创建）的。

为什么不在 `constructor` 中渲染？

原因很简单：在 `constructor` 被调用的时候，还为时过早。虽然这个元素实例已经被创建了，但还没有插入页面。在这个阶段，浏览器还没有处理／创建元素属性：调用 `getAttribute` 将会得到 `null`。所以我们并不能在那里渲染元素。

而且，如果你仔细考虑，这样作对于性能更好 —— 推迟渲染直到真正需要的时候。

在元素被添加到文档的时候，它的 `connectedCallback` 方法会被调用。这个元素不仅仅是被添加为了另一个元素的子元素，同样也成为了页面的一部分。因此我们可以构建分离的 DOM，创建元素并且让它们为之后的使用准备好。它们只有在插入页面的时候才会真的被渲染。
```

## 监视属性

我们目前的 `<time-formatted>` 实现中，在元素渲染以后，后续的属性变化并不会带来任何影响。这对于 HTML 元素来说有点奇怪。通常当我们改变一个属性的时候，比如 `a.href`，我们会预期立即看到变化。我们将会在下面修正这一点。

为了监视这些属性，我们可以在 `observedAttributes()` static getter 中提供属性列表。当这些属性发生变化的时候，`attributeChangedCallback` 会被调用。出于性能优化的考虑，其他属性变化的时候并不会触发这个回调方法。

以下是 `<time-formatted>` 的新版本，它会在属性变化的时候自动更新：
=======
1. The class has only one method `connectedCallback()` -- the browser calls it when `<time-formatted>` element is added to page (or when HTML parser detects it), and it uses the built-in [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) data formatter, well-supported across the browsers, to show a nicely formatted time.
2. We need to register our new element by `customElements.define(tag, class)`.
3. And then we can use it everywhere.


```smart header="Custom elements upgrade"
If the browser encounters any `<time-formatted>` elements before `customElements.define`, that's not an error. But the element is yet unknown, just like any non-standard tag.

Such "undefined" elements can be styled with CSS selector `:not(:defined)`.

When `customElement.define` is called, they are "upgraded": a new instance of `TimeFormatted`
is created for each, and `connectedCallback` is called. They become `:defined`.

To get the information about custom elements, there are methods:
- `customElements.get(name)` -- returns the class for a custom element with the given `name`,
- `customElements.whenDefined(name)` -- returns a promise that resolves (without value) when a custom element with the given `name` becomes defined.
```

```smart header="Rendering in `connectedCallback`, not in `constructor`"
In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

The reason is simple: when `constructor` is called, it's yet too early. The element is created, but the browser did not yet process/assign attributes at this stage: calls to `getAttribute` would return `null`. So we can't really render there.

Besides, if you think about it, that's better performance-wise -- to delay the work until it's really needed.

The `connectedCallback` triggers when the element is added to the document. Not just appended to another element as a child, but actually becomes a part of the page. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.
```

## Observing attributes

In the current implementation of `<time-formatted>`, after the element is rendered, further attribute changes don't have any effect. That's strange for an HTML element. Usually, when we change an attribute, like `a.href`, we expect the change to be immediately visible. So let's fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter. For such attributes, `attributeChangedCallback` is called when they are modified. It doesn't trigger for an attribute for performance reasons.

Here's a new `<time-formatted>`, that auto-updates when attributes change:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

<<<<<<< HEAD
1. 渲染逻辑被移动到了 `render()` 这个辅助方法里面。
2. 这个方法在元素被插入到页面的时候调用。
3. `attributeChangedCallback` 在 `observedAttributes()` 里的属性改变的时候被调用。
4. …… 然后重渲染元素。
5. 最终，一个计时器就这样被我们轻松地实现了。

## 渲染顺序

在 HTML 解析器构建 DOM 的时候，会按照先后顺序处理元素，先处理父级元素再处理子元素。例如，如果我们有 `<outer><inner></inner></outer>`，那么 `<outer>` 元素会首先被创建并接入到 DOM，然后才是 `<inner>`。

这对 custom elements 产生了重要影响。

比如，如果一个 custom element 想要在 `connectedCallback` 内访问 `innerHTML`，它什么也拿不到:
=======
1. The rendering logic is moved to `render()` helper method.
2. We call it once when the element is inserted into page.
3. For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4. ...and re-renders the element.
5. At the end, we can easily make a live timer.

## Rendering order

When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. if we have `<outer><inner></inner></outer>`, then `<outer>` element is created and connected to DOM first, and then `<inner>`.

That leads to important consequences for custom elements.

For example, if a custom element tries to access `innerHTML` in `connectedCallback`, it gets nothing:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // empty (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

<<<<<<< HEAD
如果你运行上面的代码，`alert` 出来的内容是空的。

这正是因为在那个阶段，子元素还不存在，DOM 还没有完成构建。HTML 解析器先连接 custom element `<user-info>`，然后再处理子元素，但是那时候子元素还并没有加载上。

如果我们要给 custom element 传入信息，我们可以使用元素属性。它们是即时生效的。

或者，如果我们需要子元素，我们可以使用延迟时间为零的 `setTimeout` 来推迟访问子元素。

这样是可行的：
=======
If you run it, the `alert` is empty.

That's exactly because there are no children on that stage, the DOM is unfinished. HTML parser connected the custom element `<user-info>`, and is going to proceed to its children, but just didn't yet.

If we'd like to pass information to custom element, we can use attributes. They are available immediately.

Or, if we really need the children, we can defer access to them with zero-delay `setTimeout`.

This works:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

<<<<<<< HEAD
现在 `alert` 在 `(*)` 行展示了 「John」，因为我们是在 HTML 解析完成之后，才异步执行了这段程序。我们在这个时候处理必要的子元素并且结束初始化过程。

另一方面，这个方案并不是完美的。如果嵌套的 custom element 同样使用了 `setTimeout` 来初始化自身，那么它们会按照先后顺序执行：外层的 `setTimeout` 首先触发，然后才是内层的。

这样外层元素还是早于内层元素结束初始化。

让我们用一个例子来说明：
=======
Now the `alert` in line `(*)` shows "John", as we run it asynchronously, after the HTML parsing is complete. We can process children if needed and finish the initialization.

On the other hand, this solution is also not perfect. If nested custom elements also use `setTimeout` to initialize themselves, then they queue up: the outer `setTimeout` triggers first, and then the inner one.

So the outer element finishes the initialization before the inner one.

Let's demonstrate that on example:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
<<<<<<< HEAD
    alert(`${this.id} 已连接。`);
    setTimeout(() => alert(`${this.id} 初始化完成。`));
=======
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

<<<<<<< HEAD
输出顺序：

1. outer 已连接。
2. inner 已连接。
2. outer 初始化完成。
4. inner 初始化完成。

我们可以很明显地看到外层元素并没有等待内层元素。

并没有任何内置的回调方法可以在嵌套元素渲染好之后通知我们。但我们可以自己实现这样的回调。比如，内层元素可以分派像 `initialized` 这样的事件，同时外层的元素监听这样的事件并做出响应。

## Customized built-in elements

我们创建的 `<time-formatted>` 这些新元素，并没有任何相关的语义。搜索引擎并不知晓它们的存在，同时无障碍设备也无法处理它们。

但上述两点同样是非常重要的。比如，搜索引擎会对这些事情感兴趣，比如我们真的展示了时间。或者如果我们创建了一个特别的按钮，为什么不复用已有的 `<button>` 功能呢？

我们可以通过继承内置元素的类来扩展和定制它们。

比如，按钮是 `HTMLButtonElement` 的实例，让我们在这个基础上创建元素。

1. 我们的类继承自 `HTMLButtonElement`：

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element 方法 */ }
    ```

2. 给 `customElements.define` 提供定义标签的第三个参数：
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```
    这一步是必要的，因为不同的标签会共享同一个类。

3. 最后，插入一个普通的 `<button>` 标签，但添加 `is="hello-button"` 到这个元素，这样就可以使用我们的 custom element：
=======
Output order:

1. outer connected.
2. inner connected.
3. outer initialized.
4. inner initialized.

We can clearly see that the outer element finishes initialization `(3)` before the inner one `(4)`.

There's no built-in callback that triggers after nested elements are ready. If needed, we can implement such thing on our own. For instance, inner elements can dispatch events like `initialized`, and outer ones can listen and react on them.

## Customized built-in elements

New elements that we create, such as `<time-formatted>`, don't have any associated semantics. They are unknown to search engines, and accessibility devices can't handle them.

But such things can be important. E.g, a search engine would be interested to know that we actually show a time. And if we're making a special kind of button, why not reuse the existing `<button>` functionality?

We can extend and customize built-in HTML elements by inheriting from their classes.

For example, buttons are instances of `HTMLButtonElement`, let's build upon it.

1. Extend `HTMLButtonElement` with our class:

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element methods */ }
    ```

2. Provide an third argument to `customElements.define`, that specifies the tag:
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    There may be different tags that share the same DOM-class, that's why specifying `extends` is needed.

3. At the end, to use our custom element, insert a regular `<button>` tag, but add `is="hello-button"` to it:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
    ```html
    <button is="hello-button">...</button>
    ```

<<<<<<< HEAD
下面是一个完整的例子：

```html run autorun="no-epub"
<script>
// 这个按钮在被点击的时候说 "hello"
=======
Here's a full example:

```html run autorun="no-epub"
<script>
// The button that says "hello" on click
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Click me</button>
*/!*

*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

<<<<<<< HEAD
我们新定义的按钮继承了内置按钮，所以它拥有和内置按钮相同的样式和标准特性，比如 `disabled` 属性。

## 引用参考

- HTML 现行标准： <https://html.spec.whatwg.org/#custom-elements>。
- 兼容性： <https://caniuse.com/#feat=custom-elements>。

## 总结

有两种 custom element：

1. "Autonomous" —— 全新的标签，继承 `HTMLElement`。

    定义方式：
=======
Our new button extends the built-in one. So it keeps the same styles and standard features like `disabled` attribute.

## References

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblity: <https://caniuse.com/#feat=custom-elements>.

## Summary

Custom elements can be of two types:

1. "Autonomous" -- new tags, extending `HTMLElement`.

    Definition scheme:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```

<<<<<<< HEAD
2. "Customized built-in elements" —— 已有元素的扩展。

    需要多一个 `.define` 参数，同时 `is="..."` 在 HTML 中：
=======
2. "Customized built-in elements" -- extensions of existing elements.

    Requires one more `.define` argument, and `is="..."` in HTML:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

<<<<<<< HEAD
Custom element 在各浏览器中的兼容性已经非常好了。Edge 支持地相对较差，但是我们可以使用 polyfill <https://github.com/webcomponents/webcomponentsjs>。
=======
Custom elements are well-supported among browsers. Edge is a bit behind, but there's a polyfill <https://github.com/webcomponents/webcomponentsjs>.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
