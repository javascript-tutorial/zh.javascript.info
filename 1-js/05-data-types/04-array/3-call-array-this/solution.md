`arr[2]()` 调用从句法来看可以类比于 `obj[method]()`，与 `obj` 对应的是 `arr`，与 `method` 对应的是 `2`。

所以调用 `arr[2]` 函数也就是调用对象函数。自然地，它接收 `this` 引用的对象 `arr` 然后输出该数组：

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // "a","b",function
```

该数组有 3 项：最开始有两个，后来添加进来一个函数。
