**答案：一个错误.**

试一下：
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

这是因为设置的 `this` 的规则并没有找到对象字面量。

这里 `makeUser()` 中的 `this` 值是 `undefined`，因为它是被作为函数调用的，而不是方法调用。

对象字面量本身对于 `this` 没有影响。 `this` 的值是整个函数，代码段和对象字面量对它没有影响。

所以，`ref: this` 实际上取的是该函数当前的 `this`。

这里有个反例：

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

现在正常了，因为 `user.ref()` 是一个方法。`this` 的值是点 `.` 之前的这个对象。


