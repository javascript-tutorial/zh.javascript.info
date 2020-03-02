importance: 5

---

# bind 后的函数属性

函数的属性中有一个值。`bind` 之后它会改变吗？为什么，阐述一下？

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // 输出将会是什么？为什么？
*/!*
```

