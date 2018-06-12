importance: 5

---

# 二次绑定

我们可以通过附加的 bind 改变 `this` 吗？

输出将会是什么？

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

