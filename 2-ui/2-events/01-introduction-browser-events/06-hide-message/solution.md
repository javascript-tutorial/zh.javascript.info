
我们可以使用 `position:absolute`（并使窗格 `position:relative`）或者 `float:right` 来添加按钮。`float:right` 的好处是按钮永远都不会与文本重叠，但是 `position:absolute` 则提供了更大的自由度。选择权在你自己手上。

然后，对于每个窗格（pane），代码可以像这样：
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

然后 `<button>` 变成了 `pane.firstChild`，因此我们可以像这样为它添加处理程序：

```js
pane.firstChild.onclick = () => pane.remove();
```
