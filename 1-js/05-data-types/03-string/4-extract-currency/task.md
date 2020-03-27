importance: 4

---

# 提取货币

我们有以 `"$120"` 这样的格式表示的花销。意味着：先是美元符号，然后才是数值。

创建函数 `extractCurrencyValue(str)` 从字符串中提取数值并返回。

例如：

```js
alert( extractCurrencyValue('$120') === 120 ); // true
```

