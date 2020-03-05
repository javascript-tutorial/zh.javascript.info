
可以使用 `Object.keys` 获取所有可枚举的键，并输出其列表。

为了使 `toString` 不可枚举，我们使用一个属性描述器来定义它。`Object.create` 语法允许我们为一个对象提供属性描述器作为第二参数。

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // 定义 toString 属性
    value() { // value 是一个 function
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple 和 __proto__ 在循环中
for(let key in dictionary) {
  alert(key); // "apple"，然后是 "__proto__"
}  

// 通过 toString 处理获得的以逗号分隔的属性列表
alert(dictionary); // "apple,__proto__"
```

当我们使用描述器创建一个属性，它的标识默认是 `false`。因此在上面这段代码中，`dictonary.toString` 是不可枚举的。

请阅读 [](info:property-descriptors) 一章进行回顾。
