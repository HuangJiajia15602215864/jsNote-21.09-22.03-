/*
字符串转换:
显式：String()
alert()


数字型转换:
显式：Number()、parseInt 、parseFloat 
自动：算术函数和表达式
parseInt 和 parseFloat 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 NaN
*/
alert(Number("   123   ")); // 123
alert(Number("-123")) // -123
alert(Number("1.2")) // 1.2
alert(Number("000123")) // 123
alert(Number("123 123")) // NaN
alert(Number("123z") );      // NaN（从字符串“读取”数字，读到 "z" 时出现错误）
alert(Number("0x11")) // 17
alert(Number(true));        // 1
alert(Number(false));       // 0
alert(Number(undefined));       // NaN
alert(Number(null));       // 0

alert(parseInt("3 abc")) // 3
alert(parseInt("-12.34")) // -12
alert(parseInt("0xFF")) // 255
alert(parseFloat(".1")) // 0.1
alert(parseInt("0.1")) // 0


/*
布尔型转换
显式：Boolean()
直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false;其他值变成 true。
*/
alert( Boolean(0) ); // false
alert( Boolean("0") ); // true
alert( Boolean("") ); // false
alert( Boolean(" ") ); // 空白，也是 true（任何非空字符串都是 true）


/*
其他转换：
原始值转对象:调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象。
对象转布尔值：所有对象(包括数组、函数、包装对象)都转换为 true
对象转字符串:通过调用待转换对象的toString（优先）或valueOf（没有toString方法的情况下）来完成。
对象转数字：通过调用待转换对象的valueOf（优先）或toString（没有valueOf方法的情况下）来完成，接着调用 ToNumber。
*/
var b = new Number(1);
console.log(typeof b); // object
console.log(Boolean(new Boolean(false))) // true
console.log(Number([1, 2, 3])) // NaN
console.log(Number(new Date(2010, 0, 1))) // 1262275200000

let a = {// 可以重写valueOf、toString和 Symbol.toPrimitive ，其中Symbol.toPrimitive在转基本类型时调⽤优先级最⾼。
  valueOf() {
  return 0;
  },
  toString() {
  return '1';
  },
  [Symbol.toPrimitive]() {
  return 2;
  }
 }
 console.log(1 + a) // => 3
 console.log('1' + a) // => '12

/*
相等（==）:强制类型转换并且比较不同类型的操作数

如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回true。
如果一个操作数是null，另一个操作数是undefined，则返回true。
如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
  当数字与字符串进行比较时，会尝试将字符串转换为数字值。
  如果操作数之一是Boolean，则将布尔操作数转换为1或0。
  如果操作数之一是对象，另一个是数字或字符串，会尝试使用对象的valueOf()和toString()方法(即toPrimitive)将对象转换为原始值。
*/
0 == null;            // false
0 == undefined;       // false
null == undefined;    // true

[] == ![] 
// 1、右边因为有！，为布尔值false，则将布尔操作数转换为0
// 2、左边为对象，ToPrimitive([]) = 0


/*
一元操作符 +:调用 ToNumber 处理该值
如果 obj 为基本类型，直接返回
否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
否则，调用 toString 方法，如果返回一个原始值，则JavaScript 将其返回。
否则，JavaScript 抛出一个类型错误异常。
*/
console.log(+[]); // valueOf([])=>toString('')=>ToNumber(0)
console.log(+['1']); // 1
console.log(+['1', '2', '3']); // NaN
console.log(+{}); // NaN


/*
四则运算符:
只有当加法运算时，其中⼀⽅是字符串类型，就会把另⼀个也转为字符串类型。其他运算只
要其中⼀⽅是数字，那么另⼀⽅就转为数字。并且加法运算会触发三种类型转换：将值转换
为原始值，转换为数字，转换为字符串。
*/


/*
隐式转换规则:
1、转成string类型： +（字符串连接符）
2、转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
3、转成boolean类型：!（逻辑非运算符)
*/
undefined >= undefined // false  （转换为NaN >= NaN，NaN 不等于 NaN，也不大于，所以是false）
null >= null // true （转换成0 >= 0，0 等于 0，所以是true）
[] == ![] // true 
/*
1、! 优先级高于 ==，[]不是假值，所以先转换成 [] == false
2、右边为布尔值，false先转数字0，所以可转换为[] == 0
3、左边为对象，[]调用toString转为 ''，转换为'' == 0
4、左边为字符串，''转换为0，最终为 0 == 0）
*/

https://github.com/mqyqingfeng/Blog/issues/159
https://github.com/mqyqingfeng/Blog/issues/164
