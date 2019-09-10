
# 静态属性和静态方法

我们可以把一个方法赋值给一个类方法，而不是赋给它的 `"原型对象"`。这样的方法我们称为**静态的**。

在类里面，他们在前面添加 "static" 关键字，就像这样：

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

这实际上跟直接作为属性赋值做了同样的事情：

```js
class User() { }

User.staticMethod = function() {
  alert(this === User);
};
```

在 `User.staticMethod` 方法内部，`this` 的值是构造函数 `User` 它自己（“点之前对象”[object before dot]规则）。

通常来说，静态方法用来实现一个属于类，但不属于类的某个对象的特定方法。

举个例子，我们有 `Article` 对象，需要一个方法来比较它们。一个自然的解决方案是添加 `Article.compare` 方法，就像这样：

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

// 用法
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

这里 `Article.compare` 代表这些文章，作为一个比较它们的意思。它不是一篇文章的方法，而是所有 class 的方法。

另一个例子是所谓的“工厂”方法。想象一下，我们需要一些方式来创建一篇文章：

1. 通过用指定的参数来创建(`title`，`date` 等)。
2. 用今天的日期来创建一篇空的文章。
3. ……其它等等。

第一种方法我们可以使用构造函数来实现。对于第二种方式，我们可以创建一个类的静态方法来实现。

就像这里的 `Article.createTodays()`：

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // 记住，this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```

现在，每当我们需要创建一个今天的摘要时，我们可以调用 `Article.createTodays()`。再一次说明，这不是一篇文章的方法，而是整个 class 的方法。

静态方法也用于与数据库相关的公共类，可以用来搜索/保存删除数据库中的条目， 就像这样：

```js
// 假定 Article 是一个用来管理文章的特殊类
// 静态方法用于移除文章：
Article.remove({id: 12345});
```

## 静态属性

[recent browser=Chrome]

静态的属性也是有可能的，它们看起来像常规的类属性，但前面加有 `static`：

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

这等同于直接给 `Article` 赋值：

```js
Article.publisher = "Ilya Kantor";
```

## 静态方法的继承

静态方法是继承的。

举个例子：下面代码里的 `Animal.compare` 被继承，可以通过 `Rabbit.compare` 来访问：

```js run
class Animal {

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// 继承 Animal 类
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit runs with speed 5.
```

现在我们调用 `Rabbit.compare` 被断定为继承的 `Animal.compare` 将被调用。

它的原理是什么？ 再次的，使用原型。你可能已经猜到了，`继承` 让 `Rabbit` 的 `[[Prototype]]` 属性指向了 `Animal`。

![](animal-rabbit-static.svg)

因此，`Rabbit extends Animal` 创建了两个 `[[Prototype]]` 的引用：

1. `Rabbit` 方法原型继承自 `Animal` 方法。
2. `Rabbit.prototype` 原型继承自 `Animal.prototype`。

结果就是，继承对于常规的和静态的方法都有效。

这里，让我们通过代码来检验一下：

```js run
class Animal {}
class Rabbit extends Animal {}

// 对于静态属性和静态方法
alert(Rabbit.__proto__ === Animal); // true

// 对于普通方法
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```
 
## 总结

静态方法被用来实现属于整个类的功能，不涉及到某个具体的类实例的功能。

举个例子， 一个用来比较的方法 `Article.compare(article1, article2)` 或者一个工厂函数 `Article.createTodays()`。

它们在类声明中通过 `static` 来标记。

当我们想要存储类级别的数据时，我们会使用静态属性，而不是在实例上绑定数据。


语法：
```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

技术上来说，静态声明等同于直接给类本身赋值：

```js
MyClass.property = ...
MyClass.method = ...
```

静态属性和方法是被继承的。

对于 `class B extends A`，类 `B` 的 prototype 指向了 `A`：`B.[[Prototype]] = A`。因此，如果一个字段在 `B` 中没有找到，会继续在 `A` 中查找。
