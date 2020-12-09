# 表单属性和方法

表单（form）以及例如 `<input>` 的控件（control）元素有许多特殊的属性和事件。

当我们学习了这些相关内容后，处理表单会变得更加方便。

## 导航：表单和元素

文档中的表单是特殊集合 `document.forms` 的成员。

这就是所谓的“命名的集合”：既是被命名了的，也是有序的。我们既可以使用名字，也可以使用在文档中的编号来获取表单。

```js no-beautify
document.forms.my - name="my" 的表单
document.forms[0] - 文档中的第一个表单
```

当我们有了一个表单时，其中的任何元素都可以通过命名的集合 `form.elements` 来获取到。

例如：

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

可能会有多个名字相同的元素，这种情况经常在处理单选按钮中出现。

在这种情况下，`form.elements[name]` 将会是一个集合，例如：

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

这些导航（navigation）属性并不依赖于标签的结构。所有的控件元素，无论它们在表单中有多深，都可以通过 `form.elements` 获取到。


````smart header="Fieldset 作为“子表单”"
一个表单内会有一个或多个 `<fieldset>` 元素。它们也具有 `elements` 属性，该属性列出了 `<fieldset>` 中的表单控件。

例如：

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

    // 我们可以通过名字从表单和 fieldset 中获取 input
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="更简短的表示方式：`form.name`"
还有一个更简短的表示方式：我们可以通过 `form[index/name]` 来访问元素。

换句话说，我们可以将 `form.elements.login` 写成 `form.login`。

这也有效，但是会有一个小问题：如果我们访问一个元素，然后修改它的 `name`，之后它仍然可以被通过旧的 `name` 访问到（当然也能通过新的 `name` 访问）。

我们可以很直观地通过一个例子看到这个情况：

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true，与 <input> 相同

  form.login.name = "username"; // 修改 input 的 name

  // form.elements 更新了 name：
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // form 允许我们使用两个名字：新的名字和旧的名字
  alert(form.username == form.login); // true
*/!*
</script>
```

这通常来说并不是一个问题，因为我们很少修改表单元素的名字。

````

## 反向引用：element.form

对于任何元素，其对应的表单都可以通过 `element.form` 访问到。因此，表单引用了所有元素，元素也引用了表单。

这是一张示意图：

![](form-navigation.svg)

例如：

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

让我们来谈谈表单控件。

### input 和 textarea

我们可以通过 `input.value`（字符串）或 `input.checked`（布尔值）来访问复选框（checkbox）中的它们的 `value`。

像这样：

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // 对于复选框（checkbox）或单选按钮（radio button）
```

```warn header="使用 `textarea.value` 而不是 `textarea.innerHTML`"
请注意，即使 `<textarea>...</textarea>` 将它们的 `value` 作为嵌套的 HTML 标签来保存，我们也绝不应该使用 `textarea.innerHTML` 来访问它。

它仅存储最初在页面上的 HTML，而不是存储的当前 `value`。
```

### select 和 option

一个 `<select>` 元素有 3 个重要的属性：

1. `select.options` —— `<option>` 的子元素的集合，
2. `select.value` —— 当前所选择的 `<option>` 的 `value`，
3. `select.selectedIndex` —— 当前所选择的 `<option>` 的编号。

它们提供了三种为 `<select>` 设置 `value` 的不同方式：

1. 找到对应的 `<option>` 元素，并将 `option.selected` 设置为 `true`。
2. 将 `select.value` 设置为对应的 `value`。
3. 将 `select.selectedIndex` 设置为对应 `<option>` 的编号。

第一个方式最明显，但是 `(2)` 和 `(3)` 通常来说会更方便。

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

和大多数其它控件不同，如果 `<select>` 具有 `multiple` 特性（attribute），则允许多选。尽管这种功能可用，但很少被使用。

如果必须使用的话，请使用第一种方式：在子元素 `<option>` 中添加/移除 `selected` 属性。

我们可以通过 `select.options` 来获取它们的集合，例如：

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // 从 multi-select 中获取所有选定的 `value`
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

`<select>` 元素的完整规范可以在规范 <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> 中找到。

### new Option

这很少单独使用。但它仍然是一个有趣的东西。

在 [规范](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) 中，有一个很好的简短语法可以创建 `<option>` 元素：

```js
option = new Option(text, value, defaultSelected, selected);
```

参数：

- `text` —— `<option>` 中的文本，
- `value` —— `<option>` 的 `value`，
- `defaultSelected` —— 如果为 `true`，那么 `selected` HTML-特性（attribute）就会被创建，
- `selected` —— 如果为 `true`，那么这个 `<option>` 就会被选中。

你可能会对 `defaultSelected` 和 `selected` 有一些疑惑。这很简单：`defaultSelected` 设置的是 HTML-特性（attribute），我们可以使用 `option.getAttribute('selected')` 来获得。而 `selected` —— 无论这个 `option` 是否被选择，它都很重要。通常，这两个值都设置为 `true`，或者都不设置（与设置为 `false` 是一样的）。

例如：

```js
let option = new Option("Text", "value");
// 创建 <option value="value">Text</option>
```

选择相同的元素：

```js
let option = new Option("Text", "value", true, true);
```

`<option>` 元素具有以下属性：

`option.selected`
: `<option>` 是否被选择。

`option.index`
: `<option>` 在其所属的 `<select>` 中的编号。

`option.text`
: `<option>` 的文本内容（可以被访问者看到）。

## 参考资料

- 规范：<https://html.spec.whatwg.org/multipage/forms.html>.

## 总结

表单导航：

`document.forms`
: 一个表单元素可以通过 `document.forms[name/index]` 访问到。

`form.elements`  
: 表单元素可以通过 `form.elements[name/index]` 的方式访问，或者也可以使用 `form[name/index]`。`elements` 属性也适用于 `<fieldset>`。

`element.form`
: 元素通过 `form` 属性来引用它们所属的表单。

`value` 可以被通过 `input.value`，`textarea.value`，`select.value` 等来获取到，对于单选按钮和复选框来说可以使用 `input.checked`。

对于 `<select>` 元素，们可以通过索引 `select.selectedIndex` 来获取它的 `value`，也可以通过 `<option>` 集合 `select.options`。

这些是开始使用表单的基础。我们将在本教程中进一步介绍更多示例。

在下一章中，我们将介绍可能在任何元素上出现，但主要在表单上处理的 `focus` 和 `blur` 事件。
