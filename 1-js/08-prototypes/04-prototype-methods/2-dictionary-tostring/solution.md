
可以使用 `Object.keys` 列出所有可枚举键值，然后输出。

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/2-dictionary-tostring/solution.md
为了使 `toString` 不可枚举，我们使用属性描述器来定义它。`Object.create` 语法允许我们为一个对象提供属性描述器作为第二参数。
=======
To make `toString` non-enumerable, let's define it using a property descriptor. The syntax of `Object.create` allows us to provide an object with property descriptors as the second argument.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/2-dictionary-tostring/solution.md

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

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/2-dictionary-tostring/solution.md
当我们使用描述器创建一个属性，它的标识默认是 `false`。因此在以上代码中，`dictonary.toString` 是不可枚举的。
=======
When we create a property using a descriptor, its flags are `false` by default. So in the code above, `dictionary.toString` is non-enumerable.

See the the chapter [](info:property-descriptors) for review.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/2-dictionary-tostring/solution.md
