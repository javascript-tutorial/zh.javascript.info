
# 对象原始值转换

当对象相加 `obj1 + obj2`，相减 `obj1 - obj2`，或者使用 `alert(obj)` 打印时会发生什么？

<<<<<<< HEAD
在对象中有特殊的方法用来做转换。

在 <info:type-conversions> 一章中，我们已经看到了数值，字符串和布尔转换的规则。但是我们给对象留了一个空隙。正如我们所知道的方法和符号一样，现在我们可以关闭它。

对于对象，不存在 to-boolean 转换，因为所有对象在布尔上下文中都是 `true`。所以只有字符串和数值转换。

数值转换发生在对象相减或应用数学函数时。例如，Date 对象（将在 <info:date> 章节中介绍）可以相减，而 `date1 - date2` 的结果是两个日期之间的时间差。

至于字符串转换 —— 它通常发生在我们输出像 `alert(obj)` 这样的对象和类似的上下文中。

## ToPrimitive

当一个对象被用在需要原始值的上下文中时，例如，在 `alert` 或数学运算中，它会使用 `ToPrimitive` 算法转换为原始值（[标准](https://tc39.github.io/ecma262/#sec-toprimitive)）。

该算法允许我们使用特殊的对象方法自定义转换。

取决于上下文，转换具有所谓的“暗示”。
=======
In that case objects are auto-converted to primitives, and then the operation is carried out.

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. All objects are `true` in a boolean context. There are only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object like `alert(obj)` and in similar contexts.

## ToPrimitive

We can fine-tune string and numeric conversion, using special object methods.

The conversion algorithm is called `ToPrimitive` in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive). It's called with a "hint" that specifies the conversion type.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

这里有三种变体：

`"string"`
<<<<<<< HEAD
: 当一个操作期望一个字符串时，对于对象到字符串的转换，比如 `alert`：
=======
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js
    // output
    alert(obj);

    // 使用对象作为属性键
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: 当一个操作需要一个数字时，用于对象到数字的转换，如 `maths`：
=======
: For an object-to-number conversion, like when we're doing maths:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js
    // 显式转换
    let num = Number(obj);

    // maths（除了二进制加法）
    let n = +obj; // 一元加法
    let delta = date1 - date2;

    // 小于/大于的比较
    let greater = user1 > user2;
    ```

`"default"`
: 在少数情况下发生，当操作者“不确定”期望的类型时。

<<<<<<< HEAD
    例如，二进制加 `+` 可以和字符串（连接）和数字（相加）发生作用，所以类型是字符串和数字都可以。或者当一个对象用 `==` 与一个字符串、数字或符号进行比较时。
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. Or when an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js
    // 二进制加
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };
    ```

    大于/小于运算符 `<>` 也可以同时用于字符串和数字。不过，它使用 "number" 暗示，而不是 "default"。这是历史原因。

    实际上，除了一种情况（`Date` 对象，我们稍后会学到它）之外，所有内置对象都实现了一个和 `"number"` 一样的 `"default"` 转换。可能我们也应该这样做。

请注意 —— 只有三种暗示。就这么简单。没有 "boolean" 暗示（所有对象在布尔上下文中都是 `true`）或其他任何东西。如果我们将 `"default"` 和 `"number"` 视为相同，就像大多数内置函数一样，那么只有两种转换了。

**为了进行转换，JavaScript 尝试查找并调用三个对象方法：**

1. 调用 `obj[Symbol.toPrimitive](hint)` 如果这个方法存在的话，
2. 否则如果暗示是 `"string"`
    - 尝试 `obj.toString()` 和 `obj.valueOf()`，无论哪个存在。
3. 否则，如果暗示 `"number"` 或者 `"default"`
    - 尝试 `obj.valueOf()` 和 `obj.toString()`，无论哪个存在。

## Symbol.toPrimitive

我们从第一个方法开始。有一个名为 `Symbol.toPrimitive` 的内置符号应该用来命名转换方法，像这样：

```js
obj[Symbol.toPrimitive] = function(hint) {
  // 返回一个原始值
  // hint = "string"，"number" 和 "default" 中的一个
}
```

