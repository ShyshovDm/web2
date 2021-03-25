function getFactorial(number) {
    if(number < 0 || typeof number !== "number") {
        return "Invalid number to get factorial";
    }
    if(number <= 1) return 1;
    number *= getFactorial(number - 1);
    return number
}

console.log(getFactorial(4));