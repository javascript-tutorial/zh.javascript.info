```js run no-beautify
function sortByAge(arr) {
  arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

<<<<<<< HEAD
// 现在排序是：[john, mary, pete]
=======
// now sorted is: [john, mary, pete]
alert(arr[0].name); // John
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
