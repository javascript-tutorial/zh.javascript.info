importance: 5

---

# 存款计算器

创建一个界面，允许输入银行存款的总和以及利率，然后计算过了一段时间后会达到多少钱。

这里是例子：

[iframe src="solution" height="350" border="1"]

任何输入的变化都应该立即被处理

公式如下：
```js
// initial: 总存款的初始值
// interest: e.g. 0.05 意味着每年涨幅 5% 
// years: 需要等待多少年
let result = Math.round(initial * (1 + interest * years));
```
