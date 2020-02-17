
# Map and Set（映射和集合）

我们已经了解了以下复杂的数据结构：

- 存储键集合的对象。
- 存储有序集合的数组。

但这还不足以应对现实情况。这就是为什么存在 `Map` 和 `Set`。

## Map

[Map](mdn:js/Map) 是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键（key）。

它的方法和属性如下：

- `new Map()` － 创建 `Map`。
- `map.set(key, value)` － 根据键存储值。
- `map.get(key)` － 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` － 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` － 根据键来删除值。
- `map.clear()` － 清空 `Map`。
- `map.size` － 返回当前元素个数。

举个例子：

```js run
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键

// 还记得普通的 Object 吗? 它会将键转化为字符串
// Map 则会保留键的类型，所以下面这两个结果不同：
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

如我们所见，与对象不同，键不会被转换成字符串。键可以是任何类型。

```smart header="`map[key]` 不是使用 `Map` 的正确方式"
虽然 `map[key]` 也有效，例如我们可以设置 `map[key] = 2`，这样会将 `map` 视为 JavaScript 的 plain object，因此它暗含了所有相应的限制（没有对象键等）。

所以我们应该使用 `map` 方法：`set` 和 `get` 等。
```

**Map 还可以使用对象作为键**

例如：

```js run
let john = { name: "John" };

// 存储每个用户的来访次数
let visitsCountMap = new Map();

// john 是集合中的键
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

使用对象作为键是 `Map` 最值得注意和重要的功能之一。对于字符串键，`Object`（普通对象）能正常使用，但对于对象键则不能。
  
我们来尝试一下：

```js run
let john = { name: "John" };

let visitsCountObj = {}; //  尝试使用对象

visitsCountObj[john] = 123; // 尝试将 john 对象作为键

*!*
// 是写成了这样!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

因为 `visitsCountObj` 是一个普通对象，它会将所有的键如 `john` 转换为字符串，所以我们得到字符键 `"[object Object]"`。这显然不是我们想要的结果。

```smart header="`Map` 是怎么比较键的？"

`Map` 使用 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)算法来比较键是否相等。 它和严格等于 `===` 差不多，但区别是 `NaN` 被看成是等于 `NaN`。 所以 `NaN` 也可以被用作键。

这个算法不能被改变或者自定义。

```

````smart header="链式调用"

每一次调用 `map.set` 都会返回集合本身，所以我们可以”连续“调用：

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```


## `Map` 迭代

如果要在 `map` 里使用循环，可以使用以下三个方法：

- `map.keys()` － 返回键名的遍历器，
- `map.values()` － 返回键值的遍历器，
- `map.entries()` － 返回实体 `[key, value]` 的遍历器，默认在 `for..of` 中使用。

例如：

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// 迭代键（vegetables）
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// 迭代值（amounts）
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// 迭代 [key, value] 对
for (let entry of recipeMap) { // 效果跟 recipeMap.entries() 相同
  alert(entry); // cucumber,500（以此类推）
}
```

```smart header="使用插入顺序"

迭代的顺序与键的插入顺序相同。不同于普通的 `Object`，`Map` 会保留键的插入顺序。
```

除此之外，`Map` 有个内置的 `forEach` 方法，跟 `Array` 类似：

```js
// 对每个 (key, value) 键值对运行 forEach 函数
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 等
});
```

## Object.entries：把对象转化为 `map`

 创建 `Map` 后，我们可以传入带有键值对的数组 (或其它可迭代的对象) 来进行初始化，像这样：

```js run
// 包含 [key, value] 对的数组
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

如果我们想从一个已有的 plain object 来创建 `Map`，可以使用内置方法 [Object.entries(obj)](mdn:js/Object/entries)，它返回一个对象的键值对数组，该数组符合 `Map` 集合的格式。

所以可以像下面这样利用一个对象来创建 `map`

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

这里，`Object.entries` 返回一个含有键值对的数组：`[ ["name","John"], ["age", 30] ]`。这就是 `Map` 所需要的参数格式。


## Object.fromEntries：把 `map` 转化为对象

我们刚刚已经利用 `Object.entries(obj)` 把一个 plain object 转化成 `Map`。

`Object.fromEntries` 方法的作用是相反的：给定一个具有 `[key, value]` 对的数组，它会根据给定数组生成对象：

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// 现在 prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

