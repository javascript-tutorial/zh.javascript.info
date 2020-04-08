importance: 2

---

# 两个函数 — 一个对象

是否可以创建像 `new A()==new B()` 这样的函数 `A` 和 `B`？

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

如果可以，请提供一个它们的代码示例。
