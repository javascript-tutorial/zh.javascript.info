答案：`1` 和 `2`。

第一个处理程序会触发，因为它没有被 `removeEventListener` 移除。要移除处理程序，我们需要传递正确的所分配的函数。在代码中，传递了一个新的函数，该函数看起来相同，但仍然是另一个函数。

要移除一个函数对象，我们需要存储对它的引用，像这样：

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

无论 `addEventListener` 怎样，`button.onclick` 处理程序都会触发。
