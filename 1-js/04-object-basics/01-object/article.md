
# 对象

<<<<<<< HEAD
正如我们在 <info:types> 一章学到的，JavaScript 中有八种数据类型。有七种原始类型，因为它们的值只包含一种东西（字符串，数字或者其他）。
=======
As we know from the chapter <info:types>, there are eight data types in JavaScript. Seven of them are called "primitive", because their values contain only a single thing (be it a string or a number or whatever).
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

相反，对象则用来存储键值对和更复杂的实体。在 JavaScript 中，对象几乎渗透到了这门编程语言的方方面面。所以，在我们深入理解这门语言之前，必须先理解对象。

我们可以通过使用带有可选 **属性列表** 的花括号 `{…}` 来创建对象。一个属性就是一个键值对（"key: value"），其中键（`key`）是一个字符串（也叫做属性名），值（`value`）可以是任何值。

我们可以把对象想象成一个带有签名文件的文件柜。每一条数据都基于键（`key`）存储在文件中。这样我们就可以很容易根据文件名（也就是“键”）查找文件或添加/删除文件了。

![](object.svg)

我们可以用下面两种语法中的任一种来创建一个空的对象（“空柜子”）：

```js
let user = new Object(); // “构造函数” 的语法
let user = {};  // “字面量” 的语法
```

![](object-user-empty.svg)

通常，我们用花括号。这种方式我们叫做**字面量**。

## 文本和属性

我们可以在创建对象的时候，立即将一些属性以键值对的形式放到 `{...}` 中。

```js
let user = {     // 一个对象
  name: "John",  // 键 "name"，值 "John"
  age: 30        // 键 "age"，值 30
};
```

属性有键（或者也可以叫做“名字”或“标识符”），位于冒号 `":"` 的前面，值在冒号的右边。

在 `user` 对象中，有两个属性：

1. 第一个的键是 `"name"`，值是 `"John"`。
2. 第二个的键是 `"age"`，值是 `30`。

生成的 `user` 对象可以被想象为一个放置着两个标记有 "name" 和 "age" 的文件的柜子。

![user object](object-user.svg)

我们可以随时添加、删除和读取文件。

可以使用点符号访问属性值：

```js
<<<<<<< HEAD
// 读取文件的属性：
=======
// get property values of the object:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
alert( user.name ); // John
alert( user.age ); // 30
```

属性的值可以是任意类型，让我们加个布尔类型：

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

我们可以用 `delete` 操作符移除属性：

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

我们也可以用多字词语来作为属性名，但必须给它们加上引号：

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // 多词属性名必须加引号
};
```

![](object-user-props.svg)


列表中的最后一个属性应以逗号结尾：
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
这叫做尾随（trailing）或悬挂（hanging）逗号。这样便于我们添加、删除和移动属性，因为所有的行都是相似的。

````smart header="Object with const can be changed"
Please note: an object declared as `const` *can* be modified.
<<<<<<< HEAD
=======

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The `const` fixes the value of `user`, but not its contents.

The `const` would give an error only if we try to set `user=...` as a whole.

There's another way to make constant object properties, we'll cover it later in the chapter <info:property-descriptors>.
````

## Square brackets
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The `const` fixes the value of `user`, but not its contents.

The `const` would give an error only if we try to set `user=...` as a whole.

There's another way to make constant object properties, we'll cover it later in the chapter <info:property-descriptors>.
````

## 方括号

对于多词属性，点操作就不能用了：

```js run
// 这将提示有语法错误
user.likes birds = true
```

<<<<<<< HEAD
JavaScript 理解不了。它认为我们在处理 `user.likes`，然后在遇到意外的 `birds` 时给出了语法错误。

点符号要求 `key` 是有效的变量标识符。这意味着：不包含空格，不以数字开头，也不包含特殊字符（允许使用 `$` 和 `_`）。

有另一种方法，就是使用方括号，可用于任何字符串：
=======
JavaScript doesn't understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).

There's an alternative "square bracket notation" that works with any string:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {};

// 设置
user["likes birds"] = true;

// 读取
alert(user["likes birds"]); // true

// 删除
delete user["likes birds"];
```

