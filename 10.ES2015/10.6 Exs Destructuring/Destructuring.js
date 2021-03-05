// Object Destructuring 1 -------
// What does the following code return/print?
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;
console.log(numPlanets); //8
console.log(yearNeptuneDiscovered); //1846

// Object Destructuring 2 ------
// What does the following code return/print?
let planetFacts = {
  numPlanets1: 8,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659
};
let {numPlanets1, ...discoveryYears} = planetFacts;
console.log(discoveryYears);
//{yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}
//yearMarsDiscovered: 1659
//yearNeptuneDiscovered: 1846
//__proto__: Object

// Object Destructuring 3 ---
// What does the following code return/print?
function getUserData({firstName, favoriteColor="green"}){
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}
getUserData({firstName: "Alejandro", favoriteColor: "purple"}) //"Your name is Alejandro and you like purple"
getUserData({firstName: "Melissa"}) //"Your name is Melissa and you like green"
getUserData({}) //"Your name is undefined and you like green"

// Array Destructuring 1-----
// What does the following code return/print?
let [first, second, third] = ["Maya", "Marisa", "Chi"];
console.log(first); //Maya
console.log(second); //Marisa
console.log(third); //Chi

// Array Destructuring 2-----
// What does the following code return/print?
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]
console.log(raindrops); //Raindrops on roses
console.log(whiskers); //whiskers on kittens
console.log(aFewOfMyFavoriteThings); //(3) ["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]
// 0: "Bright copper kettles"
// 1: "warm woolen mittens"
// 2: "Brown paper packages tied up with strings"
// length: 3

// Array Destructuring 3 ----
// What does the following code return/print?
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]
console.log(numbers) //(3) [10, 30, 20]
// 0: 10
// 1: 30
// 2: 20
// length: 3

// ES2015 Refactoring ------
// In this exercise, you’ll refactor some ES5 code into ES2015.
// ES5 Assigning Variables to Object Properties
var obj = {
  numbers: {
    a: 1,
    b: 2
  }
};
var a = obj.numbers.a;
var b = obj.numbers.b;

// ES2015 Object Destructuring 
/* Write an ES2015 Version */
 let obj1 = {
  numbers: {
    a1: 1,
    b1: 2
  }};
let {a1,b1} = obj1.numbers;

// ES5 Array Swap ------
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;
// ES2015 One-Line Array Swap with Destructuring
/* Write an ES2015 Version */
let arr1 = [1, 2];
let temp1 = arr1[0];
[temp1, arr1[1]] = [arr1[1], temp1] //or [arr[0], arr[1]] = [arr[1], arr[0]]

// raceResults()-----
// Write a function called raceResults which accepts a single array argument.
// It should return an object with the keys first, second, third, and rest.
//- first: the first element in the array
//- second: the second element in the array
//- third: the third element in the array
//- rest: all other elements in the array
// Write a one line function to make this work using
//- An arrow function
//- Destructuring
//- ‘Enhanced’ object assignment (same key/value shortcut)
const raceResults = (([first, second, third, ...allOther]) => ({first, second, third, allOther}));
raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre'])
/*{
    first: "Tom",
    second: "Margaret",
    third: "Allison",
    allOther: ["David", "Pierre"]
  }
*/

function squareAndFindEvens1(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
}

const squareAndFindEvens = ((numbers) => numbers.map((num) => num ** 2).filter((square) => square % 2 === 0));