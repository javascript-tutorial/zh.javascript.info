importance: 5

---

# 间谍装饰者

创建一个装饰者 `spy(func)`，它应该返回一个包装器，该包装器将所有对函数的调用保存在其 `calls` 属性中。 

每个调用都保存为一个参数数组。

例如：

```js
function work(a, b) {
  alert( a + b ); // work 是一个任意的函数或方法
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

<<<<<<< HEAD
P.S. 该装饰者有时对于单元测试很有用。它的高级形式是 [Sinon.JS](http://sinonjs.org/) 库中的 `sinon.spy`。
=======
P.S. That decorator is sometimes useful for unit-testing. Its advanced form is `sinon.spy` in [Sinon.JS](http://sinonjs.org/) library.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
