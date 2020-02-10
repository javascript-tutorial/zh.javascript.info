
# Symbol 类型

根据规范，对象的属性键只能是字符串类型或者 Symbol 类型。不是 Number，也不是 Boolean，只有字符串或 Symbol 这两种类型。

<<<<<<< HEAD
到目前为止，我们只见过字符串。现在我们来看看 Symbol 能给我们带来什么好处。
=======
Till now we've been using only strings. Now let's see the benefits that symbols can give us.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

## Symbol

<<<<<<< HEAD
"Symbol" 值表示唯一的标识符。
=======
A "symbol" represents a unique identifier.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

可以使用 `Symbol()` 来创建这种类型的值：

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();
```

<<<<<<< HEAD
创建时，我们可以给 Symbol 一个描述（也称为 Symbol 名），这在代码调试时非常有用：
=======
Upon creation, we can give symbol a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
// id 是描述为 "id" 的 Symbol
let id = Symbol("id");
```

Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。

例如，这里有两个描述相同的 Symbol —— 它们不相等：

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

如果你熟悉 Ruby 或者其他有 "Symbol" 的语言 —— 别被误导。JavaScript 的 Symbol 是不同的。

````warn header="Symbol 不会被自动转换为字符串"
JavaScript 中的大多数值都支持字符串的隐式转换。例如，我们可以 `alert` 任何值，都可以生效。Symbol 比较特殊，它不会被自动转换。

例如，这个 `alert` 将会提示出错：

```js run
let id = Symbol("id");
*!*
alert(id); // 类型错误：无法将 Symbol 值转换为字符串。
*/!*
```

<<<<<<< HEAD
这是一种防止混乱的“语言保护”，因为字符串和 Symbol 有本质上的不同，不应该意外地将它们转换成另一个。

如果我们真的想显示一个 Symbol，我们需要在它上面调用 `.toString()`，如下所示：
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id)，现在它有效了
*/!*
```

或者获取 `symbol.description` 属性，只显示描述（description）：
=======
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

<<<<<<< HEAD
=======
Or get `symbol.description` property to show the description only:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
````

## “隐藏”属性

Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。

<<<<<<< HEAD
例如，如果我们使用的是属于第三方代码的 `user` 对象，我们想要给它们添加一些标识符。

我们可以给它们使用 Symbol 键：

```js run
let user = { // 属于另一个代码
=======
Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we're working with `user` objects, that belong to a third-party code. We'd like to add identifiers to them.

Let's use a symbol key for it:

```js run
let user = { // belongs to another code
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

<<<<<<< HEAD
alert( user[id] ); // 我们可以使用 Symbol 作为键来访问数据
```

在字符串 `"id"` 上使用 `Symbol("id")` 有什么好处？ 

因为 `user` 属于另一个代码，另一个代码也使用它执行一些操作，所以我们不应该在它上面加任何字段，这样很不安全。但是 Symbol 不会被意外访问到，所以第三方代码看不到它，所以使用 Symbol 也许不会有什么问题。

另外，假设另一个脚本希望在 `user` 中有自己的标识符，以实现自己的目的。这可能是另一个 JavaScript 库，因此脚本之间完全不了解彼此。
=======
alert( user[id] ); // we can access the data using the symbol as the key
```

What's the benefit of using `Symbol("id")` over a string `"id"`?

As `user` objects belongs to another code, and that code also works with them, we shouldn't just add any fields to it. That's unsafe. But a symbol cannot be accessed accidentally, the third-party code probably won't even see it, so it's probably all right to do.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes. That may be another JavaScript library, so that the scripts are completely unaware of each other.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

然后该脚本可以创建自己的 `Symbol("id")`，像这样：

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

<<<<<<< HEAD
我们的标识符和他们的标识符之间不会有冲突，因为 Symbol 总是不同的，即使它们有相同的名字。

……但如果我们处于同样的目的，使用字符串 `"id"` 而不是用 symbol，那么 **就会** 出现冲突：
=======
There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.

...But if we used a string `"id"` instead of a symbol for the same purpose, then there *would* be a conflict:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let user = { name: "John" };

<<<<<<< HEAD
// 我们的脚本使用了 "id" 属性。
user.id = "Our id value";

// ……另一个脚本也想将 "id" 用于它的目的……     

user.id = "Their id value"
// 砰！无意中被另一个脚本重写了 id！
=======
// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```

### 字面量中的 Symbol

<<<<<<< HEAD
如果我们要在对象字面量 `{...}` 中使用 Symbol，则需要使用方括号把它括起来。
=======
If we want to use a symbol in an object literal `{...}`, we need square brackets around it.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

就像这样：

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
<<<<<<< HEAD
  [id]: 123 // 而不是 "id：123"
=======
  [id]: 123 // not "id: 123"
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
*/!*
};
```
这是因为我们需要变量 `id` 的值作为键，而不是字符串 "id"。

### Symbol 在 for..in 中会被跳过

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

// 使用 Symbol 任务直接访问
alert( "Direct: " + user[id] );
```

<<<<<<< HEAD
`Object.keys(user)` 也会忽略它们。这是一般“隐藏符号属性”原则的一部分。如果另一个脚本或库遍历我们的对象，它不会意外地访问到符号属性。
=======
`Object.keys(user)` also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

