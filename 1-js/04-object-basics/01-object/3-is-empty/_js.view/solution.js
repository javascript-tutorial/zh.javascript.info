function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
    return false;
  }
  return true;
}
