function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
    return false;
  }
  return true;
}
