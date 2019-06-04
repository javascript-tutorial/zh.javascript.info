function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
    return false;
  }
  return true;
}
