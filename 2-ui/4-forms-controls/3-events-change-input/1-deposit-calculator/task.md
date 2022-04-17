importance: 5

---

# 存款计算器

创建一个界面，允许输入银行存款总额以及存款利率，然后计算在给定时间段后，钱会变成多少。

这是示例：

[iframe src="solution" height="350" border="1"]

当输入有变化时，应立即进行处理。

公式如下：
```js
// initial: 总存款的初始值
// interest: 例如 0.05 意味着每年涨幅 5% 
// years: 要等待多少年
let result = Math.round(initial * (1 + interest) ** years);
```
