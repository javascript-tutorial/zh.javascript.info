重点：5

---

# 利用对象创建节点树

编写一个函数 `createTree` 将嵌套的对象生成 `ul/li` 的嵌套列表。

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
      "redbud": {},
      "magnolia": {}
    }
  }
};
```

语句：

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // 在 container 中创建树。
*/!*
```

结果（树）看起来像这样：

[iframe border=1 src="build-tree-dom"]

选择其中一种方式来完成这个任务：

1. 通过树创建 HTML 然后派发给 `container.innerHTML`。
2. 创建节点树然后插入到 DOM 中。

如果两种方式都尝试一下就更好。

P.S. 树应该没有“额外”的元素，像空的 `<ul></ul>` 没有列表项。
