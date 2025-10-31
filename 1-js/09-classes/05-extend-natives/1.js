
// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
  isEmpty() {
    console.log("check len ", this.length);
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false


let a1=[1,2,3];
console.log(a1.length);
// console.log(a1.isEmpty());
// TypeError: a1.isEmpty is not a function
