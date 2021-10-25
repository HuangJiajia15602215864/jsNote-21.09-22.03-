/*
this:JavaScript的关键字之一,对象自动生成的一个内部对象，只能在对象内部使用。当前执行上下文（global、function 或 eval）的一个属性
this的指向完全取决于什么地方以什么方式调用， 只依赖于调⽤函数前的对象，而不是创建时。

全局上下文:指向全局对象;
函数上下文:取决于函数被调用的方式,如果没有指定则为全局对象
类上下文：在类的构造函数中，类中所有非静态的方法都会被添加到 this 的原型中，静态方法不是 this 的属性，它们只是类自身的属性。
派生类:不像基类的构造函数，派生类的构造函数没有初始的 this 绑定。在构造函数中调用 super() 会生成一个 this 绑定，相当于执行this = new Base()，其中Base为基类：
*/

// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true
a = 37;
console.log(window.a); // 37
this.b = "MDN";
console.log(window.b) // "MDN"
console.log(b) // "MDN"


// 对象可以作为 bind 或 apply 的第一个参数传递，并且该参数将绑定到该对象。
var obj = {
  a: 'Custom'
};
// 声明一个变量，并将该变量作为全局对象 window 的属性。
var a = 'Global';

function whatsThis() {
  return this.a; // this 的值取决于函数被调用的方式
}
whatsThis(); // 'Global' 因为在这个函数中 this 没有被设定，所以它默认为 全局/ window 对象
whatsThis.call(obj); // 'Custom' 因为函数中的 this 被设置为obj
whatsThis.apply(obj); // 'Custom' 因为函数中的 this 被设置为obj


class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto));
  }
  first() {}
  second() {}
  static third() {}
}
new Example(); // ['constructor', 'first', 'second']


/*
4种绑定的规则:默认绑定、隐性绑定、显性绑定、new 绑定
优先级：new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
*/
// 默认绑定:直接使用而不带任何修饰的函数调用,一般绑定到window上
function foo() {
  var a = 1;
  console.log(this.a); // 10
}
var a = 10;
foo(); // 此时this为全局对象

// 隐性绑定:执行时有上下文对象，this默认绑定为上下文对象
function foo() {
  console.log(this.a);
}
var obj = {
  a: 10,
  foo: foo // 上下文必须包含foo函数，需要给每个对象添加，因此有了显性绑定即强制性绑定this
}
obj.foo(); // 10，此时this为obj

/* 
显性绑定:call apply bind,改变函数的this指向，第一个参数都是 设置this对象

call:从第二个参数开始所有的参数都是 原函数的参数。
apply:只接受两个参数，且第二个参数必须是数组，这个数组代表原函数的参数列表。
bind:不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回。
*/
function foo(a, b) {
  console.log(a + b);
}
foo.call(null, '海洋', '饼干'); // 海洋饼干  这里this指向不重要就写null了
foo.apply(null, ['海洋', '饼干']); // 海洋饼干

function foo() {
  console.log(this.a);
}
var obj = {
  a: 10 //去掉里面的foo
}
foo.call(obj); // 10 call 是 foo 上的一个函数,在改变this指向的同时执行这个函数

function foo() {
  console.log(this.a);
}
var obj = {
  a: 10
};
foo = foo.bind(obj);
foo(); // 10

/*
new 绑定:
用new修饰的函数就是构造函数，准确来说是 函数的构造调用，调用后js执行了以下步骤：
  1、创建一个新对象。
  2、把这个新对象的__proto__属性指向 原函数的prototype属性。(即继承原函数的原型)
  3、将这个新对象绑定到 此函数的this上 。
  4、返回新对象，如果这个函数没有返回其他对象。
*/
function foo() {
  this.a = 10;
  console.log(this);
}
var obj = new foo(); // foo{ a : 10 }  创建的新对象的默认名为函数名，等价于 foo { a : 10 };  var obj = foo;
console.log(obj.a); // 10    new绑定


/*
各种情况下this的指向：
call、apply、bind；箭头函数；对象方法；原型链；getter 与 setter；构造函数；DOM事件;内联事件;类
*/

