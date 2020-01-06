function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    return false;
  }
  return true;
}
