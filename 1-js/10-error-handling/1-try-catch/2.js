
try {

  console.log('开始执行 try 中的内容');  // (1) <--

  lalala; // error，变量未定义！

  console.log('try 的末尾（未执行到此处）');  // (2)

} catch (err) {

  console.log(`出现了 error！`, err); // (3) <--

}
