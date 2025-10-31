
class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine();

// 不能从类的外部访问类的私有属性和方法
// coffeeMachine.#fixWaterAmount(123); // Error
// SyntaxError: Private field '#fixWaterAmount' must be declared in an enclosing class


// coffeeMachine.#waterLimit = 1000; // Error
// SyntaxError: Private field '#waterLimit' must be declared in an enclosing class
