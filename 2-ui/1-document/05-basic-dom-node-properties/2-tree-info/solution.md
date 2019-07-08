我们在 `<li>` 中使用循环：

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

<<<<<<< HEAD:2-ui/1-document/04-searching-elements-dom/2-tree-info/solution.md
循环时，我们需要获取每个 `li` 的文本下标。我们可以直接从第一个节点开始读取，这就是文本节点：
=======
In the loop we need to get the text inside every `li`.

We can read the text from the first child node of `li`, that is the text node:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d:2-ui/1-document/05-basic-dom-node-properties/2-tree-info/solution.md

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

<<<<<<< HEAD:2-ui/1-document/04-searching-elements-dom/2-tree-info/solution.md
之后我们就可以获取后代 `li.getElementsByTagName('li')` 的数目。
=======
Then we can get the number of descendants as `li.getElementsByTagName('li').length`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d:2-ui/1-document/05-basic-dom-node-properties/2-tree-info/solution.md
