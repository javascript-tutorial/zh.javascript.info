function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
    return false;
  }
  return true;
}
