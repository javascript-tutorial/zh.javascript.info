importance: 5

---

# 延迟装饰器

创建一个装饰器 `delay(f, ms)`，将每次调用 `f` 延迟 `ms` 毫秒。

例如：

```js
function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // 在 1000 ms 后展示 "test"
f1500("test"); // 在 1500 ms 后展示 "test"
```

换句话说，`delay(f, ms)` 返回的是延迟 `ms` 后的 `f` 的变体。

在上面的代码中，`f` 是单个参数的函数，但是你的解决方案应该传递所有参数和上下文 `this`。 
