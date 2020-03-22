importance: 5

---

# 从对象创建树

编写一个函数 `createTree`，从嵌套对象创建一个嵌套的 `ul/li` 列表（list）。

例如：

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

语法：

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // 将树创建在 container 中
*/!*
```

结果（树）看起来像这样：

[iframe border=1 src="build-tree-dom"]

选择下面两种方式中的一种，来完成这个任务：

1. 为树创建 HTML，然后将它们赋值给 `container.innerHTML`。
2. 创建节点树，并使用 DOM 方法将它们附加（append）上去。

如果这两种方式你都做，那就太好了。

P.S. 树上不应该有“多余”的元素，例如空的 `<ul></ul>` 叶子节点。
