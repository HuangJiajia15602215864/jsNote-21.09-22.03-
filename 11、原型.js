/* 
https://juejin.cn/post/7007416743215759373 （浅显易懂）

JavaScript常被描述为一种基于原型的语言————每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，一层一层、以此类推。这种关系常被称为原型链
原型：对象的模板，对象可以继承原型上的属性和方法
原型链：一个对象的原型对象也可能拥有原型，一层一层、以此类推

在传统的OOP中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。
在JavaScript中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（__proto__属性，从构造函数的prototype属性派生），之后通过上溯原型链，在构造器中找到这些属性和方法。


每个函数都有 prototype 属性，该属性指向原型。prototype是一个给其它对象提供共享属性的对象。
每个对象都有 __proto__ 属性，在new时被产生，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]] ，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使⽤_proto_ 来访问。
对象可以通过 __proto__ 来寻找不属于该对象的属性， __proto__ 将对象连接起来组成了原型链
构造函数的prototype和其实例的__proto__是指向同一个地方的，这个地方就叫做原型对象  Person.prototype === person1.__proto__
*/

function Person(first, last, age, gender, interests) {};
var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
person1.valueOf()
/* 发生如下过程
1、浏览器首先检查，person1 对象是否具有可用的 valueOf() 方法。
2、如果没有，则浏览器检查 person1 对象的原型对象（即 Person构造函数的prototype属性所指向的对象）是否具有可用的 valueof() 方法。
3、如果也没有，则浏览器检查 Person() 构造函数的prototype属性所指向的对象的原型对象（即 Object构造函数的prototype属性所指向的对象）是否具有可用的 valueOf() 方法。这里有这个方法，于是该方法被调用。
 */

//可用Object.create() 方法创建新的对象实例
var person2 = Object.create(person1);// create() 实际做的是从指定原型对象创建一个新的对象。这里以 person1 为原型对象创建了 person2 对象
console.log(person2.__proto__) // person1


/*
constructor 属性
每个实例对象都从原型中继承了一个constructor属性，该属性指向了用于构造此实例对象的构造函数。
*/
console.log(person1.constructor)//Person()
console.log(person2.constructor)//Person()


/*
总结
Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
函数的 prototype 是一个对象，也就是原型
对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链


*/
