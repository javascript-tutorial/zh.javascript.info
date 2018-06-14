# JavaScript 中的 Mixin 模式

在 JavaScript 中，我们只能继承单个对象。每个对象只能有一个 `[[Prototype]]` 原型。并且每个类只可以扩展另外一个类。

但是有些时候这种设定（译者注：单继承）会让人感到受限制。比如说我有一个 `StreetSweeper` 类和一个 `Bicycle` 类，现在我想要一个 `StreetSweepingBicycle` 类（译者注：实现两个父类的功能）。

或者，在谈论编程的时候，我们有一个实现模板的 `Renderer` 类和一个实现事件处理的 `EventEmitter` 类，现在想要把这两个功能合并到一个 `Page` 类上以使得一个页面可以同时使用模板和触发事件。

有一个概念可以帮助我们，叫做“mixins”。

根据维基百科的定义，[mixin](https://en.wikipedia.org/wiki/Mixin) 是一个包含许多供其它类使用的方法的类，而且这个类不必是其它类的父类。

换句话说，一个 *mixin* 提供了许多实现具体行为的方法，但是我们不单独使用它，我们用它来将这些行为添加到其它类中。

## 一个 Mixin 实例

在 JavaScript 中构造一个 mixin 最简单的方式就是构造一个拥有许多实用方法的对象，通过这个对象我们可以轻易地将这些实用方法合并到任何类的原型中。

例如，这个叫做 `sayHiMixin` 的 mixin 用于给 `User` 添加一些“言语”。

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

*!*
// 用法：
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以说　hi 了
new User("Dude").sayHi(); // Hello Dude!
```

没有继承，只有一个简单的方法拷贝。因此 `User` 可以扩展其它类并且同样包含 mixin 来“mix-in”其它方法，就像这样：

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

Mixin 可以在自己内部使用继承。

比如，这里的 `sayHiMixin` 继承于 `sayMixin`： 

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // （或者，我们可以在这里通过 Object.create 来设置原型。）

  sayHi() {
    *!*
    // 调用父类中的方法
    */!*
    super.say(`Hello ${this.name}`);
  },
  sayBye() {
    super.say(`Bye ${this.name}`);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以说 hi 了
new User("Dude").sayHi(); // Hello Dude!
```

请注意在 `sayHiMixin` 内部对于父类方法 `super.say()` 的调用会在 mixin 的原型上查找方法而不是在 class 自身查找。

![](mixin-inheritance.png)

那是因为 `sayHiMixin` 内部的方法设置了 `[[HomeObject]]` 属性。因此 `super` 实际上就是 `sayHiMixin.__proto__` ，而不是 `User.__proto__`。

## EventMixin

现在让我们为了实际运用构造一个 mixin。

许多对象的重要特征是与事件一起工作。

也就是说：对象应该有一个方法在发生重要事件时“生成事件”，其它对象应该能够“监听”这样的事件。

一个事件必须有一个名称，并可以选择性的捆绑一些额外的数据。

比如说，一个 `user` 对象能够在访问者登录时产生`“login”`事件。另一个 `calendar` 对象可能在等待着接受一个这样的事件以便为登录后的用户加载日历。

或者，`menu` 在菜单选项被选择之后会产生`“select”`事件，并且其它对象可能在等待着接受事件的信息并且对事件做出反应。

事件是一种与任何想要得到信息的人分享信息的方式。它在任何类中都可以使用，因此现在为它构造一个 mixin。

```js run
let eventMixin = {
  /**
   * 订阅事件，用法：
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * 取消订阅，用法：
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * 触发事件并传递参数
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // 对应事件名没有事件处理函数。
    }

    // 调用事件处理函数
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

有三个方法：

1. `.on(eventName, handler)`——指定函数 `handler` 在具有对应事件名的事件发生时运行。这些事件处理函数存储在 `_eventHandlers` 属性中.
2. `.off(eventName, handler)`——在事件处理函数列表中移除指定的函数。
3. `.trigger(eventName, ...args)`——触发事件：所有被指定到对应事件的事件处理函数都会被调用并且 `args` 会被作为参数传递给它们。


用法:

```js run
// 新建一个 class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// 添加 mixin
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// 被选中时调用事件处理函数：
*!*
menu.on("select", value => alert(`Value selected: ${value}`));
*/!*

// 触发事件 => 展示被选中的值：123
menu.choose("123"); // 被选中的值
```

现在如果我们已经有了针对用户选择事件做出具体反应的代码，可以将代码使用 `menu.on(...)` 进行绑定。

只要我们喜欢，就可以通过 `eventMixin` 将这些行为添加到任意个数的类中而不影响继承链。

## 总结

*Mixin*——是一个通用的面向对象编程术语：一个包含其他类的方法的类。

一些其它语言比如 python 允许通过多继承实现 mixin。JavaScript 不支持多继承，但是可以通过拷贝多个类中的方法到某个类的原型中实现 mixin。

我们可以使用 mixin 作为一种通过多种行为来增强类的方式，就像我们上面看到的事件处理一样。

如果 Mixins 偶尔会重写原生类中的方法，那么 Mixins 可能会成为一个冲突点。因此通常情况下应该好好考虑 mixin 的命名，以减少这种冲突的可能性。
