#!/usr/bin/env node
require('../nativejs-proto-extensions');

const cdir = function (el) {
    console.dir(el, {depth: null})
};
const clog = console.log;

let myObj = {
    1: {
        "name": "SUCCESS",
        "color": "fg.Sucess",
        "return": 0,
        "object": {
            "pty": "value",
            "pty2": [
                'a'
            ]
        },
        "array": [ // <<< OK
            1,2,3
        ]
    }
};

let test = {

};

cdir(test);
cdir(myObj);
clog(typeof myObj);

console.log("\nTest Case 1 :");
let c1 = myObj.getValueForPath('1');      // Case : ELSE
console.log(c1, "\n------------------");

console.log("\nTest Case 2 :");
let c2 = myObj.getValueForPath('1.name'); // Case : OBJECT & LEN = 1
console.log(c2, "\n------------------");

console.log("\nTest Case 3 :");
let c3 = myObj.getValueForPath('1.array'); // Case : OBJECT & LEN = 1
console.log(c3, "\n------------------");

console.log("\nTest Case 4 :");
let c4 = myObj.getValueForPath('1.object'); // Case : OBJECT & LEN = 1
console.log(c4, "\n------------------");

console.log("\nTest Case 5 :");
let c5 = myObj.getValueForPath('1.object.pty2'); // Case : OBJECT & LEN > 1 (recurse)
// let c5 = myObj['1.object.pty2']; // Case : OBJECT & LEN > 1 (recurse)
console.log(c5, "\n------------------");