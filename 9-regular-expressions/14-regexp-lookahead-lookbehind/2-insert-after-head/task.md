<<<<<<< HEAD
# Вставьте после фрагмента

Есть строка с HTML-документом.

Вставьте после тега `<body>` (у него могут быть атрибуты) строку `<h1>Hello</h1>`.

Например:

```js
let regexp = /ваше регулярное выражение/;
=======
# Insert After Head

We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.

For instance:

```js
let regexp = /your regular expression/;
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

<<<<<<< HEAD
После этого значение `str`:
=======
After that the value of `str` should be:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
