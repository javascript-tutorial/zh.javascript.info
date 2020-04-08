
# 可观察的（Observable）

创建一个函数 `makeObservable(target)`，该函数通过返回一个代理“使得对象可观察”。

其工作方式如下：

```js run
function makeObservable(target) {
  /* 你的代码 */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

换句话说，`makeObservable` 返回的对象就像原始对象一样，但是具有 `observe(handler)` 方法，该方法可以将 `handler` 函数设置为在任何属性被更改时，都会被调用的函数。

每当有属性被更改时，都会使用属性的名称和属性值调用 `handler(key, value)` 函数。

P.S. 在本任务中，你可以只关注属性写入。其他的操作可以通过类似的方式实现。
