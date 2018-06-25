importance: 5

---

# 排序对象

编写函数 `sortByName(users)` 获得对象数组 property的属性 `name` 并对它进行排序。

例如：

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// now: [john, mary, pete]
alert(arr[1].name); // Mary
```

