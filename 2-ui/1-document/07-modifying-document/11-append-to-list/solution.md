
当我们需要在某处插入 HTML 时，`insertAdjacentHTML` 是最适合的方案。

解决方法：

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
