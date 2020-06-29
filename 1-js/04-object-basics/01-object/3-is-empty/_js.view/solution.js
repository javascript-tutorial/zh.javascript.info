function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
    return false;
  }
  return true;
}
