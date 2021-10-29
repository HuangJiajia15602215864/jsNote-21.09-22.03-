/*
Class:
类,ES6引入，是定义对象属性和方法的模板，是原型的语法糖。

*/

// 定义类
class Person {
  constructor (name) {
    this.name = name
  }
  talk () {
    console.log(`${this.name} says hello`)// this是调用的上下文
  }
}
// 底层仍是用prototype实现
function Person (name) {
  this.name = name
}
Person.prototype.talk = function () {
  console.log(`${this.name} says hello`)
}


/*
类的内部所有定义的方法，都是不可枚举的
*/
// class
Object.keys(Person.prototype); // []
Object.getOwnPropertyNames(Person.prototype); // ["constructor", "talk"]
// prototype
Object.keys(Person.prototype); // ['talk']
Object.getOwnPropertyNames(Person.prototype); // ["constructor", "talk"]


/*
静态方法
在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用
*/
// class
class Person {
  static sayHello() {
      return 'hello';
  }
}
Person.sayHello() // 'hello'
var kevin = new Person();
kevin.sayHello(); // TypeError: kevin.sayHello is not a function

// prototype
function Person() {}
Person.sayHello = function() {
    return 'hello';
};
Person.sayHello(); // 'hello'
var kevin = new Person();
kevin.sayHello(); // TypeError: kevin.sayHello is not a function


/*
静态属性
Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性
*/
// class
class Person {
  static name = 'kevin';
}

// prototype
function Person() {};
Person.name = 'kevin';


/*
new 调用
类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。
*/


/*
extend:
Class通过extends关键字实现继承,子类必须在constructor方法中调用super方法，否则新建实例时会报错。因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。
*/
// class
class Parent {
  constructor(name) {
      this.name = name;
  }
}
class Child extends Parent {
  constructor(name, age) {
      super(name); // 调用父类的 constructor(name)
      this.age = age;
  }
}
var child1 = new Child('kevin', '18');

// prototype 寄生组合式继承
function Parent (name) {
  this.name = name;
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
var child1 = new Child('kevin', '18');


/*
子类的 __proto__:在 ES6 中，父类的静态方法，可以被子类继承
（1）子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。
（2）子类 prototype 属性的 __proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性。
*/
class Parent {}
class Child extends Parent {}
console.log(Child.__proto__ === Parent); // true
console.log(Child.prototype.__proto__ === Parent.prototype); // true
