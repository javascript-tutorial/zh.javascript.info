function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8
    return false;
  }
  return true;
}
