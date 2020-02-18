
这是因为 `map.keys()` 返回的是可迭代对象而非数组。

我们可以使用方法 `Array.from` 来将它转换为数组：


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
