解决方式：

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

换句话说：（完全高度）减去（已滚动的高度）减去（可见部分的高度）— 得到的结果就是下方隐藏部分的高度。
