·答案：**没有，是的**。

- 在脚本 `subject:Java` 中它并不会匹配到任何字符串，因为 `pattern:[^script]` 表示的是“除了给定的字符之外的任何字符”。所以这个正则会查找 `"Java"` 之后是否有匹配这个规则的符号，但是这已经是整个字符串的结尾了，在其之后并没有任何符号。

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```

- 是的，因为这个正则表达是大小写敏感的，`pattern:[^script]` 部分匹配到了字符 `"S"`。

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
