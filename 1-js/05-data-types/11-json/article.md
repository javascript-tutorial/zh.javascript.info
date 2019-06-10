# JSON 方法，toJSON

假设我们有一个复杂的对象，我们希望将其转换为字符串，通过网络发送，或者只是为了日志输出它。

当然，这样的字符串应该包含所有重要的属性。

我们可以像这样实现转换：

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...但在开发过程中，新增了一些属性，旧的属性被重命名并删除。每次更新这种 `toString` 都会变得很痛苦。我们可以尝试遍历其中的属性，但是如果对象很复杂，并且在属性中嵌套对象呢？我们也需要对它们进行转换。如，如果我们通过网络发送对象，那么我们还需要提供代码来在接收端“读取”我们的对象。

幸运的是，不需要编写代码来处理所有这些。这项任务已经解决了。

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) 是表示值和对象的通用格式。它被描述为 [RFC 4627](http://tools.ietf.org/html/rfc4627) 标准。最初它是为 JavaScript 编写的，但许多其他语言也有库来处理它。因此，当客户端使用 JavaScript 而服务器使用 Ruby/PHP/Java/Whatever 编写时，使用 JSON 进行数据交换非常容易。

JavaScript 提供方法：

- `JSON.stringify` 将对象转换为 JSON。
- `JSON.parse` 将 JSON 转换回对象。

例如，在这里我们 `JSON.stringify` 一名学生：
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // we've got a string!

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

方法 `JSON.stringify(student)` 接受对象并将其转换为一个字符串。

<<<<<<< HEAD
得到的 `json` 字符串是一个被称为 **JSON 编码**或者**序列化**或者**字符串化**或者**编组**的对象。我们准备好通过网线传输或存储。


请注意，JSON 编码的对象与对象字面量有几个重要的区别：
=======
The resulting `json` string is called a *JSON-encoded* or *serialized* or *stringified* or *marshalled* object. We are ready to send it over the wire or put into a plain data store.


Please note that a JSON-encoded object has several important differences from the object literal:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

- 字符串使用双引号。JSON 中没有单引号或反引号。所以 `'John'` 转成 `"John"`。
- 对象属性名称也是双引号的。这是强制性的。所以 `age:30` 转成 `"age":30`。

`JSON.stringify` 也可以应用于基本类型。

原生支持的 JSON 类型是：

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives:
    - strings,
    - numbers,
    - boolean values `true/false`,
    - `null`.

例如：

```js run
// a number in JSON is just a number
alert( JSON.stringify(1) ) // 1

// a string in JSON is still a string, but double-quoted
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON 是跨语言的纯数据规范，因此一些特定于 JavaScript 的对象属性被 `JSON.stringify` 跳过。

如：

- 函数属性（方法）。
- Symbolic 属性。
- 存储 `undefined` 的属性。

```js run
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored
};

alert( JSON.stringify(user) ); // {} (empty object)
```

通常这很好。但有时候这也不是我们想要的，很快就会看到如何定制转换。

最棒的是嵌套对象可以自动支持和转换。

例如：

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

重要的限制：不得有循环引用。

例如：

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup references room
room.occupiedBy = meetup; // room references meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

在这里，转换失败，因为循环引用：`room.occupiedBy` 引用 `meetup`，`meetup.place` 引用 `room`：

![](json-meetup.png)


## 排除和替换：replacer

`JSON.stringify` 完整语法是：

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: 要编码的值。

replacer
: 要编码的属性数组或映射函数 `function(key, value)`。

space
: 文本添加缩进、空格和换行符

<<<<<<< HEAD
大部分情况，`JSON.stringify` 仅与第一个参数一起使用。但是，如果我们需要微调替换过程，比如过滤掉循环引用，我们可以使用 `JSON.stringify` 的第二个参数。
=======
Most of the time, `JSON.stringify` is used with the first argument only. But if we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of `JSON.stringify`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

如果我们传递一组属性给它，只有这一组属性会被编码

例如：

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

这里我们可能过于严格了。属性列表应用于整个对象结构。所以 participants 是空的，因为 `name` 不在列表中。

让我们包含除了会导致循环引用的 `room.occupiedBy` 之外的所有属性：

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

现在，除 `occupiedBy` 之外的所有内容都会被序列化。但是 participants 的列表相当长。

幸运的是，我们也可以使用一个函数作为 `replacer`。

<<<<<<< HEAD
该函数将调用每个 `(key,value)` 对，并且返回 “replacement” 值，它将被用来代替原来的值。
=======
The function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

在我们的例子中，除 `occupiedBy` 外我们都可以按照原样返回 `value`。要忽略 `occupiedBy`，下面的代码返回 `undefined`：

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`); // to see what replacer gets
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

