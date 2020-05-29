importance: 5

---

<<<<<<< HEAD
# 函数会选择最新的内容吗？

函数 sayHi 使用外部变量。当函数运行时，将使用哪个值？
=======
# Does a function pickup latest changes?

The function sayHi uses an external variable name. When the function runs, which value is it going to use?
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

<<<<<<< HEAD
sayHi(); // 会显示什么："John" 还是 "Pete"？
```

这种情况在浏览器和服务器端开发中都很常见。一个函数可能被计划在创建之后一段时间后才执行，例如在用户行为或网络请求之后。

因此，问题是：它会接收最新的修改吗？
=======
sayHi(); // what will it show: "John" or "Pete"?
```

Such situations are common both in browser and server-side development. A function may be scheduled to execute later than it is created, for instance after a user action or a network request.

So, the question is: does it pick up the latest changes?
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
