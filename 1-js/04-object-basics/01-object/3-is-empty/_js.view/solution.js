function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
    return false;
  }
  return true;
}
