为了获得滚动条宽度，我们可以创建一个带有滚动条的元素，但是没有边框和内间距。

然后，它的完全宽度 `offsetWidth` 和内容课时宽度 `clientWidth` 之间的差就是滚动条的宽度：

```js run
// 创建一个包含滚动条的块
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// 必须添加到文档中，否则尺寸为0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
