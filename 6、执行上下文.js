/*
执⾏上下⽂:(作用域)
  全局执⾏上下⽂
  函数执⾏上下⽂
  eval 执⾏上下⽂
执⾏上下⽂中有三个重要的属性:
  变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下⽂中访问
  作⽤域链
  this
作⽤域链:
包含⾃身变量对象和上级变量对象的列表，通过 [[Scope]]属性查找上级变量
*/


/*
let/const变量声明及作用域
如果在代码块 {...} 内声明了一个变量，那么这个变量只在该代码块内可见；在同一个代码块内不能重复声明，否则会报错
*/
{
  let message = "Hello"; // 只在此代码块内可见
  alert(message); // Hello
}
alert(message); // Error: message is not defined

let message = "Hello";
alert(message);// Hello
let message = "Goodbye"; // Error: variable already declared


/* 
函数和变量声明提升:将声明的代码移动到了顶部，函数优先变量提升（变量不会提升初始化）
详情:在⽣成执⾏上下⽂时，会有两个阶段。
一、创建编译的阶段（具体步骤是创建VO），JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，将整个函数存⼊内存中，变量只声明并且赋值为 undefined
二、代码执⾏阶段，可以直接提前使⽤。
let 不能在声明前使⽤，但是这并不是常说的 let 不会提升， let 提升了声明但没有赋值，因为临时死区导致了并不能在声明前使⽤。
*/
b() // call b
console.log(a) // undefined
var a = 'Hello world'

function b() {
  console.log('call b')
}


/*
作用域:程序源代码中定义变量的区域,规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
静态作用域与动态作用域区分:函数作用域在函数定义还是函数调用时决定。其中JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
词法作用域：函数的作用域基于函数创建的位置。JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。
*/
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();// 1,因为JavaScript采用静态作用域

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();// local scope

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();// local scope


