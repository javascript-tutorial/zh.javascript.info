function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
    return false;
  }
  return true;
}
