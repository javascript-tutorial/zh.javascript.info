答案：**John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

`f.bind(...)` 返回的外来的 [绑定函数](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) 对象仅在创建的时候记忆上下文（如果提供了参数）。

一个函数不能作为重复边界。
