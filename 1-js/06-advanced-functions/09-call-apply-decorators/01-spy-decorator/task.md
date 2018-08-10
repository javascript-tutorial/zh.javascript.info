importance: 5

---

# 间谍装饰器

创建一个装饰器 `spy(func)`，它应该返回一个包装器，它在 `calls` 属性中保存所有函数调用。 

每个调用都保存为一个参数数组。

例如：

```js
function work(a, b) {
  alert( a + b ); // work 是一种任意的函数或方法
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

附：该装饰器有时用于单元测试，它的高级形式是 [Sinon.JS](http://sinonjs.org/) 库中的 `sinon.spy`。
