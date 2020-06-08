function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    return false;
  }
  return true;
}
