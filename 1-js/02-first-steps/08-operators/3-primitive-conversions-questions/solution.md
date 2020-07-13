
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. 有字符串的加法 `"" + 1`，首先会将数字 `1` 转换为一个字符串：`"" + 1 = "1"`，然后我们得到 `"1" + 0`，再次应用同样的规则得到最终的结果。
2. 减法 `-`（像大多数数学运算一样）只能用于数字，它会使空字符串 `""` 转换为 `0`。
3. 带字符串的加法会将数字 `5` 加到字符串之后。
4. 减法始终将字符串转换为数字，因此它会使 `" -9  "` 转换为数字 `-9`（忽略了字符串首尾的空格）。
5. `null` 经过数字转换之后会变为 `0`。
6. `undefined` 经过数字转换之后会变为 `NaN`。
7. 字符串转换为数字时，会忽略字符串的首尾处的空格字符。在这里，整个字符串由空格字符组成，包括 `\t`、`\n` 以及它们之间的“常规”空格。因此，类似于空字符串，所以会变为 `0`。
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters, are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
