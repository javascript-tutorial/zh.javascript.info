
可以使用 `Object.keys` 列出所有可枚举键值，然后输出。

为了使 `toString` 不可枚举，我们使用属性描述器来定义它。`Object.create` 语法允许我们为一个对象提供属性描述器作为第二参数。

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // 定义 toString 方法
    value() { // value 是一个函数
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple 和 __proto__ 在循环内
for(let key in dictionary) {
  alert(key); // "apple"，然后 "__proto__"
}  

// 通过 toString 得到逗号分隔的属性值
alert(dictionary); // "apple,__proto__"
```

当我们使用描述器创建一个属性，它的标识默认是 `false`。因此在以上代码中，`dictonary.toString` 是不可枚举的。
