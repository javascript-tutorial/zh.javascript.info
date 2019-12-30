
<<<<<<< HEAD
# 私有的和受保护的属性和方法

面向对象编程最重要的原则之一 —— 划分出外部接口和内部接口。

在开发比 “hello world” 应用更复杂的东西时，这是“必须”的做法。

为了理解这一点，让我们脱离开发过程，把目光转向现实世界。

通常，我们使用的设备非常复杂。但是划分出外部接口和内部接口可以让我们使用它们而没有任何问题。

## 一个真实的例子

例如咖啡机。从外面看很简单：一个按钮，一个显示器，几个洞……当然，结果就是 —— 很棒的咖啡！:)

![](coffee.jpg)

但在里面……（维修手册中的图片）

![](coffee-inside.jpg)

有很多细节。但我们可以在不了解的情况下使用它。

咖啡机非常可靠，不是吗？我们可以使用好几年，只有在出现问题时 —— 进行维修。

咖啡机的可靠性和简洁性的秘诀 —— 所有细节都经过精心调整并 **隐藏** 在内部。

如果我们从咖啡机上取下保护盖，那么使用它将会复杂得多（要按哪里？），并且危险（会触电）。

正如我们所看到的，在编程中，对象就像咖啡机。

但是为了隐藏内部细节，我们不会使用保护盖，而是使用语言和惯例中的特殊语法。

## 内部接口和外部接口

在面向对象的编程中，属性和方法分为两组：

- **内部接口** —— 可以通过类的其他方法访问，但不能从外部访问的方法和属性。
- **外部接口** —— 也可从类的外部访问的方法和属性。

如果我们继续用咖啡机进行类比 —— 内部隐藏的内容：锅炉管，加热元件等 —— 是其内部的接口。

内部接口用于对象，它的细节相互使用。例如，锅炉管连接到加热元件。

但是从外面看，咖啡机内部被保护罩遮住，所以没有人可以接触到。细节被隐藏起来并且无法访问。我们可以通过外部接口使用它的功能。

所以，我们需要使用一个对象时只需知道它的外部接口。我们可能完全不知道它的内部是如何工作的，这很棒。

这是个概括的介绍。

在 JavaScript 中，有两种类型的对象字段（属性和方法）：

- 公共的：可从任何地方访问。它们包含外部接口。直到现在我们只使用公共属性和方法。
- 私有的：只能从类的内部访问。这些用于内部接口。

在许多其他语言中，还存在“受保护”的字段：只能从类的内部访问和扩展它们（类似私有的，但是加上了向继承的类的访问）。它们对内部接口也很有用。它们在某种意义上比私有的属性和方法更广泛，因为我们通常希望继承类来获得正确执行扩展的访问权限。

受保护的字段不是在 Javascript 语言级别上实现的，但实际上它们非常方便，因为它们是在 Javascript 中模拟的类定义语法。

现在，我们将使用所有这些类型的属性在 Javascript 中制作咖啡机。咖啡机有很多细节，我们不会对它们进行全面模拟以保持简洁（尽管我们可以）。

## 受保护的“waterAmount”

让我们先做一个简单的咖啡机类：

