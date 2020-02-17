importance: 3

---

# 解释 "this" 的值

<<<<<<< HEAD
在下面的代码中，我们试图连续调用 `obj.go()` 方法 4 次。
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

但是前两次和后两次调用的结果不同，为什么呢？

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

