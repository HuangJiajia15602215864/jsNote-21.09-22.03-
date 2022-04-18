/*
● any:任意类型,跳过编译阶段的类型检查、定义存储各种类型数据的数组;
● unknown：为了解决 any无法使用 TypeScript 提供的大量的保护机制的问题，TypeScript 3.0 引入了 unknown 类型。

任何类型的值可以赋值给any，any类型的值也可以赋值给任何类型;
任何类型的值可以赋值给unknown，但它只能赋值给unknown和any， 只有能够保存任意类型值的容器才能保存 unknown 类型的值
*/

/*
● number  数字类型（0b二进制、0o八进制、0x十六进制）
● bigint：大整数 var big: bigint =  100n;
● string 字符串类型
● boolean  布尔类型
*/

/*
● 数组类型 
● 元组Tuple：表示已知元素数量和类型的数组，各元素的类型不必相同，其他属性跟数组差不多
● enum 枚举：支持数字的和基于字符串的枚举
*/
{
var arr:number[] = [1, 2];   // 在元素类型后面加上[]
var arr: Array<number> = [1, 2];  // 数组泛型
var multi:number[][] = [[1,2,3],[23,24,25]]  // 二维数组

let x: [string, number];
const point: readonly [number, number] = [10, 20]; // 只读元组

// 数字枚举:默认初始值为0递增，也可以设置 NORTH 的初始值
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}

// 字符串枚举
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

// 异构枚举的成员值是数字和字符串的混合
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
console.log(Enum.A) //输出：0
console.log(Enum[0]) // 输出：A
}

/*
● void 用于标识方法返回值的类型，表示该方法没有返回值
● null  表示对象值缺失
● undefined 用于初始化变量为一个未定义的值
● never 其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值，抛出异常或无法执行到终止点（例如无限循环）

PS:Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型；此时，赋值后的类型会变成 null 或 undefined。
   而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 、undefined、void  只能被赋值给 void 或本身对应的类型 。
*/