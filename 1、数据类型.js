/*
动态语言
JavaScript 是一种弱类型或者说动态语言,不用提前声明变量的类型，可以使用同一个变量保存不同类型的数据。


数据类型（7种原始类型+object）
  7 种原始类型，使用 typeof 运算符检查:
    Undefined：typeof instance === "undefined"（已声明没被赋值的变量）
    Boolean：typeof instance === "boolean"
    Number：typeof instance === "number"（双精度64位浮点型，包括NaN,要检查值是否大于或小于 +/-Infinity，你可以使用常量 Number.MAX_VALUE 和 Number.MIN_VALUE）
    String：typeof instance === "string
    BigInt：typeof instance === "bigint"（ES11新定义，任意精度表示整数，安全地存储和操作大整数，通过在整数末尾附加 n 或调用构造函数来创建的）
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
Object.getOwnPropertySymbols(obj) // [ Symbol(), Symbol() ]
Reflect.ownKeys(obj)// [Symbol(), Symbol() ]
/*
Symbol的应用场景:
1、使用Symbol来作为对象属性名（不会被枚举）
2、使用Symbol来替代常量 const one = Symbol()
3、使用Symbol定义类的私有属性，使属性无法在实例里获取到
*/
class Login {
  constructor(username, password) {
    const PASSWORD = Symbol()
    this.username = username
    this[PASSWORD] = password
  }
  checkPassword(pwd) { return this[PASSWORD] === pwd }
}
const login = new Login('123456', 'hahah')
console.log(login.PASSWORD) // 报错
console.log(login[PASSWORD]) // 报错






/*
    null：typeof instance === "object"（空引用）
*/

// 对于基本类型来说，如果使⽤字⾯量的⽅式，那么这个变量只是个字⾯量，只有在必要的时候才会转换为对应的类型
let a = 111 // 这只是字⾯量，不是 number 类型
a.toString() // 使⽤时候才会转换为对象类型

/*
  Object引用类型，包含对象、数组、函数，使用 instanceof 检查:
    typeof instance === "object"

基本数据类型：存在栈内存里，占据空间小、大小固定
引用数据类型：指针存栈内存，指向堆内存中一块地址，内容存在堆内存中，占据空间大、大小不固定

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
const s1 = 'Sunshine_Lin'
const index = s1.indexOf('_') // 基本类型是一种既非对象也无方法的数据，实际上内部是通过转换为引用类型实现
console.log(index) // 8

var temp = new String('Sunshine_Lin') // 创建String类型的一个实例
const index = temp.indexOf('_')// 在实例上调用指定的方法
temp = null // 销毁这个实例
console.log(index) // 8

