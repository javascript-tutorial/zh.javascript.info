function concat(arrays) {
<<<<<<< HEAD
  // ……你的代码……
=======
  // ...your code...
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
}

let chunks = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8])
];

console.log(Array.from(concat(chunks))); // 0, 1, 2, 3, 4, 5, 6, 7, 8

console.log(concat(chunks).constructor.name); // Uint8Array
