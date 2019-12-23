function concat(arrays) {
<<<<<<< HEAD
  // 对每个数组长度求和
=======
  // sum of individual array lengths
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

<<<<<<< HEAD
  // 对于每个数组 — 复制到 result
  // 下一个数组在前一个后面复制
=======
  // for each array - copy it over result
  // next array is copied right after the previous one
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
