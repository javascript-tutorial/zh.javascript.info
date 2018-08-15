这里有很多方法，比方说：


获取 `<div>` DOM 节点：

```js
document.body.firstElementChild
// 或者
document.body.children[0]
// 或者（第一个节点是空格，所有我们拿第二个）
document.body.childNodes[1]
```

获取 `<ul>` DOM 节点：

```js
document.body.lastElementChild
// 或者
document.body.children[1]
```

获取第二个 `<li>`（即包含 Pete 的节点）

```js
// 获取 <ul>, 然后拿它的最后一个子元素
document.body.lastElementChild.lastElementChild
```
