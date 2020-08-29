# Shadow DOM 和事件（events）

Shadow tree 背后的思想是封装组件的内部实现细节。

假设，在 `<user-card>` 组件的 shadow DOM 内触发一个点击事件。但是主文档内部的脚本并不了解 shadow DOM 内部，尤其是当组件来自于第三方库。

所以，为了保持细节简单，浏览器会**重新定位**（retarget）事件。

**当事件在组件外部捕获时，shadow DOM 中发生的事件将会以 host 元素作为目标。**

这里有个简单的例子：

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>
```

如果你点击了 button，就会出现以下信息：

1. Inner target: `BUTTON` —— 内部事件处理程序获取了正确的目标，即 shadow DOM 中的元素。
2. Outer target: `USER-CARD` —— 文档事件处理程序以 shadow host 作为目标。

事件重定向是一件很棒的事情，因为外部文档并不需要知道组件的内部情况。从它的角度来看，事件是发生在 `<user-card>`。

**如果事件发生在 slotted 元素上，实际存在于 light DOM 上，则不会发生重定向。**

例如，在下面的例子中，如果用户点击了 `<span slot="username">`，那么对于 shadow 和 light 处理程序来说，事件目标就是当前这个 `span` 元素。

```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">John Smith</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
</script>
```

如果单击事件发生在 `"John Smith"` 上，则对于内部和外部处理程序来说，其目标是 `<span slot="username">`。这是 light DOM 中的元素，所以没有重定向。

另一方面，如果单击事件发生在源自 shadow DOM 的元素上，例如，在 `<b>Name</b>` 上，然后当它冒泡出 shadow DOM 后，其 `event.target` 将重置为 `<user-card>`。

## 冒泡（bubbling）, event.composedPath()

出于事件冒泡的目的，使用扁平 DOM（flattened DOM）。

所以，如果我们有一个 slot 元素，并且事件发生在它的内部某个地方，那么它就会冒泡到 `<slot>` 并继续向上。

使用 `event.composedPath()` 获得原始事件目标的完整路径以及所有 shadow 元素。正如我们从方法名称中看到的那样，该路径是在组合（composition）之后获取的。

在上面的例子中，扁平 DOM 是：

```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
```


因此，对于 `<span slot="username">` 上的点击事件，会调用 `event.composedPath()` 并返回一个数组：[`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]。在组合之后，这正是扁平 DOM 中目标元素的父链。

```warn header="Shadow 树详细信息仅提供给 `{mode:'open'}` 树"
如果 shadow 树是用 `{mode: 'closed'}` 创建的，那么组合路径就从 host 开始：`user-card` 及其更上层。

这与使用 shadow DOM 的其他方法的原理类似。closed 树内部是完全隐藏的。
```


## event.composed

大多数事件能成功冒泡到 shadow DOM 边界。很少有事件不能冒泡到 shadow DOM 边界。

这由 `composed` 事件对象属性控制。如果 `composed` 是 `true`，那么事件就能穿过边界。否则它仅能在 shadow DOM 内部捕获。

如果你浏览一下 [UI 事件规范](https://www.w3.org/TR/uievents) 就知道，大部分事件都是 `composed: true`：

- `blur`，`focus`，`focusin`，`focusout`，
- `click`，`dblclick`，
- `mousedown`，`mouseup` `mousemove`，`mouseout`，`mouseover`，
- `wheel`，
- `beforeinput`，`input`，`keydown`，`keyup`。

所有触摸事件（touch events）及指针事件（pointer events）都是 `composed: true`。

但也有些事件是 `composed: false` 的：

- `mouseenter`，`mouseleave`（它们根本不会冒泡），
- `load`，`unload`，`abort`，`error`，
- `select`，
- `slotchange`。

这些事件仅能在事件目标所在的同一 DOM 中的元素上捕获，

## 自定义事件（Custom events）

当我们发送（dispatch）自定义事件，我们需要设置 `bubbles` 和 `composed` 属性都为 `true` 以使其冒泡并从组件中冒泡出来。

例如，我们在 `div#outer` shadow DOM 内部创建 `div#inner` 并在其上触发两个事件。只有 `composed: true` 的那个自定义事件才会让该事件本身冒泡到文档外面：

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

## 总结

事件仅仅是在它们的 `composed` 标志设置为 `true` 的时候才能通过 shadow DOM 边界。

内建事件大部分都是 `composed: true` 的，正如相关规范所描述的那样：

- UI 事件 <https://www.w3.org/TR/uievents>。
- Touch 事件 <https://w3c.github.io/touch-events>。
- Pointer 事件 <https://www.w3.org/TR/pointerevents>。
- ……等等。

也有些内建事件它们是 `composed: false` 的：

- `mouseenter`，`mouseleave`（也不冒泡），
- `load`，`unload`，`abort`，`error`，
- `select`，
- `slotchange`。

这些事件仅能在同一 DOM 中的元素上捕获。

如果我们发送一个 `CustomEvent`，那么我们应该显式地设置 `composed: true`。

请注意，如果是嵌套组件，一个 shadow DOM 可能嵌套到另外一个 shadow DOM 中。在这种情况下合成事件冒泡到所有 shadow DOM 边界。因此，如果一个事件仅用于直接封闭组件，我们也可以在 shadow host 上发送它并设置 `composed: false`。这样它就不在组件 shadow DOM 中，也不会冒泡到更高级别的 DOM。
