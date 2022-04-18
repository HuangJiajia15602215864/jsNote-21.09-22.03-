/*
类型守卫：用于确保该类型在一定的范围内，思想是尝试检测属性、方法或原型，以确定如何处理值。

in 关键字
typeof 关键字：必须是 "number"， "string"， "boolean" 或 "symbol"
instanceof 关键字
自定义类型保护的类型谓词
switch 和 case
*/
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}


function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
 

interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}
let padder: Padder = new SpaceRepeatingPadder(6);
if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}


function isNumber(x: any): x is number {
  return typeof x === "number";
}
function isString(x: any): x is string {
  return typeof x === "string";
}


function evaluatePrice(vehicle: Vehicle) {
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
