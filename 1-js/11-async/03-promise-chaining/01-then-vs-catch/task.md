# Promise：then 对比 catch

这两个代码片段是否相等？换句话说，对于任何处理程序（handler），它们在任何情况下的行为都相同吗？

```js
promise.then(f1).catch(f2);
```

对比：

```js
promise.then(f1, f2);
```
