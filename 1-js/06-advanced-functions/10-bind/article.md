libs:
  - lodash

---

# 函数绑定

和对象方法或者和传递对象方法一起使用 `setTimeout` 时，有一个很常见的问题：“`this` 丢失”。

突然，`this` 就停止正常运作了。这种情况在开发的初学者中很典型，但有时也会出现在有经验开发者的代码中。

## 丢失 "this"

我们已经知道，在 JavaScript 中，`this` 很容易就会丢失。一旦一个方法被传递到另一个与对象分离的地方 —— `this` 就丢失了。

下面是使用 `setTimeout` 时 `this` 时如何丢失的：

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

正如我们看到的那样，`this.firstName` 不是输出为 "John"，而是 `undefined`！

这是因为 `setTimeout` 获取到了函数 `user.sayHi`，但它和对象分离开了。最后一行可以写为：

```js
let f = user.sayHi;
setTimeout(f, 1000); // 用户上下文丢失
```

<<<<<<< HEAD
浏览器中的方法 `setTimeout` 有些特殊：它为函数的调用设定了 `this=window`（对于 Node.JS，`this` 则会成为时间对象，但其实 this 到底变成什么并不十分重要）。所以对于 `this.firstName` 它其实试图获取的是 `window.firstName`，这个变量并不存在。在其他一些类似的情况下，通常 `this` 就会成为 `undefined`。
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases as we'll see, usually `this` just becomes `undefined`.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

这个需求很典型——我们希望将一个对象的方法传递到别的地方（这里——是为了调度程序）然后调用。如何确保它将会在正确的上下文中被调用呢？

## 解决方案 1：包装层

<<<<<<< HEAD
最简单的解决方案就是使用一个包装函数：
=======
The simplest solution is to use a wrapping function:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

现在它可以正常工作了，因为它从外部词法环境中获取到了 `user`，就可以正常的调用方法了。

相同的功能，但是更简短：

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

看起来不错，但是代码结构看上去有一些漏洞。

如果在 `setTimeout` 触发之前（一个一秒的延迟）`user` 就改变了值又会怎么样呢？那么，突然间，函数就会被的错误地调用。


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...在一秒之内
user = { sayHi() { alert("Another user in setTimeout!"); } };

// 在 setTimeout 中是另外一个 user 了？！？
```

下一个解决方案保证了这样的事情不会发生。

## 解决方案 2：bind

函数对象提供了一个内建方法 [bind](mdn:js/Function/bind)，它可以固定住 `this`。

基本的语法是：

```js
// 稍后将会有更复杂的语法
let boundFunc = func.bind(context);
```

`func.bind(context)` 的结果是一个特殊的像函数一样的“外来对象”，它可以像函数一样被调用并且透明的将调用传递给 `func` 并设置 `this=context`。


换句话说，调用 `boundFunc` 就像是调用 `func` 并且固定住了 `this`。

举个例子，这里 `funcUser` 将调用传递给了 `func` 同时 `this=user`：

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

这里 `func.bind(user)` 作为 `func` 的“边界变量”，同时固定了 `this=user`。

所有的参数都会被传递给初始的 `func`，就像本来就是调用了它一样，例如：

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// 将 this 绑定给 user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John（参数 "Hello" 被传递了，并且 this=user）
*/!*
```

下面我们来尝试一个对象的方法：


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!
```

在 `(*)` 之间的行中，我们取得了方法 `user.sayHi` 然后将它和 `user` 绑定。`sayHi` 是一个“边界”方法，它可以单独调用或者传递给 `setTimeout` —— 都没关系，函数上下文都将会是正确的。

这里我们能够看到参数都被像正常调用原函数一样被传递了进去，但是 `this` 被 `bind` 方法固定了：

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John ("Hello" 参数被传递给了函数 say)
say("Bye"); // Bye, John ("Bye" 被传递给了函数 say)
```

````smart header="Convenience method: `bindAll`"
如果一个对象有很多方法，并且我们都打算将它们传递出去使用，那么我们可以在一个循环中完成绑定：

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

JavaScript 库同样提供了方法来便捷的批量绑定，例如 lodash 中的 [_.bindAll(obj)](http://lodash.com/docs#bindAll)。
````

## 总结

方法 `func.bind(context, ...args)` 返回了一个函数 `func` 的“边界变量”，它固定了上下文 `this` 和参数（如果给定了）。

通常我们应用 `bind` 来固定对象方法的 `this`，这样我们就可以把它们传递到其他地方使用。例如，传递给 `setTimeout`。在现代开发中，需要使用`bind`的原因有很多，我们接下来将会遇到它们的。
