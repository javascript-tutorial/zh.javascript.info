importance: 5

---

# 查找 field 的窗口坐标

在下面的 iframe 中你可以看到一个带有绿色 ”field“ 元素的文档。

使用 JavaScript 来找到箭头指向角落的坐标。

为了方便起见，已经在文档中实现了一个小的功能。在任何地方点击都会显示那里的坐标。

[iframe border=1 height=360 src="source" link edit]

你的代码应该使用 DOM 来获取到以下窗口坐标：

<<<<<<< HEAD
1. 左上的外角（这很简单）。
2. 右下的外角（这也挺简单）。
3. 左上的内角（这有点难）。
4. 右下的内角（有几种方式，选择其中一种）。
=======
1. Upper-left, outer corner (that's simple).
2. Bottom-right, outer corner (simple too).
3. Upper-left, inner corner (a bit harder).
4. Bottom-right, inner corner (there are several ways, choose one).
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

你计算得到的坐标应该和鼠标单击返回的坐标相同。

附：如果元素有其他大小和边框，并且没有绑定到任何固定的值这代码也应该起作用。
