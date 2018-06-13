importance: 5

---

# 给字典对象添加 toString 方法

有一个对象 `dictionary`，通过 `Object.create(null)` 创建，用来存储任意键值对。

为该对象添加方法 `dictionary.toString()`，返回所有键的列表，用逗号隔开。你的 `toString` 方法不能对该对象使用 `for...in`。

以下是它的运行例子：

```js
let dictionary = Object.create(null);

*!*
// 添加 dictionary.toString 方法的代码
*/!*

// 添加一些数据
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ 在这里是正常参数

// 只有 apple 和 __proto__ 在循环内
for(let key in dictionary) {
  alert(key); // "apple"，然后 "__proto__"
}  

// your toString in action
alert(dictionary); // "apple,__proto__"
```
