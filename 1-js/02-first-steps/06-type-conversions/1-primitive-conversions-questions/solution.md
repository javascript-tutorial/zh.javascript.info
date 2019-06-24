
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
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
```

<<<<<<< HEAD
1. 字符串的加法 `"" + 1` 会将 `1` 转换为一个字符串：`"" + 1 = "1"`，然后我们得到了 `"1" + 0`，再次应用同样的规则。
2. 减法 `-` （就像大多数数学操作那样）只能用于数字，它会将空字符串 `""` 转换为 `0`。
3. `null` 经过数字化转换之后会变为 `0`。
4. `undefined` 经过数字化转换之后会变为 `NaN`。
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
