
# 私有的和受保护的属性和方法

面向对象编程最重要的原则之一 —— 将内部接口与外部接口分隔开来。

在开发比 "hello world" 应用程序更复杂的东西时，这是“必须”遵守的做法。

为了理解这一点，让我们脱离开发过程，把目光转向现实世界。

通常，我们使用的设备都非常复杂。但是，将内部接口与外部接口分隔开来可以让我们使用它们且没有任何问题。

## 一个现实生活中的例子

例如，一个咖啡机。从外面看很简单：一个按钮，一个显示器，几个洞……当然，结果就是 —— 很棒的咖啡！:)

![](coffee.jpg)

但是在内部……（一张摘自维修手册的图片）

![](coffee-inside.jpg)

有非常多的细节。但我们可以在完全不了解这些内部细节的情况下使用它。

咖啡机非常可靠，不是吗？一台咖啡机我们可以使用好几年，只有在出现问题时 —— 把它送去维修。

咖啡机的可靠性和简洁性的秘诀 —— 所有细节都经过精心校并 **隐藏** 在内部。

如果我们从咖啡机上取下保护罩，那么使用它将变得复杂得多（要按哪里？），并且很危险（会触电）。

正如我们所看到的，在编程中，对象就像咖啡机。

但是为了隐藏内部细节，我们不会使用保护罩，而是使用语言和约定中的特殊语法。

## 内部接口和外部接口

在面向对象的编程中，属性和方法分为两组：

- **内部接口** —— 可以通过该类的其他方法访问，但不能从外部访问的方法和属性。
- **外部接口** —— 也可以从类的外部访问的方法和属性。

如果我们继续用咖啡机进行类比 —— 内部隐藏的内容：锅炉管，加热元件等 —— 是咖啡机的内部接口。

内部接口用于对象工作，它的细节相互使用。例如，锅炉管连接到加热元件。

但是从外面看，一台咖啡机被保护壳罩住了，所以没有人可以接触到其内部接口。细节信息被隐藏起来并且无法访问。我们可以通过外部接口使用它的功能。

所以，我们需要使用一个对象时只需知道它的外部接口。我们可能完全不知道它的内部是如何工作的，这太好了。

这是个概括性的介绍。

在 JavaScript 中，有两种类型的对象字段（属性和方法）：

- 公共的：可从任何地方访问。它们构成了外部接口。到目前为止，我们只使用了公共的属性和方法。
- 私有的：只能从类的内部访问。这些用于内部接口。

在许多其他编程语言中，还存在“受保护”的字段：只能从类的内部和基于其扩展的类的内部访问（例如私有的，但可以从继承的类进行访问）。它们对于内部接口也很有用。从某种意义上讲，它们比私有的属性和方法更为广泛，因为我们通常希望继承类来访问它们。

受保护的字段不是在语言级别的 Javascript 中实现的，但实际上它们非常方便，因为它们是在 Javascript 中模拟的类定义语法。

现在，我们将使用所有这些类型的属性在 Javascript 中制作咖啡机。咖啡机有很多细节，我们不会对它们进行全面模拟以保持简洁（尽管我们可以）。

## 受保护的 "waterAmount"

首先，让我们做一个简单的咖啡机类：

```js run
class CoffeeMachine {
  waterAmount = 0; // 内部的水量

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
  }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加水
coffeeMachine.waterAmount = 200;
```

现在，属性 `waterAmount` 和 `power` 是公共的。我们可以轻松地从外部将它们 get/set 成任何值。

让我们将 `waterAmount` 属性更改为受保护的属性，以对其进行更多控制。例如，我们不希望任何人将它的值设置为小于零的数。

**受保护的属性通常以下划线 `_` 作为前缀。**

这不是在语言级别强制实施的，但是程序员之间有一个众所周知的约定，即不应该从外部访问此类型的属性和方法。

所以我们的属性将被命名为 `_waterAmount`：

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加水
coffeeMachine.waterAmount = -10; // _waterAmount 将变为 0，而不是 -10
```

现在访问已受到控制，因此将水量的值设置为小于零的数变得不可能。

## 只读的 "power"

对于 `power` 属性，让我们将它设为只读。有时候一个属性必须只能被在创建时进行设置，之后不再被修改。

咖啡机就是这种情况：功率永远不会改变。

要做到这一点，我们只需要设置 getter，而不设置 setter：

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

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // 功率是：100W

coffeeMachine.power = 25; // Error（没有 setter）
```

