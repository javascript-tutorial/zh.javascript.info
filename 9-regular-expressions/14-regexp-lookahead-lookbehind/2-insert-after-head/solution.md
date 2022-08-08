为了在 `<body>` 标签后面插入内容，我们必须先找到它。我们可以使用正则表达式 `pattern:<body.*?>` 来实现。

在本任务中，我们不需要修改 `<body>` 标签。我们只需要在它后面添加文本。

我们可以这样做：

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

在替换字符串中，`$&` 表示匹配本身，即源文本中与 `pattern:<body.*?>` 相对应的部分。它会被它自身加上 `<h1>Hello</h1>` 替换。

另一种方法是使用后瞻断言：

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

正如你所看到的，这个正则表达式中只有后瞻断言部分。

它的工作原理如下：
- 在文本的每个位置。
- 检查它前面是否有 `pattern:<body.*?>`。
- 如果有，就匹配该位置。

标签 `pattern:<body.*?>` 不会被作为结果返回。这个正则表达式的结果实际上是一个空字符串，但它只匹配前面紧挨着 `pattern:<body.*?>` 的位置。

因此，它将紧挨着 `pattern:<body.*?>` 的“空位置”替换为了 `<h1>Hello</h1>`。这样就在 `<body>` 之后插入了内容。

P.S. 正则表达式中的修饰符，例如 `pattern:s` 和 `pattern:i` 也很有用：`pattern:/<body.*?>/si`。这里修饰符 `pattern:s` 使得 `.` 可以匹配换行符，而修饰符 `pattern:i` 使 `pattern:<body>` 大小写不敏感，可以匹配 `match:<BODY>`。
