<<<<<<< HEAD
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
=======
# WeakMap and WeakSet

As we know from the chapter <info:garbage-collection>, JavaScript engine stores a value in memory while it is reachable (and can potentially be used).

For instance:
```js
let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

*!*
// the object will be removed from memory
*/!*
```

Usually, properties of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory.

For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.

Like this:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
let john = { name: "John" };

let array = [ john ];

<<<<<<< HEAD
john = null; // 覆盖引用

*!*
// john 被存储在数组里, 所以它不会被垃圾回收机制回收
// 我们可以通过 array[0] 来访问
*/!*
```

类似地, 如果我们只用对象作为常规 `Map` 的键的时候, 然后当 `Map` 存在时, 那个对象也是存在的. 它会占用内存并且可能不会被（垃圾回收机制）回收.
=======
john = null; // overwrite the reference

*!*
// john is stored inside the array, so it won't be garbage-collected
// we can get it as array[0]
*/!*
```

Similar to that, if we use an object as the key in a regular `Map`, then while the `Map` exists, that object exists as well. It occupies memory and may not be garbage collected.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

For instance:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

<<<<<<< HEAD
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
=======
john = null; // overwrite the reference

*!*
// john is stored inside the map,
// we can get it by using map.keys()
*/!*
```

`WeakMap` is fundamentally different in this aspect. It doesn't prevent garbage-collection of key objects.

Let's see what it means on examples.

## WeakMap

The first difference from `Map` is that `WeakMap` keys must be objects, not primitive values:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let weakMap = new WeakMap();

let obj = {};

<<<<<<< HEAD
weakMap.set(obj, "ok"); // 正常 (键对象)

*!*
// 不能使用一个字符串作为键
weakMap.set("test", "Whoops"); // 错误, 因为 "test" 不是一个对象
*/!*
```

现在, 如果我们在 weakMap 里使用对象作为键，并且当这个对象没有其它引用 -- 该对象将会从内存（和map）中被自动清除。
=======
weakMap.set(obj, "ok"); // works fine (object key)

*!*
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
*/!*
```

Now, if we use an object as the key in it, and there are no other references to that object -- it will be removed from memory (and from the map) automatically.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

<<<<<<< HEAD
john = null; // 覆盖引用

// john 从内存中被移除！
```

与上面的常规 `Map` 例子比起来。 现在如果 `john` 仅仅是作为 `WeakMap` 的键而存在时 -- 它将会从 map （从内存中）自动删除。

`WeakMap` 不支持迭代和`keys()`, `values()`, `entries()`方法, 所以没法从它里面获取所有键或值。

`WeakMap` 只有以下方法:
=======
john = null; // overwrite the reference

// john is removed from memory!
```

Compare it with the regular `Map` example above. Now if `john` only exists as the key of `WeakMap` -- it will be automatically deleted from the map (and memory).

`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there's no way to get all keys or values from it.

`WeakMap` has only the following methods:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

<<<<<<< HEAD
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
=======
Why such a limitation? That's for technical reasons. If an object has lost all other references (like `john` in the code above), then it is to be garbage-collected automatically. But technically it's not exactly specified *when the cleanup happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now where do we need such data structure?

## Use case: additional data

The main area of application for `WeakMap` is an *additional data storage*.

If we're working with an object that "belongs" to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive - then `WeakMap` is exactly what's needed.

We put the data to a `WeakMap`, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

Let's look at an example.

For instance, we have code that keeps a visit count for users. The information is stored in a map: a user object is the key and the visit count is the value. When a user leaves (its object gets garbage collected), we don't want to store their visit count anymore.

Here's an example of a counting function with `Map`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

<<<<<<< HEAD
// 递增游客来访次数
=======
// increase the visits count
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```
<<<<<<< HEAD
下面是其它部分的代码, 其它代码也使用它:
=======

And here's another part of the code, maybe another file using it:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits
<<<<<<< HEAD
countUser(john);
=======
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

// later john leaves us
john = null;
```

<<<<<<< HEAD
现在 `john` 这个对象应该被回收，但因为他的键还在`visitsCountMap` 中导致它依然留存在内存中。

