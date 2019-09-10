
1. 让我们添加 `__proto__`：

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. 在现代引擎的性能方面，无法是从对象中还是从它的原型中获取一个属性，都是没有区别的。它们会记住在哪里找到该属性的，然后下一次请求到来时，重用它。

    例如，对于 `pockets.glasses` 来说，它们会记得找到 `glasses`（在 `head` 中）的地方，这样下次就会直接在之前的地方搜索。一旦有内容更改，它们也会自动更新内容缓存，因此这样的优化是安全的。
