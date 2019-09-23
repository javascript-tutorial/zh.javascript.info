function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
    return false;
  }
  return true;
}
