const questionOne = function questionOne(arr = []) {
    var result = {};

    function isPrime(num) {
        // Function taken from Stack Overflow
        // https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript
        for (var i = 2; i < num; i++) if (num % i === 0) return false;
        return num > 1;
    }

    for (let element of arr) {
        let funcNum = Math.abs(Math.pow(element, 2) - 7);
        let primeBool = isPrime(funcNum);
        result[funcNum] = primeBool;
    }
    return result;
};

const questionTwo = function questionTwo(arr) {
    if (arr == []) {
        return [];
    }
    let goodArray = [];
    for (let element of arr) {
        if (goodArray.includes(element)) {
            continue;
        } else {
            goodArray.push(element);
        }
    }
    return goodArray;
};

const questionThree = function questionThree(arr) {
    // Function taken from https://masteringjs.io/tutorials/fundamentals/compare-arrays
    function arrayEquals(a, b) {
        return (
            Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index])
        );
    }

    let result = {};
    let addArray = [];
    arr = questionTwo(arr);
    for (let element of arr) {
        let intermediate = element.split("").sort();
        addArray = [];
        for (let element2 of arr) {
            if (element == element2) {
                continue;
            }
            else if (arrayEquals(intermediate, element2.split("").sort())) {
                addArray.push(element2);
            }
            else {
                continue;
            }
        }
        if (addArray.length !== 0) {
            addArray.push(element);
            result[intermediate.join("")] = addArray;
        }
    }
    return result;
};

const questionFour = function questionFour(num1, num2, num3) {
    function myFact(num) {
        if (num === 0) {
            return 1;
        }
        else {
            return num * myFact(num - 1);
        }
    }

    let averageOriginals = (num1 + num2 + num3) / 3;
    let sumFacts = myFact(num1) + myFact(num2) + myFact(num3);

    return Math.floor(sumFacts / averageOriginals);
};

module.exports = {
    firstName: "Nikolas",
    lastName: "Stefanov",
    studentId: "10439632",
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
};
