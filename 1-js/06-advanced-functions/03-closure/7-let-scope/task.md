importance: 4

---

<<<<<<< HEAD
# 变量可见吗？

下面这段代码的结果会是什么？
=======
# Is variable visible?

What will be the result of this code?
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

<<<<<<< HEAD
P.S. 这个任务有一个陷阱。解决方案并不明显。
=======
P.S. There's a pitfall in this task. The solution is not obvious.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
