<<<<<<< HEAD

Для того, чтобы вставить после тега `<body>`, нужно вначале его найти. Будем использовать регулярное выражение `pattern:<body.*>`.

Далее, нам нужно оставить сам тег `<body>` на месте и добавить текст после него.

Это можно сделать вот так:
=======
In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*>` for that.

In this task we don't need to modify the `<body>` tag. We only need to add the text after it.

Here's how we can do it:

>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
В строке замены `$&` означает само совпадение, то есть мы заменяем `pattern:<body.*>` заменяется на самого себя плюс `<h1>Hello</h1>`.

Альтернативный вариант - использовать ретроспективную проверку:
=======
In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*>`. It gets replaced by itself plus `<h1>Hello</h1>`.

An alternative is to use lookbehind:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
Такое регулярное выражение на каждой позиции будет проверять, не идёт ли прямо перед ней `pattern:<body.*>`. Если да - совпадение найдено. Но сам тег `pattern:<body.*>` в совпадение не входит, он только участвует в проверке. А других символов после проверки в нём нет, так что текст совпадения будет пустым.

Происходит замена "пустой строки", перед которой идёт `pattern:<body.*>` на `<h1>Hello</h1>`. Что, как раз, и есть вставка этой строки после `<body>`.

P.S. Этому регулярному выражению не помешают флаги: `pattern:/<body.*>/si`, чтобы в "точку" входил перевод строки (тег может занимать несколько строк), а также чтобы теги в другом регистре типа `match:<BODY>` тоже находились.
=======
As you can see, there's only lookbehind part in this regexp.

It works like this:
- At every position in the text.
- Check if it's preceeded by `pattern:<body.*>`.
- If it's so then we have the match.

The tag `pattern:<body.*>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `pattern:<body.*>`.

So we replaces the "empty line", preceeded by `pattern:<body.*>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also useful: `pattern:/<body.*>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
