let submit_btn = document.getElementById('submit');
let guess_bar = document.getElementById('guessBar');
let guessButton = document.getElementById('guess');
let randomPokemon;

var types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
var generations = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii',];

let hint = document.getElementById("hintButton");
let hintType = [getGeneralHintOne, getGeneralHintTwo, generationHint, getFirstLetter, getSpriteHint];
let hintNum = 0; 

window.onload = function() {
	loadAllPokemon();

 var typesList = document.getElementById('allTypes');
	for(var item of types){
		var option = document.createElement('option');
		option.value = item;
		typesList.appendChild(option);
	};
	
	var generationsList = document.getElementById('allGenerations');
	for(var item of generations){
		var option = document.createElement('option');
		option.value = item;
		generationsList.appendChild(option);
	};

};

function hintClicked() {
    /*if(hintNum < hintType.length) {
      hintType[hintNum]();
      hintNum++;
    } else {
      console.log("no hints left");
    }*/
	
 };
 

function loadAllPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1126')
    .then(response => response.json())
    .then(data => getRandomPokemon(data));
}

function getRandomPokemon(data) {
   let currentGuess = 0;
  let pokemonArray = [];
  Object.values(data.results).forEach(item => {
    pokemonArray.push(item.name);
    let eachLabelForText = document.createElement("option");
    eachLabelForText.for = "guessBar";
    eachLabelForText.value = item.name;
    //console.log(item);
    //document.getElementById("pokemon").appendChild(eachLabelForText);
  });
  
  let randomNumberForPokemon = Math.floor(Math.random() * (data.results.length + 1));
  randomPokemon = data.results[randomNumberForPokemon].name;
  
  if(randomPokemon.includes('-')){
	let x = randomPokemon.indexOf('-');
	 console.log(randomPokemon);
	randomPokemon = randomPokemon.substring(0,x);
	console.log(x);
	console.log(randomPokemon.length);
  }
	
  console.log(randomPokemon);
  document.getElementById('quizPokemon').innerHTML = randomPokemon;

  function submitClicked() {

    if(pokemonArray.includes(guess_bar.value)) {
      if(guess_bar.value == randomPokemon) {
        guess_bar.placeholder = "Who is that Pokemon . . ."
        currentGuess++;
        showEndBox(currentGuess);
      } else {
        let guess_log = document.querySelector('.guess-log');
        currentGuess++;
        let eachGuess = document.createElement('div');
        eachGuess.classList.add('guess');
        eachGuess.style.marginBottom = '21px';
        guess_log.appendChild(eachGuess);
        let wrongX = document.createElement("span");
        wrongX.innerText = "X";
        wrongX.style.float = "right";
        wrongX.style.color = "red";
        wrongX.style.fontSize = "1.8rem";
        wrongX.style.transform = "translate(-20px, -37px)";
        wrongX.style.textTransform = "bold";

        let guess_text = document.createElement('p')
        guess_text.innerText = guess_bar.value;
        eachGuess.appendChild(guess_text);
        eachGuess.appendChild(wrongX);
        
        
        guess_bar.placeholder = "Who is that Pokemon . . ."
      }
    } else {
      guess_bar.placeholder = "Not a valid Pokemon!"
    }

    guess_bar.value = '';
  };
  
	
}//get random pokemon

function guessFetch1(){
	
	fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessHeight(data) 
    );
}
function guessFetch4(){
     fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessType(data) 
    );
}

function guessFetch3(){
	fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessGeneration(data) 
    );
}

function guessFetch2(){	
	fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessColor(data) 
    );
}	

function guessFetch5(){	
	fetch("https://pokeapi.co/api/v2/pokemon-species/" + randomPokemon + "/" )
	.then(response => response.json())
    .then(data => guessCapture(data) 
    );
}	

