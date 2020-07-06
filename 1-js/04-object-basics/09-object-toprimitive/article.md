
<<<<<<< HEAD
# 对象 — 原始值转换

当对象相加 `obj1 + obj2`，相减 `obj1 - obj2`，或者使用 `alert(obj)` 打印时会发生什么？

在这种情况下，对象会被自动转换为原始值，然后执行操作。

在 <info:type-conversions> 一章中，我们已经看到了数值，字符串和布尔转换的规则。但是我们没有讲对象的转换规则。现在我们已经掌握了方法（method）和 symbol 的相关知识，可以开始学习对象原始值转换了。

1. 所有的对象在布尔上下文（context）中均为 `true`。所以对于对象，不存在 to-boolean 转换，只有字符串和数值转换。
2. 数值转换发生在对象相减或应用数学函数时。例如，`Date` 对象（将在 <info:date> 一章中介绍）可以相减，`date1 - date2` 的结果是两个日期之间的差值。
3. 至于字符串转换 —— 通常发生在我们像 `alert(obj)` 这样输出一个对象和类似的上下文中。

## ToPrimitive

我们可以使用特殊的对象方法，对字符串和数值转换进行微调。

下面是三个类型转换的变体，被称为 "hint"，在 [规范](https://tc39.github.io/ecma262/#sec-toprimitive) 中有详细介绍（译注：当一个对象被用在需要原始值的上下文中时，例如，在 `alert` 或数学运算中，对象会被转换为原始值）：

`"string"`
: 对象到字符串的转换，当我们对期望一个字符串的对象执行操作时，如 "alert"：

    ```js
    // 输出
    alert(obj);

    // 将对象作为属性键
=======
# Object to primitive conversion

What happens when objects are added `obj1 + obj2`, subtracted `obj1 - obj2` or printed using `alert(obj)`?

In that case, objects are auto-converted to primitives, and then the operation is carried out.

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. All objects are `true` in a boolean context. There are only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object like `alert(obj)` and in similar contexts.

## ToPrimitive

We can fine-tune string and numeric conversion, using special object methods.

There are three variants of type conversion, so-called "hints", described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:

    ```js
    // output
    alert(obj);

    // using object as a property key
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: 对象到数字的转换，例如当我们进行数学运算时：

    ```js
    // 显式转换
    let num = Number(obj);

    // 数学运算（除了二进制加法）
    let n = +obj; // 一元加法
    let delta = date1 - date2;

    // 小于/大于的比较
=======
: For an object-to-number conversion, like when we're doing maths:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    let greater = user1 > user2;
    ```

`"default"`
<<<<<<< HEAD
: 在少数情况下发生，当运算符“不确定”期望值的类型时。

    例如，二进制加法 `+` 可用于字符串（连接），也可以用于数字（相加），所以字符串和数字这两种类型都可以。因此，当二元加法得到对象类型的参数时，它将依据 `"default"` hint 来对其进行转换。

    此外，如果对象被用于与字符串、数字或 symbol 进行 `==` 比较，这时到底应该进行哪种转换也不是很明确，因此使用 `"default"` hint。

    ```js
    // 二元加法使用默认 hint
    let total = obj1 + obj2;

    // obj == number 使用默认 hint
    if (user == 1) { ... };
    ```

    像 `<` 和 `>` 这样的小于/大于比较运算符，也可以同时用于字符串和数字。不过，它们使用 "number" hint，而不是 "default"。这是历史原因。

    实际上，我们没有必要记住这些奇特的细节，除了一种情况（`Date` 对象，我们稍后会学到它）之外，所有内建对象都以和 `"number"` 相同的方式实现 `"default"` 转换。我们也可以这样做。

```smart header="没有 `\"boolean\"` hint"
请注意 —— 只有三种 hint。就这么简单。

没有 "boolean" hint（在布尔上下文中所有对象都是 `true`）或其他任何东西。如果我们将 `"default"` 和 `"number"` 视为相同，就像大多数内建函数一样，那么就只有两种转换了。
```

**为了进行转换，JavaScript 尝试查找并调用三个对象方法：**

1. 调用 `obj[Symbol.toPrimitive](hint)` — 带有 symbol 键 `Symbol.toPrimitive`（系统 symbol）的方法，如果这个方法存在的话，
2. 否则，如果 hint 是 `"string"`
    — 尝试 `obj.toString()` 和 `obj.valueOf()`，无论哪个存在。
3. 否则，如果 hint 是 `"number"` 或 `"default"`
    — 尝试 `obj.valueOf()` 和 `obj.toString()`，无论哪个存在。

## Symbol.toPrimitive

我们从第一个方法开始。有一个名为 `Symbol.toPrimitive` 的内建 symbol，它被用来给转换方法命名，像这样：

```js
obj[Symbol.toPrimitive] = function(hint) {
  // 返回一个原始值
  // hint = "string"、"number" 和 "default" 中的一个
}
```

例如，这里 `user` 对象实现了它：
=======
: Occurs in rare cases when the operator is "not sure" what type to expect.

    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if the a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

    In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

```smart header="No `\"boolean\"` hint"
Please note -- there are only three hints. It's that simple.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
```

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

## Symbol.toPrimitive

Let's start from the first method. There's a built-in symbol named `Symbol.toPrimitive` that should be used to name the conversion method, like this:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // must return a primitive value
  // hint = one of "string", "number", "default"
};
```

For instance, here `user` object implements it:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

<<<<<<< HEAD
// 转换演示：
=======
// conversions demo:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

<<<<<<< HEAD
从代码中我们可以看到，根据转换的不同，`user` 变成一个自描述字符串或者一个金额。单个方法 `user[Symbol.toPrimitive]` 处理了所有的转换情况。
=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9


## toString/valueOf

<<<<<<< HEAD
方法 `toString` 和 `valueOf` 来自上古时代。它们不是 symbol（那时候还没有 symbol 这个概念），而是“常规的”字符串命名的方法。它们提供了一种可选的“老派”的实现转换的方法。

如果没有 `Symbol.toPrimitive`，那么 JavaScript 将尝试找到它们，并且按照下面的顺序进行尝试：

- 对于 "string" hint，`toString -> valueOf`。
- 其他情况，`valueOf -> toString`。

这些方法必须返回一个原始值。如果 `toString` 或 `valueOf` 返回了一个对象，那么返回值会被忽略（和这里没有方法的时候相同）。

默认情况下，普通对象具有 `toString` 和 `valueOf` 方法：

- `toString` 方法返回一个字符串 `"[object Object]"`。
- `valueOf` 方法返回对象自身。

下面是一个示例：
=======
Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

If there's no `Symbol.toPrimitive` then JavaScript tries to find them and try in the order:

- `toString -> valueOf` for "string" hint.
- `valueOf -> toString` otherwise.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

<<<<<<< HEAD
所以，如果我们尝试将一个对象当做字符串来使用，例如在 `alert` 中，那么在默认情况下我们会看到 `[object Object]`。

这里提到默认值 `valueOf` 只是为了完整起见，以避免混淆。正如你看到的，它返回对象本身，因此被忽略。别问我为什么，那是历史原因。所以我们可以假设它根本就不存在。

让我们实现一下这些方法。

例如，这里的 `user` 执行和前面提到的那个 `user` 一样的操作，使用 `toString` 和 `valueOf` 的组合（而不是 `Symbol.toPrimitive`）：
=======
So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

And the default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "John",
  money: 1000,

<<<<<<< HEAD
  // 对于 hint="string"
=======
  // for hint="string"
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  toString() {
    return `{name: "${this.name}"}`;
  },

<<<<<<< HEAD
  // 对于 hint="number" 或 "default"
=======
  // for hint="number" or "default"
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

<<<<<<< HEAD
我们可以看到，执行的动作和前面使用 `Symbol.toPrimitive` 的那个例子相同。

通常我们希望有一个“全能”的地方来处理所有原始转换。在这种情况下，我们可以只实现 `toString`，就像这样：
=======
As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

<<<<<<< HEAD
如果没有 `Symbol.toPrimitive` 和 `valueOf`，`toString` 将处理所有原始转换。

## 返回类型

关于所有原始转换方法，有一个重要的点需要知道，就是它们不一定会返回 "hint" 的原始值。

没有限制 `toString()` 是否返回字符串，或 `Symbol.toPrimitive` 方法是否为 hint "number" 返回数字。

唯一强制性的事情是：这些方法必须返回一个原始值，而不是对象。

```smart header="历史原因"
由于历史原因，如果 `toString` 或 `valueOf` 返回一个对象，则不会出现 error，但是这种值会被忽略（就像这种方法根本不存在）。这是因为在 JavaScript 语言发展初期，没有很好的 "error" 的概念。

相反，`Symbol.toPrimitive` **必须** 返回一个原始值，否则就会出现 error。
```

## 进一步的转换

我们已经知道，许多运算符和函数执行类型转换，例如乘法 `*` 将操作数转换为数字。

如果我们将对象作为参数传递，则会出现两个阶段：
1. 对象被转换为原始值（通过前面我们描述的规则）。
2. 如果生成的原始值的类型不正确，则继续进行转换。

例如：

```js run
let obj = {
  // toString 在没有其他方法的情况下处理所有转换
=======
In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

## Return types

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj * 2); // 4，对象被转换为原始值字符串 "2"，之后它被乘法转换为数字 2。
```

1. 乘法 `obj * 2` 首先将对象转换为原始值（字符串 "2"）。
2. 之后 `"2" * 2` 变为 `2 * 2`（字符串被转换为数字）。

二元加法在同样的情况下会将其连接成字符串，因为它更愿意接受字符串：
=======
alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj + 2); // 22（"2" + 2）被转换为原始值字符串 => 级联
```

## 总结

对象到原始值的转换，是由许多期望以原始值作为值的内建函数和运算符自动调用的。

这里有三种类型（hint）：
- `"string"`（对于 `alert` 和其他需要字符串的操作）
- `"number"`（对于数学运算）
- `"default"`（少数运算符）

规范明确描述了哪个运算符使用哪个 hint。很少有运算符“不知道期望什么”并使用 `"default"` hint。通常对于内建对象，`"default"` hint 的处理方式与 `"number"` 相同，因此在实践中，最后两个 hint 常常合并在一起。

转换算法是：

1. 调用 `obj[Symbol.toPrimitive](hint)` 如果这个方法存在，
2. 否则，如果 hint 是 `"string"`
    - 尝试 `obj.toString()` 和 `obj.valueOf()`，无论哪个存在。
3. 否则，如果 hint 是 `"number"` 或者 `"default"`
    - 尝试 `obj.valueOf()` 和 `obj.toString()`，无论哪个存在。

在实践中，为了便于进行日志记录或调试，对于所有能够返回一种“可读性好”的对象的表达形式的转换，只实现以 `obj.toString()` 作为全能转换的方法就够了。
=======
alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators)

The specification describes explicitly which operator uses which hint. There are very few operators that "don't know what to expect" and use the `"default"` hint. Usually for built-in objects `"default"` hint is handled the same way as `"number"`, so in practice the last two are often merged together.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for all conversions that return a "human-readable" representation of an object, for logging or debugging purposes.  
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
