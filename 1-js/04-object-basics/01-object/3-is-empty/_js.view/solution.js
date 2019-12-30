function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
    return false;
  }
  return true;
}