```js run
class CoffeeMachine {
  waterAmount = 0; // 内部的水量
=======
# Private and protected properties and methods

One of the most important principles of object oriented programming -- delimiting internal interface from the external one.

That is "a must" practice in developing anything more complex than a "hello world" app.

To understand this, let's break away from development and turn our eyes into the real world.

Usually, devices that we're using are quite complex. But delimiting the internal interface from the external one allows to use them without problems.

## A real-life example

For instance, a coffee machine. Simple from outside: a button, a display, a few holes...And, surely, the result -- great coffee! :)

![](coffee.jpg)

But inside... (a picture from the repair manual)

![](coffee-inside.jpg)

A lot of details. But we can use it without knowing anything.

Coffee machines are quite reliable, aren't they? We can use one for years, and only if something goes wrong -- bring it for repairs.

The secret of reliability and simplicity of a coffee machine -- all details are well-tuned and *hidden* inside.

If we remove the protective cover from the coffee machine, then using it will be much more complex (where to press?), and dangerous (it can electrocute).

As we'll see, in programming objects are like coffee machines.

But in order to hide inner details, we'll use not a protective cover, but rather special syntax of the language and conventions.

## Internal and external interface

In object-oriented programming, properties and methods are split into two groups:

- *Internal interface* -- methods and properties, accessible from other methods of the class, but not from the outside.
- *External interface* -- methods and properties, accessible also from outside the class.

If we continue the analogy with the coffee machine -- what's hidden inside: a boiler tube, heating element, and so on -- is its internal interface.

An internal interface is used for the object to work, its details use each other. For instance, a boiler tube is attached to the heating element.

But from the outside a coffee machine is closed by the protective cover, so that no one can reach those. Details are hidden and inaccessible. We can use its features via the external interface.

So, all we need to use an object is to know its external interface. We may be completely unaware how it works inside, and that's great.

That was a general introduction.

In JavaScript, there are two types of object fields (properties and methods):

- Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.
- Private: accessible only from inside the class. These are for the internal interface.

In many other languages there also exist "protected" fields: accessible only from inside the class and those extending it (like private, but plus access from inheriting classes). They are also useful for the internal interface. They are in a sense more widespread than private ones, because we usually want inheriting classes to gain access to them.

Protected fields are not implemented in JavaScript on the language level, but in practice they are very convenient, so they are emulated.

Now we'll make a coffee machine in JavaScript with all these types of properties. A coffee machine has a lot of details, we won't model them to stay simple (though we could).

## Protecting "waterAmount"

Let's make a simple coffee machine class first:

```js run
class CoffeeMachine {
  waterAmount = 0; // the amount of water inside
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
  }

}

<<<<<<< HEAD
// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加入水
coffeeMachine.waterAmount = 200;
```

现在，属性 `waterAmount` 和 `power` 是公共的。我们可以轻松地从外部读取/设置它们为任何值。

让我们将 `waterAmount` 属性更改为受保护的属性以对其进行更多控制。例如，我们不希望任何人将其值设置为小于零的数。

**受保护的属性通常以下划线 `_` 作为前缀。**

这不是在语言层面强制实施的，但是有一个在程序员之间人尽皆知的惯例是不应该从外部访问这些属性和方法。

所以我们的属性将被称为 `_waterAmount` ：
=======
// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = 200;
```

Right now the properties `waterAmount` and `power` are public. We can easily get/set them from the outside to any value.

Let's change `waterAmount` property to protected to have more control over it. For instance, we don't want anyone to set it below zero.

**Protected properties are usually prefixed with an underscore `_`.**

That is not enforced on the language level, but there's a well-known convention between programmers that such properties and methods should not be accessed from the outside.

So our property will be called `_waterAmount`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

<<<<<<< HEAD
// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加入水
coffeeMachine.waterAmount = -10; // Error: Negative water
```

现在访问受到控制，因此将水量设置为小于零的数将会失败。

## 只读的“power”

对于 `power` 属性，让我们将它设为只读的。有时候一个属性必须仅在创建时设置，然后不再修改。

这就是咖啡机的实际情况：功率永远不会改变。

要做到这一点，我们只需要设置 getter，而不是 setter：
=======
// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // Error: Negative water
```

Now the access is under control, so setting the water below zero fails.

## Read-only "power"

For `power` property, let's make it read-only. It sometimes happens that a property must be set at creation time only, and then never modified.

That's exactly the case for a coffee machine: power never changes.

To do so, we only need to make getter, but not the setter:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

<<<<<<< HEAD
// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // 功率是：100W
=======
// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

