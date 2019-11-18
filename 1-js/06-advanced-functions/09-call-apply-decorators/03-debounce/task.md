importance: 5

---

# 去抖装饰器

`debounce(f, ms)`装饰器的结果应该是一个包装器，它每隔几毫秒调用一次 `f`。

<<<<<<< HEAD
换句话说，当我们调用 “debounced” 函数时，它保证将忽略最接近的 “ms” 内发生的情况。
=======
In other words, when we call a "debounced" function, it guarantees that all future calls to the function made less than `ms` milliseconds after the previous call will be ignored.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

例如：

```js no-beautify
let f = debounce(alert, 1000);

f(1); // 立即执行
f(2); // 忽略

setTimeout( () => f(3), 100); // 忽略 (只过去了12 ms)
setTimeout( () => f(4), 1100); // 运行
setTimeout( () => f(5), 1500); // 忽略 (离最后一次执行不超过1000 ms)
```

<<<<<<< HEAD
在实践中，当我们知道在如此短的时间内没有什么新的事情可以做时，`debounce` 对于那些用于检索/更新的函数很有用，所以最好不要浪费资源。
=======
In practice `debounce` is useful for functions that retrieve/update something when we know that nothing new can be done in such a short period of time, so it's better not to waste resources.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
