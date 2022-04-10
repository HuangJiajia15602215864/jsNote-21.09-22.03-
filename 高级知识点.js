/*
undeclared 与 undefined 的区别:
undefined：声明了变量，但是没有赋值
undeclared：没有声明变量就直接使用
*/
var a; //undefined
b; // b is not defined


/*
获取DOM元素的方法：
document.getElementById(id)
document.getElementsByTagName(tagName)
document.getElementsByClassName(class)
document.getElementsByName(name)：通过标签的属性name获取dom
document.querySelector(选择器)：可通过id、标签名、类名、属性等获取第一个元素（示例如下）
document.querySelectorAll(选择器)	：可通过id、标签名、类名、属性等获取所有元素（示例如下）
*/
// document.querySelector
document.querySelector("p"); // 获取文档中第一个 <p> 元素
document.querySelector(".example"); // 获取文档中 class="example" 的第一个元素
document.querySelector("p.example"); // 获取文档中 class="example" 的第一个 <p> 元素
document.querySelector("a[target]"); // 获取文档中有 "target" 属性的第一个 <a> 元素

/*
操作DOM元素的方法：
createElement：创建一个标签节点
createTextNode：创建一个文本节点
cloneNode(deep)：复制一个节点，连同属性与值都复制，deep为true时，连同后代节点一起复制，不传或者传false，则只复制当前节点
createDocumentFragment：创建一个文档碎片节点

appendChild：追加子元素
insertBefore:将元素插入前面
removeChild:删除子元素
replaceChild:替换子元素
getAttribute:获取节点的属性
createAttribute:创建属性
setAttribute:设置节点属性
romoveAttribute:删除节点属性
element.attributes将属性生成类数组对象
*/

/*
文档碎片:
一个容器，用于暂时存放创建的dom元素，使用document.createDocumentFragment()创建;
将需要添加的大量元素 先添加到文档碎片 中，再将文档碎片添加到需要插入的位置，大大减少dom操作，提高性能
*/
var oFragmeng = document.createDocumentFragment();
for (var i = 0; i < 10000; i++) {
  var op = document.createElement("span");
  var oText = document.createTextNode(i);
  op.appendChild(oText);
  oFragmeng.appendChild(op); //先附加在文档碎片中
}
document.body.appendChild(oFragmeng); //最后一次性添加到document中


/*
高阶函数:
可以接收另一个函数作为参数的函数，像数组的map、reduce、filter这些都是高阶函数
*/
function add(x, y, f) {
  return f(x) + f(y);
}
add(-5, 6, Math.abs); // 11


/*
函数柯里化：
把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

好处：
1、参数复用
2、延迟执行
*/
function add(x, y) { // 普通函数
  return x + y
}

function curryingAdd(x) { // Currying
  return function (y) {
    return x + y
  }
}
add(1, 2) // 3
curryingAdd(1)(2) // 3

// 1、参数复用 (正常正则验证字符串 reg.test(txt))
function check(reg, txt) { // 普通函数
  return reg.test(txt)
}
check(/\d+/g, 'test') //false
check(/[a-z]+/g, 'test') //true

function curryingCheck(reg) { // Currying
  return function (txt) {
    return reg.test(txt)
  }
}
var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)
hasNumber('test1') // true
hasNumber('testtest') // false
hasLetter('21212') // false

// 2、延迟执行(Function.prototype.bind就是科里化的实现例子)
function sayKey(key) {
  console.log(this[key])
}
const person = {
  name: 'Sunshine_Lin',
  age: 23
}
sayKey.call(person, 'name') // 立即输出 Sunshine_Lin
sayKey.call(person, 'age') // 立即输出 23

// bind是科里化
const say = sayKey.bind(person) // 不执行
// 想执行再执行
say('name') // Sunshine_Lin
say('age') // 23


/*
鼠标事件有哪些:
click:单机鼠标左键触发，右键无效，当用户焦点在按钮并按下Enter，也会触发
dbclick:双击鼠标左键触发，右键无效
mousedown:单机鼠标任意一个按键都触发
mouseup:松开任意鼠标按键时触发

mouseout:鼠标指针位于某个元素上且将要移出元素边界时触发
mouseover:鼠标指针移出某个元素到另一个元素上时触发
mousemove:鼠标在某个元素上时持续发生
mouseenter:鼠标进入某个元素边界时触发
mouseleave:鼠标离开某个元素边界时触发
*/


/*
键盘事件有哪些：
onkeydown	某个键盘按键被按下时触发
onkeyup	某个键盘按键被松开时触发
onkeypress	某个按键被按下时触发，不监听功能键，如ctrl，shift
*/


/*
鼠标事件的各个坐标:
offsetX：以当前的目标元素左上角为原点，定位x轴坐标
offsetY：以当前的目标元素左上角为原点，定位y轴坐标

clientX：以浏览器可视窗口左上角为原点，定位x轴坐标
clientY：以浏览器可视窗口左上角为原点，定位y轴坐标

pageX：以doument对象左上角为原点，定位x轴坐标除IE外
pageY：以doument对象左上角为原点，定位y轴坐标除IE外

screenX：以计算机屏幕左上顶角为原点，定位x轴坐标(多屏幕会影响)
screenY：以计算机屏幕左上顶角为原点，定位y轴坐标

layerX：最近的绝对定位的父元素（如果没有，则为 document 对象）左上顶角为元素，定位 x 轴坐标
layerY：最近的绝对定位的父元素（如果没有，则为 document 对象）左上顶角为元素，定位 y 轴坐标
*/


