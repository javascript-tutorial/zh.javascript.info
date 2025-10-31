
# 关于 prototype 原型

取 对象的原型: __proto__ （~=父类）
（如果取对象的 prototype，会得到 null）

    原理是 __proto__ 是在 Object.prototype 中定义的 setter/getter 函数


取 函数的原型: prototype  （到具体的父类（父函数））
如果取某函数的 __proto__ （父类），会拿到 Function.prototype （合理）


取 (class)的原型: prototype
    例如  Array.prototype


extends 只能从一个父类继承，
如果想有多个父类的能力，用 mixin


# proxy
类似 java 里的 proxy
也有点像 C++ 里的操作符重载


# curry 化
有点像偏导数


html element -> attribute
DOM -> property


某个element.append/prepend, before/after, replaceWith 这些都是以纯文本形式插入，不会识别为 html
要想插入 html 的话，用 elm.insertAdjacentHTML/Text/Element


想读尺寸数值的话，不要读 css，而是那些几何属性 clientXXX, xxxHeight 等


