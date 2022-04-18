/*
类型断言：TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解。
具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。
*/
  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b;
  }
  
  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;