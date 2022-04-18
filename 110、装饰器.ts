/*
装饰器:一个表达式,该表达式被执行后，返回一个函数。函数的入参分别为 target、name 和 descriptor，执行该函数后，可能返回 descriptor 对象，用于配置 target 对象

类装饰器（Class decorators）
属性装饰器（Property decorators）
方法装饰器（Method decorators）
参数装饰器（Parameter decorators）
*/

// 类装饰器：用来装饰类，接收一个参数：被装饰的类
function Greeter(target: Function): void {// 定义了 Greeter 类装饰器(接收类)
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}
@Greeter  // 使用了 @Greeter 语法糖，来使用装饰器
class Greeting {
  constructor() {}
}
let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker!';

function Greeter(greeting: string) {// 自定义输出
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}
@Greeter("Hello TS!")
class Greeting {
  constructor() {}
}
let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello TS!';



// 属性装饰器：用来装饰类的属性，接收两个参数：被装饰的类、被装饰类的属性名
function logProperty(target: any, key: string) {// 跟踪用户对属性的操作
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true
  });

  const getter = function (this: any) {// property getter
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };
  
  const setter = function (this: any, newVal: any) {// property setter
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };
 
  Object.defineProperty(target, key, { // Create new property with getter and setter
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Person { 
  @logProperty
  public name: string;

  constructor(name : string) { 
    this.name = name;
  }
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";


// 方法装饰器:用来装饰类的方法。接收三个参数：被装饰的类、方法名、属性描述符
function LogOutput(tarage: Function, key: string, descriptor: any) {
  let originalMethod = descriptor.value;
  let newMethod = function(...args: any[]): any {
    let result: any = originalMethod.apply(this, args);
    if(!this.loggedOutput) {
      this.loggedOutput = new Array<any>();
    }
    this.loggedOutput.push({
      method: key,
      parameters: args,
      output: result,
      timestamp: new Date()
    });
    return result;
  };
  descriptor.value = newMethod;
}

class Calculator {
  @LogOutput
  double (num: number): number {
    return num * 2;
  }
}

let calc = new Calculator();
calc.double(11);
console.log(calc.loggedOutput); // console ouput: [{method: "double", output: 22, ...}]


// 参数装饰器:用来装饰函数参数，接收三个参数：被装饰的类、方法名、方法中参数的索引值
function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
	been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
	 this.greeting = phrase; 
  }
}
