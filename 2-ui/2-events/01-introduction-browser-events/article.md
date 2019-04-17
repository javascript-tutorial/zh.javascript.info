# 浏览器事件简介

**事件**是某事发生的信号。所有的 DOM 节点都生成这样的信号（但事件不仅限于 DOM）。

这里有一张最有用的 DOM 事件列表，请看：

**鼠标事件：**
- `click` —— 当鼠标点击一个元素时（触摸屏设备在 tap 时生成）。
- `contextmenu` —— 当鼠标右击一个元素时。
- `mouseover` / `mouseout` —— 当鼠标光标移入或移出一个元素时。
- `mousedown` / `mouseup` —— 当鼠标按下/释放一个元素时。
- `mousemove` —— 当鼠标移出时。

**表单元素事件**：
- `submit` —— 当访问者提交了一个 `<form>` 时。
- `focus` —— 当访问者聚焦一个元素时，例如 `<input>`。

**键盘事件**：
- `keydown` and `keyup` —— 当访问者按下然后松开按钮时。

<<<<<<< HEAD
**Document 事件**：
- `DOMContentLoaded` —— 当加载和处理 HTML 时，DOM 将会被完整地构建。
=======
**Document events:**
- `DOMContentLoaded` -- when the HTML is loaded and processed, DOM is fully built.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

**CSS 事件**：
- `transitionend` —— 当 CSS 动画完成时。

还有许多其他事件。我们将在下一章中详细介绍具体事件。

## 事件处理器

为了响应事件，我们可以通过分发**处理器** —— 在事件发生时运行的函数。

<<<<<<< HEAD
处理器是在用户操作时运行 JavaScript 代码的一种方法。
=======
Handlers are a way to run JavaScript code in case of user actions.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

有许多分发处理器的方法。我们来看看，从最简单的开始。

### HTML 属性

处理器可以设置在 HTML 名为 `on<event>` 的属性中。

例如，为 `input` 分发一个 `click` 处理器，我们就可以使用 `onclick`，就像这样；

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

在鼠标单击时，`onclick` 中的代码就会运行。

请注意在 `onclick` 中，我们使用单引号，因为属性本身是双引号。如果我们忘记了代码是在属性中而使用了双引号，比如这样：`onclick="alert("Click!")"`，那么它就无法正确运行。

使用 HTML 属性对于编写大量代码并不方便，因此我们最好创建一个 JavaScript 函数，然后在需要的地方调用。

在这里单击运行 `countRabbits()`：

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

我们知道，HTML 属性名不区分大小写，因此 `ONCLICK` 和 `onClick` 以及 `onCLICK` 等都是一样可以运行的。但属性通常是小写的：`onclick`。

### DOM 属性

我们可以使用 DOM 属性 `on<event>` 来分发处理器。

比如 `elem.onclick`：

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

如果使用 HTML 属性分发处理器，那么浏览器就会读取它，从属性内容中创建一个新函数并将其写入 DOM 属性。

因此这个方法和之前的一样。

**处理器总是在 DOM 属性中：HTML 属性只是初始化它的方法之一**。

这两段的代码工作原理一致：

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

**因为只有一个 `onclick` 属性，因此我们不能分发多个事件处理器**。

在下面的示例中，使用 JavaScript 添加一个处理器，重写现有的处理器：

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
*!*
  elem.onclick = function() { // overwrites the existing handler
    alert('After'); // only this will be shown
  };
*/!*
</script>
```

顺便说一下，我们可以直接将现有函数指定为处理器：

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

移除处理器 —— 分发 `elem.onclick = null`。

## 访问元素：this

处理器中的 `this` 的值是元素。上面有处理器的那个。

下述代码中，`button` 使用 `this.innerHTML` 来显示内容：

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```

## 可能出现的错误

如果你刚开始处理事件 —— 请注意一些微妙的地方。

**函数应该作为 `sayThanks` 进行分发，而不是 `sayThanks()`**。

```js
// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
```

