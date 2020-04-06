function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
    return false;
  }
  return true;
}
