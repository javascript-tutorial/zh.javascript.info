importance: 5

---

# bind 过后的函数属性

<<<<<<< HEAD
函数有一个包含某个值的属性。`bind` 之后它会改变吗？为什么，阐述一下？
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

