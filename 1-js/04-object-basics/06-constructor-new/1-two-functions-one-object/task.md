importance: 2

---

# Two functions – one object

是否可以创建函数 `A` 和 `B`，如 `new A()==new B()`？

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

如果可以，请提供他们的代码示例。
