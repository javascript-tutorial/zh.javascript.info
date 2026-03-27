
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // 保存前一个调用的延时

  if (start + 100 < Date.now()) console.log(times); // 100 毫秒之后，显示延时信息
  else setTimeout(run); // 否则重新调度
});
