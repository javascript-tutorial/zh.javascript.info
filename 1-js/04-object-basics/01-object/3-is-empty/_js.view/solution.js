function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
    return false;
  }
  return true;
}
