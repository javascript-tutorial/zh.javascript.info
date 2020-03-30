这里有很多种方法，例如：


获取 `<div>` DOM 节点：

```js
document.body.firstElementChild
// 或
document.body.children[0]
// 或（第一个节点是空格，所以我们应该获取的是第二个）
document.body.childNodes[1]
```

获取 `<ul>` DOM 节点：

```js
document.body.lastElementChild
// 或
document.body.children[1]
```

获取第二个 `<li>`（即包含 Pete 的节点）：

```js
// 获取 <ul>，然后获取它的最后一个子元素
document.body.lastElementChild.lastElementChild
```