对我们移除某个用户的时候需要清理 `visitsCountMap` ， 否则它们会在内存中无限增加。这种清理在复杂的架构系统中将会是很乏味的任务。

我们可以通过使用 `WeakMap` 来避免这样的问题：
=======
Now `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.

We need to clean `visitsCountMap` when we remove users, otherwise it will grow in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to `WeakMap` instead:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

<<<<<<< HEAD
// 递增游客来访次数
=======
// increase the visits count
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
现在我们不需要去清理`visitsCountMap`了。`WeakMap` 里的 `john` 对象以及它携带的信息将会被回收（清除），其它所有途径都不能访问它除非是作为 `WeakMap` 的键。

## 使用案例: 缓存

另外一个很普遍的例子是缓存: 当函数的结果需要被记住（“缓存”），这样在后续的同一个对象调用的时候可以重用该被缓存的结果。

我们可以使用 `Map` 来存储结果，就像这样：
=======
Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.

## Use case: caching

Another common example is caching: when a function result should be remembered ("cached"), so that future calls on the same object reuse it.

We can use `Map` to store results, like this:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
// 📁 cache.js
let cache = new Map();

<<<<<<< HEAD
// 计算并记住结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 计算 obj 值的结果 */ obj;
=======
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
<<<<<<< HEAD
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
=======
// Now we use process() in another file:
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears: the cached result will be removed from memory automatically after the object gets garbage collected.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

<<<<<<< HEAD
// 计算并记结果
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 计算 obj 之后得出的结果 */ obj;
=======
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

<<<<<<< HEAD
// ...之后, 当该对象不再需要的时候:
obj = null;

// 不能使用 cache.size, 因为它是一个 WeakMap,
// 要么是 0 或者 很快变成 0
// 当 obj 被回收时, 缓存的数据也会被清除
=======
// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```

## WeakSet

<<<<<<< HEAD
`WeakSet` 的作用类似:

- 它跟 `Set` 类似, 但是我们只能添加对象到 `WeakSet` (非原始值)中。
- 某个对象只有在其它任何地方都能访问的时候才能留在 set 里。
- 跟 `Set` 一样, `WeakSet` 支持 `add`, `has` and `delete` 等方法, 但不支持 `size`, `keys()` 并且没有迭代。
变 "弱" 的同时, 它也可以作为额外的存储空间，但并非任意数据，而是针对“是/否”的事实，在 `WeakSet` 里的成员代表着对象里的某个属性。
例如, 我们可以添加 users 到 `WeakSet` 里来追踪谁访问了我们的网站：
=======
`WeakSet` behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

Being "weak", it also serves as an additional storage. But not for an arbitrary data, but rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

<<<<<<< HEAD
// 现在 visitedSet 有2个用户

// 检查 John 是否访问过?
alert(visitedSet.has(john)); // true

// 检查 Mary 是否访问过?
=======
// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
alert(visitedSet.has(mary)); // false

john = null;

<<<<<<< HEAD
// visitedSet 将被自动清理
```

 `WeakMap` 和 `WeakSet` 最出名的限制是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是依旧不能阻止 `WeakMap/WeakSet` 完成其主要工作 -- 成为在其它地方管理或者存储的对象的 “额外的” 数据存储

## 总结

` WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并在其他方式无法访问它们时将其与关联值一起删除。

`WeakSet` 是类似于`Set`的集合，它仅存储对象，并在其他方式无法访问它们时将其删除。 

它们都不支持引用所有键或其计数的方法和属性。 仅允许单个操作。

`WeakMap` 和`WeakSet`还用作“辅助”数据结构。 一旦将对象从主存储器中删除，如果仅将其作为“ WeakMap”或“ WeakSet”的键，那么则将自动清除该对象。
=======
// visitedSet will be cleaned automatically
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

`WeakMap` is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

`WeakSet` is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Both of them do not support methods and properties that refer to all keys or their count. Only individual operations are allowed.

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "main" object storage. Once the object is removed from the main storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
