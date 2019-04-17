
# Modules, introduction

As our application grows bigger, we want to split it into multiple files, so called 'modules'.
A module usually contains a class or a library of useful functions.

For a long time, Javascript existed without a language-level module syntax. That wasn't a problem, because initially scripts were small and simple. So there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules.

For instance:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.JS server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now all these slowly become a part of history, but we still can find them in old scripts. The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js.

## What is a module?

A module is just a file, a single script, as simple as that.

Directives `export` and `import` allow to interchange functionality between modules:

- `export` keyword labels variables and functions that should be accessible from outside the file.
- `import` allows to import functionality from other modules.

For instance, if we have a file `sayHi.js` exporting a function:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...Then another file may import and use it:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

In this tutorial we concentrate on the language itself, but we use browser as the demo environment, so let's see how modules work in the browser.

To use modules, we must set the attribute `<script type="module">`, like this:

[codetabs src="say" height="140" current="index.html"]

The browser automatically fetches and evaluates imports, then runs the script.

## Core module features

What's different in modules, compared to "regular" scripts?

There are core features, valid both for browser and server-side Javascript.

### Always "use strict"

Modules always `use strict`. E.g. assigning to an undeclared variable will give an error.

```html run
<script type="module">
  a = 5; // error
</script>
```

Here we can see it in the browser, but the same is true for any module.

### Module-level scope

Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.

In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`, and fails:

[codetabs src="scopes" height="140" current="index.html"]

Modules are expected to `export` what they want to be accessible from outside and `import` what they need.

So we should import `user.js` directly into `hello.js` instead of `index.html`.

That's the correct variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, independant top-level scope also exists for each `<script type="module">`:

```html run
<script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

If we really need to make a "global" in-browser variable, we can explicitly assign it to `window` and access as `window.user`. But that's an exception requiring a good reason.

### A module code is evaluated only the first time when imported

If a same module is imported into multiple other places, it's code is executed only the first time, then exports are given to all importers.

That has important consequences. Let's see that on examples.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once -- the first time:

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (nothing)
```

In practice, top-level module code is mostly used for initialization. We create data structures, pre-fill them, and if we want something to be reusable -- export it.

Now, a more advanced example.

Let's say, a module exports an object:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

If this module is imported from multiple files, the module is only evaluated the first time, `admin` object is created, and then passed to all further importers.

All importers get exactly the one and only `admin` object:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
*/!*
```

So, let's reiterate -- the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other modules will see that .

Such behavior is great for modules that require configuration. We can set required properties on the first import, and then in further imports it's ready.

For instance, `admin.js` module may provide certain functionality, but expect the credentials to come into the `admin` object from outside:

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}
```

Now, in `init.js`, the first script of our app, we set `admin.name`. Then everyone will see it, including calls made from inside `admin.js` itself:

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Ready to serve, *!*Pete*/!*!
```

### import.meta

The object `import.meta` contains the information about the current module.

Its content depends on the environment. In the browser, it contains the url of the script, or a current webpage url if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script url (url of the html page for an inline script)
</script>
```

### Top-level "this" is undefined

That's kind of a minor feature, but for completeness we should mention it.

In a module, top-level `this` is undefined, as opposed to a global object in non-module scripts:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Browser-specific features

There are also several browser-specific differences of scripts with `type="module"` compared to regular ones.

You may want skip those for now if you're reading for the first time, or if you don't use Javascript in a browser.

### Module scripts are deferred

Module scripts are *always* deferred, same effect as `defer` attribute (described in the chapter [](info:script-async-defer)), for both external and inline scripts.

In other words:
- external module scripts `<script type="module" src="...">` don't block HTML processing.
- module scripts wait until the HTML document is fully ready.
- relative order is maintained: scripts that go first in the document, execute first.

As a side-effect, module scripts always see HTML elements below them.

For instance:

```html run
<script type="module">
*!*
  alert(typeof button); // object: the script can 'see' the button below
*/!*
  // as modules are deferred, the script runs after the whole page is loaded
</script>

<script>
*!*
  alert(typeof button); // Error: button is undefined, the script can't see elements below
*/!*
  // regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>
```

Please note: the second script actually works before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so way wait for the document to be processed. The regular scripts runs immediately, so we saw its output first.

When using modules, we should be aware that HTML-document can show up before the Javascript application is ready. Some functionality may not work yet. We should put transparent overlays or "loading indicators", or otherwise ensure that the visitor won't be confused because of it.

### Async works on inline scripts

Async attribute `<script async type="module">` is allowed on both inline and external scripts. Async scripts run immediately when imported modules are processed, independantly of other scripts or the HTML document.

For example, the script below has `async`, so it doesn't wait for anyone.

It performs the import (fetches `./analytics.js`) and runs when ready, even if HTML document is not finished yet, or if other scripts are still pending.

That's good for functionality that doesn't depend on anything, like counters, ads, document-level event listeners.

```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### External scripts

There are two notable differences of external module scripts:

1. External scripts with same `src` run only once:
    ```html
    <!-- the script my.js is fetched and executed only once -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. External scripts that are fetched from another domain require [CORS](mdn:Web/HTTP/CORS) headers. In other words, if a module script is fetched from another domain, the remote server must supply a header `Access-Control-Allow-Origin: *` (may use fetching domain instead of `*`) to indicate that the fetch is allowed.
    ```html
    <!-- another-site.com must supply Access-Control-Allow-Origin -->
    <!-- otherwise, the script won't execute -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    That ensures better security by default.

### No bare modules allowed

In the browser, in scripts (not in HTML), `import` must get either a relative or absolute URL. So-called "bare" modules, without a path, are not allowed.

For instance, this `import` is invalid:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// must be './sayHi.js' or wherever the module is
```

Certain environments, like Node.js or bundle tools allow bare modules, as they have own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.

### Compatibility, "nomodule"

Old browsers do not understand `type="module"`. Scripts of the unknown type are just ignored. For them, it's possible to provide a fallback using `nomodule` attribute:

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

If we use bundle tools, then as modules are bundled together, their `import/export` statements are replaced by special bundler calls, so the resulting build does not require `type="module"`, and we can put it into a regular script:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```

## Build tools

In real-life, browser modules are rarely used in their "raw" form. Usually, we bundle them together with a special tool such as [Webpack](https://webpack.js.org/) and deploy to the production server.

One of the benefits of using bundlers -- they give more control over how modules are resolved, allowing bare modules and much more, like CSS/HTML modules.

Build tools do the following:

1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transforms and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge Javascript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter named etc).

That said, native modules are also usable. So we won't be using Webpack here: you can configure it later.

## Summary

To summarize, the core concepts are:

1. A module is a file. To make `import/export` work, browsers need `<script type="module">`, that implies several differences:
    - Deferred by default.
    - Async works on inline scripts.
    - External scripts need CORS headers.
    - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Modules always `use strict`.
4. Module code is executed only once. Exports are created once and shared between importers.

So, generally, when we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. Browser loads and evaluates the scripts automatically.

In production, people often use bundlers such as [Webpack](https://webpack.js.org) to bundle modules together for performance and other reasons.

In the next chapter we'll see more examples of modules, and how things can be exported/imported.
