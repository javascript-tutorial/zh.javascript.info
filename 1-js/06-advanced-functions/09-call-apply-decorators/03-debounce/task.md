importance: 5

---

# Debounce decorator

`debounce(f, ms)`装饰器的结果应该是一个包装器，它每隔几毫秒调用一次 `f`。

换句话说，当我们称之为 “debounced” 函数时，它保证将忽略最接近的 “ms” 内发生的情况。

例如：

```js no-beautify
let f = debounce(alert, 1000);

f(1); // runs immediately
f(2); // ignored

setTimeout( () => f(3), 100); // ignored ( only 100 ms passed )
setTimeout( () => f(4), 1100); // runs
setTimeout( () => f(5), 1500); // ignored (less than 1000 ms from the last run)
```

实际上，当我们知道在如此短的时间内无法完成任何事情时，`debounce` 对于检索/更新某些功能非常有用，因此最好不要浪费资源。
