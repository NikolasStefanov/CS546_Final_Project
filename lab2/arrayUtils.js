let isArray = (arr) => {
    if (Array.isArray(arr) !== true) {
        throw 'Error: Not an Array';
    }
}
let isNum = (num) => {
    if (typeof num !== 'number') {
        throw 'Error: Not a Number';
    }
    if (isNaN(num)) {
        throw 'Error: Not a Number';
    }
}
let mergeCheck = (element) => {
    if (typeof element !== 'number') {
        if (typeof element === 'string') {
            if (element.length !== 1) {
                throw 'Error: Not a Number or Char';
            }
            let regex = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
            if (!regex.includes(element)) {
                throw 'Error: Special Character'
            }
            else if ("0123456789".includes(element)) {
                throw 'Error: Number as Character'
            }
        }
        else {
            throw 'Error: Not a Number or Char';
        }
    }
    if (isNaN(element) && (typeof element !== 'char' && typeof element !== 'string')) {
        throw 'Error: Not a Number';
    }
}

let removeDups = (arr) => {
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
}

const average = function average(arrOfArr) {
    //Error Check
    if (!arrOfArr && arrOfArr != 0) {
        throw 'Error: No Input';
    }
    isArray(arrOfArr)
    if (arrOfArr.length === 0) {
        throw 'Error: Array is Empty';
    }
    for (let array of arrOfArr) {
        isArray(array)
        for (let num of array) {
            isNum(num);
        }
    }
    //Real Function
    let arr = arrOfArr.flat();
    let sum = 0;
    for (let element of arr) {
        sum += element
    }
    return sum / arr.length
}

const modeSquared = function modeSquared(arr) {
    //Error Checking
    if (!arr && arr != 0) {
        throw 'Error: No Input';
    }
    isArray(arr);
    if (arr.length === 0) {
        throw 'Error: Array is Empty';
    }
    for (let num of arr) {
        isNum(num);
    }

    //Real Function
    let maxTimes = 1
    let currTimes = 0
    let modes = []
    for (let index in arr) {
        currTimes = 0
        for (let num of arr) {
            if (num == arr[index]) {
                currTimes += 1
            }
        }
        if (currTimes === maxTimes) {
            modes.push(arr[index])
        }
        else if (currTimes > maxTimes) {
            maxTimes = currTimes
            modes = []
            modes.push(arr[index])
        }
    }

    let newModes = removeDups(modes)
    if (maxTimes >= 2) {
        if (newModes.length >= 2) {
            // Multiple Modes
            let sum = 0
            for (let num of newModes) {
                sum += Math.pow(num, 2)
            }
            return sum
        }
        // One Mode
        return Math.pow(newModes[0], 2)
    }
    else if (maxTimes === 1) {
        // No Mode
        return 0
    }
    // Error
    console.log("This shouldn't happen")
    return -1

}

const medianElement = function medianElement(arr) {
    //Error Checking
    if (!arr && arr != 0) {
        throw 'Error: No Input';
    }
    isArray(arr);
    if (arr.length === 0) {
        throw 'Error: Array is Empty';
    }
    for (let num of arr) {
        isNum(num);
    }

    //Real Function
    let newArr = []
    for (let element of arr) {
        newArr.push(element)
    }
    newArr = newArr.sort(function (a, b) { return a - b })

    let resObj = {}
    if (newArr.length % 2 !== 0) {
        let median = newArr[Math.floor(newArr.length / 2)]
        resObj[median] = arr.indexOf(median)
    }
    else {
        let median = (newArr[Math.floor(newArr.length / 2)] + newArr[(Math.ceil(newArr.length / 2)) - 1]) / 2
        resObj[median] = arr.indexOf(newArr[Math.floor(newArr.length / 2)])
    }
    return resObj
}

const merge = function merge(arr1, arr2) {
    //Error Checking
    if (!arr1 && arr1 != 0) {
        throw 'Error: No Input';
    }
    if (!arr2 && arr2 != 0) {
        throw 'Error: No Input';
    }
    isArray(arr1)
    isArray(arr2)
    if (arr1.length === 0) {
        throw 'Error: Array is Empty';
    }
    if (arr2.length === 0) {
        throw 'Error: Array is Empty';
    }
    for (let eles1 of arr1) {
        mergeCheck(eles1)
    }
    for (let eles2 of arr2) {
        mergeCheck(eles2)
    }

    //Real Function
    let newArr = arr1.concat(arr2)
    newArr = newArr.sort()
    let nums = []
    let uppers = []
    let lowers = []
    for (let element of newArr) {
        if (typeof element === 'number') {
            nums.push(element)
        }
        else if (element.toUpperCase() === element) {
            uppers.push(element)
        }
        else if (element.toLowerCase() === element) {
            lowers.push(element)
        }
        else {
            console.log("I don't know what this could be: " + element)
        }
    }

    let resultArray = lowers.sort().concat(uppers.sort().concat(nums.sort(function (a, b) { return a - b })))
    return resultArray
}

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
}
