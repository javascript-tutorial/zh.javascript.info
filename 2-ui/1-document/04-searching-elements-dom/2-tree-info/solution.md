我们在 `<li>` 中使用循环：

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

循环时，我们需要获取每个 `li` 的文本下标。我们可以直接从第一个节点开始读取，这就是文本节点：

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

之后我们就可以获取后代 `li.getElementsByTagName('li')` 的数目。