````smart header="getter/setter 函数"
这里我们使用了 getter/setter 语法。

但大多数时候首选 `get.../set...` 函数，像这样：

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

这看起来有点长，但函数更灵活。它们可以接受多个参数（即使我们现在还不需要）。

另一方面，get/set 语法更短，所以最终没有严格的规定，而是由你自己来决定。
````

```smart header="受保护的字段是可以被继承的"
如果我们继承 `class MegaMachine extends CoffeeMachine`，那么什么都无法阻止我们从新的类中的方法访问 `this._waterAmount` 或 `this._power`。

所以受保护的字段是自然可被继承的。与我们接下来将看到的私有字段不同。
```

## 私有的 "#waterLimit"

[recent browser=none]

这儿有一个马上就会被加到规范中的已完成的 Javascript 提案，它为私有属性和方法提供语言级支持。

私有属性和方法应该以 `#` 开头。它们只在类的内部可被访问。

例如，这儿有一个私有属性 `#waterLimit` 和检查水量的私有方法 `#fixWaterAmount`：

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine();

*!*
// 不能从类的外部访问类的私有属性和方法
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

在语言级别，`#` 是该字段为私有的特殊标志。我们无法从外部或从继承的类中访问它。

私有字段与公共字段不会发生冲突。我们可以同时拥有私有的 `#waterAmount` 和公共的 `waterAmount` 字段。

例如，让我们使 `waterAmount` 成为 `#waterAmount` 的一个访问器：

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

与受保护的字段不同，私有字段由语言本身强制执行。这是好事儿。

但是如果我们继承自 `CoffeeMachine`，那么我们将无法直接访问 `#waterAmount`。我们需要依靠 `waterAmount` getter/setter：

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
*/!*
  }
}
```

在许多情况下，这种限制太严重了。如果我们扩展 `CoffeeMachine`，则可能有正当理由访问其内部。这就是为什么大多数时候都会使用受保护字段，即使它们不受语言语法的支持。

````warn header="私有字段不能通过 this[name] 访问"
私有字段很特别。

正如我们所知道的，通常我们可以使用 `this[name]` 访问字段：

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

对于私有字段来说，这是不可能的：`this['#name']` 不起作用。这是确保私有性的语法限制。
````

## 总结

就面向对象编程（OOP）而言，内部接口与外部接口的划分被称为 [封装](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))。

它具有以下优点：

保护用户，使他们不会误伤自己
: 想象一下，有一群开发人员在使用一个咖啡机。这个咖啡机是由“最好的咖啡机”公司制造的，工作正常，但是保护罩被拿掉了。因此内部接口暴露了出来。

    所有的开发人员都是文明的 —— 他们按照预期使用咖啡机。但其中的一个人，约翰，他认为自己是最聪明的人，并对咖啡机的内部做了一些调整。然而，咖啡机两天后就坏了。

    这肯定不是约翰的错，而是那个取下保护罩并让约翰进行操作的人的错。

    编程也一样。如果一个 class 的使用者想要改变那些本不打算被从外部更改的东西 —— 后果是不可预测的。

可支持性
: 编程的情况比现实生活中的咖啡机要复杂得多，因为我们不只是购买一次。我们还需要不断开发和改进代码。

    **如果我们严格界定内部接口，那么这个 class 的开发人员可以自由地更改其内部属性和方法，甚至无需通知用户。**

    如果你是这样的 class 的开发者，那么你会很高兴知道可以安全地重命名私有变量，可以更改甚至删除其参数，因为没有外部代码依赖于它们。

    对于用户来说，当新版本问世时，应用的内部可能被进行了全面检修，但如果外部接口相同，则仍然很容易升级。

隐藏复杂性
: 人们喜欢使用简单的东西。至少从外部来看是这样。内部的东西则是另外一回事了。

    程序员也不例外。

    **当实施细节被隐藏，并提供了简单且有据可查的外部接口时，总是很方便的。**

为了隐藏内部接口，我们使用受保护的或私有的属性：

- 受保护的字段以 `_` 开头。这是一个众所周知的约定，不是在语言级别强制执行的。程序员应该只通过它的类和从它继承的类中访问以 `_` 开头的字段。
- 私有字段以 `#` 开头。JavaScript 确保我们只能从类的内部访问它们。

目前，各个浏览器对私有字段的支持不是很好，但可以用 polyfill 解决。
