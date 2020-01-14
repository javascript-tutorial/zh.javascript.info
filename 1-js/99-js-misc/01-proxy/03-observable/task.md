
# Observable

创建一个通过返回代理“使对象可观察”的 `makeObservable(target)` 函数。

它的工作方式如下：

```js run
function makeObservable(target) {
  /* your code */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts：设置 name 属性为 John
```

换句话说，`makeObservable` 返回的对象就像原始对象一样，但是也具有将 `handler` 函数设置为在任何属性更改时都被调用的方法 `observe(handler)` 。

每当属性更改时，都会使用属性的名称和值调用 `handler(key, value)` 。

P.S. 在此任务中，请仅注意写入属性。可以以类似方式实现其他操作。
