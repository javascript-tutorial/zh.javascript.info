为了获得滚动条的宽度，我们可以创建一个带有滚动条的元素，但是没有边框（border）和内边距（padding）。

然后，它的全宽度 `offsetWidth` 和内部内容宽度 `clientWidth` 之间的差值就是滚动条的宽度：

```js run
// 创建一个包含滚动条的 div
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// 必须将其放入文档（document）中，否则其大小将为 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
