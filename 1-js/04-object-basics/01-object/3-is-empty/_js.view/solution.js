function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
    return false;
  }
  return true;
}
