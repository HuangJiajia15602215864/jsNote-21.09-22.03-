/*
TypeScript：JavaScript 的一个超集，扩展了 JavaScript 的语法，可以编译成纯 JavaScript。
扩展功能：
  静态类型检测
  基于类的面向对象编程
  基本类型增加：any、元祖、枚举、void、never
  类型断言（编译时语法,允许变量从一种类型更改为另一种类型,提供分析代码的方法，不是类型转换， <>、as）
  类型推断（当类型没有给出时，TypeScript 编译器利用类型推断来推断类型）
  类型守卫
  联合类型（通过管道|将变量设置多种类型 var val:string|number）
  接口
  泛型
  命名空间（命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义）

不同点：
  1、JS是解释型语言，在运行时发现错误；TS在编译时发现错误；
  2、JS是弱类型，没有静态类型；TS是强类型，支持静态和动态类型；
  3、TS支持模块、泛型、接口；
  4、TS支持ES3-ES6等；

PS：TS和JS之间的关系其实就是Less/Sass和CSS之间的关系，扩展了JS且最终也会换成JS；
*/