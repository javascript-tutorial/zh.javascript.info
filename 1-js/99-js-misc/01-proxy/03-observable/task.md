
# Observable

<<<<<<< HEAD
创建一个通过返回代理“使对象可观察”的 `makeObservable(target)` 函数。

它的工作方式如下：
=======
Create a function `makeObservable(target)` that "makes the object observable" by returning a proxy.

Here's how it should work:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function makeObservable(target) {
  /* your code */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

<<<<<<< HEAD
user.name = "John"; // alerts：设置 name 属性为 John
```

换句话说，`makeObservable` 返回的对象就像原始对象一样，但是也具有将 `handler` 函数设置为在任何属性更改时都被调用的方法 `observe(handler)` 。

每当属性更改时，都会使用属性的名称和值调用 `handler(key, value)` 。

P.S. 在此任务中，请仅注意写入属性。可以以类似方式实现其他操作。
=======
user.name = "John"; // alerts: SET name=John
```

In other words, an object returned by `makeObservable` is just like the original one, but also has the method `observe(handler)` that sets `handler` function to be called on any property change.

Whenever a property changes, `handler(key, value)` is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
