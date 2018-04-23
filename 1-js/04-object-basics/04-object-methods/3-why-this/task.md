importance: 3

---

# 解释 "this" 的值

在下面的代码中，我们试图连续调用 4 次 `user.go()` 方法。

但是 `(1)` 和 `(2)` 次 `(3)` 和 `(4)` 调用结果不同，为什么呢？

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

