/*
联合类型:类型 A 和类型 B 联合后的类型是同时接受 A 和 B 值的类型；
类型别名 type：用来给一个类型起个新名字，不仅可以用来表示基本类型，还可以用来表示对象类型、联合类型、元组和交集。
交叉类型：通过&将多个类型合并为一个类型，包含了所需的所有类型的特性。
*/
let a:string | number = 123 // 直接使用联合类型


type userName = string; // 基本类型
type arr = number[]; // 对象类型
type userId = string | number; // 联合类型
type Person = {// 对象类型
    id: userId; // 可以使用定义类型
    name: userName;
    age: number;
    gender: string;
    isWebDev: boolean;
};
type Tree<T> = { value: T };// 泛型
const user: Person = {
    id: "901",
    name: "椿",
    age: 22,
    gender: "女",
    isWebDev: false,
};


interface IPerson {
  id: string;
  age: number;
}
interface IWorker {
  companyId: string;
}
type IStaff = IPerson & IWorker;
const staff: IStaff = {
  id: 'E1006',
  age: 33,
  companyId: 'EFT'
};
