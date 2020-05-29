importance: 5

---

# 将小球置于区域（field）中心

源文件的效果如下：

[iframe src="source" edit link height=180]

区域（field）的中心坐标是多少？

<<<<<<< HEAD
计算它们，并将小球置于绿色的区域（field）中心：
=======
Calculate them and use to place the ball into the center of the green field:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

[iframe src="solution" height=180]

- 该元素应该通过 JavaScript 移动，而不是 CSS。
- 该代码应该适用于任何大小的球（`10`、`20`、`30` 像素）以及任意大小的区域（field），而不应该绑定到给定值。

P.S. 当然了，置于中心的操作通过 CSS 也可以完成，但是这里我们需要通过 JavaScript 完成。此外，当必须使用 JavaScript 时，我们可能会遇到其他话题以及更加复杂的情况，这里我们只是做一个“热身”。
