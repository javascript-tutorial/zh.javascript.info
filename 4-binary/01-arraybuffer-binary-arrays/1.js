
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer

let view = new Uint32Array(buffer); // 将 buffer 视为一个 32 位整数的序列

console.log(Uint32Array.BYTES_PER_ELEMENT); // 每个整数 4 个字节

console.log(view.length); // 4，它存储了 4 个整数
console.log(view.byteLength); // 16，字节中的大小

// 让我们写入一个值
view[0] = 123456;

// 遍历值
for(let num of view) {
  console.log(num); // 123456，然后 0，0，0（一共 4 个值）
}

console.log(view);
// Uint32Array(4) [ 123456, 0, 0, 0 ]
