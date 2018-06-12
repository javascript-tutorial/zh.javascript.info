答案：**John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

`f.bind(...)` 返回的奇特的 [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) 对象仅在创建的时候记忆上下文（以及可能提供了的参数）。

一个函数不能作为重复边界。
