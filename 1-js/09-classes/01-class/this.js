
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this);
    console.log(this.value);
  }
}

let button = new Button("hello");

button.click();

setTimeout(button.click, 1000); // undefined
// now "this" shows:
/*
Timeout {
  _idleTimeout: 1000,
  _idlePrev: null,
  _idleNext: null,
  _idleStart: 160,
  _onTimeout: [Function: click],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(refed)]: true,
  [Symbol(kHasPrimitive)]: false,
  [Symbol(asyncId)]: 5,
  [Symbol(triggerId)]: 1
}
*/