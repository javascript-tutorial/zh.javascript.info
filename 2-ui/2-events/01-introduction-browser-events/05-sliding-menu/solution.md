
# HTML/CSS

首先，让我们创建 HTML/CSS。

菜单是页面上的一个独立图形组件，所以最好把它放入一个单独的 DOM 元素中。

菜单项的列表可以被作为列表 `ul/li` 列出。

下面是示例结构：

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

我们对标题使用 `<span>`，因为 `<div>` 有一个隐式的 `display:block`，它会占据 100% 的水平宽度。

就像这样：

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>
```

因此，如果我们在它上面设置 `onclick`，那么它也会捕获文本右侧的点击。

……由于 `<span>` 有一个隐式的 `display: inline`，它恰好占据了足以容纳所有文本的位置：

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>
```

# 切换菜单

切换菜单应更改箭头并显示/隐藏菜单列表。

所有这些更改都可以通过 CSS 完美处理。在 JavaScript 中，我们应该通过添加/移除 `.open` 类来标记菜单的当前状态。

没有它，菜单就会被关闭：

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

……有 `.open` 后，箭头会改变，列表会出现：

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
