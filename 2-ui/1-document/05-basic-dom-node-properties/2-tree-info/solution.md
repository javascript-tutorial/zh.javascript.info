我们使用循环遍历 `<li>`：

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

循环时，我们需要获取每个 `li` 中的文本。

我们可以从 `li` 的第一个子节点读取文本，即文本节点：

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title 是在 <li> 中的任何其他节点之前的文本
}
```

然后我们就可以使用 `li.getElementsByTagName('li')` 来获取后代的数目了。
