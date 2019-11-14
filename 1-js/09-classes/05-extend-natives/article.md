# 扩展内置类

内置的类比如 `Array`，`Map` 等也都是可以拓展的。

比如，这里有一个 `PowerArray` 继承自原生的 `Array`： 


```js run
// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

请注意一个非常有趣的事情。内置的方法比如 `filter`，`map` 等 -- 返回的新对象都是继承自 `PowerArray`的。它们的内部操作使用对象的 `constructor` 属性实现了这一功能。

在上面的例子中，
```js
arr.constructor === PowerArray
```

当 `arr.filter()` 被调用的时候，它在内部使用的是 `arr.constructor`，而不是原生的 `Array`，来创建基于结果的新数组。

更重要的是，我们可以定制这种行为。

我们可以给 Class 增加一个特殊的静态 getter `Symbol.species`。如果它存在，它会返回在 `map`，`filter` 等方法中，JavaScript 在内部用来创建新实体的 `constroctor`。

如果我们希望内置方法比如 `map` 或者 `filter` 返回常规的数组，我们应该在 `Symbol.species` 中返回 `Array`，就像这样：

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // 内置方法会使用这个作为 constructor
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filterf 使用 arr.construceor[Symbol.species] 作为 construcor 创建新数组
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr 不是 PowerArray, 而是 Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

如你所见，现在 `.filter` 返回 `Array`。

```smart header="其他集合也同样适用"
其他的集合比如 `Map` 和 `Set` 也同样适用，他们也可以使用 `Symbol.species`.
```

### 内置类没有静态方法继承

内置对象有他们自己的静态方法，比如 `Object.keys`，`Array.isArray` 等。

如我们所知道的，原生的类各自拓展。比如，`Array` 拓展自 `Object`。

正常来说，当一个类型拓展自其他类型的时候，静态方法和非静态方法都会被继承。这已经在这篇文章[](info:static-properties-methods#statics-and-inheritance).中详尽地解释过了

但内置类却是一个例外，它们相互间不继承静态属性和方法。

比如，`Array` 和 `Data` 都是继承自 `Object`，所以他们的实例都有来自 `Object.prototype` 的方法，但是 `Array.[[Prototype]]` 不指向 `Object`，所以它们没有例如 `Array.keys()`(或者 `Data.keys()`)的静态方法。

这里有一张 `Date` 和 `Object` 结构关系的图片

![](object-date-inheritance.svg)

如你所见，`Date` 和 `Object` 之间没有连结。`Object` 和 `Date` 都是独立存在的。`Date.prototype` 继承自 `Object.prototype，`但也仅此而已。

与我们了解的 `extends` 对比，这是内置对象之间的继承的一个非常重要的区别