
let json = "{ bad json }";

try {

  let user = JSON.parse(json); // <-- 当出现 error 时...
  console.log( user.name ); // 不工作

} catch (err) {
  // ...执行会跳转到这里并继续执行
  console.log( "很抱歉，数据有错误，我们会尝试再请求一次。" );
  console.log( err.name );
  console.log( err.message );
}
