# 表单属性和方法

表单以及例如 `<input>` 的控制元素有大量特殊的属性和事件。

如果我们知道这些，那么处理表单可以变得更加简单。

## 导航：表单和元素

文档中的表单是一个特殊集合 `document.forms` 中的成员。

`document.forms` 是一个**命名**集合：我们既可以使用名字也可以使用索引来获取表单。

```js no-beautify
document.forms.my - 包含了 name="my" 的表单
document.forms[0] - 文档中的第一个表单
```

当我们有了一个表单，其中任何的元素都可以通过命名集合 `form.elements` 来获取到。

比如说：

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // 获取表单
  let form = document.forms.my; // <form name="my"> 元素

  // 获取表单中的元素
  let elem = form.elements.one; // <input name="one"> 元素

  alert(elem.value); // 1
</script>
```

可能会有多个名称相同的元素，这种情况经常在处理单选按钮中出现。

在那种情况下 `form.elements[name]` 将会是一个集合，比如说：

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

alert(ageElems[0].value); // 10，第一个单选按钮的 value 值
</script>
```

这些导航属性并不依赖于标签的结构。所有的元素，无论它们在表单中嵌套的有多么深，都可以通过 `form.elements` 获取到。

````smart header="Fieldsets 来作为 \"subforms\""
一个表单会包含一个或者多个 `<fieldset>` 元素。它们也支持 `elements` 属性。

比如说：

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // 我们可以从 form 或者 fieldset 中获取输入
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="更简短的表示方式：`form.name`"
还有一个更简短的表示方式：我们可以通过 `form[index/name]` 来访问元素。

使用这种表示方式我们可以写 `form.login` 而不是 `form.elements.login` 来访问输入元素。

这也有效，但是会有一个小问题：如果我们访问一个元素，然后修改它的 `name`，它仍然可以通过旧的 name 访问到（当然也能通过新的 name 访问）。

我们可以很容易在一个例子中看到这个情况：

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, the same <input>
  alert(form.elements.login == form.login); // true，同样的 <input>

  form.login.name = "username"; // 修改 input 的 name 属性

  // form.elements 更新 name 属性:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // 输入

*!*
  // 直接访问可以同时使用 input 的两个 name：旧的以及新的
  alert(form.username == form.login); // true
*/!*
</script>
```

这通常来说并不是一个问题，因为我们很少修改表单元素的 name。

````

## 反向引用：element.form

对于任何元素，其对应的表单都可以通过 `element.form` 访问到。因此不仅表单可以引用所有元素，元素也可以引用表单。

这里有一个表示关系的图片：

![](form-navigation.svg)

比如说：

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## 表单元素

让我们来谈谈表单控件，主要关注于它们具体的特性。

### input 和 textarea

通常来说，我们可以使用 `input.value` 或者 `input.checked` 来访问复选框的值。

就像下面这样：

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // 用于复选框或者单选按钮
```

```warn header="使用 `textarea.value` 而不是 `textarea.innerHTML`"
请注意我们永远不应该使用 `textarea.innerHTML`：它只储存了最初在页面上的 HTML 内容，而不是当前的。
```

### select 和 option

一个 `<select>` 元素有 3 个重要的属性：

1. `select.options` —— `<option>` 元素的集合，
2. `select.value` —— 所选选项的值，
3. `select.selectedIndex` —— 所选选项的索引。

所以我们会有三种方式来设置一个 `<select>` 元素的值：

1. 找到所需要的 `<option>` 元素之后设置 `option.selected` 为 `true`。
2. 设置 `select.value` 为对应的值。
3. 设置 `select.selectedIndex` 为对应选项的索引。

第一个方式是最显而易见的，但是 `(2)` 和 `(3)` 通常来说会更简便。

下面是一个例子：

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // 所有这三行做的是同一件事
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

和大多数其它控件不同，`<select multiple>` 允许多选。在这种情况下，我们需要遍历 `select.options` 来获取所有选定的值。

就像下面这样：

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // 从 multi-select 中获取所有选定的值
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues，rock  
</script>
```

`<select>` 元素完整的规范可以在 <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> 上找到。

### 新的选项

在[选项元素](https://html.spec.whatwg.org/multipage/forms.html#the-option-element)的规范中，有一个很不错的简短语法用来创建 `<option>` 元素：

```js
option = new Option(text, value, defaultSelected, selected);
```

该方法调用参数如下：

- `text` —— 选项中的文本，
- `value` —— 选项的默认值,
- `defaultSelected` —— 如果这个值是 `true`，那么 `selected` 属性就会默认创建，
- `selected` —— 如果这个值是 `true`，那么这个选项就是已经被选择了。

比如说：

```js
let option = new Option("Text", "value");
// 创建 <option value="value">Text</option>
```

选择相同的元素：

```js
let option = new Option("Text", "value", true, true);
```

```smart header="`<option>` 的额外属性"
选项元素具有其它额外的属性：

`selected`
: 是否选择了该选项。

`index`
: 在该 option 所属的 `<select>` 其所对应的索引。

`text`
: 选项的文本内容（可以被任何访问者看到）。
```

## 总结

表单导航：

`document.forms`
: 一个表单元素可以通过 `document.forms[name/index]` 访问到。

`form.elements`  
: 表单元素以通过 `form.elements[name/index]` 的方式访问，或者也可以使用 `form[name/index]`。`elements` 属性也适用于 `<fieldset>`。

`element.form`
: 元素通过 `form` 属性来访问它们所属的表单。

值可以通过 `input.value`，`textarea.value`，`select.value` 等来获取到，对于单选框和复选框来说还可以使用 `input.checked`。

对于 `<select>` 元素我们可以通过索引 `select.selectedIndex` 来获取它的值，也可以使用选项集合 `select.options`。该元素和其它元素的完整规范可以看 <https://html.spec.whatwg.org/multipage/forms.html>。

这些是开始使用表单的基础知识。在下一章中，我们将会介绍可能在任何元素上出现的 `focus` 和 `blur` 事件，但主要是在表单上处理这些。
