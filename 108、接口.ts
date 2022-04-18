/*
接口interface（仅限于描述对象类型）：一系列抽象方法的声明，是一些方法特征的集合，需要由具体的类去实现。接口不能转换为 JavaScript。
接口继承：可以通过其他接口来扩展自己，允许继承多个接口，继承使用关键字 extends。
Child_interface_name extends super_interface_name
Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name
*/
interface IPerson { 
  readonly firstName:string, // 只读属性限制只能在对象刚刚创建的时候修改其值
  lastName?:string, // 可选
  sayHi: ()=>string,
  commandline:string[]|string|(()=>string), //联合类型和接口
  [index:number]:string,// 将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串
} 
var customer:IPerson = { 
  firstName:"Tom",
  lastName:"Hanks", 
  sayHi: ():string =>{return "Hi there"} 
} 


// 指定对象成员的数组
interface Arrobj{
  name:string,
  age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]


// 接口继承
interface Person { 
 age:number 
} 
interface Musician extends Person { 
 instrument:string 
} 
var drummer = <Musician>{}; 
drummer.age = 27 
drummer.instrument = "Drums"

// 类和接口(类可以实现接口，使用关键字 implements)
interface ILoan { 
 interest:number 
} 
class AgriLoan implements ILoan { 
 interest:number 
 rebate:number 
 
 constructor(interest:number,rebate:number) { 
    this.interest = interest 
    this.rebate = rebate 
 } 
} 
var obj = new AgriLoan(10,1) 



/*
type和interface的异同：
● 相同：
  ○ 都可以用来描述对象或函数,但语法不同；（type有=）
  ○ 都可以被继承，接口和类型别名并不互斥。类型别名可以继承接口，反之亦然；（type继承用&、interface继承用extends）
  ○ 类可以通过implements实现(除联合类型外)
● 不同：
  ○ type可以定义基本类型别名、联合类型、元祖
  ○ interface 可以将声明合并（同名接口合并、type会报错）
*/
// 语法不同
type Point = {
  x: number;
  y: number;
};
type SetPoint = (x: number, y: number) => void;

interface Point {
  x: number;
  y: number;
}
interface SetPoint {
  (x: number, y: number): void;
}

// 继承
interface Person{
    name:string
}
interface Student extends Person { stuNo: number }

type Person{
    name:string
}
interface Student extends Person { stuNo: number }

type Person{
    name:string
}
type Student = Person & { stuNo: number }

interface Person{
    name:string
}
type Student = Person & { stuNo: number }


// implements
interface ICat{
    setName(name:string): void;
}
class Cat implements ICat{
    setName(name:string):void{
        // todo
    }
}

type ICat = {
    setName(name:string): void;
}
class Cat implements ICat{
    setName(name:string):void{
        // todo
    }
}

type Person = { name: string; } | { setName(name:string): void };
// 无法对联合类型Person进行实现
// error: A class can only implement an object type or intersection of object types with statically known members.
class Student implements Person {
  name= "张三";
  setName(name:string):void{
        // todo
    }
}