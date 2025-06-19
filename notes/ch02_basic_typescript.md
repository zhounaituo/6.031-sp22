# Basic TypeScript

1. Snapshot diagrams
    ![ch02_snapshot_diagrams](/notes/img/ch02_snapshot_diagrams.png)
    
    | Object | snapshot diagrams |
    |--|--|
    | Array | ![ch02_array](/notes/img/ch02_array.png) |
    | Map | ![ch02_map](/notes/img/ch02_map.png) |
    | Set | ![ch02_set](/notes/img/ch02_set.png) |


2. Snapshot diagrams 用于展示程序运行时变量的状态。
```ts
function f(s:string, arr:Array<string>):void{
    s.concat("b");
    s += "c";
    arr.push("d");
}

let t:string = "a";
let tarr:Array<string> = [t];
f(t, tarr);
```
![ch02_ex3_png](/notes/img/ch02_ex3_png.png)

3. 参数的传递机制
   1. 所有参数都是按值传递的（Call by Value），但需要**原始值（Primitive）**和**引用类型（Reference）**。
   2. 原始值（不可变值）传递值的**副本**，函数内部修改不影响外部变量。
    ```ts
    function f(n:number):void{
        n++; // 函数内部修改不影响外部变量
    }
    let n:number = 0;
    f(i);
    console.log(n); // 0
    ```
   3. 引用类型（可变值）传递**引用的副本**，函数内部可同步引用修改对象内容，但无法改变外部变量的引用指向。
    ```ts
    function f(arr:Array<number>):void{
        arr.push(4); // 函数内部可同步引用修改对象内容
    }
    let arr:Array<number> = [1, 2, 3];
    f(arr);
    console.log(arr); // [1, 2, 3, 4]
    ```

