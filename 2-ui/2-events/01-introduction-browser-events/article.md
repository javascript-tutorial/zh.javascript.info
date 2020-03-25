# 浏览器事件简介

**事件** 是某事发生的信号。所有的 DOM 节点都生成这样的信号（但事件不仅限于 DOM）。

这是最有用的 DOM 事件的列表，你可以浏览一下：

**鼠标事件：**
- `click` —— 当鼠标点击一个元素时（触摸屏设备会在点击时生成）。
- `contextmenu` —— 当鼠标右键点击一个元素时。
- `mouseover` / `mouseout` —— 当鼠标光标移入/离开一个元素时。
- `mousedown` / `mouseup` —— 当在元素上按下/释放鼠标按钮时。
- `mousemove` —— 当鼠标移出时。

**表单（form）元素事件**：
- `submit` —— 当访问者提交了一个 `<form>` 时。
- `focus` —— 当访问者聚焦于一个元素时，例如聚焦于一个 `<input>`。

**键盘事件**：
- `keydown` 和 `keyup` —— 当访问者按下然后松开按键时。

**Document 事件**：
- `DOMContentLoaded` —— 当 HTML 的加载和处理均完成，DOM 被完全构建完成时。

**CSS 事件**：
- `transitionend` —— 当一个 CSS 动画完成时。

还有很多其他事件。我们将在下一章中详细介绍具体事件。

## 事件处理程器

为了对事件作出响应，我们可以分配一个 **处理器（handler）**—— 一个在事件发生时运行的函数。

处理器是在发生用户操作（action）时运行 JavaScript 代码的一种方式。

有几种分配处理器的方法。让我们来看看，从最简单的开始。

### HTML 特性

处理器可以设置在 HTML 中名为 `on<event>` 的特性（attribute）中。

例如，要为一个 `input` 分配一个 `click` 处理器，我们可以使用 `onclick`，像这样；

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

在鼠标单击时，`onclick` 中的代码就会运行。

请注意，在 `onclick` 中，我们使用单引号，因为特性本身使用的是双引号。如果我们忘记了代码是在特性中的，而使用了双引号，像这样：`onclick="alert("Click!")"`，那么它就无法正确运行。

HTML 特性不是编写大量代码的好位置，因此我们最好创建一个 JavaScript 函数，然后在 HTML 特性中调用这个函数。

在这里单击会运行 `countRabbits()`：

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Count rabbits!">
```

我们知道，HTML 特性名是大小写不敏感的，所以 `ONCLICK` 和 `onClick` 以及 `onCLICK` 都一样可以运行。但是特性通常是小写的：`onclick`。

### DOM 属性

我们可以使用 DOM 属性（property）`on<event>` 来分配处理器。

例如 `elem.onclick`：

```html autorun
<input id="elem" type="button" value="Click me">
<script>
*!*
  elem.onclick = function() {
    alert('Thank you');
  };
*/!*
</script>
```

如果一个处理器是通过 HTML 特性（attribute）分配的，那么随后浏览器读取它，并从特性的内容创建一个新函数，并将这个函数写入 DOM 属性（property）。

因此，这种方法实际上与前一种方法相同。

**处理器总是在 DOM 属性中：HTML 特性只是初始化它的方法之一**。

这两段代码工作相同：

1. 只有 HTML：

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```
2. HTML + JS：

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Click!');
      };
    */!*
    </script>
    ```

**因为这里只有一个 `onclick` 属性，所以我们无法分配更多事件处理器。**

在下面这个示例中，我们使用 JavaScript 添加了一个处理器，覆盖了现有的处理器：

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
*!*
  elem.onclick = function() { // 覆盖了现有的处理器
    alert('After'); // 只会显示此内容
  };
*/!*
</script>
```

顺便说一下，我们可以直接将现有的函数指定为处理器：

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

要移除一个处理器 —— 赋值 `elem.onclick = null`。

## 访问元素：this

处理器中的 `this` 的值是对应的元素。就是处理器所在的那个元素。

下面这行代码中的 `button` 使用 `this.innerHTML` 来显示它的内容：

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```

## 可能出现的错误

如果你刚开始写事件 —— 请注意一些细微之处。

**函数应该被以 `sayThanks` 的形式进行非配，而不是 `sayThanks()`**。

```js
// 正确
button.onclick = sayThanks;

// 错误
button.onclick = sayThanks();
```

如果我们添加了括号 `sayThanks()` —— 这是一个函数调用。所以，最后一行代码实际上获得的是函数执行的 **结果**，即 `undefined`（因为这个函数没有返回值）。此代码不会工作。

……但在标记（markup，译注：也就是 HTML 标签）中，我们确实需要括号：

```html
<input type="button" id="button" onclick="sayThanks()">
```

这个区别很容易解释。当浏览器读取 HTML 特性（attribute）时，浏览器将会使用 **特性中的内容** 创建一个处理函数：`sayThanks()`。

所以，标记会生成下面这个属性：
```js
button.onclick = function() {
*!*
  sayThanks(); // 特性中的内容
*/!*
};
```

**使用函数，而不是字符串。**

`elem.onclick = "alert(1)"` 也可以执行。它能执行是出于兼容性，但强烈建议不要使用这种方式。

**不要对处理器使用 `setAttribute`。**

这样的调用会失效：

```js run no-beautify
// 单击 <body> 将产生 error，
// 因为特性总是字符串的，函数变成了一个字符串
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM 属性是大小写敏感的。**

将处理器分配给 `elem.onclick`，而不是 `elem.ONCLICK`，因为 DOM 属性是大小写敏感的。

## addEventListener

