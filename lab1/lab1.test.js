const lab1 = require("./lab1");

console.log(lab1.questionOne([2])); // should return and output: {'3': true}
console.log(lab1.questionOne([2, 3, 4]));
console.log(lab1.questionOne([5, 5, 5]));
console.log(lab1.questionOne([-6, 0, 6]));
console.log(lab1.questionOne([]));
console.log(lab1.questionOne());


console.log(lab1.questionTwo([1, 2, 3, 2, 1])); // should return and output: [1, 2, 3]
console.log(lab1.questionTwo(["1", 1, 1, 1, 1]));
console.log(lab1.questionTwo(["1", "1", 2, 2, "This is filler text"]));
console.log(lab1.questionTwo(["Hello World", "hello world", "Hello World", "Hello World!", "Hello", "World"]));
console.log(lab1.questionTwo(["Foo", "foo", 1, 2, 1, 2, "This", "That!", "1", "Foo"]));
console.log(lab1.questionTwo([]));


console.log(lab1.questionThree(["bar", "car", "car", "arc"])); // should return and output: { acr: ["car", "arc"] }
console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
console.log(lab1.questionThree(["foo", "oof", "test", "estt", "x", "tset", "ofo", "etst"]));
console.log(lab1.questionThree(["foo", "foo", "fo", "of", "of", "f", "oof", "ofo"]));
console.log(lab1.questionThree([]));

console.log(lab1.questionFour(1, 3, 2)); // should return and output: 4
console.log(lab1.questionFour(3, 3, 2));
console.log(lab1.questionFour(3, 3, 3));
console.log(lab1.questionFour(8, 9, 10));
console.log(lab1.questionFour(7, 4, 3));
console.log(lab1.questionFour(6, 5, 2));
