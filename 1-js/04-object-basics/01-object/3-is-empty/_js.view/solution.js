function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
    return false;
  }
  return true;
}
