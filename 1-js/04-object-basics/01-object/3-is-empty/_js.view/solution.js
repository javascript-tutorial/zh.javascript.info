function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    return false;
  }
  return true;
}
