console.log(literacy)


//console.log(ectotal)

ansArray = [];
const keyLiteracy = Object.keys(literacy) //makes a list consisted of the keys(countries) in ectotal 
for (let i=1;i<=3;i++){


var random = Math.floor(Math.random()*keyLiteracy.length)
console.log(random)

console.log(keyLiteracy)
var txt = keyLiteracy[random] //assigns a random country to txt
console.log(txt)
$('#country'+i).text(txt) //use jquery to show random country in html
	
	
var random = ansRandom();
console.log(random)
var correctAns;



if (random == 0){
	console.log("asdf")
	
	var correctAns = highestAns(i);
	ansArray.push(correctAns);
	console.log(ansArray)
}
else if(random == 1){
	console.log("fdsa")
	
	var correctAns = secondHighestAns(i);
	ansArray.push(correctAns);
	console.log(ansArray)
}
else if(random ==2){
	
	var correctAns = secondLowestAns(i);
	ansArray.push(correctAns);
	console.log(ansArray)
}
else if(random==3){
	
	var correctAns = lowestAns(i);
	ansArray.push(correctAns);
	console.log(ansArray)
}
}




function shuffle(array) {
	  let currentIndex = array.length;

	  // While there remain elements to shuffle...
	  while (currentIndex != 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		  array[randomIndex], array[currentIndex]];
	  }
	}


function highestAns(num){
	var ans = parseInt(literacy[txt][1]) //gets the ectotal value
	var ansCurrency = literacy[txt][2] //gets the currency
	console.log(ans)
	var ansArray = [num+'A',num+'B',num+'C',num+'D']
	
	
	shuffle(ansArray)
	console.log(ansArray[0])
	
	$("label[for*="+ansArray[0]+"]").text(Math.round(ans)+" "+ansCurrency)
	$("label[for*="+ansArray[1]+"]").text(Math.round(0.75*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[2]+"]").text(Math.round(0.5*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[3]+"]").text(Math.round(0.25*ans)+" "+ansCurrency) 
	
	return ansArray[0]
}

function lowestAns(num){
	var ans = parseInt(ectotal[txt][1])
	var ansCurrency = ectotal[txt][2]
	var ansArray = [num+'A',num+'B',num+'C',num+'D']
	
	
	shuffle(ansArray)
	console.log(ans)
	$("label[for*="+ansArray[0]+"]").text(Math.round(2*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[1]+"]").text(Math.round(1.5*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[2]+"]").text(Math.round(1.25*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[3]+"]").text(Math.round(ans)+" "+ansCurrency)
	
	return ansArray[3]
}

function secondHighestAns(num){
	var ans = parseInt(ectotal[txt][1])
	var ansCurrency = ectotal[txt][2]
	var ansArray = [num+'A',num+'B',num+'C',num+'D']
	
	
	shuffle(ansArray)
	console.log(ans)
	$("label[for*="+ansArray[0]+"]").text(Math.round(1.5*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[1]+"]").text(Math.round(ans)+" "+ansCurrency)
	$("label[for*="+ansArray[2]+"]").text(Math.round(0.75*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[3]+"]").text(Math.round(0.5*ans)+" "+ansCurrency)
		
	return ansArray[1]
}

function secondLowestAns(num){
	var ans = parseInt(ectotal[txt][1])
	var ansCurrency = ectotal[txt][2]
	var ansArray = [num+'A',num+'B',num+'C',num+'D']
	
	
	shuffle(ansArray)
	console.log(ans)
	$("label[for*="+ansArray[0]+"]").text(Math.round(1.5*ans)+" "+ansCurrency) 
	$("label[for*="+ansArray[1]+"]").text(Math.round(1.25*ans)+" "+ansCurrency)
	$("label[for*="+ansArray[2]+"]").text(Math.round(ans)+" "+ansCurrency)	
	$("label[for*="+ansArray[3]+"]").text(Math.round(0.75*ans)+" "+ansCurrency) 
	
	return ansArray[2]
}

function ansRandom(){
	var random = Math.floor(Math.random()*4)
	return random
}




s = document.getElementById("submit");
s.addEventListener("click", submitClick);
s.addEventListener("mouseover", submitHover);
s.addEventListener("mouseout", submitDefault);

c = document.getElementById("restart");
c.addEventListener("click", restart);

var score = 0;
var checClick = false;
function submitHover(){
	this.value = "Submit!"
}

function submitDefault(){
	this.value = "Submit"
}

function submitClick(){
	console.log($('#1B'))
	console.log($('#1B')[0])
	/*checClick = true;*/
	s.style.display = 'none';
	
	if(document.getElementById(ansArray[0]).checked) {
		score++;
	}
	
	if(document.getElementById(ansArray[1]).checked) {
		score++;
	}
	
	if(document.getElementById(ansArray[2]).checked) {
		score++;
	}
	
	alert("Quiz submitted! "+ score+"/10 was correct")
	alert("Restart the test.")
}

function restart(){
	location.reload();
}
