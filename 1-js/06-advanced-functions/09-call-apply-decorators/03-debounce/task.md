importance: 5

---

# 去抖装饰器

`debounce(f, ms)` 装饰器的结果应该是一个包装器，它最多允许每隔 “ms” 毫秒调用一次 `f`。

<<<<<<< HEAD
换句话说，当我们多次调用 “debounced” 函数时，它保证忽略距离上次调用在 “ms” 毫秒内的调用。
=======
In other words, when we call a "debounced" function, it guarantees that all future calls to the function made less than `ms` milliseconds after the previous call will be ignored.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

例如：

```js no-beautify
let f = debounce(alert, 1000);

f(1); // 立即执行
f(2); // 忽略

setTimeout( () => f(3), 100); // 忽略（只过去了 100 ms）
setTimeout( () => f(4), 1100); // 运行
setTimeout( () => f(5), 1500); // 忽略（离上一次执行不超过 1000 ms）
```

<<<<<<< HEAD
在实践中，对于那些用于检索/更新的函数而言，当我们知道在短时间内基本不会有什么新内容的时候，`debounce` 就显得很有用，所以最好不要浪费资源。
=======
In practice `debounce` is useful for functions that retrieve/update something when we know that nothing new can be done in such a short period of time, so it's better not to waste resources.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8
