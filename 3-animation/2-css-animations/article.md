# CSS 动画

CSS 动画允许你在完全不使用 JavaScript 的情况下做一些简单的动效。

JavaScript 可以被用来控制 CSS 动画，并且通过少量的代码让动画表现更出色。

## CSS 过渡（transition） [#css-transition]

CSS 过渡的理念非常简单，我们只需要定义某一个属性以及如何动态地表现其变化。当属性变化时，浏览器将会绘制出相应的过渡动画。

也就是说：我们只需要改变某个属性，然后所有流畅的动画都由浏览器生成。

举个例子，以下 CSS 会为 `backgroud-color` 的变化生成一个 3 秒的过渡动画：

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

现在，只要一个元素拥有名为 `.animated` 的类，那么任何背景颜色的变化都会被渲染为 3 秒钟的动画。

单击以下按钮以演示动画：

```html run autorun height=60
<button id="color">Click me</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

CSS 提供了五个属性来描述一个过渡：

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

之后我们会详细介绍它们，目前我们需要知道，我们可以在 `transition` 中以 `property duration timing-function delay` 的顺序一次性定义它们，并且可以同时为多个属性设置过渡动画。

请看以下例子，点击按钮生成 `color` 和 `font-size` 的过渡动画：

```html run height=80 autorun no-beautify
<button id="growing">Click me</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

现在让我们一个一个展开看这些属性。

## transition-property

在 `transition-property` 中我们可以列举要设置动画的所有属性，如：`left, margin-left, height, color`。

不是所有的 CSS 属性都可以应用过渡，但是它们中的[大多数](http://www.w3.org/TR/css3-transitions/#animatable-properties-)都是可以的。`all` 表示应用在所有属性上。

## transition-duration

`transition-duration` 允许我们指定动画持续的时间。时间的格式参照 [CSS 时间格式](http://www.w3.org/TR/css3-values/#time)：单位为秒 `s` 或者毫秒 `ms`。

## transition-delay

`transition-delay` 允许我们设定动画**开始前**的延迟时间。例如，对于 `transition-delay: 1s`，动画将会在属性变化发生 1 秒后开始渲染。

你也可以提供一个负值。那么动画将会从整个过渡的中间时刻开始渲染。例如，对于 `transition-duration: 2s`，同时把 `delay` 设置为 `-1s`，那么这个动画将会持续 1 秒钟，并且从正中间开始渲染。

这里演示了数字从 `0` 到 `9` 的动画，使用了 CSS `translate` 方法：

[codetabs src="digits"]

`tranform` 设置如下：

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

在以上的例子中，JavaScript 把 `.animate` 类添加到了元素上，由此触发了动画：

```js
stripe.classList.add('animate');
```

我们也可以『从中间』开始，也就是说从某个特定数字开始，比方说，从当前的时间的秒数开始。这就要用到负的 `transition-delay`。

此处，如果你单击这个数字，那么它会从当前的秒数开始渲染：

[codetabs src="digits-negative-delay"]

只需添加一行 JavaScript 代码：

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // for instance, -3s here starts the animation from the 3rd second
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

时间函数描述了动画进程在时间上的分布。它是先慢后快还是先快后慢？

乍一看，这可能是最复杂的属性了，但是稍微花点时间，你就会发现其实也很简单。

这个属性接受两种值：一个贝塞尔曲线（Bezier curve）或者步调函数（steps）。我们先从贝塞尔曲线开始，这也是较为常用的。

### 贝塞尔曲线（Bezier curve）

时间函数可以用[贝塞尔曲线](/bezier-curve)描述，通过设置四个满足以下条件的控制点：

1. 第一个应为：`(0,0)`。
2. 最后一个应为：`(1,1)`。
3. 对于中间值，`x` 必须位于 `0..1` 之间，`y` 可以为任意值。

CSS 中设置一贝塞尔曲线的语法为：`cubic-bezier(x2, y2, x3, y3)`. 这里我们只需要设置第二个和第三个值，因为第一个被固定为 `(0,0)` ，第四个被固定为 `(1,1)`.

时间函数描述了动画进行的快慢。

- `x` 轴表示时间：`0` —— 开始时刻，`1` —— `transition-duration`的结束时刻。
- `y` 轴表示过程的完成度：`0` —— 属性的起始值，`1` —— 属性的最终值。

最简单的一种情况就是动画匀速进行，可以通过设置曲线为 `cubic-bezier(0, 0, 1, 1)` 来实现。

看上去就像这样：

![](bezier-linear.png)

...正如我们所见，这就是条直线。随着时间 `x` 推移，完成度 `y` 稳步从 `0` 增长到 `1`。

例子中的列车匀速地从左侧移动到右侧：

[codetabs src="train-linear"]

这个里面的 CSS 就是基于刚才那条曲线的：

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript sets left to 450px */
}
```

...那么，我们如果表现出减速行驶的列车呢？

我们可以使用另一条贝塞尔曲线：`cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

图像如下：

![](train-curve.png)

正如我们所见，这个过程起初很快：曲线开始迅速升高，然后越来越慢。

这是实际的效果演示：

[codetabs src="train"]

CSS：
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript sets left to 450px */
}
```

CSS 提供几条内置的曲线：`linear`、`ease`、`ease-in`、`ease-out` 和 `ease-in-out`。

`linear` 其实就是 `cubic-bezier(0, 0, 1, 1)` 的简写 —— 一条直线，刚刚我们已经看过了。 

其它的名称是以下贝塞尔曲线的简写：

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.png) | ![ease-in, figure](ease-in.png) | ![ease-out, figure](ease-out.png) | ![ease-in-out, figure](ease-in-out.png) |

`*` —— 默认值，如果没有指定时间函数，那么将使用 `ease` 作为默认值。

所以，我们可以使用 `ease-out` 来表现减速行驶的列车：


```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

