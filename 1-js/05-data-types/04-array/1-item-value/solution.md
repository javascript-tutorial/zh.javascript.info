结果是 `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

这是因为数组是对象。所以 `shoppingCart` 和 `fruits` 是同一数组的引用。

