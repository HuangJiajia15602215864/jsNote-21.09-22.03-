/*
模块化:根据功能、数据、业务将一个大程序拆分成互相依赖的小文件，一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数。
*/

/*
CommonJS:
Node.js服务端的模块规范，同步加载模块(在服务端，模块文件都存在本地磁盘，读取非常快);
环境变量：module、exports、require、global（全局变量）
加载：require
输出：module.exports(module的属性)

ES6 Module：
服务端和浏览器通用;目前，无论是浏览器端还是node，都没有完全原生支持 ES6 module，如果使用 ES6 module ，可借助 babel 等编译器。
输入：import
输出：export

CommonJS与AMD:
共同点：
  都是运行时加载，换言之：都是在运行时确定模块之间的依赖关系。

CommonJS与ES6 Module：
不同点：
  CommonJS 模块输出的是一个值的拷贝（模块内部的变化就影响不到这个值），ES6 模块输出的是值的引用（只读引用原始值变了，import加载的值也会跟着变）。
  CommonJS是同步导⼊，因为⽤于服务端，⽂件都在本地，同步导⼊即使卡住主线程影响也不⼤;ES6 模块是异步导⼊，因为⽤于浏览器，需要下载⽂件，如果也采⽤同步导⼊会对渲染有很⼤影响;
  CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
  ES6 模块会编译成 require/exports 来执⾏的

运行时加载：CommonJS 模块就是对象；在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法
编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。在import时可以指定加载某个输出值，而不是加载整个模块
*/
var basicNum = 0;
function add(a, b) {
  return a + b;
}
module.exports = {
  add: add,
  basicNum: basicNum
}

var math = require('./math');// 导入是一个变量
math.add(2, 5);



var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };

import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}


export default { basicNum, add };// export default命令，为模块指定默认输出

import math from './math';
function test(ele) {
    ele.textContent = math.add(99 + math.basicNum);
}



/*
AMD和require.js:
依赖前置、提前执行；在声明依赖的模块时会在第一之间加载并执行模块内的代码
浏览器端的模块规范，异步加载，所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
定义模块：define
加载：require
指定引用路径：require.config()
*/
define(function () {
  var basicNum = 0;
  var add = function (x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum
  };
});

require(['jquery', 'math'], function ($, math) {
  var sum = math.add(10, 20);
  $("#sum").html(sum);
});


/*
CMD和sea.js：
依赖就近、延迟执行
定义模块：define
加载：seajs.use
*/
define(function(require, exports, module) {
  var $ = require('jquery.js');
  var add = function(a,b){
      return a+b;
  }
  exports.add = add;
});

seajs.use(['math.js'], function(math){
  var sum = math.add(1+2);
});



// AMD依赖必须一开始就写好
define(['./utils'], function (utils) {
  utils.request();
});

// CMD 依赖可以就近书写
define(function (require) {
  var utils = require('./utils');
  utils.request();
});



/*
module.exports和exports:
CommonJS 规范仅定义了exports，但exports存在一些问题，所以module.exports被创造了出来，它被称为 CommonJS2 。
每一个文件都是一个模块，每个模块都有一个module对象，这个module对象的exports属性用来导出接口，外部模块导入当前模块时，使用的也是module对象，这些都是 node 基于 CommonJS2 规范做的处理。
*/
// 模块初始化时，exports和module.exports指向同一块内存，exports被重新赋值后，就切断了跟原内存地址的关系。
var module = {
  exports: {}
}
var exports = module.exports;
console.log(module.exports === exports); // true

var s = 'i am ronffy'
exports = s; // module.exports 不受影响
console.log(module.exports === exports); // false



