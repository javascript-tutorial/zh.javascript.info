
# Symbol 类型

根据规范，object 属性键只能是 String 类型或者 Symbol 类型。不是 Number，也不是 Boolean，只有 String 或 Symbol 这两种类型。

到目前为止，我们只见过 String。现在我们来看看 Symbol 能给我们带来什么好处。

## Symbol

"Symbol" 值表示唯一的标识符

可以使用 `Symbol()` 来创建这种类型的值：

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();
```

我们可以给 Symbol 一个描述（也称为 Symbol 名），这对于调试非常有用：

```js
// id 是描述为 "id" 的 Symbol
let id = Symbol("id");
```

Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个不影响任何东西的标签。

例如，这里有两个描述相同的 Symbol —— 它们不相等：

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

如果您熟悉 Ruby 或者其他有 "Symbol" 的语言 —— 别被误导。JavaScript 的 Symbol 与众不同。

````warn header="Symbols don't auto-convert to a string"
JavaScript 中的大多数值都支持 string 的隐式转换。例如，我们可以 `alert` 任何值，这会起作用。Symbol 是特别的，它无法自动转换。

例如，这个 `alert` 将会显示错误：

```js run
let id = Symbol("id");
*!*
alert(id); // 类型错误：无法将 Symbol 值转换为 String。
*/!*
```

如果我们真的想显示一个 Symbol，我们需要在它上面调用 `.toString()`，如下所示：
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id)，现在它起作用了
*/!*
```

这是一种防止混乱的“语言保护”，因为 String 和 Symbol 有本质上的不同，而且不应该偶尔将它们相互转化。
````

## “隐藏”属性

Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能偶尔访问或重写这些属性。

例如，如果我们想存储 object `user` 的“标识符”，我们可以使用 Symbol 作为它的键：

```js run
let user = { name: "John" };
let id = Symbol("id");

user[id] = "ID Value";
alert( user[id] ); // 我们可以使用 Symbol 作为键来访问数据。
```

在 string `"id"` 上使用 `Symbol("id")` 有什么好处？ 

我们用更深入一点的示例来说明这一点。

假设另一个脚本希望 `user` 中有它自己的 "id" 属性可以操作。这可能是另一个 JavaScript 库，所以这些脚本完全不知道对方是谁。

然后该脚本可以创建自己的 `Symbol("id")`，如下所示：

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

不会冲突，因为 Symbol 总是不同的，即使它们有相同的名称。

现在请注意，如果我们使用 String `"id"` 而不是用 symbol，那么**就会**出现冲突：

```js run
let user = { name: "John" };

//我们的脚本使用 "id" 属性。
user.id = "ID Value";

// ...如果之后另一个脚本为其目的使用 "id"...

user.id = "Their id value"
// 砰！无意中重写了 id！他不是故意伤害同事的，而是这样做了！
```

### 字面量中的 Symbol

如果我们要在 object 字面量中使用 Symbol，则需要方括号。

就像这样：

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // 不仅仅是 "id：123"
*/!*
};
```
这是因为我们需要变量 `id` 的值作为键，而不是 String "id"。

### Symbol 在 for..in 中被跳过

Symbolic 属性不参与 `for..in` 循环。

例如：

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (no symbols)
*/!*

// 被 Symbol 任务直接访问
alert( "Direct: " + user[id] );
```

这是一般“隐藏”概念的一部分。如果另一个脚本或库在我们的对象上循环，它不会访问一个 Symbol 类型的属性。

相反，[Object.assign](mdn:js/Object/assign) 同时复制字符串和符号属性：

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

这里并不矛盾，就是这样设计的。我们的想法是当我们克隆一个 object 或合并 object 时，通常希望**所有**属性被复制（包括像 `id` 这样的 Symbol）。

````smart header="Property keys of other types are coerced to strings"
我们只能在对象中使用 string 或 symbol 作为键，其它类型转换为 String。

例如，在作为属性键使用时，数字 `0`变成了字符串 `"0"`：

