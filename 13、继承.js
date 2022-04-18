/*
继承
1、原型链继承：继承的对象函数并不是通过复制而来，而是通过原型链继承
2、构造函数继承
3、组合继承（原型链继承和构造函数继承）
4、原型式继承
5. 寄生式继承
6. 寄生组合式继承
*/

/*
1、原型链继承
问题：引用类型的属性被所有实例共享；在创建子类的实例时，不能向父类传参
*/
function Parent () {
  this.name = 'kevin';
}
Parent.prototype.getName = function () {
  console.log(this.name);
}
function Child () {}
Child.prototype = new Parent();

// 问题
function Parent () {
  this.names = ['kevin', 'daisy'];
}
function Child () {}
Child.prototype = new Parent();
var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy", "yayu"]


/*
使用类继承(使用语法糖)
*/
// 父类
class Person {
  constructor(first, last, age, gender, interests) {// constructor()定义了Person类的构造函数
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }
  greeting() {// 类方法，在构造函数后定义
    console.log(`Hi! I'm ${this.name.first}`);
  };
  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  };
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);// 实际上，类被转换成原型继承模型，class只是语法糖
han.greeting();// Hi! I'm Han

// 子类
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests); // 现在'this'是通过调用父构造函数来初始化的。
    this.subject = subject;
    this.grade = grade;
  }
}


/*
2、构造函数（经典继承）
优点：避免了引用类型的属性被所有实例共享；在创建子类的实例时，可以向父类传参（通过new-》call）
缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。
*/
function Parent (name) {
  this.name = name;
  this.names = ['kevin', 'daisy'];
}
function Child (name) {
  Parent.call(this,name);
}
var child1 = new Child('kevin');
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child('kevin');
console.log(child2.names); // ["kevin", "daisy"]


/*
3、组合继承
优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
缺点：调用两次父构造函数，导致Child.prototype 和 child1 都有一个属性为colors
*/
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);// 第一次调用
  this.age = age;
 
}
Child.prototype = new Parent();// 第二次调用
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');
child1.colors.push('black');
console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');
console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]


/*
4、原型式继承
ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
*/
function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}

var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly']
}
var person1 = createObj(person);
var person2 = createObj(person);
person1.name = 'person1';
console.log(person2.name); // kevin
person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]


/*
5. 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
*/
function createObj (o) {
  var clone = Object.create(o);
  clone.sayName = function () {
      console.log('hi');
  }
  return clone;
}


/*
6. 寄生组合式继承
*/
// 避免3、组合继承两次父构造函数
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}
var F = function () {};// 关键的三步
F.prototype = Parent.prototype;// 函数的原型指向父函数的原型
Child.prototype = new F();// 实例化函数

// 进一步封装
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
prototype(Child, Parent);// 当我们使用的时候：
