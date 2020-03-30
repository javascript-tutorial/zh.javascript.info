当浏览器读取诸如 `onclick` 之类的 `on*` 特性（attribute）时，浏览器会根据其内容创建对应的处理程序。

对于 `onclick="handler()"` 来说，函数是：

```js
function(event) {
  handler() // onclick 的内容
}
```

现在我们可以看到 `handler()` 的返回值并没有被使用，也没有对结果产生影响。

修复起来很简单：

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

我们也可以使用 `event.preventDefault()`，像这样：

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
