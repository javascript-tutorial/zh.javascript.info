
try {

  console.log('开始执行 try 中的内容');  // (1) <--

  // ...这里没有 error

  console.log('try 中的内容执行完毕');   // (2) <--

} catch (err) {

  console.log('catch 被忽略，因为没有 error'); // (3)

}