相反，[Object.assign](mdn:js/Object/assign) 会同时复制字符串和 symbol 属性：

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

这里并不矛盾，就是这样设计的。这里的想法是当我们克隆或者合并一个 object 时，通常希望 **所有** 属性被复制（包括像 `id` 这样的 Symbol）。

<<<<<<< HEAD
````smart header="其他类型的属性键被强制为字符串"
我们只能在对象中使用字符串或 symbol 作为键，其它类型会被转换为字符串。

例如，在作为属性键使用时，数字 `0` 变成了字符串 `"0"`：

```js run
let obj = {
  0: "test" // 和 "0": "test" 一样
};

// 两个 alert 都访问相同的属性（Number 0 被转换为字符串 "0"）
alert( obj["0"] ); // test
alert( obj[0] ); // test（同一个属性）
```
````

## 全局 symbol

正如我们所看到的，通常所有的 Symbol 都是不同的，即使它们有相同的名字。但有时我们想要名字相同的 Symbol 具有相同的实体。例如，应用程序的不同部分想要访问的 Symbol `"id"` 指的是完全相同的属性。

为了实现这一点，这里有一个 **全局 Symbol 注册表**。我们可以在其中创建 Symbol 并在稍后访问它们，它可以确保每次访问相同名字的 Symbol 时，返回的都是相同的 Symbol。
=======
## Global symbols

As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

要从注册表中读取（不存在则创建）Symbol，请使用 `Symbol.for(key)`。

<<<<<<< HEAD
该调用会检查全局注册表，如果有一个描述为 `key` 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol（`Symbol(key)`），并通过给定的 `key` 将其存储在注册表中。
=======
In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

例如：

```js run
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

<<<<<<< HEAD
// 再次读取（可能是在代码中的另一个位置）
=======
// read it again (maybe from another part of the code)
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true
```

注册表内的 Symbol 被称为 **全局 Symbol**。如果我们想要一个应用程序范围内的 Symbol，可以在代码中随处访问 —— 这就是它们的用途。

```smart header="这听起来像 Ruby"
在一些编程语言中，例如 Ruby，每个名字都有一个 Symbol。

正如我们所看到的，在 JavaScript 中，全局 Symbol 也是这样的。
```

### Symbol.keyFor

对于全局 Symbol，不仅有 `Symbol.for(key)` 按名字返回一个 Symbol，还有一个反向调用：`Symbol.keyFor(sym)`，它的作用完全反过来：通过全局 Symbol 返回一个名字。

例如：

```js run
<<<<<<< HEAD
// 通过 name 获取 Symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 通过 Symbol 获取 name
=======
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` 内部使用全局 Symbol 注册表来查找 Symbol 的键。所以它不适用于非全局 Symbol。如果 Symbol 不是全局的，它将无法找到它并返回 `undefined`。

也就是说，任何 Symbol 都具有 `description` 属性。

<<<<<<< HEAD
例如：
=======
That said, any symbols have `description` property.

For instance:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

<<<<<<< HEAD
alert( Symbol.keyFor(globalSymbol) ); // name，全局 Symbol
alert( Symbol.keyFor(localSymbol) ); // undefined，非全局
=======
alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

alert( localSymbol.description ); // name
```

## 系统 Symbol

JavaScript 内部有很多“系统” Symbol，我们可以使用它们来微调对象的各个方面。 

它们都被列在了 [众所周知的 Symbol](https://tc39.github.io/ecma262/#sec-well-known-symbols) 表的规范中：

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ……等等。

例如，`Symbol.toPrimitive` 允许我们将对象描述为原始值转换。我们很快就会看到它的使用。

当我们研究相应的语言特征时，我们对其他的 Symbol 也会慢慢熟悉起来。

## 总结

`Symbol` 是唯一标识符的基本类型

<<<<<<< HEAD
Symbol 是使用带有可选描述（name）的 `Symbol()` 调用创建的。

Symbol 总是不同的值，即使它们有相同的名字。如果我们希望同名的 Symbol 相等，那么我们应该使用全局注册表：`Symbol.for(key)` 返回（如果需要的话则创建）一个以 `key` 作为名字的全局 Symbol。使用 `Symbol.for` 多次调用 `key` 相同的 Symbol 时，返回的就是同一个 Symbol。
=======
Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Symbol 有两个主要的使用场景：

<<<<<<< HEAD
1. “隐藏” 对象属性。
    如果我们想要向“属于”另一个脚本或者库的对象添加一个属性，我们可以创建一个 Symbol 并使用它作为属性的键。Symbol 属性不会出现在 `for..in` 中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的 symbol。因此，该属性将受到保护，防止被意外使用或重写。
=======
1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

    因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的对象中，但其他地方看不到它。

2. JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 `Symbol.*` 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 `Symbol.iterator` 来进行 [迭代](info:iterable) 操作，使用 `Symbol.toPrimitive` 来设置 [对象原始值的转换](info:object-toprimitive) 等等。

<<<<<<< HEAD
从技术上说，Symbol 不是 100% 隐藏的。有一个内置方法 [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) 允许我们获取所有的 Symbol。还有一个名为 [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) 的方法可以返回一个对象的 **所有** 键，包括 Symbol。所以它们并不是真正的隐藏。但是大多数库、内置方法和语法结构都没有使用这些方法。
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
