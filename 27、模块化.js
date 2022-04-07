/*
 ES6 的模块化Module:import、export
*/
// file a.js
export function a() {}
export function b() {}
// file b.js
export default function () {}
import {
  a,
  b
} from './a.js'
import XXX from './b.js'


/*
CommonJs:Node 独有的规范
*/
// a.js
module.exports = { // module 是 Node 独有的⼀个变量,其中具有exports空对象
  a: 1
}
// or
exports.a = 1
// b.js
var module = require('./a.js')
module.a // -> log 1

/*
CommonJS 和 ES6 中的模块化的两者区别是：
 前者⽀持动态导⼊，也就是 require(${path}/xx.js) ，后者⽬前不⽀持;
 前者是同步导⼊，因为⽤于服务端，⽂件都在本地，同步导⼊即使卡住主线程影响也不⼤;⽽后者是异步导⼊，因为⽤于浏览器，需要下载⽂件，如果也采⽤同步导⼊会对渲染有很⼤影响;
 前者在导出时都是值拷⻉，就算导出的值变了，导⼊的值也不会改变，所以如果想更新值，必须重新导⼊⼀次;后者采⽤实时绑定的⽅式，导⼊导出的值都指向同⼀个内存地址，所以导⼊值会跟随导出值变化;
 前者可以对commonJS对重新赋值（改变指针指向），后者是read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向；
 后者会编译成 require/exports 来执⾏的
*/


/*
AMD:由 RequireJS 提出的
*/
define(['./a', './b'], function (a, b) {
  a.do()
  b.do()
})
define(function (require, exports, module) {
  var a = require('./a')
  a.doSomething()
  var b = require('./b')
  b.doSomething()
})