
let uint7array = new Uint8Array(16);

let num = 255;
console.log(num.toString(2)); // 100000000（二进制表示）

uint7array[0] = 256;
uint7array[1] = 257;

console.log(uint7array[0]); // 0
console.log(uint7array[1]); // 1