function guessHeight(data){
	var heightGuess = document.getElementById("Q1").value;
	let heightAnswer = data.height * 10;
	
	console.log(data);
	if (heightGuess == heightAnswer){
	   console.log("that is the correct height");
		//document.getElementById("Q1") = "The height of a " + randomPokemon + " is " + heightAnswer + "!";//not working
		document.getElementById("Q1").style.backgroundColor = "#92C8AB";
	} else {
		if (heightGuess > heightAnswer){
		console.log("the height is shorter than " + heightGuess);
		document.getElementById("Q1").style.backgroundColor = "#e35b5b";
		
		} else {
			console.log("the height is taller than " + heightGuess);
			document.getElementById("Q1").style.backgroundColor = "#e35b5b";
		}
	}
	
}

function guessColor(data){
	var colorGuess = document.getElementById("Q2").value;
	let colorAnswer = data.color.name;
	
	console.log(data);
	
	if (colorGuess == colorAnswer){
		console.log("that is the correct color");
		document.getElementById("Q2").style.backgroundColor = "#92C8AB";
	} else {
	  console.log("that is the wrong color");
	  document.getElementById("Q2").style.backgroundColor = "#e35b5b";
	}
}

function guessGeneration(data){
	var generationGuess = document.getElementById("Q3").value;
	let generationAnswer = data.generation.name;
	
	console.log(data);
	
	
	if (generationGuess == generationAnswer){
		console.log("that is the correct generation");
		document.getElementById("Q3").style.backgroundColor = "#92C8AB";
	} else {
	  console.log("that is the wrong generation");
	  document.getElementById("Q3").style.backgroundColor = "#e35b5b";
	}
}

function guessType(data){
	var typeGuess = document.getElementById("Q4").value;
	let typeAnswer = data.types[0].type.name;
	
	console.log(data);
	
	if (typeGuess == typeAnswer){
		console.log("that is the correct type");
		document.getElementById("Q4").style.backgroundColor = "#92C8AB";
	} else {
	  console.log("that is the wrong type");
	  document.getElementById("Q4").style.backgroundColor = "#e35b5b";
	}
}

function guessCapture(data){
	var captureGuess = document.getElementById("Q5").value;
	let captureAnswer = data.capture_rate;
	
	console.log(data);
	if (captureGuess == captureAnswer){
	   console.log("that is the correct capture rate");
	
		document.getElementById("Q5").style.backgroundColor = "#92C8AB";
	} else {
		if (captureGuess > captureAnswer){
		console.log("the capture rate is smaller than " + captureGuess);
		document.getElementById("Q5").style.backgroundColor = "#e35b5b";
		
		} else {
			console.log("the capture rate is larger than " + captureGuess);
			document.getElementById("Q5").style.backgroundColor = "#e35b5b";
		}
	}
}



function showEndBox(currentGuess) {
  console.log(currentGuess);
}





//HINTS
function generationHint() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/")
    .then(response => response.json())
    .then(data => generation(data) 
         );
}

function getGeneralHintOne(){
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/")
    .then(response => response.json())
    .then(data => typeOne(data) 
         );
}

function getGeneralHintTwo(){
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
    .then(response => response.json())
    .then(data => typeTwo(data) 
         );
}

function getFirstLetter(){
  console.log(randomPokemon.charAt(0));
}

function getSprite(){
  console.log("g");
  // fetch(" https://pokeapi.co/api/v2/pokemon-form/" + randomPokemon + "/" )
  //   .then(response => response.json())
  //   .then(data => spriteHint(data) 
  //        );
}

function typeOne(data) {
  //a or an
  console.log(data.types[0].type.name);

}



function typeTwo(data) {
  try {
    console.log(data.types[1].type.name);
  } catch {
    console.log("single type");
  }
}

function generation(data) {
  console.log(data.species.name);
}


function getSpriteHint() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/" )
    .then(response => response.json())
    .then(data => spriteHint(data) 
         );
}


function spriteHint(data) {
  console.log(data.sprites.front_default);
}