请注意 `replacer` 函数获取包括嵌套对象和数组项的每个键/值对。它被递归地应用。`replacer` 里面 `this` 的值是包含当前属性的对象。

<<<<<<< HEAD
第一个调用很特别。它是使用特殊的“包装对象”制作的： `{"": meetup}`。换句话说，第一个 `(key,value)` 对是空键，并且该值是整个目标对象。这就是为什么上面的例子中第一行是 `":[object Object]"` 的原因。
=======
The first call is special. It is made using a special "wrapper object": `{"": meetup}`. In other words, the first `(key, value)` pair has an empty key, and the value is the target object as a whole. That's why the first line is `":[object Object]"` in the example above.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

基于这个理念为 `replacer` 提供了更强大的功能：如有必要，它有机会分析和替换/跳过整个对象。


## 格式化：spacer

`JSON.stringify(value, replacer, spaces)` 的第三个参数是用于优化格式的空格数量。

以前，所有字符串化的对象都没有缩进和额外的空格。现在，如果我们想通过网络发送一个对象。`spacer` 参数可以更好的输出。

这里 `spacer = 2` 告诉 JavaScript 在多行上显示嵌套对象，并在对象中缩进2个空格：

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

`spaces` 参数仅用于记录和输出。

## 定制 "toJSON"

<<<<<<< HEAD
像 `toString` 进行字符串转换，对象可以提供 `toJSON` 方法来进行 JSON 转换。如果可用，`JSON.stringify` 会自动调用它。
=======
Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

例如：

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

在这里我们可以看到 `date` `(1)` 变成了一个字符串。这是因为所有日期都有一个内置的 `toJSON` 方法来返回这种类型的字符串。

<<<<<<< HEAD
现在让我们为对象 `room` 添加一个自定义的 `toJSON`：
=======
Now let's add a custom `toJSON` for our object `room` `(2)`:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

正如我们所看到的，`toJSON` 既用于直接调用 `JSON.stringify(room)` 也可以用于嵌套对象。


## JSON.parse

要解码 JSON 字符串，我们需要另一个方法 [JSON.parse](mdn:js/JSON/parse)。

语法：
```js
let value = JSON.parse(str[, reviver]);
```

str
: JSON 字符串解析。

reviver
<<<<<<< HEAD
: 将为每个 `(key,value)` 对调用的可选函数（键，值）进行转换。
=======
: Optional function(key,value) that will be called for each `(key, value)` pair and can transform the value.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

例如：

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

对于嵌套对象：

```js run
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

alert( user.friends[1] ); // 1
```

JSON 可能非常复杂，对象和数组可以包含其他对象和数组。但他们必须遵守这一格式。

以下是手写 JSON 中的典型错误（有时为了调试我们必须将其编写这样）：

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

此外，JSON 不支持注释。向 JSON 添加注释无效。

还有另一种名为 [JSON5](http://json5.org/)的格式，它允许未加引号的键、注释等。但这是一个独立的库，不在该语言的规范中。

常规的 JSON 格式严格并不是因为它的开发者懒惰，而是为了实现简单，可靠和快速的解析算法。

## reviver 用法

想象一下，我们从服务器上获得了一个 `meetup` 字符串对象。

它看起来像这样：

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...现在我们需要**反序列化它**，重新转换成 JavaScript 对象。

让我们通过调用 `JSON.parse` 来完成：

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

哇！报错了！

`meetup.date` 的值是一个字符串，而不是 `Date` 对象。`JSON.parse` 如何知道它应该将该字符串转换为 `Date`？

让我们传递返回所有值的函数给 `JSON.parse`，但 `date` 将变成了 `Date`，正常运行：

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // now works!
```

顺便说一下，这也适用于嵌套对象：

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## 总结

<<<<<<< HEAD
- JSON 是一种数据格式，对于大多数编程语言都有自己的独立标准和库。
- JSON 支持 objects，arrays，strings，numbers，booleans 和 `null`。
- JavaScript 提供序列化成 JSON 的方法 [JSON.stringify](mdn:js/JSON/stringify)和解析 JSON 方法 [JSON.parse](mdn:js/JSON/parse)。
- 这两种方法都支持用于智能读/写的转换函数。
- 如果一个对象具有 `toJSON`，那么它可被 `JSON.stringify` 调用。
=======
- JSON is a data format that has its own independent standard and libraries for most programming languages.
- JSON supports plain objects, arrays, strings, numbers, booleans, and `null`.
- JavaScript provides methods [JSON.stringify](mdn:js/JSON/stringify) to serialize into JSON and [JSON.parse](mdn:js/JSON/parse) to read from JSON.
- Both methods support transformer functions for smart reading/writing.
- If an object has `toJSON`, then it is called by `JSON.stringify`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
