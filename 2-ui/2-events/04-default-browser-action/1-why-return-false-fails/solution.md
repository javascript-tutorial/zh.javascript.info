当浏览器像 `onclick` 一样读取 `on*` 属性时，它会根据其内容创建处理器。

对 `onclick="handler()"` 来说函数是：

```js
function(event) {
  handler() // the content of onclick
}
```

现在我们可以看到 `handler()` 返回值没有被使用，也没有对结果产生影响。

修复方法很简单：

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="http://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

也可以像这样使用 `event.preventDefault()`：

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="http://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