/*
call、apply：
在非严格模式下使用 call 和 apply 时，如果用作 this 的值不是对象，则会被尝试转换为对象。
null 和 undefined 被转换为全局对象。
原始值如 7 或 'foo' 会使用相应构造函数转换为对象。因此 7 会被转换为 new Number(7) 生成的对象，字符串 'foo' 会转换为 new String('foo') 生成的对象。

bind：创建一个与f具有相同函数体和作用域的函数，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。
*/
function f() {
  return this.a;
}

var g = f.bind({
  a: "azerty"
});
console.log(g()); // azerty

var h = g.bind({
  a: 'yoo'
}); // bind只生效一次！
console.log(h()); // azerty


/*
箭头函数:this与封闭词法环境的this保持一致,根据外部作用域来决定this，this绑定无法被修改
*/
function foo() {
  return () => {
    console.log(this.a);
  }
}
foo.a = 10;

var bar = foo(); // foo默认绑定
bar(); // undefined

var baz = foo.call(foo); // foo 显性绑定
baz(); // 10 

var obj = {
  a: 999
}
baz.call(obj); // 10 箭头函数this不可修改，这里我们使用上面的已经绑定了foo 的 baz


var obj = {
  bar: function () { // 匿名函数 A
    var x = (() => this); // 匿名函数 B，this被永久绑定到了它外层函数的this,即匿名函数 A的this
    return x;
  }
};
//将返回的函数的引用赋值给fn，this始终是最初设置的即obj
var fn = obj.bar();
// 直接调用fn而不设置this，通常(即不使用箭头函数的情况)默认为全局对象,若在严格模式则为undefined
console.log(fn() === obj); // true
// 但是注意，如果你只是引用obj的方法，而没有调用它
var fn2 = obj.bar;
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window); // true


/*
对象方法：this 被设置为调用该函数的对象
*/
var o = {
  prop: 37,
  f: function () {
    return this.prop;
  }
};
console.log(o.f()); // 37，this 将绑定到 o 对象

// this 的绑定只受最接近的成员引用的影响
function independent() {
  return this.prop;
}
o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // 42,this将指向o.b


/*
原型链:this 指向的是调用这个方法的对象
*/
var o = {
  f: function () {
    return this.a + this.b;
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;
console.log(p.f()); // 5,对象 p 没有属于它自己的 f 属性，它的 f 属性继承自它的原型,this 指向p。


/*
getter 与 setter 中:this 绑定到设置或获取属性的对象
*/
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  }
};

Object.defineProperty(o, 'sum', {
  get: sum,
  enumerable: true,
  configurable: true
});

console.log(o.average, o.sum); // 2, 6


/*
构造函数:this被绑定到正在构造的新对象
虽然构造函数返回的默认值是 this 所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回 this 对象）。
*/
function C() {
  this.a = 37; // 返回{a:37}
}
var o = new C();
console.log(o.a); // logs 37

function C2() {
  this.a = 37; // this绑定的默认对象被丢弃了
  return {
    a: 38
  }; // 返回{a:38}
}
o = new C2();
console.log(o.a); // logs 38


/*
DOM事件处理函数：this 指向触发事件的元素
*/
function bluify(e) {
  console.log(this === e.currentTarget); // 总是 true
  console.log(this === e.target); // 当 currentTarget 和 target 是同一个对象时为 true
  this.style.backgroundColor = '#A5D9F3';
}
// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');
// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false);
}


/*
内联事件处理函数:this指向监听器所在的DOM元素,但只有外层代码中的 this是这样的
*/
<
button onclick = "alert(this.tagName.toLowerCase());" > // button
  Show this <
  /button>

  <
  button onclick = "alert((function(){return this})());" > // global/window
  Show inner this <
  /button>


/*
类：this 值取决于它们如何被调用。可以改写类中的 this 值指向这个类实例。
*/
class Car {
  constructor() {
    // Bind sayBye but not sayHi to show the difference
    this.sayBye = this.sayBye.bind(this);
  }
  sayHi() {
    console.log(`Hello from ${this.name}`);
  }
  sayBye() {
    console.log(`Bye from ${this.name}`);
  }
  get name() {
    return 'Ferrari';
  }
}
class Bird {
  get name() {
    return 'Tweety';
  }
}

const car = new Car();
const bird = new Bird();
// 'this'的值取决于它们的调用者
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// 对于绑定方法，'this'不依赖于调用者
bird.sayBye = car.sayBye;
bird.sayBye(); // Bye from Ferrari