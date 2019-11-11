function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
    return false;
  }
  return true;
}
