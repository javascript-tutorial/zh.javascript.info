importance: 5

---

# 将 border-left-width 转换成 borderLeftWidth

写函数 `camelize(str)` 将诸如 "my-short-string" 之类的由短划线分隔的单词变成骆驼式的 "myShortString"。

即：删除所有短横线，短横线后的第一个单词变为大写。

例如：

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

提示：使用 `split` 将字符串拆分成数组，然后将其转换 `join` 并返回。
