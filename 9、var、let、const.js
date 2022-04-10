/*
let、const：
    声明一个作用域被限制在块级中的变量、语句或表达式
    不能重复声明已存在的变量
    有暂时死区，声明提升但初始化没有提升，不能使用
    const声明变量必须设置初始值，不可更改（不允许改变指针的指向，相当于基本类型的值不可改，引用类型在堆中的变量可改）
var：
    声明的变量只能是全局或者函数块
    可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。
    声明和初始化提升
*/


var liList = document.querySelectorAll('li') // 共5个li
for( var i=0; i<liList.length; i++){// i被提升为全局变量
  liList[i].onclick = function(){
    console.log(i)// 5,5,5,5,5,
  }
}

var liList = document.querySelectorAll('li') // 共5个li
for( let i=0; i<liList.length; i++){// 圆括号之间，有一个隐藏的作用域，在每次执行循环体之前，JS 引擎会把 i 在循环体的上下文中重新声明及初始化一次。
  let i = 隐藏作用域中的i // 可理解为内部执行重新声明及初始化
  liList[i].onclick = function(){
    console.log(i)//  0、1、2、3、4
  }
}
