/*
泛型：允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。
      类型T是一个抽象类型，只有在调用的时候才确定它的值，可以定义任何数量的类型变量
泛型变量代表的意思：
● T（Type）：表示一个 TypeScript 类型
● K（Key）：表示对象中的键类型；
● V（Value）：表示对象中的值类型；
● E（Element）：表示元素类型。 
*/

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};


/*
泛型工具类型:
Partial<T>：将某个类型里的属性全部变为可选项 ?

*/
// 通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

