**答案：一个错误。**

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

<<<<<<< HEAD
这是因为设置的 `this` 的规则并没有找到对象字面量。

这里 `makeUser()` 中的 `this` 值是 `undefined`，因为它是被作为函数调用的，而不是方法调用。

对象字面量本身对于 `this` 没有影响。`this` 的值是整个函数，代码段和对象字面量对它没有影响。
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

<<<<<<< HEAD
现在正常了，因为 `user.ref()` 是一个方法。`this` 的值设置为点 `.` 之前的这个对象。


=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
