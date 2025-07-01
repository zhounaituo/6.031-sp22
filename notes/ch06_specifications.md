- 规格书(Specifications)是放置在方法之上的文档，描述了方法的行为.
- 规格书是方法实现者与调用者之间的契约。使用者可以通过阅读规格书而不是源码来直接了解程序如何使用；同时，实现者也可以通过阅读规格书对代码进行修改，而不需要了解调用者如何使用代码.
- 规格书包含一下结构：
  - 前置条件(precondition):调用方法时必须满足的部分.
    - 包括方法的签名,变量的类型和数量.
    - 包括变量类型的范围描述.
    - 包括变量间关系的表述.
  - 后置条件(postondition):包含方法调用结果时的部分.
    - 包括静态检查和返回值类型.
    - 包括返回值和输入值关系.
    - 包括异常处理部分.
      - 可预测异常.应通过Spec中的@throw明确描述.
      - 不可预测异常.如`IndexError`,`KeyError`等等,不包含在规格书中.
    - 包括对象变异(mutated)描述.例如,sort(arr)应说明"返回新数组,原数组不变".
    - 副作用描述(Side Effects),如对全局变量的修改等.
- 在TypeScript中,规格书又被实现为[TypeDoc](https://typedoc.org/documents/Doc_Comments.html) 
  - @param 用来描述参数,也就是前置条件部分.
  - @return 用来描述返回值,也就是后置条件部分.
  - @throw 用来描述异常处理部分.
- 使用规格书时需要注意的部分:
  - 程序默认避免使用`Null`值,因为任何类型都可以时Null,这会导致程序变得混乱不堪.但是可以使用空值(emptiness).
  - 当失败可预测时,可以使用`undefine`作为程序失败的特殊标记,用于程序调用者处理异常.
  - 测试用例需要严格依据Spec设计:
    - 合法输入验证后置条件(如返回值正确性).
    - 非法输入验证前置条件(如是否抛出Spec声明的异常).

---

# Specifications

## Behavioral equivalence

- The spec only nees to describe its behavior when it is called legally.

```js
find(arr: Array<number>, val: number): number
require: val occurs exactly once in arr
effects: retums indes i such than arr[i] = val
```

## Why specifications?

- Precise specifications in the code let you apportion blame
- Specifications give the implemener freedom to change the implementation without telling clients.
- Specifications can make code faster.
- Decoupling.

## Specification structure

A _specification_ of a function has several parts:

- a function signature, giving the name, parameter types, and return type.
- a requires clause, describing additional restrictions on the parameters.
- an effects clause, describing the return value, exceptions, and other effects of the function.

A _precondition_ is an obligation on the client (the caller of the function).

- It is a condition over the state in which the function is invoked:

- Include the numer and types of the parameters in the functiokn signature.
- Additional conditions are written down in the _requires_ clasue:
  - narrowing a parameter type.
  - intercations between parameters.

A _postcondition_ is an obligation on the implementer of the function.

- It includes the parts that statically check, notably the return type.
- Additional conditions are written down in the _effects_ clause:
  - how the return value relates to the inputs
  - which exceptions are thrown, and when
  - whether and how objects are mutated

## Specifications in TypeScript

[Documentation comment](https://typedoc.org/guides/doccomments/)

A specification like this:

```js
find(arr: Array<number>, val: number): number
requires: val occurs exactly once in arr
 effects: return index i such that arr[i] = val
```

TypeDoc like this:

```js
/**
 * Find a value in an array.
 * @param arr array to search, requires that val occurs exactly once
 *            in arr
 * @param val value to search for
 * @returns index i such that arr[i] = val
 */
function find(arr: Array<numver>, val: number): number
```

## Avoid null

- As a general convention, null values are disallowed in parameters and return values unless the spec explicitly says otherwise.
- Null is unpleasanty ambiguous.
- Careless use of null can cause a staggering variety of bugs.

[UsingAndAvoidingNullExplained](https://github.com/google/guava/wiki/UsingAndAvoidingNullExplained)

## Include emptiness

- Empty values are always allowed as parameter or return values.

## Testing and specifications

- Even glass box tests must follow the specification.
- Glass box means you are trying to find new test cases that exercise different parts of the implementation, but still checking those test cases in an implementation-independent way, following the spec.

### Testing units

- A _unit test_ for one function we've written shouldn't fail if a different function fail to satisfy its spec.

## Specifications for mutating functions

- Mutation is disallowed unless stated otherwise.

## Exceptions

- _Signaling bugs_ are signaled with a generic `Error` class, like `IndexError`, `KeyError`， `TypeError` .i.e.
  - Exceptions that signal bugs are not part of the postcondion of a function.
- Exceptions for anticipated failures: Specifying the conditions under which that failure occurs.

## Special results
