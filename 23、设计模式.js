/*
设计模式：
1.单例模式
2、策略模式
3、代理模式
4、中介者模式
5、装饰者模式

1.单例模式
保证一个类仅有一个实例，并提供一个访问它的全局访问点。
思路：先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
*/
class CreateUser {
  constructor(name) {
      this.name = name;
      this.getName();
  }
  getName() {
       return this.name;
  }
}

var ProxyMode = (function() {// 代理实现单例模式
  var instance = null;
  return function(name) {
      if(!instance) {
          instance = new CreateUser(name);
      }
      return instance;
  }
})();

var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
console.log(a === b);    //true 因为单体模式是只实例化一次，所以下面的实例是相等的


/*
2、策略模式
将算法的使用算法的实现分离开来；
策略模式的程序至少由两部分组成：策略类（可变），策略类封装了具体的算法，并负责具体的计算过程；环境类Context（不变），Context接受客户的请求，随后将请求委托给某一个策略类。
*/
/*策略类*/
var levelOBJ = {
  "A": function(money) {
      return money * 4;
  },
  "B" : function(money) {
      return money * 3;
  },
  "C" : function(money) {
      return money * 2;
  } 
};
/*环境类*/
var calculateBouns =function(level,money) {
  return levelOBJ[level](money);
};
console.log(calculateBouns('A',10000)); // 40000


/*
3、代理模式
为一个对象提供一个代用品或占位符，以便控制对它的访问
*/


/*
4、中介者模式
通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用，当其中的一个对象发生改变时，只需要通知中介者对象即可。
通过中介者模式可以解除对象与对象之间的紧耦合关系。
*/


/*
5、装饰者模式
在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法

*/