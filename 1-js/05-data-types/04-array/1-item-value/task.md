importance: 3

---

# 数组被拷贝了吗?

下面的代码将会显示什么？

```js
let fruits = ["Apples", "Pear", "Orange"];

// 在“副本”里 push 了一个新的值
let shoppingCart = fruits;
shoppingCart.push("Banana");

// fruits 里面是什么？
alert( fruits.length ); // ?
```
