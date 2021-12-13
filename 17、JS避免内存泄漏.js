/*
内存泄漏:有些理应被回收的垃圾，却没被回收，这就造成了垃圾越积越多；
内存：页面里的原始内存，也就是DOM节点的总占用内存；
JavaScript内存：页面中所有可达对象的总占用内存；
可达对象：从初始的根对象（window或者global）的指针开始，向下搜索子节点，子节点被搜索到了，说明该子节点的引用对象可达，搜不到，说明该子节点对象不可达。

如何避免内存泄漏？
1、减少全局变量
2、未清除定时器
3、合理使用闭包
4、分离DOM

1、减少全局变量
全局变量为可达对象，不会被当做垃圾去回收，这导致他会一直占用内存而得不到释放，消耗性能
*/
document.getElementById('btn').onclick = function () {
  a = new Array(1000000).fill('Sunshine_Lin') // a 为全局变量
}
document.getElementById('btn').onclick = function () {
  let a = new Array(1000000).fill('Sunshine_Lin') // 改为函数变量，每执行一次函数，就会被回收
}

/*
2、未清除定时器
*/
function fn() {
  let arr = new Array(1000000).fill('Sunshine_Lin')
  setInterval(() => {
    let a = arr // 定时器里的a引用着arr，因此定时器不清除的话，a就不会被回收，那么arr肯定也回收不了了
  }, 1000)
}
document.getElementById('btn').onclick = function () {
  fn()
}

function fn() {
  let arr = new Array(1000000).fill('Sunshine_Lin')
  let i = 0
  let timer = setInterval(() => {
    if (i > 5)  clearInterval(timer)
    let a = arr
    i++
  }, 1000)
}
document.getElementById('btn').onclick = function () {
  fn()
}

/*
3、合理使用闭包
*/
function fn1() {
  let arr = new Array(100000).fill('Sunshine_Lin')

  return arr
}
let a = []
document.getElementById('btn').onclick = function () {
  a.push(fn1())// fn1执行后，arr被push进a数组了，而a数组是个全局变量
}

/*
4、分离DOM
*/
<button id="btn">点击</button>
let btn = document.getElementById('btn')// 虽然最后把button给删除了，但是因为全局变量btn对此DOM对象引用着，导致此DOM对象一直没有被回收，这个DOM对象就称为分离DOM
document.body.removeChild(btn)

<button id="btn">点击</button>
let btn = document.getElementById('btn')
document.body.removeChild(btn)
btn = null // 删除button后，顺便把btn设置成null




