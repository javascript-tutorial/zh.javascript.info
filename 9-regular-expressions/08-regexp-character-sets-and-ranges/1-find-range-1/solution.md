·答案：**不会，会**。

- 不会。在字符串 `subject:Java` 中，它不会匹配任何内容，因为 `pattern:[^script]` 表示“除了给定的字符之外的任何字符”。因此，这个正则表达式会查找 `"Java"` 后面是否有匹配这个规则的字符，但是这已经是整个字符串的结尾了，后面没有任何字符。

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```

- 会。因为 `pattern:[^script]` 部分匹配到了字符 `"S"`。它不是 `pattern:script`。由于正则表达式区分大小写（没有 `pattern:i` 修饰符），因此它将 `"S"` 视为与 `"s"` 不同的字符。

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