coffeeMachine.power = 25; // Error (no setter)
```

<<<<<<< HEAD
````smart header="Getter/setter 函数"
这里我们使用 getter/setter 语法。

但大多数时候首选 `get.../set...` 函数，像这样：
=======
````smart header="Getter/setter functions"
Here we used getter/setter syntax.

But most of the time `get.../set...` functions are preferred, like this:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

<<<<<<< HEAD
这看起来有点长，但函数更灵活。他们可以接受多个参数（即使我们现在不需要它们）。

另一方面，get/set 语法更短，所以最终没有严格的规则，而是由你自己来决定。
````

```smart header="受保护的字段是继承的"
如果我们继承 `class MegaMachine extends CoffeeMachine`，那么无法阻止我们从新的类中的方法访问 `this._waterAmount` 或 `this._power`。

所以受保护的字段是自然可继承的。不像我们接下来将看到的私有字段。
```

## 私有的“#waterLimit”

[recent browser=none]

在标准中几乎有个已完成的 Javascript 提案，它为私有属性和方法提供语言级支持。

私有属性和方法应该以 `#` 开头。他们只能从类的内部访问。

例如，这有一个私有属性 `#waterLimit`，以及检查水量的私有方法 `#checkWater`：
=======
That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don't need them right now).

On the other hand, get/set syntax is shorter, so ultimately there's no strict rule, it's up to you to decide.
````

```smart header="Protected fields are inherited"
If we inherit `class MegaMachine extends CoffeeMachine`, then nothing prevents us from accessing `this._waterAmount` or `this._power` from the methods of the new class.

So protected fields are naturally inheritable. Unlike private ones that we'll see below.
```

## Private "#waterLimit"

[recent browser=none]

There's a finished JavaScript proposal, almost in the standard, that provides language-level support for private properties and methods.

Privates should start with `#`. They are only accessible from inside the class.

For instance, here's a private `#waterLimit` property and the water-checking private method `#checkWater`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #checkWater(value) {
    if (value < 0) throw new Error("Negative water");
    if (value > this.#waterLimit) throw new Error("Too much water");
  }
*/!*

}

let coffeeMachine = new CoffeeMachine();

*!*
<<<<<<< HEAD
// 不能从类的外部访问其私有方法
=======
// can't access privates from outside of the class
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

<<<<<<< HEAD
在语言层面，`#` 是该字段为私有的特殊标志。我们无法从外部或从继承的类中访问它。

私有字段不与公共字段发生冲突。我们可以同时拥有私有属性 `#waterAmount` 和公共属性 `waterAmount`。

例如，让 `waterAmount` 成为 `#waterAmount` 的访问器：
=======
On the language level, `#` is a special sign that the field is private. We can't access it from outside or from inheriting classes.

Private fields do not conflict with public ones. We can have both private `#waterAmount` and public `waterAmount` fields at the same time.

For instance, let's make `waterAmount` an accessor for `#waterAmount`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

<<<<<<< HEAD
与受保护的字段不同，私有字段由语言本身强制执行。这是好事。

但是如果我们继承 `CoffeeMachine`，那么我们将无法直接访问 `#waterAmount`。我们需要依赖 `waterAmount` getter / setter：

