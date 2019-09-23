<<<<<<< HEAD
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
=======
# Mixins

In JavaScript we can only inherit from a single object. There can be only one `[[Prototype]]` for an object. And a class may extend only one other class.

But sometimes that feels limiting. For instance, we have a class `StreetSweeper` and a class `Bicycle`, and want to make their mix: a `StreetSweepingBicycle`.

Or we have a class `User` and a class `EventEmitter` that implements event generation, and we'd like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.

There's a concept that can help here, called "mixins".

As defined in Wikipedia, a [mixin](https://en.wikipedia.org/wiki/Mixin) is a class containing methods that can be used by other classes without a need to inherit from it.

In other words, a *mixin* provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes.

## A mixin example

The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.

For instance here the mixin `sayHiMixin` is used to add some "speech" for `User`:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27

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
<<<<<<< HEAD
// 用法：
=======
// usage:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

<<<<<<< HEAD
// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以说　hi 了
new User("Dude").sayHi(); // Hello Dude!
```

没有继承，只有一个简单的方法拷贝。因此 `User` 可以扩展其它类并且同样包含 mixin 来“mix-in”其它方法，就像这样：
=======
// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

There's no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to "mix-in" the additional methods, like this:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

<<<<<<< HEAD
Mixin 可以在自己内部使用继承。

比如，这里的 `sayHiMixin` 继承于 `sayMixin`：
=======
Mixins can make use of inheritance inside themselves.

For instance, here `sayHiMixin` inherits from `sayMixin`:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
<<<<<<< HEAD
  __proto__: sayMixin, // （或者，我们可以在这里通过 Object.create 来设置原型。）

  sayHi() {
    *!*
    // 调用父类中的方法
    */!*
    super.say(`Hello ${this.name}`);
  },
  sayBye() {
    super.say(`Bye ${this.name}`);
=======
  __proto__: sayMixin, // (or we could use Object.create to set the prototype here)

  sayHi() {
    *!*
    // call parent method
    */!*
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

<<<<<<< HEAD
// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以说 hi 了
new User("Dude").sayHi(); // Hello Dude!
```

请注意在 `sayHiMixin` 内部对于父类方法 `super.say()` 的调用会在 mixin 的原型上查找方法而不是在 class 自身查找。

![](mixin-inheritance.svg)

那是因为 `sayHiMixin` 内部的方法设置了 `[[HomeObject]]` 属性。因此 `super` 实际上就是 `sayHiMixin.__proto__` ，而不是 `User.__proto__`。

## EventMixin

现在让我们为了实际运用构造一个 mixin。

许多对象的重要特征是与事件一起工作。

也就是说：对象应该有一个方法在发生重要事件时“生成事件”，其它对象应该能够“监听”这样的事件。

一个事件必须有一个名称，并可以选择性的捆绑一些额外的数据。

比如说，一个 `user` 对象能够在访问者登录时产生`“login”`事件。另一个 `calendar` 对象可能在等待着接受一个这样的事件以便为登录后的用户加载日历。

或者，`menu` 在菜单选项被选择之后会产生 `"select"` 事件，并且其它对象可能在等待着接受事件的信息并且对事件做出反应。

事件是一种与任何想要得到信息的人分享信息的方式。它在任何类中都可以使用，因此现在为它构造一个 mixin。
=======
// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

Please note that the call to the parent method `super.say()` from `sayHiMixin` (at lines labelled with `(*)`) looks for the method in the prototype of that mixin, not the class.

Here's the diagram (see the right part):

![](mixin-inheritance.svg)

That's because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So even though they got copied, their `[[HomeObject]]` internal property references `sayHiMixin`, as shown on the picture above.

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.

## EventMixin

Now let's make a mixin for real life.

An important feature of many browser objects (for instance) is that they can generate events. Events is a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from `.trigger` call.
- ...And the method `.off(name, handler)` that removes `handler` listener.

After adding the mixin, an object `user` will become able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen to such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27

```js run
let eventMixin = {
  /**
<<<<<<< HEAD
   * 订阅事件，用法：
=======
   * Subscribe to event, usage:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
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
<<<<<<< HEAD
   * 取消订阅，用法：
=======
   * Cancel the subscription, usage:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
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
<<<<<<< HEAD
   * 触发事件并传递参数
=======
   * Generate an event with the given name and data
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
<<<<<<< HEAD
      return; // 对应事件名没有事件处理函数。
    }

    // 调用事件处理函数
=======
      return; // no handlers for that event name
    }

    // call the handlers
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

<<<<<<< HEAD
有三个方法：

1. `.on(eventName, handler)` — 指定函数 `handler` 在具有对应事件名的事件发生时运行。这些事件处理函数存储在 `_eventHandlers` 属性中。
2. `.off(eventName, handler)` — 在事件处理函数列表中移除指定的函数。
3. `.trigger(eventName, ...args)` — 触发事件：所有被指定到对应事件的事件处理函数都会被调用并且 `args` 会被作为参数传递给它们。

用法：

```js run
// 新建一个 class
=======

- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name happens. Technically, there's `_eventHandlers` property, that stores an array of handlers for each event name. So it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.

Usage:

```js run
// Make a class
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
<<<<<<< HEAD
// 添加 mixin
=======
// Add the mixin with event-related methods
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

<<<<<<< HEAD
// 被选中时调用事件处理函数：
=======
// add a handler, to be called on selection:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
*!*
menu.on("select", value => alert(`Value selected: ${value}`));
*/!*

<<<<<<< HEAD
// 触发事件 => 展示被选中的值：123
menu.choose("123"); // 被选中的值
```

现在如果我们已经有了针对用户选择事件做出具体反应的代码，可以将代码使用 `menu.on(...)` 进行绑定。

只要我们喜欢，就可以通过 `eventMixin` 将这些行为添加到任意个数的类中而不影响继承链。

## 总结

*Mixin* — 是一个通用的面向对象编程术语：一个包含其他类的方法的类。

一些其它语言比如 python 允许通过多继承实现 mixin。JavaScript 不支持多继承，但是可以通过拷贝多个类中的方法到某个类的原型中实现 mixin。

我们可以使用 mixin 作为一种通过多种行为来增强类的方式，就像我们上面看到的事件处理一样。

如果 Mixins 偶尔会重写原生类中的方法，那么 Mixins 可能会成为一个冲突点。因此通常情况下应该好好考虑 mixin 的命名，以减少这种冲突的可能性。
=======
// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
```

Now if we'd like any code to react on menu selection, we can listen to it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain.

## Summary

*Mixin* -- is a generic object-oriented programming term: a class that contains methods for other classes.

Some other languages like allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that.
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
