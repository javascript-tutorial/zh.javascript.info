libs:
  - lodash

---

# 函数绑定

当将对象方法作为回调进行传递，例如传递给 `setTimeout`，这儿会存在一个常见的问题：“丢失 `this`”。

在本章中，我们会学习如何去解决这个问题。

## 丢失 "this"

我们已经看到了丢失 `this` 的例子。一旦方法被传递到与对象分开的某个地方 —— `this` 就丢失。

下面是使用 `setTimeout` 时 `this` 是如何丢失的：

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

正如我们所看到的，输出没有像 `this.firstName` 那样显示 "John"，而显示了 `undefined`！

这是因为 `setTimeout` 获取到了函数 `user.sayHi`，但它和对象分离开了。最后一行可以被重写为：

```js
let f = user.sayHi;
setTimeout(f, 1000); // 丢失了 user 上下文
```

浏览器中的 `setTimeout` 方法有些特殊：它为函数调用设定了 `this=window`（对于 Node.js，`this` 则会变为计时器（timer）对象，但在这儿并不重要）。所以对于 `this.firstName`，它其实试图获取的是 `window.firstName`，这个变量并不存在。在其他类似的情况下，通常 `this` 会变为 `undefined`。

这个需求很典型 —— 我们想将一个对象方法传递到别的地方（这里 —— 传递到调度程序），然后在该位置调用它。如何确保在正确的上下文中调用它？

## 解决方案 1：包装器

最简单的解决方案是使用一个包装函数：

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

现在它可以正常工作了，因为它从外部词法环境中获取到了 `user`，就可以正常地调用方法了。

相同的功能，但是更简短：

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

看起来不错，但是我们的代码结构中出现了一个小漏洞。

如果在 `setTimeout` 触发之前（有一秒的延迟！）`user` 的值改变了怎么办？那么，突然间，它将调用错误的对象！


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ……user 的值在不到 1 秒的时间内发生了改变
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```

下一个解决方案保证了这样的事情不会发生。

## 解决方案 2：bind

函数提供了一个内建方法 [bind](mdn:js/Function/bind)，它可以绑定 `this`。

基本的语法是：

```js
// 稍后将会有更复杂的语法
let boundFunc = func.bind(context);
```

`func.bind(context)` 的结果是一个特殊的类似于函数的“外来对象（exotic object）”，它可以像函数一样被调用，并且透明地（transparently）将调用传递给 `func` 并设定 `this=context`。

换句话说，`boundFunc` 调用就像绑定了 `this` 的 `func`。

举个例子，这里的 `funcUser` 将调用传递给了 `func` 同时 `this=user`：

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

这里的 `func.bind(user)` 作为 `func` 的“绑定的（bound）变体”，绑定了 `this=user`。

所有的参数（arguments）都被“原样”传递给了初始的 `func`，例如：

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// 将 this 绑定到 user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John（参数 "Hello" 被传递，并且 this=user）
*/!*
```

现在我们来尝试一个对象方法：


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

// 可以在没有对象（译注：与对象分离）的情况下运行它
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// 即使 user 的值在不到 1 秒内发生了改变
// sayHi 还是会使用预先绑定（pre-bound）的值，该值是对旧的 user 对象的引用
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

在 `(*)` 行，我们取了方法 `user.sayHi` 并将其绑定到 `user`。`sayHi` 是一个“绑定后（bound）”的方法，它可以被单独调用，也可以被传递给 `setTimeout` —— 都没关系，函数上下文都会是正确的。

这里我们能够看到参数（arguments）都被“原样”传递了，只是 `this` 被 `bind` 绑定了：

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John（参数 "Hello" 被传递给了 say）
say("Bye"); // Bye, John（参数 "Bye" 被传递给了 say）
```

````smart header="便捷方法：`bindAll`"
如果一个对象有很多方法，并且我们都打算将它们都传递出去，那么我们可以在一个循环中完成所有方法的绑定：

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

JavaScript 库还提供了方便批量绑定的函数，例如 lodash 中的 [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll)。
````

## 偏函数（Partial functions）

到现在为止，我们只在谈论绑定 `this`。让我们再深入一步。

我们不仅可以绑定 `this`，还可以绑定参数（arguments）。虽然很少这么做，但有时它可以派上用场。

`bind` 的完整语法如下：

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

它允许将上下文绑定为 `this`，以及绑定函数的起始参数。

例如，我们有一个乘法函数 `mul(a, b)`：

```js
function mul(a, b) {
  return a * b;
}
```

让我们使用 `bind` 在该函数基础上创建一个 `double` 函数：

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

对 `mul.bind(null, 2)` 的调用创建了一个新函数 `double`，它将调用传递到 `mul`，将 `null` 绑定为上下文，并将 `2` 绑定为第一个参数。并且，参数（arguments）均被“原样”传递。

它被称为 [偏函数应用程序（partial function application）](https://en.wikipedia.org/wiki/Partial_application) —— 我们通过绑定先有函数的一些参数来创建一个新函数。

请注意，这里我们实际上没有用到 `this`。但是 `bind` 需要它，所以我们必须传入 `null` 之类的东西。

下面这段代码中的 `triple` 函数将值乘了三倍：

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

为什么我们通常会创建一个偏函数？

好处是我们可以创建一个具有可读性高的名字（`double`，`triple`）的独立函数。我们可以使用它，并且不必每次都提供一个参数，因为参数是被绑定了的。

另一方面，当我们有一个非常通用的函数，并希望有一个通用型更低的该函数的变体时，偏函数会非常有用。

例如，我们有一个函数 `send(from, to, text)`。然后，在一个 `user` 对象的内部，我们可能希望对它使用 `send` 的偏函数变体：从当前 user 发送 `sendTo(to, text)`。

## 在没有上下文情况下的 partial

当我们想绑定一些参数（arguments），但是这里没有上下文 `this`，应该怎么办？例如，对于一个对象方法。

原生的 `bind` 不允许这种情况。我们不可以省略上下文直接跳到参数（arguments）。

幸运的是，仅绑定参数（arguments）的函数 `partial` 比较容易实现。

像这样：

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// 用法：
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// 添加一个带有绑定时间的 partial 方法
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// 类似于这样的一些内容：
// [10:00] John: Hello!
```

`partial(func[, arg1, arg2...])` 调用的结果是一个包装器 `(*)`，它调用 `func` 并具有以下内容：
- 与它获得的函数具有相同的 `this`（对于 `user.sayNow` 调用来说，它是 `user`）
- 然后给它 `...argsBound` —— 来自于 `partial` 调用的参数（`"10:00"`）
- 然后给它 `...args` —— 给包装器的参数（`"Hello"`）

使用 spread 可以很容易实现这些操作，对吧？

此外，还有来自 lodash 库的现成的 [_.partial](https://lodash.com/docs#partial) 实现。

## 总结

方法 `func.bind(context, ...args)` 返回函数 `func` 的“绑定的（bound）变体”，它绑定了上下文 `this` 和第一个参数（如果给定了）。

通常我们应用 `bind` 来绑定对象方法的 `this`，这样我们就可以把它们传递到其他地方使用。例如，传递给 `setTimeout`。

当我们绑定一个现有的函数的某些参数时，绑定后的（不太通用的）函数被称为 **partially applied** 或 **partial**。

当我们不想一遍又一遍地重复相同的参数时，partial 非常有用。就像我们有一个 `send(from, to)` 函数，并且对于我们的任务来说，`from` 应该总是一样的，那么我们就可以搞一个 partial 并使用它。
