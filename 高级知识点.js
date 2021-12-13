/*
undeclared 与 undefined 的区别:
undefined：声明了变量，但是没有赋值
undeclared：没有声明变量就直接使用
*/
var a; //undefined
b;    // b is not defined

/*
let & const与 var 的区别:
var：存在变量提升，可重复声明同一变量，声明的变量均可改
let：没有变量提升，不可重复声明同一变量，声明的变量均可改
const：没有变量提升，不可重复声明同一变量，声明的基本数据类型不可改，引用类型可改属性，不可只声明变量而不赋值

暂时性死区:
使用let/const声明的情况下，还未到声明时，提前使用变量
*/
var a = 100;
if(1){
    a = 10;
    let a = 1;// Error:Cannot access 'a' before initialization
}

/*
获取DOM元素的方法：
document.getElementById(id)
document.getElementsByTagName(tagName)
document.getElementsByClassName(class)
document.getElementsByName(name)：通过标签的属性name获取dom
document.querySelector(选择器)：可通过id、标签名、类名、属性等获取第一个元素（示例如下）
document.querySelectorAll(选择器)	：可通过id、标签名、类名、属性等获取所有元素（示例如下）
*/
// document.querySelector
document.querySelector("p"); // 获取文档中第一个 <p> 元素
document.querySelector(".example"); // 获取文档中 class="example" 的第一个元素
document.querySelector("p.example"); // 获取文档中 class="example" 的第一个 <p> 元素
document.querySelector("a[target]"); // 获取文档中有 "target" 属性的第一个 <a> 元素

/*
操作DOM元素的方法：
createElement：创建一个标签节点
createTextNode：创建一个文本节点
cloneNode(deep)：复制一个节点，连同属性与值都复制，deep为true时，连同后代节点一起复制，不传或者传false，则只复制当前节点
createDocumentFragment：创建一个文档碎片节点

appendChild：追加子元素
insertBefore:将元素插入前面
removeChild:删除子元素
replaceChild:替换子元素
getAttribute:获取节点的属性
createAttribute:创建属性
setAttribute:设置节点属性
romoveAttribute:删除节点属性
element.attributes将属性生成类数组对象
*/

/*
文档碎片:
一个容器，用于暂时存放创建的dom元素，使用document.createDocumentFragment()创建;
将需要添加的大量元素 先添加到文档碎片 中，再将文档碎片添加到需要插入的位置，大大减少dom操作，提高性能
*/
var oFragmeng = document.createDocumentFragment(); 
for(var i=0;i<10000;i++){ 
    var op = document.createElement("span"); 
    var oText = document.createTextNode(i); 
    op.appendChild(oText); 
    oFragmeng.appendChild(op);  //先附加在文档碎片中
} 
document.body.appendChild(oFragmeng); //最后一次性添加到document中


/*
let块级作用域
*/
for(var i = 0; i < 3; i++){
  setTimeout(function(){
      console.log(i);   // 3，3，3
  },0); 
};

for(let i = 0; i < 3; i++){
  setTimeout(function(){
      console.log(i);   // 0 1 2
  },0); 
};

for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(function () {
      console.log(i);// 0 1 2
    }, 0, i)
  })(i)
};




