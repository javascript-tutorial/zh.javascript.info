
# Map、Set、WeakMap 和 WeakSet

## Map、Set

现在，我们已经学习了下面的比较复杂的数据结构：

- 对象：存储键值对的集合。
- 数组：存储有序集合。

但是，实际应用时还是不够。这就是 `Map` 和 `Set` 存在的原因。

## Map

[Map](mdn:js/Map) 是一个键值对的集合，很像 `Object`。但主要的区别是，`Map` 允许所有数据类型作为键。

主要的方法包括：

- `new Map()` -- 创建 map。
- `map.set(key, value)` -- 根据键（key）存储值（value）。
- `map.get(key)` -- 根据键返回值，如果 map 中该键不存在，返回 `undefined`。
- `map.has(key)` -- 如果键存在，返回 `true`，否则返回 `false`。
- `map.delete(key)` -- 移除该键的值。
- `map.clear()` -- 清空 map
- `map.size` -- 返回当前元素个数。

例如：

```js run
let map = new Map();

map.set('1', 'str1');   // 字符串作为 key
map.set(1, 'num1');     // 数字作为 key
map.set(true, 'bool1'); // 布尔值作为 key

// 还记得普通对象 Object 吗？它将会把所有的键转化为字符串类型
// 但是 Map 将会保留键的类型，所以下面这两个是不同的：
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

正如我们所见，不像普通对象，键并没有被转化为字符串。任何类型的键都是可以的。

**Map 可以使用对象作为键。**

例如：
```js run
let john = { name: "John" };

// 存下每个用户的来访次数
let visitsCountMap = new Map();

// john 是 map 的键
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

使用对象作为键是 `Map` 最著名和重要的特性。对于字符串键， `Onbject` 可能会很友好，但是不能使用对象作为键

我们来试一下：

```js run
let john = { name: "John" };

let visitsCountObj = {}; // 尝试使用普通对象

visitsCountObj[john] = 123; // 尝试把 john 作为键

// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
```

当 `visitsCountObj` 是一个普通对象时，它会转化所有的键，想 `john` 会变成字符串，所以我们会得到的 `[object Object]` 结果,很明显这不是我们想要的结果

````

```smart header="How `Map` compares keys"
为了检测值是否相等，`Map` 使用了算法 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)。它大概就和严格等于号 `===` 相同，但区别是 `NaN` 等于 `NaN`。所以 `NaN` 也可以作为键。

该算法不能更改或用户定制。
```


````smart header="Chaining"

每次 `map.set` 的调用将会返回 map 自身，所以可以链式调用：

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````
## `Map` 上的迭代

要循环一个 `Map` ，这里有3个方法：

- `map.keys()` -- 返回一个可迭代的键集合

- `map.values()` -- 返回一个可迭代的值集合

- `map.entires()` -- 返回一个可迭代的键值对集合 `[key, value]`,默认使用 `for..of`

例如：

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}

```
```text
使用插入顺序

当新值被插入时迭代会使用相同的顺序， `Map`会保留这个顺序， 不像常规 `Object`

```

另外，`Map` 也有内置方法 `forEach` ，跟 `Array` 相同:

```js run
// 运行for each 函数，作用于键值对
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // 黄瓜: 500   等等
});

```

##Object.entries:Object 转成 Map 

当 `Map`被创建时，我们可以传递一个数组（其它任何可迭代的）充当键值对来初始化，像这样：

```js run
// 数组键值对
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

如果我们有一个普通对象，并且我们想利用该对象创建一个 `Map`，然后我们可以使用内建方法 [Object.entries(obj)](mdn:js/Map) 返回一个数组包含已经格式化的对象键值对。

所以我们像下面这样通过对象来创建一个 map :

```js run 
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
```
这里，`Object.entries` 返回了包含键值对的数组：`[ ["name","John"], ["age", 30] ]`, 这是`Map` 所需要的


## Object.fromEntries: Map 转成 Object

我们刚刚看到了怎么利用 `Object.entries(obj)` 把普通对象转化成 `Map` 

这里有个相反`Object.fromEntries` 方法： 给定一个包含键值对的数组，它会利用数组创建一个对象：

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

我们使用 `Object.fromEntries()` 从 `Map` 中获取到一个普通对象

比如.我们在`Map` 中存储了数据，但是我们需要把它传递给第三方代码从而暴露出一个普通对象

我们开始吧：

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // 创建一个普通对象(*)

// 完成!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

调用`map.entries()` 会返回一个键值对数组，刚刚好是`Object.fromEntries()` 所需要的格式

我们可以把打 （*）这一行缩短：因为 `Object.fromEntries` 期望一个可迭代对象作为参数。没有必要时数组。标准的`map` 迭代返回键值对跟
 
 ```javascript
 let obj = Object.fromEntries(map); // 省略 .entries() 方法
```
以上代码做着同样的事情。因为`Object.fromEntries` 期望一个可迭代对象作为参数，没有必要是数组，标准的`map`迭代会返回跟 `map.entries()` 所返回的一样的键值对，所以我们得到一个跟map返回的一样的键值对对象

