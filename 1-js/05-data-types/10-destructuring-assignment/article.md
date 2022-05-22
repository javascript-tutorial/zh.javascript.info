# 解构赋值

JavaScript 中最常用的两种数据结构是 `Object` 和 `Array`。

- 对象是一种根据键存储数据的实体。
- 数组是一种直接存储数据的有序列表。

但是，当我们把它们传递给函数时，函数可能不需要整个对象/数组，而只需要其中一部分。

**解构赋值** 是一种特殊的语法，它使我们可以将数组或对象“拆包”至一系列变量中。有时这样做更方便。

解构操作对那些具有很多参数和默认值等的函数也很奏效。下面有一些例子。

## 数组解构

这是一个将数组解构到变量中的例子：

```js
// 我们有一个存放了名字和姓氏的数组
let arr = ["John", "Smith"]

*!*
// 解构赋值
// 设置 firstName = arr[0]
// 以及 surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

我们可以使用这些变量而非原来的数组项了。

当与 `split` 函数（或其他返回值为数组的函数）结合使用时，看起来更优雅：

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

正如我们所看到的，语法很简单。但是有几个需要注意的细节。让我们通过更多的例子来加深理解。

````smart header="“解构”并不意味着“破坏”"
这种语法被叫做“解构赋值”，是因为它“拆开”了数组或对象，将其中的各元素复制给一些变量。原来的数组或对象本身没有被修改。

换句话说，解构赋值只是写起来简洁一点。以下两种写法是等价的：
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="忽略使用逗号的元素"
可以通过添加额外的逗号来丢弃数组中不想要的元素：

```js run
*!*
// 不需要第二个元素
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

在上面的代码中，数组的第二个元素被跳过了，第三个元素被赋值给了 `title` 变量。数组中剩下的元素也都被跳过了（因为在这没有对应给它们的变量）。
````

````smart header="等号右侧可以是任何可迭代对象"

……实际上，我们可以将其与任何可迭代对象一起使用，而不仅限于数组：

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
这种情况下解构赋值是通过迭代右侧的值来完成工作的。这是一种用于对在 `=` 右侧的值上调用 `for..of` 并进行赋值的操作的语法糖。
````


````smart header="赋值给等号左侧的任何内容"
我们可以在等号左侧使用任何“可以被赋值的”东西。

例如，一个对象的属性：
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="与 .entries() 方法进行循环操作"
在前面的章节中我们已经见过了 [Object.entries(obj)](mdn:js/Object/entries) 方法。

我们可以将 .entries() 方法与解构语法一同使用，来遍历一个对象的“键—值”对：

```js run
let user = {
  name: "John",
  age: 30
};

// 使用循环遍历键—值对
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

用于 `Map` 的类似代码更简单，因为 Map 是可迭代的：

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map 是以 [key, value] 对的形式进行迭代的，非常便于解构
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

````smart header="交换变量值的技巧"
使用解构赋值来交换两个变量的值是一个著名的技巧：

```js run
let guest = "Jane";
let admin = "Pete";

// 让我们来交换变量的值：使得 guest = Pete，admin = Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane（成功交换！）
```

这里我们创建了一个由两个变量组成的临时数组，并且立即以颠倒的顺序对其进行了解构赋值。

我们也可以用这种方式交换两个以上的变量。
````

### 其余的 '...'

通常，如果数组比左边的列表长，那么“其余”的数组项会被省略。

例如，这里只取了两项，其余的就被忽略了：

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// 其余数组项未被分配到任何地方
```

如果我们还想收集其余的数组项 —— 我们可以使用三个点 `"..."` 来再加一个参数以获取其余数组项：

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// rest 是包含从第三项开始的其余数组项的数组
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`rest` 的值就是数组中剩下的元素组成的数组。

不一定要使用变量名 `rest`，我们也可以使用任何其他的变量名。只要确保它前面有三个点，并且在解构赋值的最后一个参数位置上就行了：

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// 现在 titles = ["Consul", "of the Roman Republic"]
```

### 默认值

如果数组比左边的变量列表短，这里不会出现报错。缺少对应值的变量都会被赋 `undefined`：

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

如果我们想要一个“默认”值给未赋值的变量，我们可以使用 `=` 来提供：

```js run
*!*
// 默认值
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius（来自数组的值）
alert(surname); // Anonymous（默认值被使用了）
```

默认值可以是更加复杂的表达式，甚至可以是函数调用。不过，这些表达式或函数只会在这个变量未被赋值的时候才会被计算。

举个例子，我们使用了 `prompt` 函数来提供两个默认值：

```js run
// 只会提示输入姓氏
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius（来自数组）
alert(surname); // 你输入的值
```

请注意：`prompt` 将仅针对缺失值（`surname`）运行。

## 对象解构

解构赋值同样适用于对象。

基本语法是：

```js
let {var1, var2} = {var1:…, var2:…}
```

在等号右侧是一个已经存在的对象，我们想把它拆分到变量中。等号左侧包含了对象相应属性的一个类对象“模式（pattern）”。在最简单的情况下，等号左侧的就是 `{...}` 中的变量名列表。

如下所示：

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

属性 `options.title`、`options.width` 和 `options.height` 值被赋给了对应的变量。

变量的顺序并不重要，下面这个代码也是等价的：

```js
// 改变 let {...} 中元素的顺序
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

等号左侧的模式（pattern）可以更加复杂，指定属性和变量之间的映射关系。

如果我们想把一个属性赋值给另一个名字的变量，比如把 `options.width` 属性赋值给名为 `w` 的变量，那么我们可以使用冒号来设置变量名称：

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

