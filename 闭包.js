/*
闭包：一个函数和对其周围状态(词法环境）的引用捆绑在一起;
可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

缺点：闭包在处理速度和内存消耗方面对脚本性能具有负面影响。
*/


/*
词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。嵌套函数可访问声明于它们外部作用域的变量。
*/
function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      alert(name); // 使用了父函数中声明的变量  "Mozilla"
  }
  displayName();
}
init();


/*
JavaScript中的函数会形成了闭包。 
闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量
*/
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
      alert(name);
  }
  return displayName;
}
var myFunc = makeFunc();//myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用。displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。
myFunc();


function makeAdder(x) {// 函数工厂 — 创建了将指定的值和它的参数相加求和的函数
  return function(y) {
    return x + y;
  };
}
var add5 = makeAdder(5);// add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。
var add10 = makeAdder(10);
console.log(add5(2));  // 7
console.log(add10(2)); // 12