上述分配处理器的方式的根本问题是 —— 我们不能为一个事件分配多个处理器。

例如，在我们点击了一个按钮时，我们代码中的一部分想要高亮显示这个按钮，另一部分则想要显示一条消息。

我们想为此事件分配两个处理器。但是，新的 DOM 属性将覆盖现有的 DOM 属性：

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // 替换了前一个处理器
```

Web 标准的开发者很早就了解到了这一点，并提出了一种使用特殊方法 `addEventListener` 和 `removeEventListener` 来管理处理器的替代方法。它们没有这样的问题。

添加处理器的语法：

```js
element.addEventListener(event, handler, [options]);
```

`event`
: 事件名，例如：`"click"`。

`handler`
: 处理器函数。

`options`
: 具有以下属性的附加可选对象：
    - `once`：如果为 `true`，那么会在被触发后自动删除监听器。
    - `capture`：事件处理的阶段，我们稍后将在 <info:bubbling-and-capturing> 一章中介绍。由于历史原因，`options` 也可以是 `false/true`，它与 `{capture: false/true}` 相同。
    - `passive`：如果为 `true`，那么处理器将不会 `preventDefault()`，我们稍后将在 <info:default-browser-action> 一章中介绍。


要移除处理器，可以使用 `removeEventListener`：

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="移除需要相同的函数"
要移除处理器，我们需要传入与分配的函数完全相同的函数。

这不起作用：

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

处理器不会被移除，因为 `removeEventListener` 获取了另一个函数 —— 使用相同的代码，但这并不起作用。

下面是正确方法：

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

请注意 —— 如果我们不将函数存储在一个变量中，那么我们就无法移除它。由 `addEventListener` 分配的处理器将无法被“读回”。
````

多次调用 `addEventListener` 允许添加多个处理器，如下所示：

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

正如我们在上面这个例子中所看到的，我们可以 **同时** 使用 DOM 属性和 `addEventListener` 来设置处理器。但通常我们只使用其中一种方式。

````warn header="对于某些事件，只能通过 `addEventListener` 设置处理器"
有些事件无法通过 DOM 属性进行分配。必须使用 `addEventListener`。

例如，`DOMContentLoaded` 事件，该事件在文档加载完成并且 DOM 构建完成时触发。

```js
document.onDOMContentLoaded = function() {
  alert("DOM built"); // 永远不会运行
};
```

```js
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built"); // 这种方式可以运行
});
```
所以 `addEventListener` 更通用。虽然这样的事件是特例而不是规则。
````

## 事件对象

为了正确处理事件，我们需要知道更多关于事件内容的细节。不仅仅是 "click" 或者 "keypress"，而是指针坐标在哪而？哪个键被按了？等等。

当事件发生时，浏览器会创建一个**事件对象**，将信息放入其中，并将其作为参数传入处理器。

以下是从事件对象获取鼠标坐标的示例：

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // 显示事件类型、元素和单击的坐标。
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

`event` 对象的一些属性：

`event.type`
: 事件类型，这里是 `"click"`。

`event.currentTarget`
: 处理事件的元素。这与 `this` 相同，除非你将 `this` 绑定到其他东西上，之后 `event.currentTarget` 就会有效了。

`event.clientX / event.clientY`
: 鼠标事件中光标相对于窗口的坐标。

还有更多属性。他们取决于事件类型，因此我们稍后将在详细讨论不同事件时来研究它们。

````smart header="事件对象也可以从 HTML 访问"
如果我们在 HTML 中分发一个处理器，我们也可以使用 `event` 对象，如下所示：

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

这是可能的，因为当浏览器读取属性时，它会创建如下所示的处理器：`function(event) { alert(event.type) }`。也就是说：它的第一个参数是 `"event"`，而主体则来自于属性。
````


## 对象处理器：handleEvent

我们可以使用 `addEventListener` 将对象赋值为事件处理器。当事件发生时，它的 `handleEvent` 方法就会和它一起被调用。

例如：


```html run
<button id="elem">Click me</button>

<script>
  elem.addEventListener('click', {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  });
</script>
```

换句话说，当 `addEventListener` 接收一个对象作为处理器时候，就会调用 `object.handleEvent(event)` 来处理事件。

我们也可以使用一个类：


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

这里的同一对象会处理两个事件。请注意，我们需要使用 `addEventListener` 来指明要监听的事件。`menu` 对象在这里只监听 `mousedown` 和 `mouseup`，而不是任意其他类型的事件。

`handleEvent` 方法本身不会做所有的工作。它可以调用其他用于特定事件的方法，比如：

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

现在事件处理器是完全独立的，这样会更容易被支持。

## 总结

有 3 种方法可以分发事件处理器：

1. HTML 属性：`onclick="..."`。
2. DOM 属性 `elem.onclick = function`。
3. 方法：添加 `elem.addEventListener(event, handler[, phase])`，移除 `removeEventListener`。

HTML 属性很少使用，因为 HTML 标签中的 JavaScript 看起来奇怪又陌生。而且也不能在里面写太多的代码。

DOM 属性可以使用，但我们不能为特定事件分发多个处理器。在许多场景中，这种限制并不严重。

最后一种方法是最灵活的，但也是编写内容最多的。有少数事件只能使用这种方式。例如 `transtionend` 和 `DOMContentLoaded`（有待讨论）。当然 `addEventListener` 也支持对象作为事件处理器。在这种场景下，事件发生时就需要调用 `handleEvent` 方法。

无论你如何分发处理器 —— 它都会将事件对象作为第一个参数。该对象包含事件发生的细节。

我们将在下一章了解更多关于一般事件和不同类型事件的内容。
