As we can see from HTML/CSS, the slider is a `<div>` with a colored background, that contains a runner -- another `<div>` with `position:relative`.

<<<<<<< HEAD
我们这里有一个水平拖放。

我们使用 `position:relative` 和滚动条的相对坐标的 thumb 来定位元素。这里比 `position:absolute` 更方便。
=======
To position the runner we use `position:relative`, to provide the coordinates relative to its parent, here it's more convenient here than `position:absolute`.

Then we implement horizontal-only Drag'n'Drop with limitation by width.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
