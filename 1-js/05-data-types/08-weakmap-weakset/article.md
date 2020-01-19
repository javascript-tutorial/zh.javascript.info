# WeakMap and WeakSet（弱映射和弱集合）

我们从前面的[垃圾回收](<info:garbage-collection>)章节中知道， JavaScript 引擎在值可访问（并可能被使用）时将其存储在内存中。

例如:
```js
let john = { name: "John" };

// 该对象能被访问, john 是它的引用

// 覆盖引用
john = null;

*!*
// 该对象将会从内存中被清除
*/!*
```

通常，当对象的属性或者数组的元或者其它数据结构被认为是可访问的，并在该数据结构处于内存中时驻留在内存中。

例如, 如果把一个对象放入到数组中去, 然后当数组留存在内存中时，甚至该对象在没有其它引用的情况下依旧也是可访问的 。

就像这样:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // 覆盖引用

*!*
// john 被存储在数组里, 所以它不会被垃圾回收机制回收
// 我们可以通过 array[0] 来访问
*/!*
```

类似地, 如果我们只用对象作为常规 `Map` 的键的时候, 然后当 `Map` 存在时, 那个对象也是存在的. 它会占用内存并且可能不会被（垃圾回收机制）回收.

For instance:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

*!*
// john 被存在 map 里面了,
// 我们可以使用 map.keys() 来得到它
*/!*
```

`WeakMap` 在这方面有着根本的区别。它不会阻止垃圾回收对关键对象进行回收操作。

让我们来看看例子里究竟是什么意思

## WeakMap

相对于 `Map` ，`WeakMap` 的第一个不同点就是它键必须是对象，不能是原始值

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常 (键对象)

*!*
// 不能使用一个字符串作为键
weakMap.set("test", "Whoops"); // 错误, 因为 "test" 不是一个对象
*/!*
```

现在, 如果我们在 weakMap 里使用对象作为键，并且当这个对象没有其它引用 -- 该对象将会从内存（和map）中被自动清除。

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 从内存中被移除！
```

与上面的常规 `Map` 例子比起来。 现在如果 `john` 仅仅是作为 `WeakMap` 的键而存在时 -- 它将会从 map （从内存中）自动删除。

`WeakMap` 不支持迭代和`keys()`, `values()`, `entries()`方法, 所以没法从它里面获取所有键或值。

`WeakMap` 只有以下方法:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

为什么会有这种限制呢? 那是因为技术原因。如果一个对象丢失了其它多有引用（就像上面的 `john`）， 然后它会被自动回收. 但是在从技术的角度并不能准确知道 *何时开始清理*。

这些都由 JavaScript 决定。为了优化内存，它可能会立刻开始清除或者等待并在稍后更多清理的时候才开始执行清理。 所以, 从技术上来说，`WeakMap` 的当前成员的数量是未知的，引擎既有可能清理又可能不清理，或者只是清理一部分。 由于这些原因，暂不支持访问所有键或者值的方法。

那这种数据结构用在何处呢？

## 使用案例: 附加数据

`WeakMap` 的主要应用领域是 *附加数据存储*

假如我们在处理一个 “属于” 其它代码的对象，也可能是第三方库，想存储一些与其相关的数据，这就要求与这个对象共存亡 --- 这时候 `WeakMap` 就是所我们多需要的利器

我们利用对象作为键并把数据存在到 `WeakMap`中，当该对象被回收时，该数据也会自动消失。

```js
weakMap.set(john, "secret documents");
// 如果 john 消失, secret documents 将会被自动删除
```

让我们来看一个例子。

例如，我们有这样的代码需要记录访客的来访次数，信息被存储在弱集合中：某个用户对象作为键，来访次数作为值。当某个用户出去了（该对象被回收），我们就不需要再存储他们的来访次数了

下面有个类似的使用 `Map` 的函数:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 递增游客来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```
下面是其它部分的代码, 其它代码也使用它:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits
countUser(john);

// later john leaves us
john = null;
```

现在 `john` 这个对象应该被回收，但因为他的键还在`visitsCountMap` 中导致它依然留存在内存中。

对我们移除某个用户的时候需要清理 `visitsCountMap` ， 否则它们会在内存中无限增加。这种清理在复杂的架构系统中将会是很乏味的任务。

我们可以通过使用 `WeakMap` 来避免这样的问题：

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// 递增游客来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

现在我们不需要去清理`visitsCountMap`了。`WeakMap` 里的 `john` 对象以及它携带的信息将会被回收（清除），其它所有途径都不能访问它除非是作为 `WeakMap` 的键。

## 使用案例: 缓存

另外一个很普遍的例子是缓存: 当函数的结果需要被记住（“缓存”），这样在后续的同一个对象调用的时候可以重用该被缓存的结果。

我们可以使用 `Map` 来存储结果，就像这样：

```js run
// 📁 cache.js
let cache = new Map();

// 计算并记住结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 计算 obj 值的结果 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// 现在我们在其它文件中使用 process() ：
*/!*

// 📁 main.js
let obj = {/* 假设有个对象 */};

let result1 = process(obj); // 计算中...

// ...之后, 来自另外一个地方的代码...
let result2 = process(obj); // remembered result taken from cache

// ...之后, 改对象不再需要使用时:
obj = null;

alert(cache.size); // 1 (啊! 该对象依然在 cache 中, 并占据着内存！)
```

对于同一个对象多次调用，它只是计算第一次，之后直接从 `cache` 中获取，这样做的缺点是当我们不再需要这个对象的时候需要清理 `cache`

如果我们用 `WeakMap` 代替`Map`这个问题便会消失： 缓存的结果在该对象背回收之后会自动从内存中释放。

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// 计算并记结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 计算 obj 之后得出的结果 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...之后, 当该对象不再需要的时候:
obj = null;

// 不能使用 cache.size, 因为它是一个 WeakMap,
// 要么是 0 或者 很快变成 0
// 当 obj 被回收时, 缓存的数据也会被清除
```

## WeakSet

`WeakSet` 的作用类似:

- 它跟 `Set` 类似, 但是我们只能添加对象到 `WeakSet` (非原始值)中。
- 某个对象只有在其它任何地方都能访问的时候才能留在 set 里。
- 跟 `Set` 一样, `WeakSet` 支持 `add`, `has` and `delete` 等方法, 但不支持 `size`, `keys()` 并且没有迭代。
变 "弱" 的同时, 它也可以作为额外的存储空间，但并非任意数据，而是针对“是/否”的事实，在 `WeakSet` 里的成员代表着对象里的某个属性。
例如, 我们可以添加 users 到 `WeakSet` 里来追踪谁访问了我们的网站：

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// 现在 visitedSet 有2个用户

// 检查 John 是否访问过?
alert(visitedSet.has(john)); // true

// 检查 Mary 是否访问过?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet 将被自动清理
```

 `WeakMap` 和 `WeakSet` 最出名的限制是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是依旧不能阻止 `WeakMap/WeakSet` 完成其主要工作 -- 成为在其它地方管理或者存储的对象的 “额外的” 数据存储

## 总结

` WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并在其他方式无法访问它们时将其与关联值一起删除。

`WeakSet` 是类似于`Set`的集合，它仅存储对象，并在其他方式无法访问它们时将其删除。 

它们都不支持引用所有键或其计数的方法和属性。 仅允许单个操作。

`WeakMap` 和`WeakSet`还用作“辅助”数据结构。 一旦将对象从主存储器中删除，如果仅将其作为“ WeakMap”或“ WeakSet”的键，那么则将自动清除该对象。