```js run
let obj = {
  0: "test" // same as "0": "test"
};

//两个 alert 都访问相同的属性（Number 0 被转换为 String "0"）
alert( obj["0"] ); // test
alert( obj[0] ); // test （相同属性）
```
````

## 全局 symbol

正如我们所看到的，通常所有的 Symbol 都是不同的，即使它们有相同的名字。但有时我们想要同一个名字的 Symbol 是相同的实体。

比如，我们希望在应用程序的不同部分访问相同的 Symbol `"id"` 属性。 

为此，存在一个**全局 symbol 注册表**。我们可以在其中创建 Symbol 并在稍后访问它们，它可以确保每次访问相同名称都会返回相同的 Symbol。

为了在注册表中创建或读取 Symbol，请使用 `Symbol.for(key)`。

该调用会检查全局注册表，如果有一个描述为 `key` 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol（`Symbol(key)`），并通过给定的 `key` 将其存储在注册表中。

例如：

```js run
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true
```

注册表内的 Symbol 称为**全局 Symbol**。如果我们想要一个应用程序范围内的 Symbol，可以在代码中随处访问 —— 这就是它们的用途。

```smart header="That sounds like Ruby"
在一些编程语言中，例如 Ruby，每个名称都有一个 symbol。

在 JavaScript 中，我们应该用全局 symbol。
```

### Symbol.keyFor

对于全局 symbol，`Symbol.for(key)` 不仅按名称返回一个 symbol，而且还有一个反向调用：`Symbol.keyFor(sym)`，反过来：通过全局 symbol 返回一个名称。

例如：

```js run
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 从 symbol 中获取 name
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` 在内部使用全局 symbol 注册表来查找 symbol 的键。所有它不适用于非全局 symbol。如果 symbol 不是全局的，它将无法找到它并返回 `undefined`。

例如：

```js run
alert( Symbol.keyFor(Symbol.for("name")) ); // name, 全局 Symbol

alert( Symbol.keyFor(Symbol("name2")) ); // undefined, 参数不是一个全局 Symbol
```

## 系统 Symbol

JavaScript 内部存在很多“系统” Symbol，我们可以使用它们来微调对象的各个方面。 

它们列在[熟悉的 Symbol](https://tc39.github.io/ecma262/#sec-well-known-symbols) 表的规范中：

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...等等。

例如，`Symbol.toPrimitive` 允许我们将对象描述为原始值转换，我们很快就会看到它的使用。

当我们研究相应的语言特征时，其他 Symbol 也会变得熟悉起来。

## 总结

`Symbol` 是唯一标识符的基本类型

Symbol 使用 `Symbol()` 创建的，调用带有一个可选的描述。

Symbol 总是不同的值，即使它们有相同的名称。如果我们希望同名 Symbol 相等，那么我们应该使用全局注册表：`Symbol.for(key)` 返回（如果需要的话创建）一个以 `key` 作为名称的全局 Symbol。`Symbol.for` 的多次调用完全返回相同的 Symbol。

Symbol 有两个主要的使用场景：

1. “隐藏” object 属性。如果需要将属性添加到 “属于” 另一个脚本或库的对象中，则可以创建 Symbol 并将其用作属性键。Symbol 属性不出现在 `for..in`中，因此不回偶尔列出。另外，它不会被直接访问，因为另一个脚本没有我们的符号，所以它不会偶尔干预它的操作。

    因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的 object 中，但其他人不应该看到。

2. JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 `Symbol.*` 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 `Symbol.iterator` 来[迭代](info:iterable)，`Symbol.toPrimitive` 来设置 [对象原始值的转换](info:object-toprimitive)等等。

从技术上说，Symbol 不是 100% 隐藏的。有一个内置方法 [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) 允许我们获取所有的 Symbol。还有一个名为 [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) 返回**所有**键，包括 Symbol。所以它们不是真正的隐藏。但是大多数库、内置方法和语法结构都遵循一个共同的协议。而明确调用上述方法的人可能很清楚他在做什么。
