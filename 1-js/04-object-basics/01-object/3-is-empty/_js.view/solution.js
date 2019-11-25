function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
    return false;
  }
  return true;
}
