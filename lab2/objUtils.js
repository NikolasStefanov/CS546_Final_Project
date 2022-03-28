let isArray = (arr) => {
    if (Array.isArray(arr) !== true) {
        throw 'Error: Not an Array';
    }
}
let isObject = (obj) => {
    if (typeof obj !== 'object') {
        throw 'Error: Not an Object'
    }
}
let isFunction = (func) => {
    if (typeof func !== 'function') {
        throw 'Error: Not a Function'
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
const computeObjects = function computeObjects(arrOfObjs, func) {
    //Error Checking
    if (!arrOfObjs && arrOfObjs != 0) {
        throw 'Error: No Input for arrOfObjs';
    }
    if (!func && func != 0) {
        throw 'Error: No Input for func';
    }
    isArray(arrOfObjs)
    isFunction(func)
    if (arrOfObjs.length === 0) {
        throw 'Error: Array is empty'
    }
    for (let objs of arrOfObjs) {
        isObject(objs)
        if (objs === {}) {
            throw 'Error: Empty Object Detected'
        }
        for (let props in objs) {
            isNum(objs[props])
        }
    }
    //Real Function
    let mergedObj = {}
    for (let element of arrOfObjs) {
        for (let property in element) {
            if (mergedObj[property] != null) {
                mergedObj[property] = mergedObj[property] + func(element[property])
            }
            else {
                mergedObj[property] = func(element[property])
            }
        }
    }
    return mergedObj
}

const commonKeys = function commonKeys(obj1, obj2) {
    //Error Checking
    if (!obj1 && obj1 != 0) {
        throw 'Error: No Input for obj1';
    }
    if (!obj2 && obj2 != 0) {
        throw 'Error: No Input for obj2';
    }
    isObject(obj1)
    isObject(obj2)
    //Real Function
    let resObj = {}
    let bool = true
    let count = 0
    for (let property1 in obj1) {
        for (let property2 in obj2) {
            if (property1 === property2) {
                if (Array.isArray(obj1[property1]) && Array.isArray(obj2[property2])) {
                    bool = true
                    count = 0
                    for (let element1 of obj1[property1]) {
                        if (element1 !== obj2[property2][count]) {
                            bool = false
                        }
                        count++
                    }
                    if (bool) {
                        resObj[property1] = obj1[property1]
                    }
                }
                else if (typeof obj1[property1] === 'object' && typeof obj2[property2] === 'object') {
                    //Maybe Throw for recursion stuff
                    let extraCase = commonKeys(obj1[property1], obj2[property2])
                    if (extraCase !== {}) {
                        resObj[property1] = extraCase
                    }
                }
                else if (obj1[property1] === obj2[property2]) {
                    resObj[property1] = obj1[property1]
                }

            }
        }
    }
    return resObj
}

const flipObject = function flipObject(obj) {
    //Error Checking
    if (!obj && obj != 0) {
        throw 'Error: No Input for obj';
    }
    isObject(obj)
    if (Object.keys(obj).length === 0) {
        //Found this to help: https://stackoverflow.com/questions/5223/length-of-a-javascript-object
        throw 'Error: obj has no key/value pairs'
    }
    //Real Function
    let resObj = {}
    for (let property in obj) {
        if (Array.isArray(obj[property])) {
            for (let element of obj[property]) {
                if (typeof element === 'object') {
                    throw 'Error: Element cannot be key'
                }
                resObj[element] = property
            }
        }
        else if (typeof obj[property] === 'object') {
            try {
                resObj[property] = flipObject(obj[property])
            }
            catch (e) {
                throw e
            }
        }
        else {
            resObj[obj[property]] = property
        }
    }
    return resObj
}

module.exports = {
    computeObjects,
    commonKeys,
    flipObject

}