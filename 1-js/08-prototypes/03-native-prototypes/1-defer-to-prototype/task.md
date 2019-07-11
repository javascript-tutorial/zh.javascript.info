importance: 5

---

# 给函数添加一个方法 “f.defer(ms)”

为所有函数的原型添加 `defer(ms)` 方法，能够在 `ms` 毫秒后执行函数。

当你完成添加后，下面的代码应该是可执行的：

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // 1 秒后显示 “Hello!”
```