例如，这里 `user` 对象实现它：

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 转换演示：
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

从代码中我们可以看到，根据转换的不同，`user` 变成一个自描述字符串或者一个金额。单个方法 `user[Symbol.toPrimitive]` 处理所有的转换情况。


## toString/valueOf

方法 `toString` 和 `valueOf` 来自上古时代。它们不是符号（那时候还没有符号这个概念），而是“常规的”字符串命名的方法。它们提供了一种可替换的“老派”的方式来实现转换。

如果没有 `Symbol.toPrimitive` 那么 JavaScript 尝试找到它们并且按照下面的顺序进行尝试：

- 对于"string"暗示，`toString -> valueOf`。
- 其他情况，`valueOf -> toString`。

例如，在这里 `user` 使用 `toString` 和 `valueOf` 的组合，上面的效果相同：

```js run
let user = {
  name: "John",
  money: 1000,

  // 对于 hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // 对于 hint="number" 或 "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

通常我们希望有一个“全能”的地方来处理所有原始转换。在这种情况下，我们可以只实现 `toString`，就像这样：

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

如果没有 `Symbol.toPrimitive` 和 `valueOf`，`toString` 将处理所有原始转换。

<<<<<<< HEAD

## ToPrimitive 和 ToString/ToNumber
=======
## Return types
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

关于所有原始转换方法，有一个重要的点需要知道，就是它们不一定会返回“暗示的”原始值。

没有限制 `toString()` 是否返回字符串，或 `Symbol.toPrimitive` 方法是否为 "number" 暗示返回数字。

<<<<<<< HEAD
**唯一强制性的事情是：这些方法必须返回一个原始值。**
=======
The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further operations
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

发起转换的操作获取该原始值，然后继续使用该原始值，并在必要时应用进一步的转换。

例如：

- 数学运算（二进制加法除外）执行 `ToNumber` 转换：

    ```js run
    let obj = {
      toString() { // toString 在没有其他方法的情况下处理所有转换
        return "2";
      }
    };

    alert(obj * 2); // 4，ToPrimitive 输出 "2"，然后就变成了 2。
    ```

- 二进制加法会检查原始值 —— 如果它是一个字符串，那么它会进行级联，否则它会执行 `ToNumber` 并使用数字。

    字符串例子：
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive 返回字符串 => 级联操作)
    ```

    数值例子：
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive 返回布尔值，非字符串 => ToNumber)
    ```

<<<<<<< HEAD
```smart header="历史笔记"
由于历史原因，`toString` 或 `valueOf` 方法**应该**返回一个原始值：如果它们中的任何一个返回了一个对象，虽然不会报错，但是该对象被忽略（就像该方法不存在一样）。

相反，`Symbol.toPrimitive` **必须**返回一个原始值，否则会出现错误。
```
=======
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

## 概要

对象到原始值的转换，是由许多内置函数和操作符自动调用的，这些函数使用一个原始值作为返回值的。

它有三种类型（暗示）：
- `"string"`（对于 `alert` 和其他字符串转换）
- `"number"`（对于 `maths`）
- `"default"`（少数操作）

规范明确描述了哪个操作符使用哪个暗示。极少数操作者“不知道期望什么”并使用 `"default"` 暗示。通常对于内置对象，`"default"` 暗示的处理方式与 `"number"` 相同，因此在实践中最后两个通常合并在一起。

转换算法是：

1. 调用 `obj[Symbol.toPrimitive](hint)` 如果这个方法存在的话，
2. 否则如果暗示是 `"string"`
    - 尝试 `obj.toString()` 和 `obj.valueOf()`，无论哪个存在。
3. 否则，如果暗示 `"number"` 或者 `"default"`
    - 尝试 `obj.valueOf()` 和 `obj.toString()`，无论哪个存在。

在实践中，为了记录或调试目的，仅实现 `obj.toString()` 作为“全捕获"方法通常就够了，这样所有转换都能返回一种“人类可读”的对象表达形式。  
