
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

console.log(coffeeMachine);
// CoffeeMachine { _waterAmount: 0, _power: 100 }

// 加水
coffeeMachine.waterAmount = -10; // _waterAmount 将变为 0，而不是 -10


coffeeMachine._waterAmount = 3;
// still can change
console.log(coffeeMachine);
// CoffeeMachine { _waterAmount: 3, _power: 100 }
