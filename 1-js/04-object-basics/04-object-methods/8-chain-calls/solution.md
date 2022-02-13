解决方案就是在每次调用后返回这个对象本身。

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().showStep().down().showStep(); // 展示 1，然后 0
```

我们也可以每行一个调用。对于长链接它更具可读性：

```js 
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```

