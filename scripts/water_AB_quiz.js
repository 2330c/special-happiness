console.log(water); //country data
console.log(quintiles); //quintiles for the countries

let ansArray = [];
const keyLiteracy = Object.keys(water) //makes a list consisted of the keys(countries) in ectotal 
for (let i=1;i<=10;i++){

//generates random country pairs
var random = Math.floor(Math.random()*keyLiteracy.length) //for the first option
console.log(random)

console.log(keyLiteracy)
var txt = keyLiteracy[random] //this is a country name
console.log(txt)

let allowedquintiles = ["Q1","Q2","Q3","Q4","Q5"]
let correctAnswer = ""

if (quintiles["Q1"].includes(txt))
    {    
allowedquintiles = ["Q3","Q4","Q5"]
correctAnswer = "B"
    }

if (quintiles["Q2"].includes(txt))
    {    
allowedquintiles = ["Q4","Q5"]
correctAnswer = "B"
    }

if (quintiles["Q3"].includes(txt))
    {   
allowedquintiles = ["Q1"] //change later
correctAnswer = "A"
    }

if (quintiles["Q4"].includes(txt))
    {   
allowedquintiles = ["Q1","Q2"]
correctAnswer = "A"
    }
    
if (quintiles["Q5"].includes(txt))
    {    
allowedquintiles = ["Q1","Q2","Q3"]
correctAnswer = "A"
    }

var randomelement = getRandomElement(allowedquintiles) // a string like "Q1" or "Q2"

var otherquintile = quintiles[randomelement] // the list of countries in that quintile

var othercountry = getRandomElement(otherquintile)

$("label[for*="+i+"A]").text(txt)
$("label[for*="+i+"B]").text(othercountry)

ansArray.push(i+correctAnswer)}

//gets a random element from the array
function getRandomElement(theArray) {
    return theArray[Math.floor(Math.random()*theArray.length)];
}

function submitClick() {
    var score = 0
    for (let i=0;i<=9;i++){
        if(document.getElementById(ansArray[i]).checked) {
            score++;
        }    
    }
    alert("Quiz submitted! "+ score+"/10 was correct")
}

document.getElementById('submit').addEventListener('click', submitClick);