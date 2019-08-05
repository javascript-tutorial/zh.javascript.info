function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    return false;
  }
  return true;
}
