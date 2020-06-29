
<<<<<<< HEAD
# 可观察的（Observable）

创建一个函数 `makeObservable(target)`，该函数通过返回一个代理“使得对象可观察”。

其工作方式如下：

```js run
function makeObservable(target) {
  /* 你的代码 */
=======
# Observable

Create a function `makeObservable(target)` that "makes the object observable" by returning a proxy.

Here's how it should work:

```js run
function makeObservable(target) {
  /* your code */
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

<<<<<<< HEAD
换句话说，`makeObservable` 返回的对象就像原始对象一样，但是具有 `observe(handler)` 方法，该方法可以将 `handler` 函数设置为在任何属性被更改时，都会被调用的函数。

每当有属性被更改时，都会使用属性的名称和属性值调用 `handler(key, value)` 函数。

P.S. 在本任务中，你可以只关注属性写入。其他的操作可以通过类似的方式实现。
=======
In other words, an object returned by `makeObservable` is just like the original one, but also has the method `observe(handler)` that sets `handler` function to be called on any property change.

Whenever a property changes, `handler(key, value)` is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