但是这看起来有点怪怪的。

**贝塞尔曲线可以使动画『跳脱出』其原本的范围。**

曲线上的控制点的 `y` 值可以使任意的：不管是负值还是一个很大的值。如此，贝塞尔曲线就会变得很矮或者很高，让动画跳出其普通的范围。

在一下的例子中使用的代码：
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript sets left to 400px */
}
```

`left` 本该在 `100px` 到 `400px` 之间变化。

但是如果你点击列车，你会发现：

- 起初，列车会**反向**运动：`left` 会变得小于 `100px`。
- 然后，它会变回往前运动，并且超过 `400px`。
- 最后再回来 —— 回到 `400px`。

[codetabs src="train-over"]

Why it happens -- pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.png)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made put it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property lower than the starting `left` and `y>1` -- over the final `left`.

That's a "soft" variant for sure. If we put `y` values like `-99` and `99` then the train would jump out of the range much more.

But how to make the Bezier curve for a specific task? There are many tools. For instance, we can do it on the site <http://cubic-bezier.com/>.

### Steps

Timing function `steps(number of steps[, start/end])` allows to split animation into steps.

Let's see that in an example with digits. We'll make the digits change not in a smooth, but in a discrete way.

For that we split the animation into 9 steps:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

In action `step(9, start)`:

[codetabs src="step"]

The first argument of `steps` is the number of steps. The transform will be split into 9 parts (10% each). The time interval is divided as well: 9 seconds split into 1 second intervals.

The second argument is one of two words: `start` or `end`.

The `start` means that in the beginning of animation we need to do make the first step immediately.

We can observe that during the animation: when we click on the digit it changes to `1` (the first step) immediately, and then changes in the beginning of the next second.

The process is progressing like this:

- `0s` -- `-10%` (first change in the beginning of the 1st second, immediately)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (the last second shows the final value).

The alternative value `end` would mean that the change should be applied not in the beginning, but at the end of each second.

So the process would go like this:

- `0s` -- `0`
- `1s` -- `-10%` (first change at the end of the 1st second)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

In action `step(9, end)`:

[codetabs src="step-end"]

There are also shorthand values:

- `step-start` -- is the same as `steps(1, start)`. That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
- `step-end` -- the same as `steps(1, end)`: make the animation in a single step at the end of `transition-duration`.

These values are rarely used, because that's not really animation, but rather a single-step change.

## Event transitionend

When the CSS animation finishes the `transitionend` event triggers.

It is widely used to do an action after the animation is done. Also we can join animations.

For instance, the ship in the example below starts to swim there and back on click, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time when the transition finishes and flips the direction:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // swim to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // swim to the left
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

The event object for `transitionend` has few specific properties:

`event.propertyName`
: The property that has finished animating. Can be good if we animate multiple properties simultaneously.

`event.elapsedTime`
: The time (in seconds) that the animation took, without `transition-delay`.

## Keyframes

We can join multiple simple animations together using the `@keyframes` CSS rule.

It specifies the "name" of the animation and rules: what, when and where to animate. Then using the `animation` property we attach the animation to the element and specify additional parameters for it.

Here's an example with explanations:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* give it a name: "go-left-right" */
    from { left: 0px; }             /* animate from left: 0px */
    to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* apply the animation "go-left-right" to the element
       duration 3 seconds
       number of times: infinite
       alternate direction every time
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

There are many articles about `@keyframes` and a [detailed specification](https://drafts.csswg.org/css-animations/).

Probably you won't need `@keyframes` often, unless everything is in the constant move on your sites.

## Summary

CSS animations allow to smoothly (or not) animate changes of one or multiple CSS properties.

They are good for most animation tasks. We're also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript for purposes of animation.
```

The majority of animations can be implemented using CSS as described in this chapter. And  `transitionend` event allows to run JavaScript after the animation, so it integrates fine with the code.

But in the next chapter we'll do some JavaScript animations to cover more complex cases.
