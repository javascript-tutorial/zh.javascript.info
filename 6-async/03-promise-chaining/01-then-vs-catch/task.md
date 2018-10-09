# Promise: then VS catch

这两段代码片段是否相等？换句话说，对于任何处理函数在任何情况下的行为方式是否相同？

```js
promise.then(f1, f2);
```

VS;
```js
promise.then(f1).catch(f2);
```
