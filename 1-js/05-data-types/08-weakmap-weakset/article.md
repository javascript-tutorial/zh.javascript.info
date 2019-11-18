# WeakMap 和 WeakSet

从[垃圾回收机制](https://zh.javascript.info/garbage-collection)这一章节中我们可以看到，JavaScript 引擎会把可用（可能会被用）的值存储在内存中。

例如：
```js run
let john = { name: "John" };

// 对象可以被访问, john 是该对象的引用

// 覆盖引用
john = null;

// 该对象将会从内存中移除
```

通常，对象的属性或者数组元素或者其他数据结构在被认为可用的的情况下会被一直保存在内存中，而该数据结构在内存中。

例如，如果我们把一个对象放入一个数组中，当该数组存在，即使把该对象的引用覆盖了，该对象也会存在。

像这样：

```js run
let john = { name: "John" };

let array = [ john ];

john = null; // 覆盖引用

// john 被存储在数组中, 所以它不会被垃圾回收机制回收
// 我们可以这样访问它 array[0]
```
类似地，如果我们把一个对象作为常规 `Map` 的键，然后当 `Map` 存在时，该对象也会存在。它可能不会被垃圾回收机制回收并且占据着内存

例如：

```js run
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

// john 被存储在 map 的内部,
// 我们可以这样访问它： map.keys()
```
 `WeakMap` 在这方面有很大不同，它不会阻止垃圾回收机制回收重要的对象

让我们通过例子来看看着意味着什么

## WeakMap

和 `Map` 的第一个不同点就是 `WeakMap` 的键必须是对象，不能是原始值：

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常执行 (以对象作为键)

// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // 错误，因为 "test" 不是一个对象
```

现在，我们使用一个对象作为键值放入其中，如果没有其它引用在该对象上-它就会从内存中（和来自集合里面）被自动移除

```js run
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 在内存中被移除!
```

比较一下以上例子中的常规 `Map` ，现在如果 `john` 仅仅是作为 `WeakMap` 的键存在时 - 他将会从集合中（和内存）被自动删除。

`WeakMap` 不支持迭代和 `keys()`, `values()`,`entries()` 方法。所以没有办法从它里面获取所有的键或者值。

`WeakMap` 仅仅只有以下几个方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

为什么会有这样的限制呢？那是出于技术原因。如果一个对象已经失去所有其他的引用（就像上面的 `john` 一样），然后它会被垃圾回收机制自动回收。但是从技术上来说并不能确定清理会在什么时候发生。

以上由 JavaScript 引擎决定。它可能会选择立即清理来优化内存或者等待和发生更多的删除时才清理。所以，从技术上，并不能知道一个 `WeakMap` 的当前元素的个数。引擎可能会清理掉它也可能不会，或者清理掉一部分。由于这个原因，访问所有键/值的方法不能被支持。

现在我们在哪里会需要这样的数据结构呢？

## 使用案例： 附加数据

`WeakMap` 的主要应用领域是在一种附加数据存储

如果我们在处理一个“属于”其它代码的对象，甚至可能是第三方库，就有可能储存一些相关联的数据，它仅仅在该对象存在时才存在 - `WeakMap`就是我们真正需要的结构。

我们把某些数据放入到 `WeakMap` 中，并使用对象作为键，当该对象被回收时，改数据也会自动消失。

```js run
weakMap.set(john, "secret documents");
// 如果 john 不存在了, secret documents 也会自动销毁
```

让我们来看一个例子。

比如，我们有一段代码主要记录用户访问的次数。该信息存储在一个map结构中：用户对象作为键，次数作为值。当用户离开（也就是他的对象被回收），我们也不需要再存储访问次数了。

这里有个使用 `Map` 来计算的函数:

```js run
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => 访问次数

// 增加访问次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```
然后这里是代码的另外一部分，其它文件可能会使用它：

```js run
// 📁 main.js
let john = { name: "John" };

countUser(john); // 计算他的访问次数
countUser(john);

// 然后 john 离开我们
john = null;

```

现在 `john` 对象应该被回收，但是它还留在了内存中，因为它被作为了 `visitsCountMap` 的键。

当移除用户的时候，我们需要清理 `visitsCountMap`，否则它将会在内存中无限增加。 这样的清理在复杂的架构中会变成冗余的任务。

我们通过切换成 `WeakMap` 来替代它从而避免上面提到的问题:

```js run
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => 访问次数

// 增加访问次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

现在我们不必去清理 `visitsCountMap` 了，在除了作为 `WeakMap` 的键之外， `john` 对象之后将不能被其它所有途径使用

## 使用案例： 缓存

其它很常用的例子就是缓存： 当一个函数结果应该被记住（“缓存”）的时候，所以将来调用同一个对象重用它。

我们使用 `Map` 来存储结果，像这样：

```js run
// 📁 cache.js
let cache = new Map();

// 计算并记住结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 结果的计算 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 现在使用其它文件的 process() 方法:

// 📁 main.js
let obj = {/* 让我们来定义一个对象 */};

let result1 = process(obj); // 被计算

// ...之后, 来自其它地方的代码块...
let result2 = process(obj); // 从缓存中拿到记住的结果

// ...之后, 当这个对象不再被需要的时候:
obj = null;

alert(cache.size); // 1 (哇! 这个对象依然在缓存中, 占据内存!)
```

对于相同对象多次调用 `process(obj)` 方法，他只计算第一次，之后是从缓存获取。这样的缺点就是当该对象不在需要的时候，我们需要清理 `clean` 

如果我们使用 `WeakMap` 来代替 `Map` ，然后这些问题就会消失：当该对象被回收时，缓存的结果将会从内存中自动被移除

```js run

// 📁 cache.js
let cache = new WeakMap();

// 计算并记住结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* 对象 */};

let result1 = process(obj);
let result2 = process(obj);

// ...之后, 当这个对象不再需要使用的时候置为空对象:
obj = null;

// 不能通过cache.size获取它的大小, 因为它是一个 Weakmap,
// 但是它为 0 或者说将会变成 0
// 当对象被垃圾回收机制回收的同时, 缓存的数据也会被清除

```
## WeakSet

`WeakSet` 的表现也相似：

- 它类似于 `Set` ，但是我们仅仅添加对象到 `WeakSet` 里(而不是原始值)

- 集合里面存在该对象当它可以从其它地方获取

-跟 `Set` 一样，`WeakSet` 也支持 `add`, `has` , `delete` 方法，但是不支持 `size`,`key()` 和迭代

变“弱”的同时，它也被用作附加存储。但是不适合任意数据，而是因为“是 / 否”的原因.一个 `WeakSet` 的成员可能意味着对象的其它

例如，我们可以添加用户到 `WeakSet` 来追踪谁访问了我们的网站：

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet 现在有2个用户

//  检查 John 是否访问过?
alert(visitedSet.has(john)); // true

// 检查 Mary 是否访问过?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet 将会被自动清除
```

`WeakMap ` 和 `WeakSet`最显著的限制就是缺乏迭代，并且不能获取当前所有的内容。这可能会造成很大的不便，但是这并不会阻止 `WeakMap/WeakSet` 做主要的事情-在另一个地方存储/管理的对象的“附加”存储数据。

## 总结

`WeakMap` 是个类似于 `Map` 的只允许对象作为键和通过其它途径使对象变成不可用的时候就会马上移除所有关联的键的集合

`WeakSet` 是个类似于 `Set` 的只存储对象和移除一旦通过其它途径使其变得不可用的对象

它们俩个都不支持获取所有键和值得方法或者属性，只允许个别操作。

`WeakMap` 和 `WeakSet` 被用认为是除了”主要“对象存储之外的“第二”数据结构，一旦对象在主要存储中被移除，如果该对象仅仅是存储为 `WeakMap` 或者 `WeakSet` 的键的时候，它就会被自动清理。
