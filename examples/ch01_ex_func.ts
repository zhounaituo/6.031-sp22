/**
 * Compute a hailstone sequence.
 * @param n starting number for sequence. Assumes n > 0.
 * @returns hailstone sequence starting with n and ending with 1. 
 */
function hailstoneSequence(n: number): Array<number> {
    let array: Array<number> = [];
    while (n !== 1) {
        array.push(n);
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    }
    array.push(n);
    return array;
}