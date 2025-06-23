# Code Review

**Code review** is careful, systematic study of source code by people who are not the original author or the code.

Code review really has two purposes:
- **Improving the code**. Finding bugs, anticipating possible bugs, checking the clarity of the code, and checking for consistency with the project's style standards.
- **Improving the programmers**. Code review is an important way that programmers learn and teach each other, about new language features, changes in the design of the project or its coding standards, and new techniques. In open source projects, particularly, much conversation happens in the context of code reviews.

[Mozilla](http://blog.humphd.org/vocamus-1569/?p=1569)
[Google's code review process](https://google.github.io/eng-practices/review/)
[Code Reviewing document](https://web.mit.edu/6.031/www/sp22/general/code-review.html)

## Style standards

[Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
Visual Studio Code has an **autoformatter** (right-click and Format Document) whose default rules are similar to Google style.

## Don't repeat yourself (DRY)

- Duplicated code is a risk to safely. If you have identical or very similar code in two places, then the fundamental risk is that there's a bug in both copies.

## Comments where needed

One kind of crucial comment is _specification_, which appears above a function or above a class and documents the behavior of the function or class.

```js 
/**
 * Compute the hailstone sequence.
 * See http://en.wikipedia.org/wiki/Collatz_conjecture#Statement_of_the_problem
 * @param n starting number of sequence;requires integer n > 0.
 * @returns the hailstone sequence starting at n and ending with 1.
 *          For example, hailstone(3)=[3,10,5,16,8,4,2,1].
 */
function hailstoneSequence(n:number):Array<number> {
    ...
}
```

Another crucial comment is one that specifies the provenance or source of a piece of code that was copied or adaped from elsewhere.
- One reason for documenting sources is to avoid violations of copyright.
- The borrowed code can be buggy or fall out of date.

```js
// reverse a string of digits 
// see https://stackoverflow.com/questions/1611427/reversing-a-string-in-javascript
const digitsReversed = digits.split('').reverse().join('');
```

Some comments are bad and unnecessary.
- Direct transliterations of code into English, for example, do nothing to improve understanding, because you should assume that your reader at least knows TypeScript.

## Fail fast 

_Failing fast_ means that code should reveal its bugs as early as possible. The earlier a problem is observed (the closer to its cause), the easier it is to find and fix.

## Avoid magic numbers

**Magic numbers** because they appear as if out of thin air with no explanation.When a number is used symbolically, like a month, or a sorting algorithm, then it becomes magical.
- One way to explain a number is with a comment, but a far better way is to declare the number as a named constant with a good, clear name.
- **A number is less readable than a name.**
- **Constants may need to change in the future.** Using a named constant, instead of repeating the literal number in various places, is more ready for change.
- **Constants may be dependent on other constants.** Don't hardcode numbers that you've computed by hand. Use a named constant that visibly computes the relationship in terms of other named constants.

Is it necessary to give names to fundamental constants of mathematics and physics that don't depend on other constants? like gravitational constant G.
- First, the number itself may be complex to express, so repeating it multiple times is not safe from bugs.
- Second, even these numbers encode desig decisions that might change in the future, such as the number of digits of precision, or the units of measurement.
A named constant is more ready for change when those design decisions change.

## One purpose for each variable

- Don't reuse parameters, and don't reuse variables.
- Function parameters, in particular, should generally be left unmodified.

```js 
function isLeapYear(year:number):boolean {
    // leap year every 4 years, with variations on 100-year and 400-year marks
    // http://en.wikipedia.org/wiki/Leap_year#Algorithm
    if (isDivisibleBy(year, 400)) return ture;
    else if (isDivisibleBy(year, 100)) return false;
    else return isDivisibleBy(year, 4);
}
```

## Use good names

Good function and variable names are long and self-descriptive. Comments can often be avoided entirely by making the code itself more readable, with better names that describe the function and variables.

- Follow the lexical naming convertions of the language.
- In any language, function names are usually verb phrases, like getDate or isUpperCase, while variable and class names are usually noun phrases. Choose short words, and be concise, but avoid abbreviations.
- Avoid single-character variable names entirely except where they are easily understood by convention.
- Using names that suggest their types can be particularly good for the readability of dynamically-typed languages like Python and JavaScript, because they don't have static types in variable declarations.

[Effectively Naming Software Thingies](https://medium.com/@rabinovichsagi/effectively-naming-software-thingies-fcea9d78a699)
[The Clean Code Blog](https://blog.cleancoder.com/)

```js
const tmp = 86400; // tmp is the number of seconds in a day (don't do this!)
```
as
```js
const secondsPerDay = 86400;
```

## Use whitespace to help the reader 

- Use consistent indentation.
- Never use tab characters for indentation, only space characters. Beacuse, different tools treat tab characters differently.

## Don't use global variables

Avoid global variables.
- _global variable_ is a variable, a name whose value can be changed. that is global, accessible and changeable from anywhere in the program.

[Global Variables Are Bad](http://c2.com/cgi/wiki?GlobalVariablesAreBad)

## Kinds of variables in snapshot diagrams

Snapshot diagrams distinguish between different kinds of variables:
- a _local variable_ inside a function.
- an _instace variable_ inside an instance of an object.
- a _global variable_ outside of any function or object.

A local variable comes into existence when a function is called, and then disappears when the function returns. If multiple calls to the same function are in progress (for example because of recursion), then each call will have its own independent local variables.

An instance variable comes into existence when an object is created with new, and then disappears when the object is no longer accessible and becomes garbage-collected. Each object instance has its own instance variables.

A global variable comes into existence when its declaration is executed, and exists for the rest of the life of the program.

## Functions should return results, not print them
## Avoid special-case code

- **Actively resist the temptation to handle special cases separately.** Tackle the general case first.

## Summary

- Don't Repeat Yourself (DRY)
- Comments where needed 
- Fail fast 
- Avoid magic numbers 
- One purpose for each variable 
- Use good names 
- Use whitespace to help the reader 
- Don't use global variables 
- Functions should return results, not print them
- Avoid special-case code 

