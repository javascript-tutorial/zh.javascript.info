importance: 5

---

# 函数会选择最新的内容吗？

函数 sayHi 使用外部变量。当函数运行时，将使用哪个值？

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // 会显示什么："John" 还是 "Pete"？
```

这种情况在浏览器和服务器端开发中都很常见。一个函数可能被安排在被创建之后一段时间后才执行，例如在用户操作或网络请求之后。

因此，问题是：它会接收最新的修改吗？
