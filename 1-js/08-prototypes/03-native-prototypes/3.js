
// 更改原生原型
// not recommended

String.prototype.show = function() {
  console.log(this);
};

"BOOM!".show(); // BOOM!
// [String: 'BOOM!']

String.prototype.show = function() {
  console.log("again ", this);
};
"BOOM!".show();
// again  [String: 'BOOM!']
