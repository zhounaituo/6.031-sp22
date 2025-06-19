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