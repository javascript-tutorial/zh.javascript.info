
我们可以使用 `position:absolute`（使 pane `position:relative`）或者 `float:right` 来添加按钮。`float:right` 的好处是按钮永远都不会重叠文本，但是 `position:absolute` 有更多的灵活性，选择权在你手上。

然后对于每个 pane 来说，代码都是如此：
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

然后 `<button>` 变成了 `pane.firstChild`，因此我们可以像这样为它添加处理器：

```js
pane.firstChild.onclick = () => pane.remove();
```
