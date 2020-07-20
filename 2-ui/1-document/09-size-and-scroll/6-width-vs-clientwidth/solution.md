不同点：

<<<<<<< HEAD
1. `clientWidth` 值是数值，而 `getComputedStyle(elem).width` 返回一个以 `px` 作为后缀的字符串。
2. `getComputedStyle` 可能会返回非数值的 width，例如内联（inline）元素的 `"auto"`。
3. `clientWidth` 是元素的内部内容区域加上 padding，而 CSS width（具有标准的 `box-sizing`）是内部内容区域，**不包括 padding**。
4. 如果有滚动条，并且浏览器为其保留了空间，那么某些浏览器会从 CSS width 中减去该空间（因为它不再可用于内容），而有些则不会这样做。`clientWidth` 属性总是相同的：如果为滚动条保留了空间，那么将减去滚动条的大小。
=======
1. `clientWidth` is numeric, while `getComputedStyle(elem).width` returns a string with `px` at the end.
2. `getComputedStyle` may return non-numeric width like `"auto"` for an inline element.
3. `clientWidth` is the inner content area of the element plus paddings, while CSS width (with standard `box-sizing`) is the inner content area *without paddings*.
4. If there's a scrollbar and the browser reserves the space for it, some browser substract that space from CSS width (cause it's not available for content any more), and some do not. The `clientWidth` property is always the same: scrollbar size is substracted if reserved.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
