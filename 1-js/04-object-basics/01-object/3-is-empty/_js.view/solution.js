function isEmpty(obj) {
  for (let key in obj) {
<<<<<<< HEAD
    // 如果进到循环里面，说明有属性。
=======
    // if the loop has started, there is a property
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
    return false;
  }
  return true;
}
