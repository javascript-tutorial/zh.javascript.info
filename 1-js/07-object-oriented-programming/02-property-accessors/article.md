
# 属性的 getter 和 setter

有两种类型的属性

第一种是**数据属性**。我们已经知道使用它们。 实际上，我们迄今为止使用的所有属性都是数据属性。

第二种属性是新东西。 它是 **访问器属性（accessor properties）**。 它们本质上是获取和设置值的函数，但从外部代码来看像常规属性。

## Getter 和 setter

访问器属性由 “getter” 和 “setter” 方法表示。 在对象字符中，它们用 `get` 和 `set` 表示：

```js
let obj = {
  *!*get propName()*/!* {
    // getter, the code executed on getting obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, the code executed on setting obj.propName = value
  }
};
```

当读取 `obj.propName` 时，使用 getter，当设置值时，使用 setter 。

例如，我们有一个具有 `name` 和 `surname` 属性的 `user` 对象：

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```

现在我们要添加一个 “fullName” 属性，该属性是 “John Smith” 。 当然，我们不想复制粘贴现有信息，因此我们可以用访问器来实现：

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

从外表看，访问器属性看起来像一个普通的属性。这是访问器属性的设计思想。 我们不以函数的方式**调用** `user.fullName` ，我们通常**读取**它：getter在幕后运行。

截至目前，`fullName` 只有一个 getter。 如果我们尝试赋值操作 `user.fullName =`，将会出现错误。

我们通过为 `user.fullName` 添加一个 setter 来修复它：

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

现在我们有一个“虚拟”属性。它是可读写的，但实际上并不存在。

```smart header="Accessor properties are only accessible with get/set"
属性可以是“数据属性”或“访问器属性”，但不能同时属于两者。

一旦使用`get prop（）`或`set prop（）`定义了一个属性，它就是一个访问器属性。所以必须有一个getter来读取它，如果我们对它赋值，它必须是一个 setter。

有时候只有一个 setter 或者只有一个 getter 是正常的。 但在这种情况下，该属性将不可读或可写。
```


## 访问器描述符

访问器属性的描述符与数据属性相比是不同的。

对于访问器属性，没有 `value` 和 `writable` ，但是有 `get` 和 `set` 函数。

所以访问器描述符可能有：

- **`get`** —— 一个没有参数的函数，在读取属性时工作，
- **`set` ** —— 带有一个参数的函数，当属性被设置时调用，
- **`enumerable` ** —— 与数据属性相同，
- **`configurable`** —— 与数据属性相同。

例如，要使用 defineProperty 创建 fullName 的访问器，我们可以使用 `get` 和 `set` 来传递描述符：

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

请再次注意，属性可以要么是访问器，要么是数据属性，而不能两者都是。

如果我们试图在同一个描述符中提供 `get` 和 `value`，则会出现错误：

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## 更聪明的 getter / setters

Getter / setter 可以用作“真实”属性值的包装器，以便对它们进行更多的控制。

例如，如果我们想禁止为 `user` 设置太短的名称，我们可以将 `name` 存储在一个特殊的 `_name` 属性中。 并在 setter 中过滤赋值操作：

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...
```

从技术上讲，外部代码仍然可以通过使用 `user._name` 直接访问该名称。 但是有一个众所周知的协议，即以下划线“_”开头的属性是内部的，不应该从对象外部访问。

## 兼容性

getter 和 setter 背后的伟大设计思想之一 —— 它们允许控制“正常”数据属性并随时调整它。

例如，我们开始使用数据属性 `name` 和 `age` 来实现用户对象：

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...But sooner or later, things may change. Instead of `age` we may decide to store `birthday`, because it's more precise and convenient:
但迟早，情况可能会发生变化。我们可能决定存储`birthday`，而不是 `age` ，因为它更加精确和方便：

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

现在如何处理仍使用 `age` 属性的旧代码？

我们可以尝试找到所有这些地方并修复它们，但这需要时间，而且如果该代码是由其他人编写的，则很难做到。另外，`age` 放在 `user` 中也是一件好事，对吧？在某些地方，这正是我们想要的。

为`age`添加 getter 可缓解问题：

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age
```

现在旧的代码也可以工作，而且我们拥有了一个很好的附加属性。
