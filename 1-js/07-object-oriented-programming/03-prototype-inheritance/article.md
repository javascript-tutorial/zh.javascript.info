# 原型继承

在编程中，我们经常想要获取并扩展一些事情。

例如，我们有一个 `user` 对象及其属性和方法。而且希望将 `admin` 和 `guest` 作为它稍加修改的变体。我们希望重用 `user` 所拥有的内容，而不是复制/实现它的方法，只需要在其上创建一个新的对象。

**原型继承**的语言特性可以帮助我们实现这一需求。

## [[Prototype]]

在 JavaScript 中， 对象有一个特殊的隐藏属性 `[[Prototype]]`（如规范中说描述的），即 `null` 或者是另一个引用对象。该对象叫作 "a prototype"：

![prototype](object-prototype-empty.png)

`[[Prototype]]` 有一个“神奇”的意义。当我们想要从 `object` 中读取一个属性时，它就丢失了。JavaScript 会自动从原型中获取它。在编程中，这样的事情称为“原型继承”。许多很酷的语言特性和编程技巧都是基于它的。

属性 `[[Prototype]]` 是内部的而且隐藏的，但是设置它的方法却有很多种。

其中之一是使用 `__proto__`，就像这样：

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*
```

请注意 `__proto__` 与 `[[Prototype]]` **不一样**。这是一个 getter/setter。我们之后会讨论如何设置它，但是现在 `__proto__` 工作的很好。

如果我们在 `rabbit` 中查找一个属性，而且它丢失了，JavaScript 会自动从 `animal` 中获取它。

例如：

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// we can find both properties in rabbit now:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

这里的 `(*)` 行将 `animal` 设置为 `rabbit`的原型。

当 `alert` 试图读取 `rabbit.eats` `(**)` 时，因为它不存在于 `rabbit`，JavaScript 会遵循 `[[Prototype]]` 引用，并在 `animal` 中查找（自顶向下）：

![](proto-animal-rabbit.png)

我们可以说 "`animal` 是 `rabbit`" 的原型或者说 "`rabbit` 的原型继承自 `animal`"。

因此如果 `animal` 有许多有用的属性和方法，那么它们会自动出现在 `rabbit` 中。这些属性称为“继承”。

如果我们在 `animal` 中有一种方法，它可以被称为是 `rabbit`：

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk is taken from the prototype
*!*
rabbit.walk(); // Animal walk
*/!*
```

该方法自动从原型中提取，如下所示：

![](proto-animal-rabbit-walk.png)

原型链可以很长:


```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
}

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)
```

![](proto-animal-rabbit-chain.png)

实际上只有两个限制：

1. 引用不能形成闭环。如果我们试图在一个闭环中分配 `__proto__`，JavaScript 会抛出异常。
2. `__proto__` 的值可以是对象，也可以是 `null`。所有其他的值（例如原语）都会被忽略。

这也可能是显而易见的，即：只能有一个 `[[Prototype]]`。对象不能继承自其他两个对象。

## 读写规则

原型仅用于读取属性。

对于数据属性（不是 getters/setters）写/删除操作直接在对象上进行操作。

在以下示例中，我们将 `walk` 方法分配给 `rabbit`：

```js run
let animal = {
  eats: true,
  walk() {
    /* this method won't be used by rabbit */  
  }
};

let rabbit = {
  __proto__: animal
}

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

从现在开始，`rabbit.walk()` 调用将立即在对象中找到方法并执行它，而不是使用原型：

![](proto-animal-rabbit-walk-2.png)

对于 getters/setters —— 如果我们读写一个属性，就会在原型中查找并调用它们。

例如，在以下代码中检查出 `admin.fullName` 属性：

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)
```

这里的 `(*)` 属性 `admin.fullName` 在原型 `user` 中有一个 getter，因此它会被调用。在 `(**)` 中，属性在原型中有一个 setter，因此它会被调用。

## "this" 的值

在上面的例子中可能会出现一个有趣的现象：在 `set fullName(value)` 中 `this` 的值是什么？属性 `this.name` 和 `this.surname` 写在哪里： `user`  还是 `admin`？

答案很简单：`this` 根本不受原型的影响。

**无论在哪里找到方法：在对象或者原型中。调用方法时，`this` 始终是点之前的对象。**

因此，实际上 setter 使用 `admin` 作为 `this`，而不是 `user`。

这是一件非常重要的事情，因为我们可能有一个有很多方法而且继承它的大对象。然后我们可以在继承的对象上运行它的方法，它们将修改这些对象的状态，而不是大对象的。

例如，这里的 `animal` 代表“方法存储”，而且 `rabbit` 在使用它。

调用 `rabbit.sleep()`，在 `rabbit` 对象上设置 `this.isSleeping`：

```js run
// animal has methods
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

结果：

![](proto-animal-rabbit-walk-3.png)

如果我们从 `animal` 继承像 `bird`、`snake` 等其他对象，他们也将获取 `animal` 的方法。但是每个方法 `this` 都是相应的对象，而不是 `animal`，在调用时（在点之前）确定。因此当我们将数据写入 `this` 时，它会被存储进这些对象中。

因此，方法是共享的，但对象状态不是。

## 总结

- JavaScript 中，所有的对象都有一个隐藏的 `[[Prototype]]` 属性，它可以是另一个对象或者 `null`。
- 我们可以使用 `obj.__proto__` 进行访问（还有其他方法，但很快就会被覆盖）。
- `[[Prototype]]` 引用的对象称为“原型”。
- 如果我们想要读取 `obj` 属性或者调用一个方法，而且它不存在，那么 JavaScript 就会尝试在原型中查找它。写/删除直接在对象上进行操作，它们不使用原型（除非属性实际上是一个 setter）。
- 如果我们调用 `obj.method()`，而且 `method` 是从原型中获取的，`this` 仍然会引用 `obj`。因此方法重视与当前对象一起工作，即使它们是继承的。
