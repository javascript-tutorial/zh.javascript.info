function concat(arrays) {
  // 单个数组长度求和
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

  // 对于每个数组 - 复制到 result
  // 下一个数组在前一个后面复制
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
