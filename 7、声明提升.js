/* 
函数和变量声明提升:将声明的代码移动到了顶部，函数优先变量提升（变量不会提升初始化）
详情:在⽣成执⾏上下⽂时，会有两个阶段。
一、创建编译的阶段（具体步骤是创建VO），JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，将整个函数存⼊内存中，变量只声明并且赋值为 undefined
二、代码执⾏阶段，可以直接提前使⽤。
*/
b() // call b
console.log(a) // undefined
var a = 'Hello world'

function b() {
  console.log('call b')
}

/*
执行 JS 代码的过程
  1、生成抽象语法树（AST），又分为了词法分析和语法分析两个阶段。
    词法分析：JS 会检测到当前作用域使用到的所有变量和函数声明，并将这些变量和函数声明添加到一个名为词法环境的内存空间当中。
    语法分析：又分为变量声明和函数声明
      变量声明：如 var a = 3，会为变量分配内存并初始化为 undefined，赋值语句在生成机器码阶段真正执行代码的时候才进行。
      函数声明：如 function sayHello() { console.log('Hello there!') }，会在内存里创建函数对象，并且直接初始化为该函数对象，因此函数可以提前调用。
      PS:函数声明的处理优先级要高于变量声明,意味着函数会“提升”到更靠前的位置
  2、生成字节码
  3、生成机器码：变量赋值
*/

// 函数会“提升”到更靠前的位置
console.log(foo) // function foo() {}
foo = 3
console.log(foo) // 3
function foo() {}

// 相当于下面的代码
var foo
foo = function() {}
console.log(foo) // function foo() {}
foo = 3
console.log(foo) // 3 覆盖了


/*
匿名函数声明：执行完赋值语句后，才成为一个可以执行的函数变量。
*/
sayHi() // Uncaught TypeError: sayHi is not a function
console.log(sayHi) // undefined  sayHi 声明发生变量提升，但赋值为 undefined
var sayHi = function() {// 执行赋值语言
    console.log('Hi there!')
}
sayHi() // Hi there!


/*
包括 var, let 和 const 在内的一切声明都会被“提升”，不同的是：
  var：在变量的定义被执行之前就初始化变量，并拥有一个默认的 undefined 值。
  let与const：形成暂时性死区，导致在变量的定义被执行之前都不会初始化变量，避免在声明语句之前的不正确调用。如果定义时没有给定值的话，let 声明的变量会赋值为 undefined，而 const 声明的变量会报错。

暂时性死区TDZ：
ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
*/
// test 变量就已经存在了，但是不可获取
test() // Uncaught ReferenceError: Cannot access 'test' before initialization
console.log(test) // Uncaught ReferenceError: Cannot access 'test' before initialization
const test = function() {
    console.log('test')
}
test() // test