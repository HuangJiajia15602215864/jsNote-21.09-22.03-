/*
深拷贝:层层拷贝;新对象中的更改不会影响原始对象,不共享相同的属性（从堆内存中开辟一个新的区域存放新对象）
浅拷贝:只拷贝第一层，深层只是引用;新对象中的更改，原始对象中也会跟着改，共享相同的属性（如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ）
*/

/*
浅拷贝
1、Object.assign()：把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
   如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
2、展开运算符...：ES6特性，后面的属性会覆盖前面的属性
3、concat let arr2 = arr.concat();    
4、slice  let arr3 = arr.slice();
*/

/*
深拷贝:
1、JSON.parse(JSON.stringify())：
不能处理函数和正则，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为null）；
不能解决循环引⽤的对象；
会忽略 undefined、会忽略 symbol
2、手写递归方法：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝
*/
// 不能解决循环引⽤的对象
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj) // 报错

// 会忽略 undefined、会忽略 symbol、不能序列化函数
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function () {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}


function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}


let obj = {
  name: 1,
  address: {
    x: 100
  }
};
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);


let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}
let obj = {
  a: 1
}
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2