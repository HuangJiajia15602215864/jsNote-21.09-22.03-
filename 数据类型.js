/*
动态语言
JavaScript 是一种弱类型或者说动态语言,不用提前声明变量的类型，可以使用同一个变量保存不同类型的数据。


数据类型（7种原始类型+object）
  7 种原始类型，使用 typeof 运算符检查:
    undefined：typeof instance === "undefined"（已声明没被赋值的变量）
    Boolean：typeof instance === "boolean"
    Number：typeof instance === "number"（双精度64位浮点型，要检查值是否大于或小于 +/-Infinity，你可以使用常量 Number.MAX_VALUE 和 Number.MIN_VALUE）
    String：typeof instance === "string
    BigInt：typeof instance === "bigint"（ES2020新定义，任意精度表示整数，安全地存储和操作大整数，通过在整数末尾附加 n 或调用构造函数来创建的）
*/
const x = 2n ** 53n; //9007199254740992n
const y = x + 1n; //9007199254740993n
/*
    Symbol ：typeof instance === "symbol"（ES6新定义，符号类型是唯一的并且是不可修改的, 通过调用函数Symbol()创建实例）
    可以用来作为 Object 的 key 的值,用来创建匿名的对象属性且属性是不可枚举 
*/
Symbol("foo") !== Symbol("foo")
const foo = Symbol()
const bar = Symbol()
typeof foo === "symbol"
typeof bar === "symbol"
let obj = {}
obj[foo] = "foo"
obj[bar] = "bar"
JSON.stringify(obj) // {}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [ foo, bar ]
/*
    null：typeof instance === "object"（空引用）
  Object，使用 instanceof 检查:
    typeof instance === "object"



原始数据、基本类型
一种既非对象也无方法的数据，所有基本类型的值都是不可改变的，但可以被替换。

原始值
除 Object 以外的所有类型都是不可变的，即值本身无法被改变。（如，JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变）
*/
// 使用字符串方法不会改变一个字符串
var bar = "baz";
console.log(bar);               // baz
bar.toUpperCase();
console.log(bar);               // baz

// 使用数组方法可以改变一个数组
var foo = [];
console.log(foo);               // []
foo.push("plugh");
console.log(foo);               // ["plugh"]

// 赋值行为可以给基本类型一个新值，而不是改变它
bar = bar.toUpperCase();       // BAZ


/*
基本类型包装对象
除了 null 和 undefined之外，所有基本类型都有其对应的包装对象：
String 为字符串基本类型。
Number 为数值基本类型。
BigInt 为大整数基本类型。
Boolean 为布尔基本类型。
Symbol 为字面量基本类型。
*/
