The answer: `1` 和 `2`。

第一个处理器会触发，因为它没有被 `removeEventListener` 移除。要移除处理器，我们需要传递正确分发的函数。在代码中，传递一个新的函数，看起来相同，但仍然是另一个函数。

要移除函数对象，我们需要存储对它的引用，就像这样：

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

处理器 `button.onclick` 除了 `addEventListener` 以外，应该独立工作。