冒号的语法是“从对象中什么属性的值：赋值给哪个变量”。上面的例子中，属性 `width` 被赋值给了 `w`，属性 `height` 被赋值给了 `h`，属性 `title` 被赋值给了同名变量。

对于可能缺失的属性，我们可以使用 `"="` 设置默认值，如下所示：

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

就像数组或函数参数一样，默认值可以是任意表达式甚至可以是函数调用。它们只会在未提供对应的值时才会被计算/调用。

在下面的代码中，`prompt` 提示输入 `width` 值，但不会提示输入 `title` 值：

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (prompt 的返回值)
```

我们还可以将冒号和等号结合起来：

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

如果我们有一个具有很多属性的复杂对象，那么我们可以只提取所需的内容：

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// 仅提取 title 作为变量
let { title } = options;

alert(title); // Menu
```

### 剩余模式（pattern）"..."

如果对象拥有的属性数量比我们提供的变量数量还多，该怎么办？我们可以只取其中的某一些属性，然后把“剩余的”赋值到其他地方吗？

我们可以使用剩余模式（pattern），与数组类似。一些较旧的浏览器不支持此功能（例如 IE，可以使用 Babel 对其进行 polyfill），但可以在现代浏览器中使用。

看起来就像这样：

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = 名为 title 的属性
// rest = 存有剩余属性的对象
let {title, ...rest} = options;
*/!*

// 现在 title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="不使用 `let` 时的陷阱"
在上面的示例中，变量都是在赋值中通过正确方式声明的：`let {…} = {…}`。当然，我们也可以使用已有的变量，而不用 `let`，但这里有一个陷阱。

以下代码无法正常运行：
```js run
let title, width, height;

// 这一行发生了错误
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

问题在于 JavaScript 把主代码流（即不在其他表达式中）的 `{...}` 当做一个代码块。这样的代码块可以用于对语句分组，如下所示：

```js run
{
  // 一个代码块
  let message = "Hello";
  // ...
  alert( message );
}
```

因此，这里 JavaScript 假定我们有一个代码块，这就是报错的原因。我们需要解构它。

为了告诉 JavaScript 这不是一个代码块，我们可以把整个赋值表达式用括号 `(...)` 包起来：

```js run
let title, width, height;

// 现在就可以了
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## 嵌套解构

如果一个对象或数组嵌套了其他的对象和数组，我们可以在等号左侧使用更复杂的模式（pattern）来提取更深层的数据。

在下面的代码中，`options` 的属性 `size` 是另一个对象，属性 `items` 是另一个数组。赋值语句中等号左侧的模式（pattern）具有相同的结构以从中提取值：

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// 为了清晰起见，解构赋值语句被写成多行的形式
let {
  size: { // 把 size 赋值到这里
    width,
    height
  },
  items: [item1, item2], // 把 items 赋值到这里
  title = "Menu" // 在对象中不存在（使用默认值）
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

对象 `options` 的所有属性，除了 `extra` 属性在等号左侧不存在，都被赋值给了对应的变量：

![](destructuring-complex.svg)

最终，我们得到了 `width`、`height`、`item1`、`item2` 和具有默认值的 `title` 变量。

注意，`size` 和 `items` 没有对应的变量，因为我们取的是它们的内容。

## 智能函数参数

有时，一个函数有很多参数，其中大部分的参数都是可选的。对用户界面来说更是如此。想象一个创建菜单的函数。它可能具有宽度参数，高度参数，标题参数和项目列表等。

下面是实现这种函数的一个很不好的写法：

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

在实际开发中，记忆如此多的参数的位置是一个很大的负担。通常集成开发环境（IDE）会尽力帮助我们，特别是当代码有良好的文档注释的时候，但是…… 另一个问题就是，在大部分的参数只需采用默认值的情况下，调用这个函数时会需要写大量的 undefined。

像这样：

```js
// 在采用默认值就可以的位置设置 undefined
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

这太难看了。而且，当我们处理更多参数的时候可读性会变得很差。

解构赋值可以解决这些问题。

我们可以用一个对象来传递所有参数，而函数负责把这个对象解构成各个参数：

```js run
// 我们传递一个对象给函数
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ……然后函数马上把对象解构成变量
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – 提取于 options，
  // width, height – 使用默认值
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

我们也可以使用带有嵌套对象和冒号映射的更加复杂的解构：

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

完整语法和解构赋值是一样的：
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

对于参数对象，属性 `incomingProperty` 对应的变量是 `varName`，默认值是 `defaultValue`。

请注意，这种解构假定了 `showMenu()` 函数确实存在参数。如果我们想让所有的参数都使用默认值，那我们应该传递一个空对象：

```js
showMenu({}); // 不错，所有值都取默认值

showMenu(); // 这样会导致错误
```

我们可以通过指定空对象 `{}` 为整个参数对象的默认值来解决这个问题：

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

在上面的代码中，整个参数对象的默认是 `{}`，因此总会有内容可以用来解构。

## 总结

- 解构赋值可以简洁地将一个对象或数组拆开赋值到多个变量上。
- 解构对象的完整语法：
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    这表示属性 `prop` 会被赋值给变量 `varName`，如果没有这个属性的话，就会使用默认值 `default`。
    
    没有对应映射的对象属性会被复制到 `rest` 对象。

- 解构数组的完整语法：

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    数组的第一个元素被赋值给 `item1`，第二个元素被赋值给 `item2`，剩下的所有元素被复制到另一个数组 `rest`。

- 从嵌套数组/对象中提取数据也是可以的，此时等号左侧必须和等号右侧有相同的结构。
