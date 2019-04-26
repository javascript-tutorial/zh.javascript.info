不同点：

<<<<<<< HEAD
1. `clientWidth` 值是数值，然而 `getComputedStyle(elem).width` 返回一个包含 `px` 的字符串。
2. `getComputedStyle` 可能返回非数值的结果，例如内联元素的 `"auto"`。
3. `clientWidth` 是元素的内部内容区域加上内间距，而 CSS 宽度（具有标准的 `box-sizing`）是内部**不包括内间距**的空间区域。
4. 如果有一个滚动条，一般浏览器保留它的空间，有的浏览器从 CSS 宽度中减去这个空间（因为它不再用于内容），而有些则不这样做。`clientWidth` 属性总是相同的：如果保留了滚动条，那么它的宽度将被删去。
=======
1. `clientWidth` is numeric, while `getComputedStyle(elem).width` returns a string with `px` at the end.
2. `getComputedStyle` may return non-numeric width like `"auto"` for an inline element.
3. `clientWidth` is the inner content area of the element plus paddings, while CSS width (with standard `box-sizing`) is the inner content area *without paddings*.
4. If there's a scrollbar and the browser reserves the space for it, some browser substract that space from CSS width (cause it's not available for content any more), and some do not. The `clientWidth` property is always the same: scrollbar size is substracted if reserved.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
