解决方案：

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

换句话说：（完全高度）减去（已滚出顶部的高度）减去（可见部分的高度）—— 得到的结果就是滚动出来的底部的部分。
