/*
同步：等待执行完成，期间不做任何事情
异步：不等待执行完成，先去做其他事情

JavaScript代码执行机制：
1、遇到同步代码直接执行
2、遇到异步代码先放一边，并且将他回调函数存起来，存的地方叫事件队列
3、等所有同步代码都执行完，再从事件队列中把存起来的所有异步回调函数拿出来按顺序执行
*/
console.log(1) // 同步
setTimeout(() => {
  console.log(2) // 异步 放入事件队列
}, 2000);
console.log(3) // 同步
setTimeout(() => {
  console.log(4) // 异步 放入事件队列
}, 0);
console.log(5) // 同步
// 输出 ： 1 3 5 4 2

/*
事件队列是用来存异步回调的，异步任务分为宏任务和微任务，并且微任务执行时机先于宏任务
宏任务:
I/O、setTimeout、setInterval、setImmediate、requestAnimationFrame

微任务：
Promise.prototype.then、catch、finally、process.nextTick、MutationObserver
*/
// 宏任务&微任务
console.log(1) // 同步
setTimeout(() => {
  console.log(2) // 异步：宏任务
});
console.log(3) // 同步
Promise.resolve().then(() => { // 异步：微任务
  console.log(4)
})
console.log(5) // 同步
// 1，3，5，4, 2


// 宏任务下微任务 & 微任务下宏任务
console.log(1) // 同步
setTimeout(() => {
  console.log(2) // 异步：宏任务 setTimeout1
  Promise.resolve().then(() => { // 异步：微任务 then1
    console.log(3)
  })
});
console.log(4) // 同步
new Promise((resolve, reject) => {
  console.log(5) // 同步  Promise的executor是同步的
  resolve()
}).then(() => { // 异步：微任务 then2
  console.log(6)
  setTimeout(() => {
    console.log(7) // 异步：宏任务 setTimeout2
  })
})
console.log(8) // 同步
// 先执行同步：输出1，4，5，8
// 宏任务：setTimeout；微任务：then

// 再执行微任务then：输出6；存入宏任务setTimeout
// 再执行宏任务setTimeout：输出2，存入微任务：then

// 再执行微任务then，输出3
// 再执行宏任务setTimeout：输出7
// 1，4，5，8，6，2，3，7


// 微任务下微任务
setTimeout(() => { // 异步：宏任务 setTimeout
  console.log(1)
}, 0)
console.log(2) // 同步
const p = new Promise((resolve) => { // p 是 then1 执行返回的新 Promise
  console.log(3) // 同步
  resolve()
}).then(() => { // 异步：微任务 then1
  console.log(4)
  // 拿着 p 重新 then
  p.then(() => { // 异步：微任务 then2
    console.log(5)
  })
})
console.log(6) // 同步 6
// 先执行同步：输出2,3,6
// 宏任务：setTimeout；微任务：then1

// 再执行微任务then1：输出4；存入微任务then2
// 再执行微任务then2：输出5
// 再执行宏任务setTimeout：输出1
// 2,3,6,4,5,1


// then多层回调
const p1 = new Promise((resolve, reject) => { // p1 是 then1 执行返回的新 Promise
  console.log(1) // 同步
  resolve()
}).then(() => { // 异步：微任务 then1
  console.log(2)
  const p2 = new Promise((resolve, reject) => { // p2 是 then2 执行返回的新 Promise
    console.log(3) // then1 里的 同步
    resolve()
  }).then(() => { // 异步：微任务 then2
    console.log(4)
    
    // 拿着 p2 重新 then
    p2.then(() => { // 异步：微任务 then3
      console.log(5)
    })
  })
  
  // 拿着 p1 重新 then
  p1.then(() => { // 异步：微任务 then4
    console.log(6)
  })
})
// 先执行同步：输出1 微任务：then1
// 再执行微任务then1：输出2,3；存入微任务then2、then4
// 再执行微任务then2、then4：输出4,6；存入微任务then3
// 再执行微任务then3：输出5；
// 1,2,3,4,6,5