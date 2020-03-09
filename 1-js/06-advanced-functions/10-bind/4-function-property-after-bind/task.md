importance: 5

---

# bind 后的函数属性

<<<<<<< HEAD
函数的属性中有一个值。`bind` 之后它会改变吗？为什么，阐述一下？
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

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

