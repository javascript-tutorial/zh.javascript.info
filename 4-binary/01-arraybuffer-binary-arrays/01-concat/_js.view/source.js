function concat(arrays) {
<<<<<<< HEAD
  // ……你的代码……
=======
  // ...your code...
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
}

let chunks = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8])
];

console.log(Array.from(concat(chunks))); // 0, 1, 2, 3, 4, 5, 6, 7, 8

console.log(concat(chunks).constructor.name); // Uint8Array
