/*
call、apply、bind都是为了改变某个函数运行时的上下文而存在的，也是为了改变函数体内部 this 的指向。其中call、apply为立即执行函数，bind为绑定函数，需要调用执行。
当一个 object 没有某个方法，但是其他对象有，我们可以借助call或apply用其它对象的方法来操作。
*/

/*
call:使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。(参数列表)
function.call(thisArg, arg1, arg2, ...) 非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象;严格模式下，this 的值将会是 undefined
*/
// 调用父构造函数实现继承
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
console.log(new Food('cheese', 5).name); // cheese

// 指定上下文的 'this'
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}
var obj = {
  animal: 'cats',
  sleepDuration: '12 and 16 hours'
};
greet.call(obj); // cats typically sleep between 12 and 16 hours  

// 验证是否是数组
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

// 类（伪）数组使用数组方法
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*")); // 转换为真正的数组


/*
apply:调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
func.apply(thisArg, [argsArray]) 非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象;严格模式下，this 的值将会是 undefined;第二个函数可为数组、arguments、类函数数组
*/
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// 解决push将数组作为单个元素添加；也解决concat会创建新数组
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]


/*
bind:创建一个新的函数，在 bind() 被调用时，第一个参数为新函数的this，而其余参数将作为新函数的参数。
function.bind(thisArg[, arg1[, arg2[, ...]]])  返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
*/

// 创建绑定函数
const module = {
  x: 42,
  getX: function () {
    return this.x;
  }
};
const unboundGetX = module.getX;
console.log(unboundGetX()); // undefined
const boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // 42

// 配合 setTimeout
// 在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或 global）对象。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}
LateBloomer.prototype.bloom = function () {
  window.setTimeout(this.declare.bind(this), 1000);
};
LateBloomer.prototype.declare = function () {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};
var flower = new LateBloomer();
flower.bloom(); // 一秒钟后, 调用 'declare' 方法

// 特殊的传参方式
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);

}
var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');

// 当做构造函数（绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数）
var value = 2;
var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';
var bindFoo = bar.bind(foo, 'daisy');
var obj = new bindFoo('18'); // 把bar当成构造器,this不再绑定foo，而是绑定在obj undefined daisy 18
console.log(obj.habit); // shopping
console.log(obj.friend); // kevin



/*
call、apply模拟实现步骤
1、将函数设为对象的属性
2、执行该函数
3、删除该函数
*/
Function.prototype.call2 = function (context) {
  var context = context || window; // this 参数可以传 null，当为 null 的时候，视为指向 window
  context.fn = this; // 将函数设为对象的属性

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) { // 从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')'); // 用 eval 方法拼成一个函数

  delete context.fn // 删除刚刚添加在对象上的
  return result; // 返回函数执行后的对象
}

// apply2的参数可以通过arr传递
Function.prototype.apply2 = function (context, arr) {
  var context = context || window; // this 参数可以传 null，当为 null 的时候，视为指向 window
  context.fn = this; // 将函数设为对象的属性

  var args = [];
  for (var i = 0, len = arr.length; i < len; i++) { // 从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里
    args.push('arr[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')'); // 用 eval 方法拼成一个函数

  delete context.fn // 删除刚刚添加在对象上的
  return result; // 返回函数执行后的对象
}


/*
bind模拟实现步骤
1、返回一个函数
2、可以传入参数
*/
Function.prototype.bind2 = function (context) {
  var self = this; // 待执行函数
  var args = Array.prototype.slice.call(arguments, 1); // 获取bind2函数从第二个参数到最后一个参数

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments); // 这个时候的arguments是指bind返回的函数传入的参数
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype;
  return fBound;
}


Function.prototype.bind = function(obj, arg) {
  var arg = Array.prototype.slice.call(arguments, 1);
  var context = this;
  return function (newArg) {
    arg = arg.concat(Array.prototype.slice.call(newArg));
    return context.apply(obj, arg);
  }
}