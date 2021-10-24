/*
类型判断：typeof、instanceof、Object.prototype.toString、isArray
*/


/*
typeof操作符：返回一个字符串，表示操作数的类型
typeof operand
缺点：Object下细分的类型如 Array、Function、Date、RegExp、Error ，如果用 typeof 去检测均返回object；null检测也返回object
*/
// 数值
typeof 37 === 'number';
typeof (42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值
typeof 42n === 'bigint';

// 字符串
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof (typeof 1) === 'string'; // typeof 总是返回一个字符串
typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全

// 布尔值
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';

// 对象
typeof {
  a: 1
} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
typeof /regex/ === 'object';
typeof null === 'object';
// 原因：在 JS 的最初版本中，使⽤的是 32 位系统，为了性能考虑使⽤低位存储了变量的类型信息， 000 开头代表是对象，然⽽ null 表示为全零，所以将它错误的判断为 object 。
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';

// 函数
typeof
function () {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function';



/*
instanceof关键字:检测构造函数（类）的 prototype 属性是否出现在某个实例对象的原型链上
object instanceof constructor
*/

function Car(make) {
  this.make = make;
}
const auto = new Car('Honda');

console.log(auto instanceof Car); // true，因为Object.getPrototypeOf(auto) === Car.prototype
console.log(auto instanceof Object); // true，因为Object.prototype.isPrototypeOf(auto) 返回 true

// 实现instanceof
function instanceof(left, right) {
  let prototype = right.prototype  // 获得类型的原型
  left = left.__proto__// 获得对象的原型
  while (true) {// 判断对象的类型是否等于类型的原型
    if (left === null)
      return false
    if (prototype === left)
      return true
    left = left.__proto__// 一直顺着原型链追溯原型
  }
}


/*
Object.prototype.toString():检测对象类型
toString():返回一个表示该对象的字符串。
toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。
obj.toString()
*/
var o = new Object();
o.toString(); // returns [object Object]


var toString = Object.prototype.toString;
toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]