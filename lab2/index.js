const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils')
const objUtils = require('./objUtils')

//ArrayUtils
//average
try {
    const answer = arrayUtils.average([[4, 5, 5], [12, 7, 8], [20, 2, 14]])
    console.log('Test Case Passed (average)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (average)')
    console.log(e)
}
try {
    const answer = arrayUtils.average([[45, 23, 2], ["IamError", 42]])
    console.log('Test Case Passed (average)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (average)')
    console.log(e)
}
console.log()

//modeSquared
try {
    const answer = arrayUtils.modeSquared([54, 23, 1, 6, 6, 8, 14, 23, 14])
    console.log('Test Case Passed (modeSquared)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (modeSquared)')
    console.log(e)
}
try {
    const answer = arrayUtils.modeSquared([])
    console.log('Test Case Passed (modeSquared)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (modeSquared)')
    console.log(e)
}
console.log()

//medianElement
try {
    const answer = arrayUtils.medianElement([54, 23, 1, 6, 8, 14, 23, 14])
    console.log('Test Case Passed (medianElement)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (medianElement)')
    console.log(e)
}
try {
    const answer = arrayUtils.medianElement("IamError")
    console.log('Test Case Passed (medianElement)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (medianElement)')
    console.log(e)
}
console.log()
//merge
try {
    const answer = arrayUtils.merge([14, 6, 3, 'e'], ['A', 'c', 'S']);
    console.log('Test Case Passed (merge)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (merge)')
    console.log(e)
}
try {
    const answer = arrayUtils.merge()
    console.log('Test Case Passed (merge)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (merge)')
    console.log(e)
}
console.log()


//StringUtils
//sortString
try {
    const answer = stringUtils.sortString('#103NikoS!');
    console.log('Test Case Passed (sortString)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (sortString)')
    console.log(e)
}
try {
    const answer = stringUtils.sortString(['IamError'])
    console.log('Test Case Passed (sortString)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (sortString)')
    console.log(e)
}
console.log()
//replaceChar
try {
    const answer = stringUtils.replaceChar("Ballolllloalosldolsle", 3)
    console.log('Test Case Passed (replaceChar)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (replaceChar)')
    console.log(e)
}
try {
    const answer = stringUtils.replaceChar("Ball", 3)
    console.log('Test Case Passed (replaceChar)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (replaceChar)')
    console.log(e)
}
console.log()
//mashUp
try {
    const answer = stringUtils.mashUp("NikolasNikolas", "Stefanov", " ");
    console.log('Test Case Passed (mashUp)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (mashUp)')
    console.log(e)
}
try {
    const answer = stringUtils.mashUp("Hello", "World", "IamError")
    console.log('Test Case Passed (mashUp)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (mashUp)')
    console.log(e)
}
console.log()
//ObjUtils
//computeObjects
try {
    let ex1 = { N: 42, i: 31, k: 20, o: 9 }
    let ex2 = { S: 35, t: 9, e: 66 }
    let ex3 = { a: 34, n: 11, o: 73 }
    const answer = objUtils.computeObjects([ex1, ex2, ex3], x => x + 4);
    console.log('Test Case Passed (computerObjects)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (computerObjects)')
    console.log(e)
}
try {
    let ex1 = { N: 42, i: 31, k: 20, o: 9 }
    let ex2 = { S: 35, t: 9, e: 66, f: 10, o: '3' }
    const answer = objUtils.computeObjects([ex1, ex2], x => x * 2);
    console.log('Test Case Passed (computeObjects)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (computeObjects)')
    console.log(e)
}
console.log()
//commonKeys
try {
    let ex1 = { N: 42, i: 31, k: { x: 20, y: 10 }, o: 9 }
    let ex2 = { S: 35, t: 9, e: 66, f: 10, o: 9, k: { x: 20, y: 10, z: 5 } }
    const answer = objUtils.commonKeys(ex1, ex2)
    console.log('Test Case Passed (commonKeys)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (commonKeys)')
    console.log(e)
}
try {
    let ex1 = { N: 42, i: 31, k: { x: 20, y: 10 }, o: 9 }
    let ex2 = "IamError"
    const answer = objUtils.commonKeys(ex1, ex2)
    console.log('Test Case Passed (commonKeys)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (commonKeys)')
    console.log(e)
}
console.log()
//flipObject
try {
    const answer = objUtils.flipObject({ n: "Hello", i: "This", k: { o: "is", l: "weird" } })
    console.log('Test Case Passed (flipObject)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (flipObject)')
    console.log(e)
}
try {
    const answer = objUtils.flipObject({ n: "Hello", i: "This", k: { o: [1, 2, { 4: ["x",] }], l: 3 } })
    console.log('Test Case Passed (flipObject)');
    console.log(answer)
} catch (e) {
    console.log('Test Case Failed (flipObject)')
    console.log(e)
}
console.log()
