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
这是因为设置 `this` 的规则不考虑对象定义。只有调用那一刻才重要。

这里 `makeUser()` 中的 `this` 的值是 `undefined`，因为它是被作为函数调用的，而不是通过点符号被作为方法调用。

`this` 的值是对于整个函数的，代码段和对象字面量对它都没有影响。
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

所以 `ref: this` 实际上取的是当前函数的 `this`。

<<<<<<< HEAD
我们可以重写这个函数，并返回和上面相同的值为 `undefined` 的 `this`：

```js run
function makeUser(){
  return this; // 这次这里没有对象字面量
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
<<<<<<< HEAD
我们可以看到 `alert( makeUser().name )` 的结果和前面那个例子中 `alert( user.ref.name )` 的结果相同。

这里有个反例：
=======
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

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
现在正常了，因为 `user.ref()` 是一个方法。`this` 的值为点符号 `.` 前的这个对象。
=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
