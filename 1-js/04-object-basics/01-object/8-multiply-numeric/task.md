importance: 3

---

# 数值属性都乘以2

穿件一个`multiplyNumeric(obj)`方法，把`obj`所有的数值属性都乘以`2`。

例如：

```js
// 在调用之前
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// 调用方法之后
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

注意`multiplyNumeric`方法不返回任何值，它改变了传入的对象。

P.S. 用`typeof`检查值类型。


