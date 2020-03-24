# 外角

外角就是我们从 [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect) 获取的。

`answer1` 为左上角的坐标，`answer2` 为右下角的坐标：

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# 左上的内角坐标

内角与外角主要的不同在于边框的宽度。一种获取距离的可靠的方法是 `clientLeft/clientTop`：

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# 右下的内角坐标

在我们的例子中，我们需要把外部坐标减去边框（border）大小。

我们可以使用 CSS 的方式：

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

另一种方式是把 `clientWidth/clientHeight` 和左上角的坐标相加。这个方式相较于上一个或许更好：

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
