function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
    return false;
  }
  return true;
}
