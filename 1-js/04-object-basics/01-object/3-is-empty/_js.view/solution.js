function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
    return false;
  }
  return true;
}
