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
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
