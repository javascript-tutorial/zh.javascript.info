importance: 5

---

# 二次 bind

我们可以通过额外的绑定改变 `this` 吗？

输出将会是什么？

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

