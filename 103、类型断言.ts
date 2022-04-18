/*
类型断言:使用一种笃定的方式，告诉TypeScript 你清楚变量的类型，让TypeScript 按照我们的方式做类型检查。
*/
// 编译阶段对运行时的逻辑无能为力，在 TypeScript 看来，greaterThan2 的类型既可能是数字，也可能是 undefined
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)，不能把类型 undefined 分配给类型 number
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;// as 语法


let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;// 尖括号 语法
let strLength: number = (someValue as string).length;// as 语法

// 非空断言(断言操作对象是非 null 和非 undefined 类型)
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)

// 确定赋值断言
let x!: number;
initialize();
console.log(2 * x); // Ok
function initialize() {
  x = 10;
}