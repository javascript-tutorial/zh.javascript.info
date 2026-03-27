
let arr16 = new Uint16Array([1, 1000]);
let arr8 = new Uint8Array(arr16);
console.log( arr8[0] ); // 1
console.log( arr8[1] ); // 232，试图复制 1000，但无法将 1000 放进 8 位字节中（详述见下文）。

console.log( arr8[2] );
// undefined
