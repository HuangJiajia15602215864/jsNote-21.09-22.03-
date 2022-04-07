/*
箭头函数：
ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。
1、箭头函数没有自己的this
   在自己作用域的上一层继承this，即上下文的this，this的指向在它在定义时已经确定了，之后不会改变。
2、call()、apply()、bind()等方法不能改变箭头函数中this的指向
3、箭头函数不能作为构造函数使用
4、箭头函数没有自己的arguments
   在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。
5、箭头函数没有prototype
6、箭头函数不能用作Generator函数，不能使用yeild关键字
*/
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};

obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'（定义对象的大括号{}是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。this永远指向它定义时所处的全局执行环境中的this）
new obj.a()  // undefined
new obj.b()  // Uncaught TypeError: obj.b is not a constructor


var id = 'Global';
let fun1 = () => {
    console.log(this.id)
};
fun1();                     // 'Global'
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
