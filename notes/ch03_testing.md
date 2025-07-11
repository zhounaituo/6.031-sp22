- 校验(Validation) 的目的是发现程序中存在的问题,以增强自己对程序正确性的信心.
    - 形式推理(Formal reasoning): 也被称为 _validation_.也就是利用数学方法证明.
    - 代码审查(Code review): 让别人阅读你的代码,发现其中的问题.
    - 测试(Testing): 精心挑选输入,以测试和校验输入是否正确.
- 系统化测试(Systematic testing)利用一定的原则来挑选测试用例,进行程序测试.通常包含以下原则:
    - 正确性(Correct),即测试用例要符合规格书.
    - 彻底性(Thorough)
    - 小型性(Small)
- 自动单元测试:对独立模块进行测试的方式.
- 黑白盒测试
    - 黑盒测试:仅通过规格书选取测试用例.
    - 白盒测试:通过函数的实现选取测试用例.
- 整体测试(Integration test):对一组模块或是整个程序进行测试.
- 自动回归测试(Automated regression testing):在程序修改前或是修改后自动进行测试.
- 测试相关:
    - 通过划分来选择测试用例:将程序的输入分为不同的部分,每个部分只取几个用例作为该部分的测试代表.
        - 包含边界值(boundaries)
            - 0
            - 类型的最大值和最小值.
            - 空值
            - 数组的开头和结尾.
    - 使用不同划分方式进行选取.
    - 写下你的测试策略:用例分区,子域.
    - 覆盖率(Coverage):测试用例对程序的覆盖程度.
        - 覆盖的类型:
            - 语句覆盖率(Statement coverage):对每一条语句的覆盖.
            - 分支覆盖率(Branch coverage):对 if 和 while 类语句的分支进行测试.
            - 路径覆盖率(Path coverage):程序每一条分支的完整通路.
        - 类型之间的关系:Path > Branch > Statement
- 其他问题:
    - 为什么软件测试很难?
        - 全面测试(Exhaustive testing)几乎不可能.
        - 随机测试(Haphazard testing)无法发现全部漏洞.
        - 随机和统计测试(Random or statistical testing)没能测试到一些特殊值.
    - 什么是测试驱动开发(Test-first programming)?
        - 首先编写规格书(Spec)用来描述程序.
        - 编写测试(Test)来测试规格书.
        - 实现程序(Implement).
        - 这不是一个线性步骤,每一步都可能回到上一步进行完善,如此循环直至成熟.

# Testing

## Validation 

Testing is an example of a more general process called `validation`.The purpose of validation is to uncover problems in a program and thereby increase your confidence in the program's correctness.Validation includes:

- **Formal reasoning** about a program, usually called _verification_.Verification constructs a formal proof that a program is correct.
- **Code review**. Having somebody else carefully read your code, and reason informally about it, can be a good way to uncover bugs.
- **Testing**. Running the program on carefully selected inputs and checking the results.

## Why software testing is hard

- **Exhaustive testing** is infeasible.
- **Haphazard testing** is less likely to find bugs.
- **Random or statistical testing** doesn't work well for software. (e.g. (the famous Pentium division bug)[http://www.willamette.edu/~mjaneba/pentprob.html])

## Test-first programming

Some terms in the Course:
- **Module** is a part of a software system that can be designed, implemented, tested, and reasoned about separately from the rest of the system.
- **Specification** (or spec) describes the behavior of a module.
- A module has an _implementation_ that provides its behavior, and _clients_ that use the module.
- A _test case_ is a particular choice of inputs, along with the expected output behavior required by the specification.
- A _test suite_ is a set of test cases for a module.

In _test-first programming_, you write the spec and the tests before you even write any code. The development of a single function proceeds in this order:

1. **Spec**: Write a specification for the function.
2. **Test**: Write tests that exercise the spectification.
3. **Implement**: Write the implementation.

The biggest of test-first programming is safety from bugs.

## Systematic testing
**Systematic testing** means that we are choosing test cases in a principled way, with the goal of designing a test suite with three desirable properties:
- **Correct**. A correct test suite is a legal client of the specification, and it accepts all legal implementations of the spec without complaint.
- **Thorough**. A thorough test suite finds actual bugs in the implementation, caused by mistakes that programmers are likely to make.
- **Small**.  A small test suit, with few test cases, is faster to write in the first place, and easier to update if the specification evolves.

