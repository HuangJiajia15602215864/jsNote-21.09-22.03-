/*
函数：
函数重载：函数名字相同，而参数（类型、数量、顺序）不同，返回类型可以相同也可以不同。
方法重载：在一个类中，方法名字相同而参数（类型、数量、顺序）不同，返回类型可以相同也可以不同。

PS：当 TypeScript 编译器处理函数重载时，它会查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 
    因此，在定义重载的时候，一定要把最精确的定义放在最前面。
*/
// 可选参数和默认参数
function buildName(firstName: string, lastName ? : string = 'HJJ'): string {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

// 函数表达式，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

// 接口定义函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}


type Types = number | string
function add(a:number,b:number):number;// 定义四个重载方法
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');


class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Types, b: Types) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
}
const calculator = new Calculator();
const result = calculator.add("Semlinker", " Kakuqo");
