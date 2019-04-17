function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
    return false;
  }
  return true;
}
