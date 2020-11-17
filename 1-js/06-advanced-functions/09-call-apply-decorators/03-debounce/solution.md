```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
```

调用 `debounce` 会返回一个包装器。当它被调用时，它会安排一个在给定的 `ms` 之后对原始函数的调用，并取消之前的此类超时。
