importance: 5

---

# 计算属性数量

写一个函数 `count(obj)`，该函数返回对象中的属性的数量：

```js
let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
```

试着使代码尽可能简短。

P.S. 忽略 Symbol 类型属性，只计算“常规”属性。

