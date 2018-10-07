# 同步与异步事件
JavaScript 是一门单线程语言：其一定时间之内，只能执行单独的一段脚本。

通常如页面渲染、文件下载等活动，可于不同线程中同时进行。譬如，浏览器可边运行 JavaScript 代码，边下载文件，这样的情况很常见。但类似两个事件处理器，或是两个 `setTimeout` 定时器回调同时执行，这样的情况，则绝不会发生。

[Web Workers](http://www.w3.org/TR/workers) 标准规定支持多重 JavaScript *workers*.  *workers* 是些能与主程代码并行执行的子线程，但颇受限制，在浏览器中这些 *workers* 无权访问 DOM. 归根结底， JavaScript 仍只拥有单一的"主"线程。

## 异步事件

事件多是异步的。

异步事件发生后，随即进入 *事件队列*。

浏览器有内建循环机制，称为 *事件循环* ，负责检查队列，处理事件，执行函数等。

比如，浏览器当前正忙于处理你触发的 `onclick` 事件，恰巧此时另一个事件在后台触发，该事件辄进入事件队列，等候处理。 当前的 `onclick` 事件处理完后，事件循环会检查事件队列，并执行其中的脚本。

同样，使用 `setTimeout/setInterval` 设定的回调函数也会添加至事件队列，等到 JavaScript 引擎空闲，再执行。

## 同步事件
有些事件发生后不会进入事件队列， 其称为 *同步事件* 。同步事件总是触发即处理，哪怕和其他事件处理器相嵌套。</b>


### 同步的DOM mutation 事件

下例中，`onclick` 事件处理器会更改链接属性，而链接添加了 `DOMAttrModified(IE上为：onpropertychange)`监听。

`onclick` 事件处理期间，同步的 `mutation` 事件亦会立即处理。

点击链接查看：
[html autorun height=auto]
<a href="#">点我!</a>

<script>
let a = document.body.children[0]

a.onclick = function() {
  alert('in onlick')
  this.setAttribute('href', 'lala')
  alert('out onclick')
  return false
}

function onpropchange() {
  alert('onpropchange')
}

if (a.addEventListener) { // FF, Opera
  a.addEventListener('DOMAttrModified', onpropchange, false)
}
if (a.attachEvent) { // IE
  a.attachEvent('onpropertychange', onpropchange)
}
</script>
[/html]

点击事件处理流程：
<ol>
<li>`alert('in onclick')` 执行</li>
<li>链接属性改变，触发 DOM mutation ，事件被同步处理，立即执行其回调，输出 `alert('onpropchange')` 中内容</li>
<li>执行 `onclick` 事件剩余，输出 `alert('out onclick')` 中内容 </li>
</ol>

### 同步的 DOM 事件嵌套

像 `elem.focus()` 这样的方法有很多，都能触发立即处理的事件，这些事件也是以同步的方式处理。


运行下面示例，然后点击按钮。注意 `onfocus` 事件是立即生效的，不会等到 `onclick` 事件完成之后再执行。

[html autorun height=auto]
<input type="button" value="click me">
<input type="text">

<script>
  let button = document.body.children[0]
  let text = document.body.children[1]

  button.onclick = function() {
    alert('in onclick')

    text.focus()

    alert('out onclick')
  }

  text.onfocus = function() {
    alert('onfocus')
    text.onfocus = null  //(*)
  }
</script>
[/html]

上例输出顺序为：<code>onclick-&gt;focus-&gt;out onclick</code>, 这是同步行为的清楚展示 。


以 (*) 标注的那行代码是必需的，因为 `alert('message')` 会将焦点置于弹出窗口，处理完弹出信息，窗口消失，焦点会重新聚焦至原处。

所以，要是没有那行代码， 总会多触发一次 `focus` 。

使用 JavaScript 中 `dispatchEvent/fireEvent` 方法触发的事件也会被立即处理。

事件处理器通常一个接一个地执行，我们因以为，总是上一个执行完毕了，下一个才接着开始。

**同步事件却打破了这个顺序规则，并且产生了一些副作用。**

譬如，`onfocus` 事件处理器执行时会认为 `onclick` 事件已处理完毕。

有两种方法可以解决上述冲突：
<ol>
<li>将 `text.focus()` 移至 `onclick` 代码的末尾</li>
<li>将 `text.focus()` 封装进 `setTimeout(..,0)` :<br>
[js]<br>
&emsp;button.onclick = function() {<br>
&emsp;&emsp;alert(1);<br>
&emsp;&emsp;setTimeout(function() { <br>
&emsp;&emsp;&emsp;text.focus();<br> 
&emsp;&emsp;}, 0);<br>
&emsp;alert(2);
}
[/js]
</li>
</ol>

具体采用可视个人风格而定。


## 脚本运行与页面渲染

大多数浏览器里，页面渲染和 JavaScript 脚本运行共用一个事件队列，如此二者互相阻塞，如运行脚本期间，渲染总会停止。

可用下示代码检验。**当你点击 `run` 时，浏览器会停顿一下**，因点击会将 `div.style.backgroundColor` 的属性值从 #A00000 改到 #FFFFFF.

大多数浏览器里运行这段代码，要么什么变化都看不到，要么浏览器直接暂停运行，并提示："a script is running too long", 脚本运行时间过长。

既说大多数，则必有特例，这个特例就是 Opera.

[html run]
<div style="width:200px;height:50px;background-color:#A00000"></div>

<input type="button" onclick="run()" value="run()">

<script>
function run() {
  let div = document.getElementsByTagName('div')[0]
  for(let i=0xA00000;i<0xFFFFFF;i++) {
    div.style.backgroundColor = '#'+i.toString(16)
  }
}
</script>
[/html]

在 Opera 浏览器里运行，你可能察觉 `div` 元素被重绘了，但又并非每次变更都能导致重绘，这或与浏览器内部的调度机制有关。正因 Opera 将渲染与脚本运行分别置于不同的事件队列，才导致了这种差异。

而其他浏览器，在JavaScript 脚本运行完毕之前，会一直推迟渲染。

重申，不同浏览器实现方式或有差别。但就总体而言，一般会 **把这些因脚本执行而渲染阻塞的节点标记为 "dirty", 意即节点有待重新分析绘制，然后排队等候处理。** 或者，浏览器每运行一段脚本之后直接寻至并处理这些节点。

[smart header="迅速回流"]<br>
浏览器有许多方法，可以优化渲染绘制速度，一般而言，其总是在脚本运行完后才开始渲染，但有些行为却要求节点立即渲染。

示例:<br>
[js]<br>
elem.innerHTML = 'new content';<br>
alert(elem.offsetHeight); // <-- 渲染 elem 以获得 offsetHeight 属性值<br>
[/js]

上例虽未要求重新在屏幕上绘制 `elem` , 但浏览器却不得不启动重新布局，以计算相应高度。

有时一些相关节点也会因此被纳入计算分析的范畴，这整个过程称为 *reflow(回流)*, 如脚本运行经常触发回流，则资源开销巨大。

诚然，关于渲染尚有许多值得探讨之处，笔者将会在其他文章中展开论述 [todo] .<br>
[/smart]


## 模态框与同步调用

[summary]  
模态框以及一些同步调用如 `alert`,会阻塞 JavaScript 的线程。

线程阻塞则会冻结其他相关活动。  
[/summary]

下示的例子便很好地展示了这点。

<ol>
<li>点击 "开始"，则基于 `setInterval` 定时器产生的动画效果开始运行，并显示 `alert` 按钮 </li>
<li>点击 `alert` 按钮，注意动画效果随即停止</li>
</ol>

<input type="button" onclick="alert('Hello!')" value="alert('Hello!')  [ main window ]">
[html run height=60]
<div style="height:20px;width:0px;background-color:green"></div>
<script>
let timer = setInterval(function() {
  let style = document.getElementsByTagName('div')[0].style
  style.width = (parseInt(style.width)+2)%400 + 'px'
}, 30)

</script>
<input type="button" onclick="alert('Hello!')" value="alert('Hello!')  [ iframe ]">
<input type="button" onclick="clearInterval(timer)" value="clearInterval(timer)">
[/html]

当你点击 `alert('hello')` 时, `alert` 阻塞了JavaScript 代码运行，也阻塞了整个 UI 线程。`alert`, `confirm` 以及 `prompt` 都以这样的方式运行。
且因为线程单一， **`setTimeout/setInterval`** 也无法在线程阻塞的情况下执行。

### Opera： `iframe` 特例

[summary]通常，`iframe` 与整个页面同处一个线程[/summary]

但 Opera 总是特立独行，**将上示例子在 Opera 浏览器中运行**，然后点击 <u>main window</u> 中的 `alert`. iframe 动画竟然还在运行！这是因其实际运行在iframe里面。

而别的浏览器整个页面使用的都是同一线程，所以iframe动画也因线程阻塞而停止了。

## 脚本运行时间过长及负载过重

JavaScript 有时也不堪重负。

于是，浏览器便暂停运行，并提示：" Script is taking too long".

要想规避这种情况，最好规划一下，将一个大的任务切分细化，然后依序执行。

而这些细分后的任务，执行期间常有短暂间隔，这些间隔期即是浏览器的 "自由活动时间"，浏览器趁此可以渲染页面、响应其他事件，与用户友好交互，其乐融融。

下面例子里，元素的背景颜色在一个定时器时钟循环里改变一次，藉此浏览器得以喘息，完成渲染工作，且不会卡顿住，颜色的改变也能一步步应用上去。

点击示例上的 run 按钮开始。
[html run]
<div style="width:200px;height:50px;background-color:#100"></div>

<input type="button" onclick="run()" value="run()">
<input type="button" onclick="stop()" value="stop()">

<script>
let timer

function run() {
  let div = document.getElementsByTagName('div')[0]
  let i=0x100000

  function func() {
    timer = setTimeout(func, 0)
    div.style.backgroundColor = '#'+i.toString(16)
    if (i++ == 0xFFFFFF) stop()
  }

*!*
  timer = setTimeout(func, 0)
*/!*
}

function stop() {
  clearInterval(timer)
}
</script>
[/html]

内部流程:
<ol>
<li>`setTimeout` 将 `func` 回调添加进事件队列。</li>
<li>新一轮回调设定于下一轮时钟循环中</li>
<li> `func` 执行，改变元素 `div` 的背景颜色，元素往队列添加重绘请求</li>
<li>回调函数执行完毕，浏览器从队列中接受下一个待处理事件，即是重绘请求，并处理。然后等待一个时钟循环，执行下一个 `func` 回调 (参见第二步) </li>
<li>反复执行，直至触发 `stop()`</li>
</ol>

回调等待延迟可设置为0到100ms, 取决于各自需求。当然，延时愈长，CPU 负荷也愈小。

[smart header="规避警告：'脚本运行时间过长'"]<br>
运行警告是同步事件阻塞过久重要部分，不妨将冗长繁杂的任务切分细化，再搭配 `setTimeout` 执行，如此则可避免浏览器卡死及运行警告。

现代语法高亮插件便采用了这种方法。每当用户打开一个大型文本文档，插件会先高亮一部分文本内容，然后调用类似 `setTimeout(highlightNex,50)` 的方法，把下一部分文本高亮。

当然，即便如此有时仍不免卡顿，毕竟高亮文本需要一定时间。
[/smart]



## 总结
大多数浏览器在单一线程里逐步渲染 UI、执行 JavaScript 脚本，而单一的线程常为同步的调用行为所阻塞，是故JavaScript 脚本运行阻碍渲染时有发生。

大多数事件都被异步地处理，但 DOM 事件例外。

灵活运用`setTimeout(..,0)` 是一个实用技巧，且具有以下优点：
<ul>
<li>能使浏览器及时渲染当前改变.</li>
<li>能规避警告提示 "Script is runing too long"</li>
<li>能改变执行流程</li>
</ul>

每当涉及超时设定与线程问题，Opera 总是那么与众不同。