如果我们添加括号，那么就是 `sayThanks()` —— 将是函数执行的**结果**，所以最后一行代码中的 `onclick` 变成了 `undefined`（函数返回的内容将什么也没有）。这是不可取的。

...但在标记中，我们确实需要括号：

```html
<input type="button" id="button" onclick="sayThanks()">
```

这个区别很容易解释。当浏览器读取属性时，它会从其内容中创建一个处理器函数。

所以最后的示例相同：
```js
button.onclick = function() {
*!*
  sayThanks(); // the attribute content
*/!*
};
```

**使用函数，而不是字符串**。

`elem.onclick = "alert(1)"` 也可以执行，这适用于兼容性原因，但是强烈建议不使用这种方式。

**不要为处理器使用 `setAttribute`**。

这样的调用会失效：

```js run no-beautify
// 单击 <body> 将产生错误,
// 因为属性总是字符串，函数就变成了字符串。
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM 属性大小写的重要性**。

为 `elem.onclick` 分发处理器，而不是 `elem.ONCLICK`，因为 DOM 属性是大小写敏感的。

## addEventListener

前面提到分发处理器的基本问题是 —— 我们不能为一个事件分发多个处理器。

例如，我们代码的一部分希望在单击时高亮显示按钮，另一部分希望显示消息。

我们想为此分发两个处理器。但是一个新的 DOM 属性将重写现有的 DOM 属性：

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // replaces the previous handler
```

Web 标准的开发者很久之前就明白了这一点，并提出了一种使用特殊方法 `addEventListener` 和 `removeEventListener` 来管理处理器的替代方法。它们没有这样的问题。

添加处理器的语法：

```js
element.addEventListener(event, handler[, options]);
```

`event`
: 事件名，例如：`"click"`。

`handler`
: 处理器函数。

<<<<<<< HEAD
`phase`
: 一个可选的参数，即处理器的工作“阶段”。之后会讨论。我们通常不会使用它。

使用 `removeEventListener` 移除处理器：
=======
`options`
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phrase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not `preventDefault()`, we'll cover that later in <info:default-browser-action>.

>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

To remove the handler, use `removeEventListener`:

```js
element.removeEventListener(event, handler[, options]);
```

````warn header="Removal requires the same function"
要移除处理器，我们需要传入与分发函数完全相同的函数。

这不起作用：

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

处理器不会被移除，因为 `removeEventListener` 将获取另一个函数 —— 相同的代码，但这并不起作用。

以下是正确方法：

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

请注意 —— 如果我们不将函数存储在一个变量中，那么我们就无法移除它。由 `addEventListener` 分发的处理器将无法“读回”。
````

多次调用 `addEventListener` 允许添加多个处理器，就像这样：

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

正如我们在以上所看到的那样，我们可以使用 DOM 属性**和** `addEventListener` 来设置处理器。但通常我们只使用其中一种方法。

<<<<<<< HEAD
````warn header="有些事件处理器只能通过 `addEventListener` 设置"
有些事件不能通过 DOM 属性分配。必须使用 `addEventListener`。
=======
````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Must use `addEventListener`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

事件 `transitionend`（CSS 动画完成）就是如此。

尝试以下代码，大多数浏览器中只有第二个处理器正常运行，而不是第一个。

```html run
<style>
  input {
    transition: width 1s;
    width: 100px;
  }

  .wide {
    width: 300px;
  }
</style>

<input type="button" id="elem" onclick="this.classList.toggle('wide')" value="Click me">

<script>
  elem.ontransitionend = function() {
    alert("DOM property"); // doesn't work
  };

*!*
  elem.addEventListener("transitionend", function() {
    alert("addEventListener"); // 动画完成时显示
  });
*/!*
</script>
```
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

<<<<<<< HEAD
还有更多属性。他们取决于事件类型，因此我们稍后将在详细讨论不同事件时来研究它们。
=======
There are more properties. They depend on the event type, so we'll study them later when we come to different events in details.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

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
