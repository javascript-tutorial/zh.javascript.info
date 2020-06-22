function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
    return false;
  }
  return true;
}
