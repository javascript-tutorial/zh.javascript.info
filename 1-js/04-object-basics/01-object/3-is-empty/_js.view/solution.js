function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    return false;
  }
  return true;
}
