# 查找颜色，格式为 #abc 或 #abcdef

编写一个正则来匹配 `#abc` 或 `#abcdef` 格式的颜色。即：`#` 后接三位或六位 16 进制数。

使用案例：
```js
let reg = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef
```

注：必须为三位或六位，`#abcd` 这种不应该被匹配。
