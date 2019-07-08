# 生成自定义事件

我们不仅可以分发事件，还可以从 JavaScript 中生成事件。

自定义事件可以用于创建“图形组件”。例如，菜单组件的根元素可以通过触发 `open`（打开菜单）、`select`（有一项被选中）等事件告诉菜单发生了什么。

我们也可以生成一些像 `click`、`mousedown` 此类的内置事件，这些都有利于测试。

## 事件构造器

事件会像 DOM 元素类一样形成层次结构。事件的底层是内置的 [Event](http://www.w3.org/TR/dom/#event) 类。

我们可以像这样创建 `Event` 对象：

```js
let event = new Event(event type[, options]);
```

参数：

- **event type** —— 可以是任何字符串，比如 `"click"` 或者我们自己喜欢的 `"hey-ho!"`。
- **options** —— 具有两个可选属性的对象：
  - `bubbles: true/false` —— 如果是 `true`，那么事件冒泡。
  - `cancelable: true/false` —— 如果 `true`，那么“默认动作”就会被阻止。之后我们会看到对于自定义事件，这些意味着什么。

  默认情况下，它们都是 false：`{bubbles: false, cancelable: false}`。

## dispatchEvent

事件对象被创建后，我们应该调用 `elem.dispatchEvent(event)` 在元素上“运行”它。

然后处理器对其作出反应，就好像它是一个正常的内置事件。如果事件是使用 `bubbles` 标志创建的，那么它就会冒泡。

在下面示例中，`click` 事件是用 JavaScript 初始化生成的。处理器执行效果和单击按钮的效果一样：

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
有一个可以区分 “真实”用户事件和 script 生成事件的方法。

`event.isTrusted` 属性为 `true`，则事件来自真实用户的动作，为 `false` ，则说明事件由脚本生成。
```

## 冒泡示例

我们可以创建一个名为 `"hello"` 的冒泡事件，并在 `document` 上捕获它。

我们需要做的就是将 `bubbles` 设置为 `true`：

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // catch on document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...dispatch on elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);
</script>
```

注意：

1. 我们应该使用 `addEventListener` 定义我们的事件，因为 `on<event>` 仅存在于内置事件中，`document.onhello` 则无法运行。
2. 必须设置 `bubbles:true`，否则事件不会向上冒泡。

对于内置 (`click`) 和自定义 (`hello`) 的事件，冒泡机制是一样的。也有捕获和冒泡阶段。

## 鼠标事件，键盘事件和其他

这里有一个在 [UI Event specification](https://www.w3.org/TR/uievents) 上的 UI 事件类短列表：

 - `UIEvent`（UI 事件）
 - `FocusEvent`（焦点事件）
 - `MouseEvent`（鼠标事件）
 - `WheelEvent`（滚轮事件）
- `KeyboardEvent`（键盘事件）
- ...

如果我们想要创建这样的事件，我们应该使用它们而不是“新事件”。例如，`new MouseEvent("click")`。

正确的构造函数允许为该类型的事件指定标准属性。

就像鼠标事件 `clientX/clientY` 一样：

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

请注意：通用 `Event` 构造器不允许这样做。

让我们试试：

```js run
let event = new Event("click", {
  bubbles: true, // only bubbles and cancelable
  cancelable: true, // work in the Event constructor
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, the unknown property is ignored!
*/!*
```

从技术上讲，我们可以通过在创建后直接分发 `event.clientX=100` 来解决这个问题。所以这是一个方便和遵守规则的问题。浏览器生成的事件总是具有正确的类型。

不同 UI 事件的所有属性列表在说明书中，例如 [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent)。

## 自定义事件

对于我们自己的自定义事件，像 `"hello"`，我们应该使用 `new CustomEvent`。从技术上来说，[CustomEvent](https://dom.spec.whatwg.org/#customevent) 和 `Event` 一样。除了一点不同之外。

在第二个参数（对象）中，我们可以在事件中为我们想要传递的任何自定义信息添加一个附加的属性 `detail`。


例如：

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // additional details come with the event to the handler
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

`detail` 属性可以有任何数据。从技术上讲，我们可以不用，因为我们可以在创建后将任何属性分配到常规的 `new Event` 对象中。但是 `CustomEvent` 为它提供了特殊的 `detail` 字段，以避免与其他事件属性的冲突。

事件类告诉一些关于“是什么类型的事件”的信息，如果事件是自定义的，那么我们应该使用 `CustomEvent` 来明确它是什么。

## event.preventDefault()

如果 `cancelable:true` 被指定，那么我们可以在脚本生成的事件上调用 `event.preventDefault()`。

当然，如果事件有一个非标准的名称，那么浏览器就不知道它，而且它也没有“默认浏览器动作”。

但是事件生成代码可能会在 `dispatchEvent` 之后安排一些动作。

调用 `event.preventDefault()` 是处理器发送不应该执行这些操作的信号的一种方法。

在这种情况下，`elem.dispatchEvent(event)` 会返回 `false`。而且事件生成代码知道处理器不应该继续。

例如，在下面的示例中有一个 `hide()` 函数。它在元素 `#rabbit` 上生成 `"hide"` 事件。通知所有相关联部分兔子将要隐藏起来了。

由 `rabbit.addEventListener('hide',...)` 设置的处理器将会知道这些，并且如果需要，可以通过调用 `event.preventDefault()` 来阻止该操作。然后兔子就不会隐藏了：

```html run refresh
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>

<script>
  // hide() will be called automatically in 2 seconds
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // without that flag preventDefault doesn't work
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('the action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });

  // hide in 2 seconds
  setTimeout(hide, 2000);

</script>
```


## Events-in-events 同步

事件通常都是同步处理的。也就是说：如果浏览器正在处理 `onclick`，而且在处理过程中发生了一个新的事件，那么它将等待，直到 `onclick` 处理完成。

异常情况是一个事件从另一个事件中启动。

然后控制器会跳到嵌套事件处理器中，并且（执行完成）之后返回。

例如，这里的 `menu-open` 嵌套事件在 `onclick` 期间被同步处理：

```html run
<button id="menu">Menu (click me)</button>

<script>
  // 1 -> nested -> 2
  menu.onclick = function() {
    alert(1);

    // alert("nested")
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

请注意 `menu-open` 嵌套事件会冒泡，而且是在 `document` 被处理。嵌套事件的传播是在处理返回到外部代码 (`onclick`) 之前就已经全部完成的。

这不仅仅是 `dispatchEvent`，还有其他案例。JavaScript 在事件处理时可以调用导致其他事件的方法 —— 它们也是被同步处理的。

<<<<<<< HEAD
如果我们不喜欢，可以将 `dispatchEvent`（或者其他事件触发器调用）放在 `onclick` 结束，或者如果不方便，可以将其包装在 `setTimeout(...,0)` 中：
=======
If we don't like it, we can either put the `dispatchEvent` (or other event-triggering call) at the end of `onclick` or wrap it in zero-delay `setTimeout`:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```html run
<button id="menu">Menu (click me)</button>

<script>
  // Now the result is: 1 -> 2 -> nested
  menu.onclick = function() {
    alert(1);

    // alert(2)
    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

<<<<<<< HEAD
## 总结
=======
Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `mouse.onclick`, so event handlers are totally separate.

## Summary
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

要生成一个事件，我们首先需要创建一个事件对象。

<<<<<<< HEAD
泛型 `Event(name, options)` 构造器接受任意事件名，`options` 对象具有两个属性：
  - `bubbles: true` ，如果事件应该冒泡的话。
  - `cancelable: true` 则 `event.preventDefault()` 应该有效。
=======
The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
  - `bubbles: true` if the event should bubble.
  - `cancelable: true` if the `event.preventDefault()` should work.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

其他像 `MouseEvent`、`KeyboardEvent` 这样的原生事件构造器，接受特定于该事件类型的属性。例如，鼠标事件的 `clientX`。

对于自定义事件我们应该使用 `CustomEvent` 构造器。它有一个名为 `detail` 的附加选项，我们应该将特定事件的数据指派给它。然后处理器可以以 `event.detail` 的形式访问它。

尽管技术上有可能产生像 `click` 或者 `keydown` 这样的浏览器事件，但我们还是该谨慎使用。

我们不应该生成浏览器事件，因为这是运行处理器的一种 hacky 方式。大多数来说，这都是一种糟糕的架构。

可以生成原生事件：

- 如果他们不提供其他的交互方式，脏黑客行为可以制作第三方库操作所需的方式。
- 对于自动化测试，要在脚本中“单击按钮”并查看接口是否正确反应。

使用我们自己的名字来自定义的事件通常是为架构目的产生的，用来指示菜单、滑块、轮播等内部发生什么。