/*
元素视图的各个尺寸:
offsetLeft：获取当前元素到定位父节点的left方向的距离
offsetTop：获取当前元素到定位父节点的top方向的距离
offsetWidth：获取当前元素 width + 左右padding + 左右border-width
offsetHeight：获取当前元素 height + 上下padding + 上下border-width

clientWidth：获取当前元素 width + 左右padding
clientHeight：获取当前元素 height + 上下padding
scrollWidth：当前元素内容真实的宽度，内容不超出盒子宽度时为盒子的clientWidth
scrollHeight：当前元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight

Window视图的各个尺寸：
innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏）
innerHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏）

Document文档视图的各个尺寸：
document.documentElement.clientWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
document.documentElement.clientHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条）

document.documentElement.offsetHeight 获取整个文档的高度（包含body的margin）
document.body.offsetHeight 获取整个文档的高度（不包含body的margin）

document.documentElement.scrollTop 返回文档的滚动top方向的距离（当窗口发生滚动时值改变）
document.documentElement.scrollLeft 返回文档的滚动left方向的距离（当窗口发生滚动时值改变）
*/


/*
getBoundingClientRect
返回元素的大小及其相对于视口的位置。返回的是一个对象，对象里有这8个属性：left，right，top，bottom，width，height，x，y
（left、x：元素左边距离左边视口的距离；top、y：元素上方距离上方视口的距离；right：元素右边距离左边视口的距离；bottom：元素下方距离上方视口的距离）
应用场景：判断元素是否在可视区域
缺点：引起重绘回流
*/
function checkInView(dom) {
  const {
    top,
    left,
    bottom,
    right
  } = dom.getBoundingClientRect()
  console.log(top, left, bottom, right)
  console.log(window.innerHeight, window.innerWidth)
  return top >= 0 &&
    left >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
}


/*
requestAnimationFrame:
背景：传统的 javascript 动画是通过定时器 setTimeout 或者 setInterval 实现的。但动画的循时间环间隔不好确定，设置长了动画显得不够平滑流畅，设置短了浏览器的重绘频率会达到瓶颈，推荐的最佳循环间隔是17ms；定时器第二个时间参数只是指定了多久后将动画任务添加到浏览器的UI线程队列中，如果UI线程处于忙碌状态，那么动画不会立刻执行。

requestAnimationFrame优点：
1、会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
2、在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流，这当然就意味着更少的 CPU、GPU 和内存使用量
3、由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了 CPU 开销

应用场景：
1、动画
2、大数据渲染：利用requestAnimationFrame 进行分步渲染，确定最好的时间间隔，使得页面加载过程中很流畅
*/
var deg = 0;
var id;
var div = document.getElementById("div");
div.addEventListener('click', function () {
  var self = this;
  requestAnimationFrame(function change() {
    self.style.transform = 'rotate(' + (deg++) + 'deg)';
    id = requestAnimationFrame(change);
  });
});
document.getElementById('stop').onclick = function () {
  cancelAnimationFrame(id);
};

var total = 100000;
var size = 100;
var count = total / size;
var done = 0;
var ul = document.getElementById('list');
function addItems() {
    var li = null;
    var fg = document.createDocumentFragment();
    for (var i = 0; i < size; i++) {
        li = document.createElement('li');
        li.innerText = 'item ' + (done * size + i);
        fg.appendChild(li);
    }
    ul.appendChild(fg);
    done++;
    if (done < count) {
        requestAnimationFrame(addItems);
    }
};
requestAnimationFrame(addItems);


/*
浏览器渲染过程：
1、生成DOM——浏览器向服务器请求到了 HTML 文档后便开始解析，产物是 DOM（文档对象模型），到这里 HTML 文档就被加载和解析完成了。
2、生成CSSOM——如果有 CSS 的会根据 CSS 生成 CSSOM（CSS 对象模型），、
3、生成渲染树——然后再由 DOM 和 CSSOM 合并产生渲染树。
4、浏览器布局——有了渲染树，知道了所有节点的样式，下面便根据这些节点以及样式计算它们在浏览器中确切的大小和位置，这就是布局阶段。
5、浏览器绘制——把节点绘制到浏览器上。

DOMContentLoaded:
初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
当 HTML 文档被解析时如果遇见（同步）脚本，则停止解析，先去加载脚本，然后执行，执行结束后继续解析 HTML 文档。

异步脚本：
作用：同步脚本会阻塞文档的解析，可以使用异步脚本。HTML5 中定义了两个定义异步脚本的方法：defer 和 async。

defer：
在后台加载脚本，文档解析过程不中断，而等文档解析结束之后，defer 脚本执行。另外，defer 脚本的执行顺序与定义时的位置有关；
HTML文档解析不受影响，等 DOM 构建完成之后 defer 脚本执行，但脚本执行之前需要等待 CSSOM 构建完成。在 DOM、CSSOM 构建完毕，defer 脚本执行完成之后，DOMContentLoaded 事件触发。

async：在后台加载脚本，文档解析过程不中断。脚本加载完成后，文档停止解析，脚本执行，执行结束后文档继续解析。

DOMContentLoaded与load：
当 HTML 文档解析完成就会触发 DOMContentLoaded，而所有资源加载完成之后，load 事件才会被触发。
(document).ready(function()//...代码...);其实监听的就是DOMContentLoaded事件，
(document).load(function() { // ...代码... }); 监听的是 load 事件。
*/
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
});