```js
class MegaCoffeeMachine extends CoffeeMachine() {
  method() {
*!*
    alert( this.#waterAmount ); // 错误：只能从 CoffeeMachine 中访问
=======
Unlike protected ones, private fields are enforced by the language itself. That's a good thing.

But if we inherit from `CoffeeMachine`, then we'll have no direct access to `#waterAmount`. We'll need to rely on `waterAmount` getter/setter:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
*/!*
  }
}
```

<<<<<<< HEAD
在许多情况下，这种限制太严重了。如果我们扩展一个 `CoffeeMachine`，我们可能有正当理由访问其内部。这就是为什么大多数时候都会使用受保护字段的原因，即使它们不受语言语法的支持。

````warn header="私有字段不能通过 this[name] 访问"
私有字段很特别。

如我们所知，通常我们可以使用 `this[name]` 访问字段：
=======
In many scenarios such limitation is too severe. If we extend a `CoffeeMachine`, we may have legitimate reasons to access its internals. That's why protected fields are used more often, even though they are not supported by the language syntax.

````warn header="Private fields are not available as this[name]"
Private fields are special.

As we know, usually we can access fields using `this[name]`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

<<<<<<< HEAD
私有字段是不可能的： `this['#name']` 不起作用。这是确保私有性的语法限制。
````

## 总结

就面向对象编程（OOP）而言，内部接口与外部接口的划分称为[封装]("https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)")。

它具有以下优点：

保护用户，使他们不会误伤自己
: 想象一下，有一群开发人员使用咖啡机。它是由“Best CoffeeMachine”公司制造的，工作正常，但保护盖被拿走了。因此内部接口暴露了出来。

    所有的开发人员都是文明的 —— 他们按照预期使用咖啡机。但其中一个人，约翰，被认为是最聪明的，并且决定让他在咖啡机内部做一些调整。然而咖啡机两天后就坏了。

    这肯定不是约翰的错，而是那个取下保护套并让约翰执行自己操作的人的错。

    编程也一样。如果一个类的使用者想要改变那些本不打算从外部改变的东西 —— 后果是不可预测的。

可支持的
: 编程的情况比现实生活中的咖啡机更复杂，因为我们不只是购买一次。代码不断经历着发展和改进。

    **如果我们严格界定内部接口，那么类的开发人员可以自由地更改其内部属性和方法，即使没有通知用户。**

    如果你是这样的类的开发者，当知道由于没有外部代码的依赖，私有方法可以安全地重命名，它们的参数可以改变，甚至可以删除是很棒的事。

    对于使用者来说，当新版本出现时，它可能是全面的内部检查，但如果外部接口相同，则仍然很容易升级。

隐藏复杂性
: 人们喜欢使用简单的东西。至少从外部来看是这样。内部的东西则是另外一回事了。

    程序员也不例外。

    **隐藏实施细节时总是很方便，并且提供了一个简单的，记录详细的外部接口。**

为了隐藏内部接口，我们使用受保护的或私有的属性：

- 受保护的字段以 `_` 开头。这是一个众所周知的惯例，没有在语言层面强制执行。程序员只应该通过它的类和它继承的类中访问以 `_` 开头的字段。
- 私有字段以 `#` 开头。JavaScript 确保我们只能访问类中的内容。

目前，在各浏览器中不支持私有字段，但可以用 polyfill 解决。
=======
With private fields that's impossible: `this['#name']` doesn't work. That's a syntax limitation to ensure privacy.
````

## Summary

In terms of OOP, delimiting of the internal interface from the external one is called [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).

It gives the following benefits:

Protection for users, so that they don't shoot themselves in the foot
: Imagine, there's a team of developers using a coffee machine. It was made by the "Best CoffeeMachine" company, and works fine, but a protective cover was removed. So the internal interface is exposed.

    All developers are civilized -- they use the coffee machine as intended. But one of them, John, decided that he's the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

    That's surely not John's fault, but rather the person who removed the protective cover and let John do his manipulations.

    The same in programming. If a user of a class will change things not intended to be changed from the outside -- the consequences are unpredictable.

Supportable
: The situation in programming is more complex than with a real-life coffee machine, because we don't just buy it once. The code constantly undergoes development and improvement.

    **If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.**

    If you're a developer of such class, it's great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.

    For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.

Hiding complexity
: People adore using things that are simple. At least from outside. What's inside is a different thing.

    Programmers are not an exception.

    **It's always convenient when implementation details are hidden, and a simple, well-documented external interface is available.**

To hide an internal interface we use either protected or private properties:

- Protected fields start with `_`. That's a well-known convention, not enforced at the language level. Programmers should only access a field starting with `_` from its class and classes inheriting from it.
- Private fields start with `#`. JavaScript makes sure we can only access those from inside the class.

Right now, private fields are not well-supported among browsers, but can be polyfilled.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
