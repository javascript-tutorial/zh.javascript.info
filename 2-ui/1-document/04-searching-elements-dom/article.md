<<<<<<< HEAD
# 搜索： getElement* 和 querySelector*
=======
# Searching: getElement*, querySelector*
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

当元素关联较密切时，DOM 导航属性是最好的。万一不是这样该怎么办？如何去获取页面上的任意一个元素？ 

<<<<<<< HEAD
还有其他的搜索方法。
## document.getElementById 或者只使用 id
=======
There are additional searching methods for that.

## document.getElementById or just id
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

如果元素有 `id` 属性，那么该 `id` 也会有一个同名全局变量。

<<<<<<< HEAD
我们可以用以下方式来访问元素：
=======
We can use it to immediately access the element no matter where it is:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  alert(elem); // DOM-element with id="elem"
  alert(window.elem); // accessing global variable like this also works

  // 对于 elem-content 会稍微有些复杂
  // 因为里面有破折号，所以不是一个变量名
  alert(window['elem-content']); // ...但可以使用方括号 [...]
</script>
```

<<<<<<< HEAD
除非我们自己声明同名变量：
=======
The behavior is described [in the specification](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), but it is supported mainly for compatibility. The browser tries to help us by mixing namespaces of JS and DOM. Good for very simple scripts, but there may be name conflicts. Also, when we look in JS and don't have HTML in view, it's not obvious where the variable comes from.

If we declare a variable with the same name, it takes precedence:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5;

  alert(elem); // 5
</script>
```

<<<<<<< HEAD
[在规范中](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem)描述了这种行为，主要是考虑到兼容性才对它进行了支持。为了帮助我们，浏览器尝试了混合 JS 和 DOM 的命名空间。但这仅仅对简单脚本有效，因为它们可能会产生命名冲突。同时，当我们在 JS 中查看时，因为无法在视图中查看 HTML，所以变量的来源可能会很模糊。

选择特殊的方法，才是最好的选择：`document.getElementById(id)`。
=======
The better alternative is to use a special method `document.getElementById(id)`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

例如：

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
*!*
  let elem = document.getElementById('elem');
*/!*

  elem.style.background = 'red';
</script>
```

本教程中，我们经常使用 `id` 来直接引用属性，但这仅仅是为了简化。实际开发中，使用 `document.getElementById` 才是最佳选择。

```smart header="There can be only one"
`id` 必须唯一，文档中给定的 `id` 只能有唯一一个元素。

如果有多个元素具有同名 `id`，那么对应方法的行为将不可预测。浏览器将随机返回其他的一个。因此未来保证 `id` 的唯一性，请严格遵守规则。
```

```warn header="Only `document.getElementById`, not `anyNode.getElementById`"
`getElementById` 只能在 `document` 对象上调用。它会在整个文档中查找给定的 `id`。
```

<<<<<<< HEAD
## getElementsBy*

也有其他的方法来搜索节点：

- `elem.getElementsByTagName(tag)` 用给定的标签来查找元素，并返回它们的集合。`tag` 参数也可以是“任何标签”的 `"*"`。

例如：
```js
// 获取所有在文档中的 div
let divs = document.getElementsByTagName('div');
```

此方法可以在任意 DOM 元素的上下文中调用。

让我们找出在表格中的所有 `input` 标签：

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
初级开发者会忽略字符 `"s"`。也就是说，它们会调用 `getElementByTagName` 而不是 <code>getElement<b>s</b>ByTagName</code>。

`"s"` 字符并不存在于 `getElementById`，因为它只返回单个元素。但是 `getElementsByTagName` 返回的是一个元素集合，所以 `"s"` 包含在内。
```

````warn header="It returns a collection, not an element!"
另一个普遍存在的错误写法是：

```js
// 无法运行
document.getElementsByTagName('input').value = 5;
```

这无法运行，因为它接受输入的**集合**然后将值赋给它，而不是它里面的元素。

我们应该迭代集合或者按给定索引来获取元素，然后赋值，就像下述所示：

```js
// 应该可以运行（如果有输入）
document.getElementsByTagName('input')[0].value = 5;
```
````

还有其他很少使用的方法：

- `elem.getElementsByClassName(className)` 返回具有给定 CSS 类的元素。元素也可能含有其他的类。
- `document.getElementsByName(name)` 返回具有给定 `name` 属性的元素，文档范围。因为历史原因而很少使用。在这里提出，只是考虑到了完整性。

例如：

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // 按 name 查找属性
  let form = document.getElementsByName('my-form')[0];

  // 按在表单中的类查找
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## querySelectorAll [#querySelectorAll]

现在将进行重要的内容

`elem.querySelectorAll(css)` 的调用将返回与给定 CSS 选择器匹配 `elem` 中的所有元素。这是最常用和最有力的方法。
=======
## querySelectorAll [#querySelectorAll]

