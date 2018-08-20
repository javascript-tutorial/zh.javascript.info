
使用 CSS 为 `width` 和 `height` 属性生成动效：
```css
/* 原始类 */

#flyjet {
  transition: all 3s;
}

/* JS 添加的 .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

请注意，`transitionend` 会被触发两次 —— 每个属性触发一次。因此，如果不添加一个额外的检查的话，这条信息会显示两次。
