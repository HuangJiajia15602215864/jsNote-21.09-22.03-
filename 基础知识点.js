/*
最大安全数字与最小安全数字
*/
console.log(Number.MAX_SAFE_INTEGER)// 9007199254740991
console.log(Number.MIN_SAFE_INTEGER)// -9007199254740991

/*
valueOf与 toString
1、valueOf偏向于运算，除了Date返回数值，其他都返回本身；toString偏向于显示，返回字符串
2、对象转换时，优先调用toString
3、强转字符串优先调用toString，强转数字优先调用valueOf
4、正常情况下，优先调用toString
5、运算操作符情况下优先调用valueOf
*/

/*
匿名函数：就是没有函数名的函数
*/
(function(x, y){
  alert(x + y);  
})(2, 3);

/*
事件流模型:
事件冒泡：由最具体的元素接收，并往上传播
事件捕获：由最不具体的元素接收，并往下传播
DOM事件流：事件捕获 -> 目标阶段 -> 事件冒泡
*/
function stopBubble(e) {// 阻止事件冒泡
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    window.event.cancelBubble = true;
  }
}
function stopDefault(e) {// 阻止事件默认行为
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
}

/*
DOM文档加载的步骤为：
1、解析HTML结构。
2、加载外部脚本和样式表文件。(.js、.css)
3、解析并执行脚本代码。
4、DOM树构建完成。// DOMContentLoaded触发、$(document).ready触发
5、加载图片等外部文件。
6、页面加载完毕。// load触发
*/

/*
Math的常用方法:
Math.max(...arr)取arr中的最大值
Math.min(...arr)取arr中的最小值
Math.ceil(小数)小数向上取整
Math.floor(小数)小数向下取整
Math.round(小数)小数四舍五入
Math.sqrt(num)对num进行开方
Math.pow(num, m)对num取m次幂
Math.random() * num 取0-num的随机数
*/

/*
数组的常用方法:(✅:影响原数组)
push 在数组后添加元素，返回数组长度 ✅
pop 删除数组最后一项，返回被删除项✅
shift 删除数组第一项，并返回被删除项✅
unshift 数组开头添加元素，返回新数组长度✅
reserve 反转一个数组，返回修改后的数组✅
sort 排序一个数组，返回修改后的数组✅
splice 截取数组，返回被截取的区间✅
join 将一个数组所有元素连接成字符串并返回这个字符串❌
concat arr1.concat(arr2, arr3)  连接数组❌
map 操作数组每一项并返回一个新数组❌
forEach 遍历数组，没有返回值❌
filter 对数组所有项进行判断，返回符合规则的新数组❌
every 数组每一项都符合规则才返回true❌
some 数组有符合规则的一项就返回true❌
reduce 接收上一个return和数组的下一项❌
flat 数组扁平化❌
slice 截取数组，返回被截取的区间❌
*/

/*
BOM:
window.history:操纵浏览器的记录(如history.back()、history.go(-1))
window.innerHeight：获取浏览器窗口的高度
window.innerWidth：获取浏览器窗口的宽度
window.location：操作刷新按钮和地址栏

BOM 和 DOM 的关系:
BOM:浏览器对象模型，主要处理浏览器窗口和框架;
DOM:文档对象模型，是 HTML 和XML 的应用程序接口（API），遵循W3C 的标准，所有浏览器公共遵守的标准。
JS是通过访问BOM对象来访问、控制、修改客户端(浏览器)，由于BOM的window包含了document，window对象的属性和方法是直接可以使用而且被感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM的根节点。
可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。
*/

/*
use strict:
Es5中引入,目的是强制执行严格模式下的代码。 在严格模式下，不能在不声明变量的情况下使用变量。 
*/
