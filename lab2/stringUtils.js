let isString = (str) => {
    if (typeof str !== 'string') {
        throw 'Error: Not a String';
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
let whiteSpace = (str) => {
    if (!str.replace(/\s/g, '').length) {
        //https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
        throw 'Error: String is just whitespace'
    }
}
const sortString = function sortString(str) {
    //Error Checking
    if (!str && str != 0) {
        throw 'Error: No Input';
    }
    isString(str)
    if (str.length === 0) {
        throw 'Error: String is Empty';
    }
    whiteSpace(str)
    //Real Function
    let strArray = str.split("");
    strArray = strArray.sort();
    let spaces = []
    let specials = []
    let nums = []
    let uppers = []
    let lowers = []
    let regex = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    for (let element of strArray) {
        if (element === " ") {
            spaces.push(element)
        }
        else if (!regex.includes(element)) {
            specials.push(element)
        }
        else if ("1234567890".includes(element)) {
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

    let resultArray = uppers.sort().join('') + lowers.sort().join('') + specials.sort().join('') + nums.sort().join('') + spaces.sort().join('')
    return resultArray
}

const replaceChar = function replaceChar(str, index) {
    //Error Checking
    if (!str && str != 0) {
        throw 'Error: No Input';
    }
    isString(str)
    if (str.length === 0) {
        throw 'Error: String is Empty';
    }
    whiteSpace(str)
    isNum(index)
    if (index <= 0 || index > str.length - 2) {
        throw 'Error: Index out of bounds'
    }

    //Real Function
    let find = str[index]
    let char1 = str[index - 1]
    let char2 = str[index + 1]
    let arr = str.split("")
    let bool = true
    let returnArr = []
    let count = 0
    for (let element of arr) {
        if (count !== index) {
            if (find === element) {
                if (bool) {
                    returnArr.push(char1)
                    bool = false
                }
                else {
                    returnArr.push(char2)
                    bool = true
                }
            }
            else {
                returnArr.push(element)
            }
        }
        else {
            returnArr.push(element)
        }
        count = count + 1
    }
    return returnArr.join("")
}

const mashUp = function mashUp(str1, str2, char) {
    if (!str1 && str1 != 0) {
        throw 'Error: No Input for str1';
    }
    if (!str2 && str2 != 0) {
        throw 'Error: No Input for str2';
    }
    if (!char && char != 0) {
        throw 'Error: No Input for char';
    }
    isString(str1)
    isString(str2)
    isString(char)
    whiteSpace(str1)
    whiteSpace(str2)
    if (str1.length === 0) {
        throw 'Error: String1 is Empty';
    }
    if (str2.length === 0) {
        throw 'Error: String2 is Empty';
    }
    if (char.length !== 1) {
        throw 'Error: Char is not char';
    }

    //Real Function
    let result = ""
    let array1 = str1.split("")
    let array2 = str2.split("")
    while (array1.length > 0 && array2.length > 0) {
        result = result.concat(array1.shift())
        result = result.concat(array2.shift())
    }
    if (array1.length > 0) {
        while (array1.length > 0) {
            result = result.concat(array1.shift())
            result = result.concat(char)
        }
        return result
    }
    else if (array2.length > 0) {
        while (array2.length > 0) {
            result = result.concat(array2.shift())
            result = result.concat(char)
        }
        return result
    }
    else {
        return result
    }
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
}
