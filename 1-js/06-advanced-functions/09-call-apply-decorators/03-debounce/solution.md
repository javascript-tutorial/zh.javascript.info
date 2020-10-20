```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

调用 `debounce` 返回一个包装函数。 在它被调用的时候，它将设定一个 `ms` 的定时器，并清除过去的定时器，在时间结束后调用原始函数。

