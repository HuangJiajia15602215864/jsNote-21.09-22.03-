/*
new：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。实例可访问构造函数和prototype 中的属性
new constructor[([arguments])](constructor:类或函数；arguments：被constructor调用的参数列表)
*/
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18'); // Otaku构造函数为new()的第一个参数
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
person.sayYourName(); // I am Kevin


/*
执行new实际上执行以下步骤：
1. 创建⼀个空对象
2. 将对象的原型设置为构造函数的 prototype 对象(链接到原型)
3. 绑定 this，执行构造函数的代码
4. 返回新对象
*/
function create() {
  let obj = new Object() // 创建⼀个空的对象
  let Con = [].shift.call(arguments) // 获得构造函数，其中arguments为创建对象时的传参（取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数）
  // let Con = Array.prototype.shift.call(arguments)
  obj.__proto__ = Con.prototype // 链接到原型
  let result = Con.apply(obj, arguments) // 绑定 this，执⾏构造函数
  return typeof result === 'object' ? result : obj // 确保 new 出来的是个对象
}


/*对于创建⼀个对象来说，更推荐使⽤字⾯量的⽅式创建对象。因为使⽤ new Object() 的⽅式创建对象需要通过作⽤域链⼀层层找到 Object*/
function Foo() {} // function 就是个语法糖,内部等同于 new Function()
let a = {
  b: 1
} // 这个字⾯量内部也是使⽤了 new Object()

/*
对于 new 来说，还需要注意下运算符优先级。
举例：new Foo() 的优先级⼤于 new Foo
*/
function Foo() {
  return this;
}
Foo.getName = function () {
  console.log('1');
};
Foo.prototype.getName = function () {
  console.log('2');
};
new Foo.getName(); // -> 1  new (Foo.getName());
new Foo().getName(); // -> 2  (new Foo()).getName();