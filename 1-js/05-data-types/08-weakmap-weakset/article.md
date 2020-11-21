# WeakMap and WeakSet（弱映射和弱集合）

我们从前面的 <info:garbage-collection> 章节中知道，JavaScript 引擎在值可访问（并可能被使用）时将其存储在内存中。

例如:
```js
let john = { name: "John" };

// 该对象能被访问，john 是它的引用

// 覆盖引用
john = null;

*!*
// 该对象将会被从内存中清除
*/!*
```

通常，当对象、数组这类数据结构在内存中时，它们的子元素，如对象的属性、数组的元素都是可以访问的。

例如，如果把一个对象放入到数组中，那么只要这个数组存在，那么这个对象也就存在，即使没有其他对该对象的引用。

就像这样:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // 覆盖引用

*!*
// 前面由 john 所引用的那个对象被存储在了 array 中
// 所以它不会被垃圾回收机制回收
*/!*
```

类似的，如果我们使用对象作为常规 `Map` 的键，那么当 `Map` 存在时，该对象也将存在。它会占用内存，并且应该不会被（垃圾回收机制）回收。

例如：

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

*!*
// john 被存储在了 map 中，
// 我们可以使用 map.keys() 来获取它
*/!*
```

`WeakMap` 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象（key object）的回收。

让我们通过例子来看看这指的到底是什么。

## WeakMap

`WeakMap` 和 `Map` 的第一个不同点就是，`WeakMap` 的键必须是对象，不能是原始值：

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常工作（以对象作为键）

*!*
// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // Error，因为 "test" 不是一个对象
*/!*
```

现在，如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
```

与上面常规的 `Map` 的例子相比，现在如果 `john` 仅仅是作为 `WeakMap` 的键而存在 —— 它将会被从 map（和内存）中自动删除。

`WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。所以没有办法获取 `WeakMap` 的所有键或值。

`WeakMap` 只有以下的方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

为什么会有这种限制呢？这是技术的原因。如果一个对象丢失了其它所有引用（就像上面示例中的 `john`），那么它就会被垃圾回收机制自动回收。但是在从技术的角度并不能准确知道 **何时会被回收**。

这些都是由 JavaScript 引擎决定的。JavaScript 引擎可能会选择立即执行内存清理，如果现在正在发生很多删除操作，那么 JavaScript 引擎可能就会选择等一等，稍后再进行内存清理。因此，从技术上讲，`WeakMap` 的当前元素的数量是未知的。JavaScript 引擎可能清理了其中的垃圾，可能没清理，也可能清理了一部分。因此，暂不支持访问 `WeakMap` 的所有键/值的方法。

那么，在哪里我们会需要这样的数据结构呢？

## 使用案例：额外的数据

`WeakMap` 的主要应用场景是 **额外数据的存储**。

假如我们正在处理一个“属于”另一个代码的一个对象，也可能是第三方库，并想存储一些与之相关的数据，那么这些数据就应该与这个对象共存亡 —— 这时候 `WeakMap` 正是我们所需要的利器。

我们将这些数据放到 `WeakMap` 中，并使用该对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除。

```js
weakMap.set(john, "secret documents");
// 如果 john 消失，secret documents 将会被自动清除
```

让我们来看一个例子。

例如，我们有用于处理用户访问计数的代码。收集到的信息被存储在 map 中：一个用户对象作为键，其访问次数为值。当一个用户离开时（该用户对象将被垃圾回收机制回收），这时我们就不再需要他的访问次数了。

下面是一个使用 `Map` 的计数函数的例子：

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 递增用户来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

下面是其他部分的代码，可能是使用它的其它代码：

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits

// 不久之后，john 离开了
john = null;
```

现在 `john` 这个对象应该被垃圾回收，但他仍在内存中，因为它是 `visitsCountMap` 中的一个键。

当我们移除用户时，我们需要清理 `visitsCountMap`，否则它将在内存中无限增大。在复杂的架构中，这种清理会成为一项繁重的任务。

我们可以通过使用 `WeakMap` 来避免这样的问题：

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// 递增用户来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

现在我们不需要去清理 `visitsCountMap` 了。当 `john` 对象变成不可访问时，即便它是 `WeakMap` 里的一个键，它也会连同它作为 `WeakMap` 里的键所对应的信息一同被从内存中删除。

## 使用案例：缓存

另外一个普遍的例子是缓存：当一个函数的结果需要被记住（“缓存”），这样在后续的对同一个对象的调用时，就可以重用这个被缓存的结果。

我们可以使用 `Map` 来存储结果，就像这样：

```js run
// 📁 cache.js
let cache = new Map();

// 计算并记住结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// 现在我们在其它文件中使用 process()
*/!*

// 📁 main.js
let obj = {/* 假设我们有个对象 */};

let result1 = process(obj); // 计算完成

// ……稍后，来自代码的另外一个地方……
let result2 = process(obj); // 取自缓存的被记忆的结果

// ……稍后，我们不再需要这个对象时：
obj = null;

alert(cache.size); // 1（啊！该对象依然在 cache 中，并占据着内存！）
```

对于多次调用同一个对象，它只需在第一次调用时计算出结果，之后的调用可以直接从 `cache` 中获取。这样做的缺点是，当我们不再需要这个对象的时候需要清理 `cache`。

如果我们用 `WeakMap` 替代 `Map`，这个问题便会消失：当对象被垃圾回收时，对应的缓存的结果也会被自动地从内存中清除。

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// 计算并记结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ……稍后，我们不再需要这个对象时：
obj = null;

// 无法获取 cache.size，因为它是一个 WeakMap，
// 要么是 0，或即将变为 0
// 当 obj 被垃圾回收，缓存的数据也会被清除
```

## WeakSet

`WeakSet` 的表现类似：

- 与 `Set` 类似，但是我们只能向 `WeakSet` 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 set 中。
- 跟 `Set` 一样，`WeakSet` 支持 `add`，`has` 和 `delete` 方法，但不支持 `size` 和 `keys()`，并且不可迭代。

变“弱（weak）”的同时，它也可以作为额外的存储空间。但并非针对任意数据，而是针对“是/否”的事实。`WeakSet` 的元素可能代表着有关该对象的某些信息。

例如，我们可以将用户添加到 `WeakSet` 中，以追踪访问过我们网站的用户：

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John 访问了我们
visitedSet.add(pete); // 然后是 Pete
visitedSet.add(john); // John 再次访问

// visitedSet 现在有两个用户了

// 检查 John 是否来访过？
alert(visitedSet.has(john)); // true

// 检查 Mary 是否来访过？
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet 将被自动清理
```

`WeakMap` 和 `WeakSet` 最明显的局限性就是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是并不会阻止 `WeakMap/WeakSet` 完成其主要工作 — 成为在其它地方管理/存储“额外”的对象数据。

## 总结

`WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问它们，便会将它们与其关联值一同删除。

`WeakSet` 是类似于 `Set` 的集合，它仅存储对象，并且一旦通过其他方式无法访问它们，便会将其删除。

它们都不支持引用所有键或其计数的方法和属性。仅允许单个操作。

`WeakMap` 和 `WeakSet` 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 `WeakMap` 或 `WeakSet` 的键，那么它将被自动清除。
