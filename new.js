/*
执行new实际上执行以下步骤：
1. 新⽣成了⼀个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象
*/
function create() {
 let obj = new Object() // 创建⼀个空的对象
 let Con = [].shift.call(arguments) // 获得构造函数，其中arguments为创建对象时的传参
 obj.__proto__ = Con.prototype // 链接到原型
 let result = Con.apply(obj, arguments) // 绑定 this，执⾏构造函数
 return typeof result === 'object' ? result : obj // 确保 new 出来的是个对象
}


/*对于创建⼀个对象来说，更推荐使⽤字⾯量的⽅式创建对象。因为使⽤ new Object() 的⽅式创建对象需要通过作⽤域链⼀层层找到 Object*/
function Foo() {} // function 就是个语法糖,内部等同于 new Function()
let a = { b: 1 }// 这个字⾯量内部也是使⽤了 new Object()

/*
对于 new 来说，还需要注意下运算符优先级。
举例：new Foo() 的优先级⼤于 new Foo
*/
function Foo() {
  return this; }
 Foo.getName = function () {
  console.log('1');
 };
 Foo.prototype.getName = function () {
  console.log('2');
 };
 new Foo.getName(); // -> 1  new (Foo.getName());
 new Foo().getName(); // -> 2  (new Foo()).getName();
