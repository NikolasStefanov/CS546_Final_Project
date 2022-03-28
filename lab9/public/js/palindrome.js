let form = document.getElementById("form")
let submitButton = document.getElementById("submit")
let textarea = document.getElementById("phrase")
let list = document.getElementById("attempts")
let error = document.getElementById("error")

function reverseString(str) {
    // Taken frorm https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

function isPalindrome(str) {
    return (str === reverseString(str))
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let attempt = textarea.value.toLowerCase()
        attempt = attempt.replace(/[^A-Za-z 0-9]/g, '');
        attempt = attempt.replaceAll(" ", '');
        if (attempt.trim() === "") {
            if (textarea.value.trim() !== "") {
                try {
                    let str = document.getElementById("errorString")
                    error.removeChild(str)
                }
                catch (e) {
                    //Ok
                }
                let li = document.createElement('li');
                li.innerHTML = textarea.value
                li.className = "not-palindrome"
                list.appendChild(li)
            }
            else {
                try {
                    let str = document.getElementById("errorString")
                    error.removeChild(str)
                }
                catch (e) {
                    //Ok
                }
                let p = document.createElement('p');
                p.innerHTML = "Error, Invalid Input"
                p.id = "errorString"
                error.appendChild(p)
            }
        }
        else if (isPalindrome(attempt)) {
            try {
                let str = document.getElementById("errorString")
                error.removeChild(str)
            }
            catch (e) {
                //Ok
            }
            let li = document.createElement('li');
            li.innerHTML = textarea.value
            li.className = "is-palindrome"
            list.appendChild(li)
        }
        else {
            try {
                let str = document.getElementById("errorString")
                error.removeChild(str)
            }
            catch (e) {
                //Ok
            }
            let li = document.createElement('li');
            li.innerHTML = textarea.value
            li.className = "not-palindrome"
            list.appendChild(li)
        }
        textarea.value = ""
    })
}