现在一切都可行了。请注意方括号中的字符串要放在引号中，单引号或双引号都可以。

方括号同样提供了一种可以通过任意表达式来获取属性名的方法 —— 跟语义上的字符串不同 —— 比如像类似于下面的变量：

```js
let key = "likes birds";

// 跟 user["likes birds"] = true; 一样
user[key] = true;
```

<<<<<<< HEAD
在这里，变量 `key` 可以是程序运行时计算得到的，也可以是根据用户的输入得到的。然后我们可以用它来访问属性。这给了我们很大的灵活性。
=======
Here, the variable `key` may be calculated at run-time or depend on the user input. And then we use it to access the property. That gives us a great deal of flexibility.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

例如：

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// 访问变量
alert( user[key] ); // John（如果输入 "name"）
```

<<<<<<< HEAD
点符号不能以类似的方式使用：
=======
The dot notation cannot be used in a similar way:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### 计算属性

<<<<<<< HEAD
当创建一个对象时，我们可以在对象字面量中使用方括号。这叫做 **计算属性**。
=======
We can use square brackets in an object literal, when creating an object. That's called *computed properties*.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

例如：

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
*/!*
};

alert( bag.apple ); // 5 如果 fruit="apple"
```

计算属性的含义很简单：`[fruit]` 含义是属性名应该从 `fruit` 变量中获取。

所以，如果一个用户输入 `"apple"`，`bag` 将变为 `{apple: 5}`。

本质上，这跟下面的语法效果相同：
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// 从 fruit 变量中获取值
bag[fruit] = 5;
```

……但是看起来更好。

我们可以在方括号中使用更复杂的表达式：

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

方括号比点符号更强大。它允许任何属性名和变量，但写起来也更加麻烦。

<<<<<<< HEAD
所以大部分时间里，当属性名是已知且简单的时候，就是用点符号。如果我们需要一些更复杂的内容，那么就用方括号。

## 属性值简写

在实际开发中，我们通常用已存在的变量当做属性名。

例如：
=======
## Property value shorthand

In real code we often use existing variables as values for property names.

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
<<<<<<< HEAD
    // ……其他的属性
=======
    // ...other properties
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

在上面的例子中，属性名跟变量名一样。这种通过变量生成属性的应用场景很常见，在这有一种特殊的 **属性值缩写** 方法，使属性名变得更短。

可以用 `name` 来代替 `name:name` 像下面那样：

```js
function makeUser(name, age) {
*!*
  return {
<<<<<<< HEAD
    name, // 与 name: name 相同
    age,  // 与 age: age 相同
=======
    name, // same as name: name
    age,  // same as age: age
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    // ...
  };
*/!*
}
```

我们可以把属性名简写方式和正常方式混用：

```js
let user = {
  name,  // 与 name:name 相同
  age: 30
};
```


<<<<<<< HEAD
## 属性名称限制
=======
## Property names limitations
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
<<<<<<< HEAD
obj.__proto__ = 5; // 分配一个数字
alert(obj.__proto__); // [object Object] — 值为对象，与预期结果不同
```

我们从代码中可以看出来，把它赋值为 `5` 的操作被忽略了。

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## 属性存在性测试，"in" 操作符
=======
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true 意思是没有这个属性
```

<<<<<<< HEAD
这里还有一个特别的，检查属性是否存在的操作符 `"in"`。
=======
There's also a special operator `"in"` for that.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

语法是：
```js
"key" in object
```

例如：

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true，user.age 存在
alert( "blabla" in user ); // false，user.blabla 不存在。
```

请注意，`in` 的左边必须是 **属性名**。通常是一个带引号的字符串。

If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:

```js run
let user = { age: 30 };

let key = "age";
<<<<<<< HEAD
alert( *!*key*/!* in user ); // true，属性 "age" 存在
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?
=======
alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.

那就是属性存在，但是存储值为 `undefined` 的时候：

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // 显示 undefined，所以属性不存在？

alert( "test" in obj ); // true，属性存在！
```

<<<<<<< HEAD
在上面的代码中，属性 `obj.test` 事实上是存在的，所以 `in` 操作符检查通过。

