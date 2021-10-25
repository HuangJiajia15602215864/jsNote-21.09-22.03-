/*
let、const：
    声明一个作用域被限制在快级中的变量、语句或表达式
    不能重复声明已存在的变量
    有暂时死区，声明提升但初始化没有提升，不能使用
var：
    声明的变量只能是全局或者函数块
    声明和初始化提升
*/


var liList = document.querySelectorAll('li') // 共5个li
for( var i=0; i<liList.length; i++){
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
