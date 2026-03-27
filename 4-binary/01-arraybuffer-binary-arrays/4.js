
// 4 个字节的二进制数组，每个都是最大值 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// 在偏移量为 0 处获取 8 位数字
console.log( dataView.getUint8(0) ); // 255

console.log( dataView.getUint8(1) ); // 255
console.log( dataView.getUint8(3) ); // 255

// console.log( dataView.getUint8(4) );
// RangeError: Offset is outside the bounds of the DataView



// 现在在偏移量为 0 处获取 16 位数字，它由 2 个字节组成，一起解析为 65535
console.log( dataView.getUint16(0) ); // 65535（最大的 16 位无符号整数）

// 在偏移量为 0 处获取 32 位数字
console.log( dataView.getUint32(0) ); // 4294967295（最大的 32 位无符号整数）

dataView.setUint32(0, 0); // 将 4 个字节的数字设为 0，即将所有字节都设为 0