## Set

`Set`是一个特殊类型的集合-“值得集合”（没有键），每个值只出现一次

它的主要方法有：

- `new Set(iterable)` --创建一个集合，如果提供了`iterable`（可迭代）对象(通常是数组)，将会把它们放入集合中

- `set.add(value)` --添加一个值。并返回当前集合

- `set.delete(value)` --移除值，如果在当前调用中 `value` 存在就返回`true`，否则为 `false`

- `set.has(value)` -- 如果`value` 存在集合中则返回 `true` 否则为`false`

- `set.clear()` -- 移除集合里的所有元素（清空）

- `set.size` -- 是元素的数量

主要的特性是使用相同`value`并重复调用`set.add(value)`将不会做任何事，这就是为什么每个值在`Set` 中只出现一次的原因

例如，我们有访客进来，并向记住所有人。但是同一个访客会导致重复计算。访客必须只“计算”一次

`Set`就是为解决上面的问题而来：
 
 ```js run
 let set = new Set();
 
 let john = { name: "John" };
 let pete = { name: "Pete" };
 let mary = { name: "Mary" };
 
 // visits, some users come multiple times
 set.add(john);
 set.add(pete);
 set.add(mary);
 set.add(john);
 set.add(mary);
 
 // set keeps only unique values
 alert( set.size ); // 3
 
 for (let user of set) {
   alert(user.name); // John (then Pete and Mary)
 }
 ```

供`Set` 选择的是个数组，以上代码会使用 [arr.find](mdn:js/find)来检查每个插入。但是性能不好，因为这个方法会遍历整个数组来检查每个元素，`Set` 会在内部进行更好的优化作独一无二的检查

## Set 上的迭代

我们可以使用`for..of` 或者` forEach` 来循环一个集合：

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

记住有个有趣的事情，`forEach` 的回调函数有三个参数：一个`value`,然后第二个相同的值`valueAgain`,最后一个是目标对象。的确，相同的值会在参数里出现俩次

那是为了兼容`Map` 所以回调也传了3个参数。毫无疑问，看起来有点奇怪。但是可以帮助我们在特定情况下替换`Map`为`Set`，或者相反。

`Map` 里面有的相同的迭代方法在`Set`里面也支持

- `set.keys()` -- 返回可迭代对象的值

- `set.values() `-- 用法同 `set.keys()`，为了兼容`Map`

- `set.entries()` -- 返回可迭代对象`[value, value]`， 也是为了兼容`Map` 


##总结

`Map` 是一个带有值的键的集合

方法和属性：

- `new Map([iterable])` -- 创建集合, 使用可选的带有键值对的可迭代对象 (例如数组)来初始化.

- `map.set(key, value)` -- 根据键来存储值

- `map.get(key)` -- 依据键来返回值，如果 `key` 不存在会返回 `undefined`

- `map.has(key)` -- 如果键存在则返回 `true` ，否则返回  `false`

- `map.delete(key)` --依据键来删除值

- `map.clear()` --删除集合里面的所有成员

- `map.size` --返回当前元素的数量

与常规 `Object` 不同:

- 任何键，包括对象也可以作为 `Map` 的键

- 额外的便捷方法，`size` 属性


`Set` --所有单独的值的集合

方法和属性：

- `new Set([iterable])` -- 创建一个 `Set` 集合，使用可选的的可迭代对象 (例如数组)来初始化

- `set.add(value)` -- 添加一个值（如果该值已经存在便什么也不做），返回 `Set` 集合本身

- `set.delete(value)` -- 移除值，如果当前环境调用的时候该值存在则返回 `true` ,否则返回 `false`

- `set.has(value)` -- 如果该值存在 `Set` 中则返回 `true` ，否则返回 `false`

- `set.clear()` -- 移除 `Set` 里面的所有成员

- `set.size` -- 元素的个数

 `Map` 和 `Set` 的迭代总是有序插入,所以我们不能说这些集合是无序的，也不能重新排序，或者直接使用它的数字获取到某个元素
 
 
## WeakMap 和 WeakSet

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

和 `Map` 的第一个不同点就是 `WeakMap` 的键必须是对象，不能试原始值：

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

这里有个使用 `Map` 来计算的函数：

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

alert(cache.size); // 1 (wow! 这个对象依然在缓存中, 占据内存!)
```

对于相同对象多次调用 `process(obj)` 方法，他只计算第一次，之后是从缓存获取。这样的缺点就是当该对象不在需要的时候，我们需要清理 `clean` 

如果我们使用 `WeakMap` 来代替 `Map` ，然后这些问题就会消失：当该对象被回收时，缓存的结果将会从内存中自动被移除

```js run

// 📁 cache.js
let cache = new WeakMap();

// calculate and remember the result
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

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well

```
## WeakSet

`WeakSet` 的表现也相似：

- 它类似于 `Set` ，但是我们仅仅添加对象到 `WeakSet` 里(而不是原始值)

- 集合里面存在该对象当它可以从其他地方获取

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
