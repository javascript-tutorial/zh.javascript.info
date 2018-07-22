答案：`null`。


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

边界函数的上下文是硬绑定的。没有办法继续修改。

所以即使我们执行 `user.g()`，源方法调用时还是 `this=null`。
