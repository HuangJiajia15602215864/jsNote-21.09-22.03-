/*
https://juejin.cn/post/6994594642280857630
Promise:
作用：
1、解决回调地狱问题
2、代码可读性提高
3、你可以信任Promise，它的状态只会改变一次并且不可逆

1、执行了resolve，Promise状态会变成fulfilled
2、执行了reject，Promise状态会变成rejected
3、Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
4、Promise中有throw的话，就相当于执行了reject
*/
