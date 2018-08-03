
首先我们看看**错误**的做法：

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

这是无效的，因为调用 `remove()` 从前面开始移除 `elem.childNodes` 集合里元素，元素的起始下标一直都是 `0`，但是 `i` 却一直在增长，有的元素会直接被忽略了。

用 `for..of` 循环的结果也跟上面一样。

正确的做法是：

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

这里还有一种更简便的方法，也能达到我们需要的效果。

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
