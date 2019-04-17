
# HTML/CSS
首先，我们创建 HTML/CSS。

<<<<<<< HEAD
菜单是页面上的一个独立的图形组件，所以最好把它放在一个 DOM 元素中。

菜单项列表可以分层为列表 `ul/li`。
=======
A menu is a standalone graphical component on the page, so it's better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

下面是示例的结构：

```html
<div class="menu">
  <span class="title">Sweeties (click me)!</span>
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>
</div>
```

我们的标题使用 `<span>`，因为 `<div>` 有一个隐式的 `display:block`，它会 100% 的占据水平宽度。

就像这样：

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>
```

因此如果我们在它上面设置 `onclick`，就会在文本的右边捕获点击事件。

...但 `<span>` 有一个隐式 `display: inline`，因此它会占据足够的位置来适应所有的文本：

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>
```

 # 切换菜单

切换菜单应更改箭头并显示/隐藏菜单列表。

所以这些更改都能被 CSS 完美处理。在 JavaScript 中，我们应该通过添加/移除 `.open` 类来标记菜单的当前状态。

没有它，菜单就会关闭：

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...使用 `.open` 后，箭头会改变，列表会出现：

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
