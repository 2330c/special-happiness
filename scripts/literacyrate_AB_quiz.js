let ansArray = [];
const keyLiteracy = Object.keys(literacy) //makes a list consisted of the keys(countries) in ectotal 
for (let i=1;i<=10;i++){

//generates random country pairs
var random = Math.floor(Math.random()*keyLiteracy.length) //for the first option
//var random2 = Math.floor(Math.random()*(keyLiteracy.length-1))
//if (random2>=random) {random2++;}

var txt = keyLiteracy[random] //this is a country name
//var txt2 = keyLiteracy[random2]
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

//var random = Math.floor(Math.random()*keyLiteracy.length) //for the first option
//var txt = keyLiteracy[random] //this is a country name

var randomquint = Math.floor(Math.random()*allowedquintiles.length)
var randomelement = allowedquintiles[randomquint] // a string like "Q1" or "Q2"

var otherquintile = quintiles[randomelement] // the list of countries in that quintile

var randomelement2 = Math.floor(Math.random()*otherquintile.length)
var othercountry = otherquintile[randomelement2]

$("label[for*="+i+"A]").text(txt)
$("label[for*="+i+"B]").text(othercountry)

ansArray.push(i+correctAnswer)}

//gets a random country from the data
function getRandomCountry(data) {
    const keys = Object.keys(data);
    return keys[Math.floor(Math.random()*keys.length)];
}

//parses the literacy rate from a string to a float
function parseRate(rate) {
    return parseFloat(rate.replace('%', '').trim());
}

//gets the quintile of a country
function getCountryQuintile(country, quintiles) {
    return quintiles[country];
}

//displays a quiz with two randomly selected countries
function displayQuiz(data) {
    const countryA = getRandomCountry(data);
    let countryB = getRandomCountry(data);
    while (countryA === countryB) {
        countryB = getRandomCountry(data);
    }
    document.getElementById('countryA').textContent = countryA;
    document.getElementById('countryB').textContent = countryB;
}

//checks the user's answers
function checkAnswer(selected, data) {
    const countryA = document.getElementById('countryA').textContent;
    const countryB = document.getElementById('countryB').textContent;
    const rateA = parseRate(data[countryA]['total population']);
    const rateB = parseRate(data[countryB]['total population']);
}
