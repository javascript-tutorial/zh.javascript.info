function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
    return false;
  }
  return true;
}