By these criteria, exhaustive testing is thorough but infeasibly large. Haphazard testing tends to be small but not thorough. Randomized testing can achieve thoroughness only at the cost of large size.

## Choosing test cases by partitioning

- _partition_ is a collection of disjoint sets that completely covers the input space, so that every input lies in exactly one subdomain.
- _subdomains_ form a partition. The idea behind subdomains is to divide the input space into sets of similar inputs on which the program has similar behavior.

### Include boundaries in the partition 
- 0 is a boundary between positive numbers and negative numbers
- thethe maximum and minimum values of numeric types, like Number.MAX_SAFE_INTEGER or Number.MAX_VALUE
- emptiness for collection types, like the empty string, empty array, or empty set
- the first and last element of a sequence, like a string or array

Why do bugs often happen at boundaries?
- Programmers often make **off-by-one mistakes**, like writing <= instead of <.
- Some boundaries may need to be handled as special cases in the code.
- Boundaries may be places of discontinuity in the code's behavior.

## Automated unit testing

```js
// A single unit test for max
it("covers a < b", function() {
    assert.strictEqual(Math.max(1, 2), 2);
})
```

```js
// To collect a set of unit tests into a test suite
describe("Math.max", function() {
    it("covers a < b", function() {
        assert.strictEqual(Math.max(1, 2), 2);
    });

    it("covers a = b", function() {
        assert.strictEqual(Math.max(9, 9), 9);
    });

    it("covers a > b", function() {
        assert.strictEqual(Math.max(10, -9), 10);
    });
});
```

## Documenting your testing strategy

For example, to document out strategy for testing _max_:
```js
describe("max", function() {
    /*
     * Testing strategy
     * 
     * partition: 
     *    a < b
     *    a > b
     *    a = b
     */

    it(...); // test cases here
    it(...);
    it(...);
    ...
})
```

## Black box and glass box testing

- **Black box testing** means choosing test cases only from the specification, not the implementation of the function.
- **Glass box testing** means choosing test cases with knowledge of how the function is axtually implemented.

## Coverage 
Coverage is judage a test suite is to ask how thoroughly it exercises the program.Here are three common kinds of coverage:
- **Statement coverage**: is every statment run by some test case?
- **Branch coverage**: for every `if` or `while` statement in the program, are both the true and the false direction taken by some test case?
- **Path coverage**: is every possible combination of brances -- every path through the program -- taken by some test case?

Path coverage > Branch coverage > Statement coverage

## Unit and integration testing

- An **integration test** tests a combination of modules, or even the entire program. Integration test can test fail at the connections between modules.
- A stub for a class is often called a mock object.

## Automated regression testing

- **Automated testing** means running the tests and checking their results automatically.
- Running all your tests after every change is called **regression testing**.

Which of the following are good times to rerun all your tests?
- Before doing git add/commit/push.
- After rewriting a function to make it faster.
- When using a code coverage tool.
- After you think you fixed a bug.

## Iterative test-first programming

Practice **iterative** test-first programming , in which you are prepared to go back and revise your work in previous steps:
1. Write a specification for the function.
2. Write tests that exercise the spec. As you find problems, **iterate** on the spec and the tests.
3. Write an implementation. As you find problems, **iterate** on the spec, the tests, and the implementation.

**Plan for iteration**:
- For a large specification, start by writing only one part of the spec, proceed to test and implement that part, then iterate with a more complete spec.
- For a complex test suite, start by choosing a few important partitions, and create a small test suite for them. Proceed with a simple implementation that passes those tests, and then iterate on the test suite with more partitions.
- For a tricky implementation, first write a simple brute-force implementation that tests your spec and validates your test suite. Then move on to the harder implementation with confidence that your spec is good and your tests are correcr.

Instead of trying to solve a problem perfectly from start to finish, iteration means reaching a rough solution as soon as possible, and then steadily refining and improving it, so that you have time to discard and rework if necessary. Iteration makes the best use of your time when a problems is difficult and the solution space is unknown.

## Summary 

- Test-first programming. Write tests before you write code.
- Systematic testing with partitioning and boundary values, to design a test suite that is correct, thorough, and small.
- Glass box testing and statement coverage for filling out a test suite.
- Unit-testing each module, in isolation as much as possible.
- Automated regression testing to keep bugs from coming back.
- Iterative development. Plan to redo some work.