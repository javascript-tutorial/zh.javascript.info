
# class

"class" 结构允许你使用一种干净、整洁的语法来定义基于 prototype 的类。

## "class" 语法

`class` 语法丰富多彩，我们将通过一个简例开始本章的学习。

这是一个基于 prototype 定义的 class `User`：

```js run
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

let user = new User("John");
user.sayHi();
```

...我们可以用 `class` 语法完成相同的工作：

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
```

我们可以很容易地看出两个示例的功能是相似的。值得注意的是，我们并不需要使用逗号隔开定义在 class 中的方法。初学者经常会忘记这点，错误地在类方法间添加逗号只会让代码停止工作。我们需要正确地区分字面量 Object 和 class 语法。

所以，`class` 究竟做了什么呢？我们可能会猜想它定义了一个全新的语言级实体，不过这样的猜想并不正确。

`class User {...}` 在这里实际上完成了两件事：

1. 声明了一个名为 `User` 的变量，并将它的值指向了 `"constructor"` 函数。
2. 把所有类中定义的方法“挂”到 `User.prototype` 上。如示例中的 `sayHi` 和 `constructor` 两个方法。

下面将通过代码来实验以上说法是否正确：

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

*!*
// 证明：User 指向了 "constructor" 函数
*/!*
alert(User === User.prototype.constructor); // true

*!*
// 证明："prototype" 挂载了两个方法
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

下图展示了如何使用 `class User` 声明类：

![](class-user.png)



综上可以发现 `class` 是一个特殊的语法，它可以同时定义类的构造函数和它原型链上的方法。

...不过它与传统定义方法间还是存在一些细微差别：

构造器必须与 `new` 关键字一同使用
：不同于普通的函数，class 的 `constructor` 虽然是函数，却只能与 `new` 一同使用：

```js run
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error：构造器 User 不能被直接调用
```

不同的字符串输出结果
：如果我们像这样 `alert(User)` 打印 User，一些运行时的结果会是 `"class User..."`，而另一些可能是 `"function User..."`。

请不要被这种现象迷惑：虽然 class 表现为字符串时结果可能多样，但它本质上仍然是一个函数，在 JavaScript 中不存在一个独立的 "class" 实体。

class 中的方法是 non-enumerable（不可枚举）的
：在 class 中，所有 `"prototype"` 上的方法，其 `enumerable` 标志会被自动设置为 `false`。这很棒，因为当我们使用 `for..in` 遍历 object 的属性时，我们通常不希望结果中包含有类上的方法。

class 拥有一个默认的 `constructor() {}`
：如果在 `class` 结构中没有定义 `constructor`，那么 JavaScript 会生成一个默认的空构造函数，这和手写一个 `constructor() {}` 是一样的效果。

class 永远是 `use strict` 的
：所有 class 结构中的代码，都自动开启了严格模式。

### getter/setter

在 class 中也可以使用 getter/setter 方法，下面是一个简单的利用 getter/setter 操作 `user.name` 属性的例子：

```js run
class User {

  constructor(name) {
    // 调用 setter 方法
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

在 JavaScript 内部，getter 和 setter 的实现都是在 `User` prototype 上创建相应的方法：

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

### Only methods

与字面量 Object 不同，`class` 内部不允许出现形如 `property:value` 的赋值，它的内部只能出现普通方法或 getter/setter。class 的最新规范还在进一步讨论，新的规范有可能打破当前的使用限制。

如果我们确实需要在原型链上定义一些非函数类型的取值，我们可以像这样手动更改 `prototype`：

```js run
class User { }

User.prototype.test = 5;

alert( new User().test ); // 5
```

因此，增加原型链上的属性在技术上是完全可行的，只是我们需要清楚自己为什么这样做。定义的属性会被此类实例化的所有实体继承。

如果非要在 class 结构中增加属性，可以变通地使用 getter 实现：

```js run
class User {
  get test() {
    return 5;
  }
}

alert( new User().test ); // 5
```

由上述两种方法增加的属性，在使用上别无二致，深究起来 getter 的实现方式效率会略低一点。

## class 表达式

与 function 一样，class 可以定义在其他表达式中，也同样可以被当作参数传递、作为返回值返回等。

下列代码展示了一个返回值是 class 的函数（“class 工厂”）：

```js run
function makeClass(phrase) {
*!*
  // 声明一个 class 并作为返回值返回
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
```

如果我们还记得 `class` 只是一个定义 prototype 的语法糖函数，那么上面的代码行为理解起来毫无压力了。

与命名函数一样，我们也可以为 class 取名，自定义的别名只在 class 内可见：

```js run
// "Named Class Expression"（这是我自定义的术语，当前还没有官方术语来描述这个命名行为）
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // 类名 MyClass 只在类内部可见
  }
};

new User().sayHi(); // 可以成功打印 MyClass 的定义

alert(MyClass); // 这样会报错，MyClass 在 class 外部并不可见
```

## Static methods

我们可以在 class 函数上新增方法，这种新增在函数上而非 `"prototype"` 上的方法，我们称为 *静态方法*。

举个例子：

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

这和直接给函数赋值一个函数属性是一样的：

```js
function User() { }

User.staticMethod = function() {
  alert(this === User);
};
```

`User.staticMethod()` 中的 `this` 理所当然指向了 class 构造器 `User`（this 判断规则之“this 指向方法的调用者”）。

通常，静态方法是为了增加专属于 class 的方法，且这些方法不属于任何 class 实例对象。

例如，为了比较 `Article` 对象的大小，我们可能需要定义一个 `Article.compare` 函数：

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("Mind", new Date(2016, 1, 1)),
  new Article("Body", new Date(2016, 0, 1)),
  new Article("JavaScript", new Date(2016, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // Body
```

这里的 `Article.compare` “矗立”于所有 article 对象之上，用于比较 article 对象两两间的大小。它不是单个 article 对象的实例方法，它是属于更高一层的 Article 类。

"factory" 方法也是一个极好的静态方法示例。想象一下，我们需要不止一种创建 article 实例的方法：

1. 通过给定的入参创建（`title`、`date` 等）。
2. 通过当天的日期创建一个空对象。
3. ...

第一种创建方法可以通过构造器实现，而第二种创建方法我们可以使用类的静态方法实现。

如下例的 `Article.createTodays()`：

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // 记住 this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```

好了，当我们需要创建一个今日摘要时，我们可以调用 `Article.createTodays()` 方法了。再次提醒，静态方法是属于 class 的方法，它不属于任何一个 article 对象。

静态方法还常用于与数据库“打交道”的实体类，例如在实体上进行 search/save/remove 等数据库操作：

```js
// 假设 Article 是一个特殊的 article 管理类
// 它有一个删除 article 的静态方法：
Article.remove({id: 12345});
```

## 小结

基础的 class 语法如下所示：

```js
class MyClass {
  constructor(...) {
    // ...
  }
  method1(...) {}
  method2(...) {}
  get something(...) {}
  set something(...) {}
  static staticMethod(..) {}
  // ...
}
```

`MyClass` 是一个指向 `constructor` 的构造函数。如果 class 中没有定义 `constructor`，那么 class 会提供一个空函数代替。

无论如何请记得，所有在 class 中定义的方法都会被添加到 `prototype` 上。只有静态方法是个例外，它们会被添加为 class 自身的属性，通过 `MyClass.staticMethod()` 的形式进行调用。静态方法通常都与 class 自身有关，而不是 class 实例化的对象。

在下一章中，我们会学习更多关于 classe 的只是，包括如何进行类间的继承。
