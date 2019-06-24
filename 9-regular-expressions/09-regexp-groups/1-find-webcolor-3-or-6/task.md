<<<<<<< HEAD
# 查找颜色，格式为 #abc 或 #abcdef

编写一个正则来匹配 `#abc` 或 `#abcdef` 格式的颜色。即：`#` 后接三位或六位 16 进制数。

使用案例：
=======
# Find color in the format #abc or #abcdef

Write a RegExp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadecimal digits.

Usage example:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
```js
let reg = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

<<<<<<< HEAD
alert( str.match(reg) ); // #3f3 #AA0ef
```

注：必须为三位或六位，`#abcd` 这种不应该被匹配。
=======
alert( str.match(reg) ); // #3f3 #AA00ef
```

P.S. This should be exactly 3 or 6 hex digits: values like `#abcd` should not match.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
