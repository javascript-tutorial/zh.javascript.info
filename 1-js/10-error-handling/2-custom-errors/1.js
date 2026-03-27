
class MyError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "MyError"; // (2)
  }
}

function test() {
  throw new MyError("Whoops!");
}

try {
  test();
} catch(err) {
  console.log(err.message); // Whoops!
  console.log(err.name); // MyError
  console.log(err.stack); // 一个嵌套调用的列表，每个调用都有对应的行号
}