我们可以使用 `Object.fromEntries` 从 `Map` 中得到一个 plain object。

例如，我们存了数据在 `Map` 中，但是我们需要把它传给需要 plain object 的第三方代码。

我们来开始：

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // 生成一个 plain object (*)
*/!*

// 完成!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

调用 `map.entries()` 将返回含有键值对的数组，这刚好是 `Object.fromEntries` 所需要的格式。

我们可以把带 `(*)` 的这一行写得更短：

```js
let obj = Object.fromEntries(map); // 省掉 .entries()
```

上面的代码作用也是一样的，因为 `Object.fromEntries` 需要一个可迭代对象作为参数，而不一定是数组。`map` 的标准迭代会返回跟 `map.entries()` 一样的键值对。所以我们可以获得一个与 `map` 一样具有键值对的 plain object。

## Set

`Set` 是一个特殊类型的集合 － ”值的集合“ (没有键 )，它的每一个值只出现一次。

它的主要方法如下：

- `new Set(iterable)` － 创建一个 `set`，如果提供了一个 `iterable` 对象（通常是数组），将会从数组里面复制值到 `set` 中。
- `set.add(value)` － 添加一个值，返回 set 本身
- `set.delete(value)` － 删除值，如果 `value` 在调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` － 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` － 清空集合。
- `set.size` － 返回元素的个数。

它的主要特点是重复使用同一个值调用 `set.add(value)` 并不会发生什么改变。这就是 `Set` 里面的每一个值只出现一次的原因。

例如，我们有客人来访，想记住他们每一个人。但是已经访问过的客人不应重复记录。每个访客必须只被“计数”一次。

`Set` 可以帮助我们解决这个问题：

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits，一些访客来访好几次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set 只保留单一值
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (然后 Pete 和 Mary)
}
```

替代 `Set` 的场景可以是一个用户数组，用 [arr.find](mdn:js/Array/find) 在每次插入时检查是否重复。但是这样会使性能变差，因为这个方法会遍历整个数组来检查每个元素。`Set` 内部对唯一性检查进行了更好的优化。

##  Set 迭代

我们可以使用 `for..of` 或  `forEach` 来循环 `Set` 集合：

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 跟 forEach 方法相同：
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

注意一件有趣的事情。`forEach` 的回调函数有三个参数：一个 `value`，然后是*相同值* `valueAgain`，最后才是目标对象。没错，相同的值在参数里出现了两次。

这是为了兼容 `Map` 在回调里传入 `forEach` 函数后有三个参数。当然这看起来有点奇怪。但是这对在特定情况下比如使用 `Set` 代替 `Map` 的时候有帮助，反之亦然。

`Map` 中用于迭代的方法在 `Set` 中也同样支持：

- `set.keys()` － 返回一个包含值的可迭代对象,
- `set.values()` － 跟 `set.keys()` 作用相同，为了兼容 `Map`，
- `set.entries()` － 返回一个包含 `[value, value]` 对的可迭代对象，它的存在也是为了兼容 `Map`。

## 总结

`Map` － 是一个键值对集合。

方法和属性如下：

- `new Map([iterable])` － 创建空的 map，可选择带有 `[key,value]` 对的 `iterable`（例如数组）对象来进行初始化 。
- `map.set(key, value)` － 存储对应的键值。
- `map.get(key)` － 根据键来返回值，如果键不存在 map 里就返回 `undefined`。
- `map.has(key)` － 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` － 删除指定键的值。
- `map.clear()` － 清空 map 。
- `map.size` － 返回当前全部元素的个数。

跟 plain object `Object` 最大的不同点是：

- 任何键、对象都可以作为键，
- 有其他的便捷方法，如 `size` 属性。

`Set` － 是一组唯一值的集合。

方法和属性：

- `new Set([iterable])` － 创建空的 set，可选的 `iterable`（例如数组）对象来进行初始化。
- `set.add(value)` － 添加一个值（如果值不存在），返回 set 本身。
- `set.delete(value)` － 删除值，如果 `value` 在调用的时候存在则返回 `true`，否则返回 `false`。
- `set.has(value)` － 如果值在集合中，则返回 `true`，否则返回 `false`。
- `set.clear()` － 清空集合。
- `set.size` － 返回当前全部元素的个数。

在 `Map` 和 `Set` 中迭代总是按照插入的顺序来执行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其顺序来获取元素。
