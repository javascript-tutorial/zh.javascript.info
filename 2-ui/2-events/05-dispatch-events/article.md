# 创建自定义事件

我们不仅可以分配事件处理程序，还可以从 JavaScript 生成事件。

<<<<<<< HEAD
自定义事件可用于创建“图形组件”。例如，我们自己的基于 JavaScript 的菜单的根元素可能会触发 `open`（打开菜单），`select`（有一项被选中）等事件来告诉菜单发生了什么。另一个代码可能会监听事件，并观察菜单发生了什么。

我们不仅可以生成出于自身目的而创建的全新事件，还可以生成例如 `click` 和 `mousedown` 等内建事件。这可能会有助于自动化测试。
=======
Custom events can be used to create "graphical components". For instance, a root element of our own JS-based menu may trigger events telling what happens with the menu: `open` (menu open), `select` (an item is selected) and so on. Another code may listen for the events and observe what's happening with the menu.

We can generate not only completely new events, that we invent for our own purposes, but also built-in ones, such as `click`, `mousedown` etc. That may be helpful for automated testing.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## 事件构造器

<<<<<<< HEAD
内建事件类形成一个层次结构（hierarchy），类似于 DOM 元素类。根是内建的 [Event](http://www.w3.org/TR/dom/#event) 类。
=======
Build-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

我们可以像这样创建 `Event` 对象：

```js
let event = new Event(type[, options]);
```

参数：

<<<<<<< HEAD
- **type** —— 事件类型，可以是像这样 `"click"` 的字符串，或者我们自己的像这样 `"my-event"` 的参数。
- **options** —— 具有两个可选属性的对象：
  - `bubbles: true/false` —— 如果为 `true`，那么事件会冒泡。
  - `cancelable: true/false` —— 如果为 `true`，那么“默认行为”就会被阻止。稍后我们会看到对于自定义事件，它意味着什么。
=======
- *type* -- event type, a string like `"click"` or our own like `"my-event"`.
- *options* -- the object with two optional properties:
  - `bubbles: true/false` -- if `true`, then the event bubbles.
  - `cancelable: true/false` -- if `true`, then the "default action"  may be prevented. Later we'll see what it means for custom events.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

  默认情况下，以上两者都为 false：`{bubbles: false, cancelable: false}`。

## dispatchEvent

<<<<<<< HEAD
事件对象被创建后，我们应该使用 `elem.dispatchEvent(event)` 调用在元素上“运行”它。

然后，处理程序会对它做出反应，就好像它是一个常规的浏览器事件一样。如果事件是用 `bubbles` 标志创建的，那么它会冒泡。
=======
After an event object is created, we should "run" it on an element using the call `elem.dispatchEvent(event)`.

Then handlers react on it as if it were a regular browser event. If the event was created with the `bubbles` flag, then it bubbles.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

在下面这个示例中，`click` 事件是用 JavaScript 初始化创建的。处理程序工作方式和点击按钮的方式相同：

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
有一种方法可以区分“真实”用户事件和通过脚本生成的事件。

对于来自真实用户操作的事件，`event.isTrusted` 属性为 `true`，对于脚本生成的事件，`event.isTrusted` 属性为 `false`。
```

## 冒泡示例

我们可以创建一个名为 `"hello"` 的冒泡事件，并在 `document` 上捕获它。

我们需要做的就是将 `bubbles` 设置为 `true`：

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // 在 document 上捕获...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...在 elem 上 dispatch！
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

<<<<<<< HEAD
  // 在 document 上的处理程序将被激活，并显示消息。
=======
  // the handler on document will activate and display the message.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

</script>
```

<<<<<<< HEAD
=======

Notes:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

注意：

1. 我们应该对我们的自定义事件使用 `addEventListener`，因为 `on<event>` 仅存在于内建事件中，`document.onhello` 则无法运行。
2. 必须设置 `bubbles:true`，否则事件不会向上冒泡。

内建事件（`click`）和自定义事件（`hello`）的冒泡机制相同。自定义事件也有捕获阶段和冒泡阶段。

## MouseEvent，KeyboardEvent 及其他

这是一个摘自于 [UI 事件规范](https://www.w3.org/TR/uievents) 的一个简短的 UI 事件类列表：

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

如果我们想要创建这样的事件，我们应该使用它们而不是 `new Event`。例如，`new MouseEvent("click")`。

正确的构造器允许为该类型的事件指定标准属性。

就像鼠标事件的 `clientX/clientY` 一样：

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

请注意：通用的 `Event` 构造器不允许这样做。

让我们试试：

```js run
let event = new Event("click", {
  bubbles: true, // 构造器 Event 中只有 bubbles 和 cancelable 可以工作
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined，未知的属性被忽略了！
*/!*
```

从技术上讲，我们可以通过在创建后直接分配 `event.clientX=100` 来解决这个问题。所以，这是一个方便和遵守规则的问题。浏览器生成的事件始终具有正确的类型。

<<<<<<< HEAD
规范中提供了不同 UI 事件的属性的完整列表，例如 [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent)。
=======
The full list of properties for different UI events is in the specification, for instance, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## 自定义事件

<<<<<<< HEAD
对于我们自己的全新事件类型，例如 `"hello"`，我们应该使用 `new CustomEvent`。从技术上讲，[CustomEvent](https://dom.spec.whatwg.org/#customevent) 和 `Event` 一样。除了一点不同。
=======
For our own, completely new events types like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

在第二个参数（对象）中，我们可以为我们想要与事件一起传递的任何自定义信息添加一个附加的属性 `detail`。

例如：

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // 事件附带给处理程序的其他详细信息
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

`detail` 属性可以有任何数据。从技术上讲，我们可以不用，因为我们可以在创建后将任何属性分配给常规的 `new Event` 对象中。但是 `CustomEvent` 提供了特殊的 `detail` 字段，以避免与其他事件属性的冲突。

<<<<<<< HEAD
此外，事件类描述了它是“什么类型的事件”，如果事件是自定义的，那么我们应该使用 `CustomEvent` 来明确它是什么。

## event.preventDefault()

许多浏览器事件都有“默认行为”，例如，导航到链接，开始一个选择，等。

对于新的，自定义的事件，绝对没有默认的浏览器行为，但是分派（dispatch）此类事件的代码可能有自己的计划，触发该事件之后应该做什么。

通过调用 `event.preventDefault()`，事件处理程序可以发出一个信号，指出这些行为应该被取消。

在这种情况下，`elem.dispatchEvent(event)` 的调用会返回 `false`。那么分派（dispatch）该事件的代码就会知道不应该再继续。

让我们看一个实际的例子 —— 一只隐藏的兔子（可以是关闭菜单或者其他）。

在下面，你可以看到一个在其上分派了 `"hide"` 事件的 `#rabbit` 和 `hide()` 函数，以使所有感兴趣的各方面都知道这只兔子要隐藏起来。

任何处理程序都可以使用 `rabbit.addEventListener('hide',...)` 来监听该事件，并在需要时使用 `event.preventDefault()` 来取消该行为。然后兔子就不会藏起来了：
=======
Besides, the event class describes "what kind of event" it is, and if the event is custom, then we should use `CustomEvent` just to be clear about what it is.

## event.preventDefault()

Many browser events have a "default action", such as navigating to a link, starting a selection, and so on.

For new, custom events, there are definitely no default browser actions, but a code that dispatches such event may have its own plans what to do after triggering the event.

By calling `event.preventDefault()`, an event handler may send a signal that those actions should be canceled.

In that case the call to `elem.dispatchEvent(event)` returns `false`. And the code that dispatched it knows that it shouldn't continue.

Let's see a practical example - a hiding rabbit (could be a closing menu or something else).

Below you can see a `#rabbit` and `hide()` function that dispatches `"hide"` event on it, to let all interested parties know that the rabbit is going to hide.

Any handler can listen for that event with `rabbit.addEventListener('hide',...)` and, if needed, cancel the action using `event.preventDefault()`. Then the rabbit won't disappear:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  // hide() 将在 2 秒后被自动调用
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // 没有这个标志，preventDefault 将不起作用
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('The action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

<<<<<<< HEAD
请注意：该事件必须具有 `cancelable: true` 标志，否则 `event.preventDefault()` 调用将会被忽略。
=======
Please note: the event must have the flag `cancelable: true`, otherwise the call `event.preventDefault()` is ignored.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## 事件中的事件是同步的

<<<<<<< HEAD
通常事件是在队列中处理的。也就是说：如果浏览器正在处理 `onclick`，这时发生了一个新的事件，例如鼠标移动了，那么它会被排入队列，相应的 `mousemove` 处理程序将在 `onclick` 事件处理完成后被调用。

值得注意的例外情况就是，一个事件是在另一个事件中发起的。例如 using `dispatchEvent`. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.
=======
Usually events are processed in a queue. That is: if the browser is processing `onclick` and a new event occurs, e.g. mouse moved, then it's handing is queued up, corresponding `mousemove` handlers will be called after `onclick` processing is finished.

The notable exception is when one event is initiated from within another one, e.g. using `dispatchEvent`. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

For instance, in the code below the `menu-open` event is triggered during the `onclick`.

It's processed immediately, without waiting for `onlick` handler to end:


```html run autorun
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // triggers between 1 and 2
  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

<<<<<<< HEAD
输出顺序为：1 -> nested -> 2。

请注意，嵌套事件 `menu-open` 会在 `document` 上被捕获。嵌套事件的传播（propagation）和处理先被完成，然后处理过程才会返回到外部代码（`onclick`）。

这不只是与 `dispatchEvent` 有关，还有其他情况。If an event handler calls methods that trigger to other events -- they are too processed synchronously, in a nested fashion.

Let's say we don't like it. We'd want `onclick` to be fully processed first, independently from `menu-open` or any other nested events.

然后，我们可以将 `dispatchEvent`（或另一个触发事件的调用）放在 `onclick` 末尾，或者最好将其包装到零延迟的 `setTimeout` 中：
=======
The output order is: 1 -> nested -> 2.

Please note that the nested event `menu-open` is caught on the `document`. The propagation and handling of the nested event is finished before the processing gets back to the outer code (`onclick`).

That's not only about `dispatchEvent`, there are other cases. If an event handler calls methods that trigger to other events -- they are too processed synchronously, in a nested fashion.

Let's say we don't like it. We'd want `onclick` to be fully processed first, independently from `menu-open` or any other nested events.

Then we can either put the `dispatchEvent` (or another event-triggering call) at the end of `onclick` or, maybe better, wrap it in the zero-delay `setTimeout`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```html run
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

<<<<<<< HEAD
现在，`dispatchEvent` 在当前代码执行完成之后异步运行，包括 `mouse.onclick`，因此，事件处理程序是完全独立的。

输出顺序变成：1 -> 2 -> nested。
=======
Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `mouse.onclick`, so event handlers are totally separate.

The output order becomes: 1 -> 2 -> nested.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## 总结

<<<<<<< HEAD
要从代码生成一个事件，我们首先需要创建一个事件对象。

通用的 `Event(name, options)` 构造器接受任意事件名称和具有两个属性的 `options` 对象：
- 如果事件应该冒泡，则 `bubbles: true`。
- 如果 `event.preventDefault()` 应该有效，则 `cancelable: true`。
=======
To generate an event from code, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
- `bubbles: true` if the event should bubble.
- `cancelable: true` if the `event.preventDefault()` should work.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

其他像 `MouseEvent` 和 `KeyboardEvent` 这样的原生事件的构造器，都接受特定于该事件类型的属性。例如，鼠标事件的 `clientX`。

对于自定义事件，我们应该使用 `CustomEvent` 构造器。它有一个名为 `detail` 的附加选项，我们应该将事件特定的数据分配给它。然后，所有处理程序可以以 `event.detail` 的形式来访问它。

尽管技术上有可能生成像 `click` 或 `keydown` 这样的浏览器事件，但我们还是应谨慎使用。

我们不应该生成浏览器事件，因为这是运行处理程序的一种怪异（hacky）方式。大多数时候，这都是一种糟糕的架构。

可以生成原生事件：

- 如果第三方程序库不提供其他交互方式，那么这是使第三方程序库工作所需的一种肮脏手段。
- 对于自动化测试，要在脚本中“点击按钮”并查看接口是否正确响应。

使用我们自己的名称的自定义事件通常是出于架构的目的而创建的，以指示发生在菜单（menu），滑块（slider），轮播（carousel）等内部发生了什么。
