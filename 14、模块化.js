/*
模块化:根据功能、数据、业务将一个大程序拆分成互相依赖的小文件，再用简单的方式拼装起来。
AMD:异步模块定义规范,模块和模块的依赖可以被异步加载。推崇依赖前置,RequireJS 是 AMD 规范的实现。
CMD:推崇依赖就近，SeaJS 是 CMD 规范的实现。
CommonJS:服务器端模块规范,加载模块是同步的
*/
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
CommonJS:node服务器端的模块规范,主要为module.exports和require
*/
// config.js
var api = 'https://github.com/ronffy';
var config = {
  api: api,
};
module.exports = config;
// utils.js
var config = require('./config');
var utils = {
  request() {
    console.log(config.api);
  }
};
module.exports = utils;
// main.js
var utils = require('./utils');
utils.request(); // https://github.com/ronffy
console.log(global.api) // undefined,node 用global管理全局变量


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


/*
CommonJS与AMD:
共同点：
  都是运行时加载，换言之：都是在运行时确定模块之间的依赖关系。
不同点：
  CommonJS 是服务器端模块规范，AMD 是浏览器端模块规范。
  CommonJS 加载模块是同步的，即执行var a = require('./a.js');时，在 a.js 文件加载完成后，才执行后面的代码。AMD 加载模块是异步的，所有依赖加载完成后以回调函数的形式执行代码。
*/


/*
ES6 module:export和import，为浏览器和服务器提供通用的模块解决方案;
目前，无论是浏览器端还是node，都没有完全原生支持 ES6 module，如果使用 ES6 module ，可借助 babel 等编译器。
*/
// o.js
let num = 0;
function getNum() {
  return num;
}
function setNum(n) {
  num = n;
}
console.log('o init');
export {
  num,
  getNum,
  setNum,
}
// main.js
import { num, getNum, setNum } from './o.js';

console.log('o.num:', num);
setNum(1);

console.log('o.num:', num);
console.log('o.getNum:', getNum());
