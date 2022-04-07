/*
object:
键的类型：String 或Symbol
键的顺序：无序
Size：只能手动计算
迭代：获取它的键然后才能迭代
性能:在频繁添加和删除键值对的场景下未作出优化

Map:
键的类型：任意值，包括函数、对象或任意基本类型
键的顺序：有序,以插入的顺序返回键值
Size：通过size 属性获取
迭代：Map 是 iterable 的，所以可以直接被迭代
性能:在频繁增删键值对的场景下表现更好
*/

/*
Map:
键值对，实际上Map是一个数组，它的每一个数据也都是一个数组；
方法：
 size： map.size 返回Map结构的成员总数。
 set(key,value)：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）
 get(key)：该方法读取key对应的键值，如果找不到key，返回undefined。
 has(key)：该方法返回一个布尔值，表示某个键是否在当前Map对象中。
 delete(key)：该方法删除某个键，返回true，如果删除失败，返回false。
 clear()：map.clear()清除所有成员，没有返回值。
遍历：
 keys()：返回键名的遍历器。
 values()：返回键值的遍历器。
 entries()：返回所有成员的遍历器。
 forEach()：遍历Map的所有成员。


weakMap:
键值对,键是弱引用的。其键必须是对象，原始数据类型不能作为key值
方法：
  只有set、get、has、delete，同上
遍历：
  垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakMap 不可遍历。

作用： 
  省掉手动删除对象关联数据的步骤。 
  WeakMaps 保持了对键名所引用的对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
*/
const map = new Map([
  ["foo",1],
  ["bar",2],
])
for(let key of map.keys()){
 console.log(key);  // foo bar
}
for(let value of map.values()){
  console.log(value); // 1 2
}
for(let items of map.entries()){
 console.log(items);  // ["foo",1]  ["bar",2]
}
map.forEach( (value,key,map) => {
  console.log(key,value); // foo 1    bar 2
})


/*
弱引用:
*/
var obj = new Object();
obj = null  // 回收 obj 所引用的对象
var obj = new WeakObject(); // 等待垃圾回收机制执行即可

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);// 建立了 map 对 key 所引用对象的强引用
key = null;// 不会导致 key 的原引用对象被回收
map.delete(key); // 让 map上删除key 才能使key被回收

const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);// 建立了 wm 对 key 所引用的对象的弱引用
key = null;// 下次垃圾回收机制执行的时候，该引用对象就会被回收掉

// 应用
let wm = new WeakMap(), element = document.querySelector(".element");
wm.set(element, "data");
let value = wm.get(elemet);
console.log(value); // data
element.parentNode.removeChild(element);
element = null;
