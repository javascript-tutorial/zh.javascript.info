function concat(arrays) {
<<<<<<< HEAD
  // 对每个数组长度求和
=======
  // sum of individual array lengths
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

<<<<<<< HEAD
  // 对于每个数组 — 复制到 result
  // 下一个数组在前一个后面复制
=======
  // for each array - copy it over result
  // next array is copied right after the previous one
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