By far, the most versatile method, `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

我们将查找所有为最后一个子元素的  `<li>` 元素：

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

因为可以使用任何 CSS 选择器，所以这种方法很有用。

```smart header="Can use pseudo-classes as well"
CSS 选择器的伪类，如 `:hover` 和 `:active` 都是被支持的。例如，`document.querySelectorAll(':hover')` 将会返回指针现在已经结束的集合（按嵌套顺序：从最外层 `<html>` 到嵌套最多的元素）。
```

## querySelector [#querySelector]

调用 `elem.querySelector(css)` 后，它会返回给定 CSS 选择器的第一个元素。

换句话说，结果与 `elem.querySelectorAll(css)[0]` 相同，但是后者会从**所有**找到的元素中选取一个，而 `elem.querySelector` 只会查找一个。因此编写会更快更简洁。

## matches

之前的方法是搜索 DOM 的。

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) 不会查找任何内容，它只会检查 `elem` 是否匹配给定的 CSS 选择器。它返回 `true` 或者 `false`。

当我们迭代元素（例如数组或者一些其他内容）并试图过滤那些我们感兴趣的元素时，这个方法会很方便。

例如：

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // 不一定是 document.body.children，也可以是任何集合
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

<<<<<<< HEAD
所有直接在给定元素之上的元素都被称为它的“祖先”。

换句话说，祖先是：父类，父类的父类，它的父类等。祖先们一起组成了从元素到顶端的父类链。
=======
*Ancestors* of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

`elem.closest(css)` 方法会查找与 CSS 选择器匹配的最接近的祖先。`elem` 自己也会被搜索。

换句话说，方法 `closest` 在元素中得到了提升，并检查每个父类。如果与选择器匹配，则停止搜索并返回祖先。

例如：

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```

<<<<<<< HEAD
## Live 集合
=======
## getElementsBy*

There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. very rarely used.

For instance:
```js
// get all divs in the document
let divs = document.getElementsByTagName('div');
```

Let's find all `input` tags inside the table:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of <code>getElement<b>s</b>ByTagName</code>.

The `"s"` letter is absent in `getElementById`, because it returns a single element. But `getElementsByTagName` returns a collection of elements, so there's `"s"` inside.
```

````warn header="It returns a collection, not an element!"
Another widespread novice mistake is to write:

```js
// doesn't work
document.getElementsByTagName('input').value = 5;
```

That won't work, because it takes a *collection* of inputs and assigns the value to it rather than to elements inside it.

We should either iterate over the collection or get an element by its index, and then assign, like this:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Looking for `.article` elements:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Live collections
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

所有的 `"getElementsBy*"` 方法都会返回 **live** 集合。这类集合总是可以反映出文档的当前状态而且在文档变化时，可以自动更新。

下面的实例中，有两个脚本。

<<<<<<< HEAD
1. 第一个方法创建了对集合 `<div>` 的引用。到目前为止，它的长度是 `1`。
2. 第二个脚本在浏览器再遇到一个 `<div>` 时，它的长度会变成 `2`。
=======
1. The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2. The second scripts runs after the browser meets one more `<div>`, so its length is `2`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

相反，`querySelectorAll` 会返回一个**static**集合。就像一个固定的元素数字。

如果我们使用它，那么两个脚本都会输出 `1`：


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

现在我们可以很容易地看到不同之处。在文档中出现一个新的 `div` 后，静态集合并没有增加。

<<<<<<< HEAD
我们在这里使用独立的脚本来说明元素添加是如何影响集合的，但是在此之后的任何 DOM 操作都会影响它们。很快我们就可以看到更多的细节。

## 总结
=======
## Summary
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

有 6 种主要的方法，可以在 DOM 中进行搜素：

<table>
<thead>
<tr>
<td>Method</td>
<td>Searches by...</td>
<td>Can call on an element?</td>
<td>Live?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

<<<<<<< HEAD
请注意，只有在文档 `document.getElementById(...)` 的上下文中才能调用 `getElementById` 和 `getElementsByName`。但元素中没有  `elem.getElementById(...)` 会报错。

也可以在元素上调用其他方法，例如 `elem.querySelectorAll(...)` 将会在 `elem`（在 DOM 子树中）内部进行搜素。
=======
By far the most used are `querySelector` and `querySelectorAll`, but `getElementBy*` can be sporadically helpful or found in the old scripts.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

除此以外：

- `elem.matches(css)` 用于检查 `elem` 与给定的 CSS 选择器是否匹配。
- `elem.closest(css)` 用于查找与给定 CSS 选择器相匹配的最近的祖先。`elem` 本身也会被检查。

<<<<<<< HEAD
最后我们在提一种检查父子关系的方法：
-  如果 `elemB` 在 `elemA`（`elemA` 的后代）中或者当 `elemA==elemB` 时 `elemA.contains(elemB)` 将返回 true。
=======
And let's mention one more method here to check for the child-parent relationship, as it's sometimes useful:
-  `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
