不同点：

1. `clientWidth` 值是数值，然而 `getComputedStyle(elem).width` 返回一个包含 `px` 的字符串。
2. `getComputedStyle` 可能返回非数值的结果，例如内联元素的 `"auto"`。
3. `clientWidth` 是元素的内部内容区域加上内间距，而 CSS 宽度（具有标准的 `box-sizing`）是内部 * 不包括内间距 * 的空间区域。
4. 如果有一个滚动条，一般浏览器保留它的空间，有的浏览器从 CSS 宽度中减去这个空间（因为它不再用于内容），而有些则不这样做。`clientWidth` 属性总是相同的：如果保留了滚动条，那么它的宽度将被删去。
