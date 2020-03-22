
首先，让我们看看 **错误** 的做法：

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

这是行不通的，因为调用 `remove()` 会从首端开始移除 `elem.childNodes` 集合中的元素，因此，元素每次都从索引 `0` 开始。但是 `i` 在增加，所以元素就被跳过了。

用 `for..of` 循环的结果也跟上面一样。

正确的做法是：

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

还有一种更简单的方法，也可以达到我们所要的效果：

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
