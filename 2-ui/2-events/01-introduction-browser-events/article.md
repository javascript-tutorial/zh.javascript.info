# 浏览器事件简介

**事件**是某事发生的信号。所有的 DOM 节点都生成这样的信号（但事件不仅限于 DOM）。

这里有一张最有用的 DOM 事件列表，请看：
**鼠标事件：**
- `click` -- 当鼠标点击一个元素时（触摸屏设备在点击时生成）。
- `contextmenu` —— 当鼠标右击一个元素时。when the mouse right-clicks on an element.
- `mouseover` / `mouseout` —— 当鼠标光标移入或移出一个元素时。
- `mousedown` / `mouseup` —— 当鼠标按下/释放一个元素时。
- `mousemove` —— 当鼠标移出时。

**表单元素事件**：
- `submit` —— 当访问者提交了一个 `<form>` 时。
- `focus` —— 当访问者关注一个元素时，例如 `<input>`。

**键盘事件**：
- `keydown` and `keyup` —— 当访问者按下然后松开按钮时。

**Document 事件**：
- `DOMContentLoaded` —— 当 HTML 被加载和处理时，DOM 就会被完整地构建。

**CSS 事件**：
- `transitionend` —— 当 CSS 动画完成时。

还有许多其他事件。我们将在下一章中详细介绍具体事件。

## 事件处理器

为了响应事件，我们可以通过分发**处理器** —— 在事件发生时运行的函数。

处理器是在用户行为情况下运行 JavaScript 代码的一种方法。

有几种可以分发处理器的方法。我们看下它们，从最简单的开始。

### HTML-attribute

处理器可以设置在 HTML 名为 `on<event>` 的属性中。

例如，为 `input` 分发一个 `click` 处理器，我们就可以使用 `onclick`, 就像这样；

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

在鼠标单击时，`onclick` 中的代码就会运行。

请注意在 `onclick` 中，我们使用单引号，因为属性本身是双引号。如果我们忘记了代码是在属性中而使用了双引号，比如这样：`onclick="alert("Click!")"`，那么它就无法运行。

HTML 属性对编写大量代码情况并不友好，因此我们最后创建一个 JavaScript 函数，然后在需要的地方调用。

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

正如我们所知道的那样，HTML 属性名不区分大小写，因此 `ONCLICK` 和  `onClick` 以及 `onCLICK` 等都是一样可以运行的。但属性通常是小写的：`onclick`。

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

1. Only HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```
2. HTML + JS:

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

如果你现在开始处理事件 —— 请注意一些微妙的地方。

**函数应该作为 `sayThanks` 进行分发，而不是 `sayThanks()`**。

```js
// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
```

如果我们添加括号，那么就是 `sayThanks()` —— 将是函数执行的**结果**，所以最后一个代码中的 `onclick` 变成了 `undefined`（函数返回的内容将什么也没有）。这是不可取的。

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

`elem.onclick = "alert(1)"` 赋值也可以，这适用于兼容性原因，但是强烈建议不使用这种方式。

**不要为处理器使用 `setAttribute`**。

这样的调用会失效：

```js run no-beautify
// a click on <body> will generate errors,
// because attributes are always strings, function becomes a string
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-property 的重要性**。

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
element.addEventListener(event, handler[, phase]);
```

`event`
: 事件名，例如：`"click"`。

`handler`
: 处理器函数。

`phase`
: 一个可选的参数，即处理器的工作“阶段”。之后会讨论。我们通常不会使用它。

使用 `removeEventListener` 移除处理器：


```js
// exactly the same arguments as addEventListener
element.removeEventListener(event, handler[, phase]);
```

````warn header="Removal requires the same function"
为了移除处理器，我们可以传递与分发函数完全相同的函数。

这并不会工作：

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

处理器不会被移除，因为 `removeEventListener` 将获取另一个函数 —— 相同的代码，但这并不重要。

以下是正确方法：

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

请注意 —— 如果我们不将函数存储在一个变量中，那么我们就无法删除它。由 `addEventListener` 分发的处理器将无法“回读”。
````

将 `addEventListener` 的多次调用允许添加多个处理器，就像这样：

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

正如我们在以上所看到的那样，我们可以使用 DOM 属性 **和** `addEventListener` 来设置处理器。但通常我们只使用其中一种方法。

````warn header="For some events handlers only work with `addEventListener`"
有些事件不能通过 DOM 属性分配。必须使用 `addEventListener`。

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
    alert("addEventListener"); // shows up when the animation finishes
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
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

`event` 对象的一些属性：

`event.type`
: 事件类型，这里是 `"click"`。

`event.currentTarget`
: 元素处理事件。这与 `this` 相同，除非你将 `this` 绑定到其他事情上，之后 `event.currentTarget` 就会有效了。

`event.clientX / event.clientY`
: 鼠标事件的光标窗口相对坐标。

还有更多属性。他们取决于事件类型，因此我们稍后将在详细讨论不同事件时来研究它们。

````smart header="The event object is also accessible from HTML"
如果我们在 HTML 中分发一个处理器，我们也可以使用 `event` 对象，如下所示：

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

这是可能的，因为当浏览器读取属性时，它会创建如下所示的处理器：`function(event) { alert(event.type) }`。也就是说：它的第一个参数成为 `"event"`，而主体则来自于属性。
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

换句话说，当 `addEventListener` 接收一个对象作为处理器时候，事件就会调用 `object.handleEvent(event)`。

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

这里的同一对象会处理两个事件。请注意，我们需要使用 `addEventListener` 来明确说明要侦听的事件。`menu` 对象 在这里只得到了 `mousedown` 和 `mouseup`，而不是任意其他类型的事件。

`handleEvent` 方法本身不会做所有的任务。它可以调用其他特定于事件的方法，比如：

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

很明显现在事件处理器是独立的，因为这样会容易支持。

## 总结

有 3 中方法可以分发事件处理器：

1. HTML 属性：`onclick="..."`。
2. DOM 属性 `elem.onclick = function`.
3. 方法：添加 `elem.addEventListener(event, handler[, phase])`，移除 `removeEventListener`。

HTML 属性很少使用，因为 HTML 标记中的 JavaScript 看起来奇怪又陌生。而且也不能在里面写太多的代码。

DOM 属性可以使用，但我们不能为特定事件分发多个处理器。在许多场景中，这种限制并不严重。

最后一种方法是最灵活的，但也是需要编写内容最多的。只有少数事件可以使用。例如 `transtionend` 和 `DOMContentLoaded`（有待讨论）。当然 `addEventListener` 也支持对象作为事件处理器。在这种场景下，事件发生时就需要调用 `handleEvent` 方法。

无论你如何分发处理器 —— 它都会将事件对象作为第一个参数。该对象包含事件发生的细节。

我们将在下一章了解更多关于一般事件和不同类型事件的内容。
