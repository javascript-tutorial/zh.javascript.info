importance: 5

---

# 给函数添加一个 "f.defer(ms)" 方法

在所有函数的原型中添加 `defer(ms)` 方法，该方法将在 `ms` 毫秒后运行该函数。

当你完成添加后，下面的代码应该是可执行的：

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // 1 秒后显示 "Hello!"
```