这种情况很少发生，因为通常情况下不应该给对象赋值 `undefined`。我们通常会用 `null` 来表示未知的或者空的值。因此，`in` 运算符是代码中的特殊来宾。

=======
In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

## "for..in" 循环

为了遍历一个对象的所有键（key），可以使用一个特殊形式的循环：`for..in`。这跟我们在前面学到的 `for(;;)` 循环是完全不一样的东西。

语法：

```js
for (key in object) {
<<<<<<< HEAD
  // 对此对象属性中的每个键执行的代码
=======
  // executes the body for each key among object properties
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
}
```

例如，让我们列出 `user` 所有的属性：

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // 属性键的值
  alert( user[key] ); // John, 30, true
}
```

注意，所有的 "for" 结构体都允许我们在循环中定义变量，像这里的 `let key`。

<<<<<<< HEAD
同样，我们可以用其他属性名来替代 `key`。例如 `"for(let prop in obj)"` 也很常用。

### 像对象一样排序
=======
Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

对象有顺序吗？换句话说，如果我们遍历一个对象，我们获取属性的顺序是和属性添加时的顺序相同吗？这靠谱吗？

简短的回答是：“有特别的顺序”：整数属性会被进行排序，其他属性则按照创建的顺序显示。详情如下：

例如，让我们考虑一个带有电话号码的对象：

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

对象可用于面向用户的建议选项列表。如果我们的网站主要面向德国观众，那么我们可能希望 `49` 排在第一。

但如果我们执行代码，会看到完全不同的景象：

- USA (1) 排在了最前面
- 然后是 Switzerland (41) 及其它。

因为这些电话号码是整数，所以它们以升序排列。所以我们看到的是 `1, 41, 44, 49`。

````smart header="整数属性？那是什么？"
这里的“整数属性”指的是一个可以在不作任何更改的情况下转换为整数的字符串（包括整数到整数）。

所以，"49" 是一个整数属性名，因为我们把它转换成整数，再转换回来，它还是一样。但是 "+49" 和 "1.2" 就不行了：

```js run
// Math.trunc 是内置的去除小数部分的方法。
alert( String(Math.trunc(Number("49"))) ); // "49"，相同，整数属性
alert( String(Math.trunc(Number("+49"))) ); // "49"，不同于 "+49" ⇒ 不是整数属性
alert( String(Math.trunc(Number("1.2"))) ); // "1"，不同于 "1.2" ⇒ 不是整数属性
```
````

……此外，如果属性名不是整数，那它们就按照创建时候的顺序来排序，例如：

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // 增加一个

*!*
// 非整数属性是按照创建的顺序来排列的
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

所以，为了解决电话号码的问题，我们可以使用非整数属性名来 **欺骗** 程序。只需要给每个键名加一个加号 `"+"` 前缀就行了。

像这样：

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

<<<<<<< HEAD
现在跟预想的一样了。
=======
Now it works as intended.

## Summary

Objects are associative arrays with several special features.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

## 总结

对象是具有一些特殊特性的关联数组。

<<<<<<< HEAD
它们存储属性（键值对），其中：
- 属性的键必须是字符串或者 symbol（通常是字符串）。
- 值可以是任何类型。

我们可以用下面的方法访问属性：
- 点符号: `obj.property`。
- 方括号 `obj["property"]`，方括号允许从变量中获取键，例如 `obj[varWithKey]`。

其他操作：
- 删除属性：`delete obj.prop`。
- 检查是否存在给定键的属性：`"key" in obj`。
- 遍历对象：`for(let key in obj)` 循环。
=======
Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

我们在这一章学习的叫做“普通对象（plain object）”，或者就叫对象。

JavaScript 中还有很多其他类型的对象：

- `Array` 用于存储有序数据集合，
- `Date` 用于存储时间日期，
- `Error` 用于存储错误信息。
- ……等等。

它们有着各自特别的特性，我们将在后面学习到。有时候大家会说“数组类型”或“日期类型”，但其实它们并不是自身所属的类型，而是属于一个对象类型即 "object"。它们以不同的方式对 "object" 做了一些扩展。

JavaScript 中的对象非常强大。这里我们只接触了冰山一角。在后面的章节中，我们将频繁使用对象进行编程，并学习更多关于对象的知识。
