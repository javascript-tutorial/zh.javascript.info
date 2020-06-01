importance: 5

---

# 查找区域的窗口坐标

在下面的 iframe 中，你可以看到一个带有绿色区域（field）的文档。

使用 JavaScript 查找带箭头指向的角的窗口坐标。

为了方便起见，已经在文档中实现了一个小功能。在任何地方点击都会显示那里的坐标。

[iframe border=1 height=360 src="source" link edit]

你的代码应该使用 DOM 来获取以下窗口坐标：

<<<<<<< HEAD
1. 左上的外角（这很简单）。
2. 右下的外角（也挺简单）。
3. 左上的内角（这有点难）。
4. 右下的内角（有几种方式，选择其中一种）。
=======
1. Upper-left, outer corner (that's simple).
2. Bottom-right, outer corner (simple too).
3. Upper-left, inner corner (a bit harder).
4. Bottom-right, inner corner (there are several ways, choose one).
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

你计算得到的坐标，应该与点击鼠标返回的坐标相同。

P.S. 如果元素具有其他大小（size）和边框（border），且未绑定任何固定的值，你写的代码也应该起作用。
