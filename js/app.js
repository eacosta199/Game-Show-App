const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const reset = document.getElementsByClassName("btn__reset")[0];
const overlay = document.getElementById("overlay");
const scoreboard = document.getElementById("scoreboard").querySelectorAll("img");

let missed = 0; 

const phrases = ["once in a blue moon", "go down in flames", "devil take the hindmost", "by the skin of your teeth", "beat around the bush"];

function getRandomPhraseAsArray(arr) {
  const randomNumber = Math.floor(Math.random()*arr.length);
  return arr[randomNumber].split("");
}

function addPhraseToDisplay(arr){
  const uList = phrase.querySelector("ul");
  for(let i = 0; i < arr.length; i++){
    let list_item = document.createElement("li");
    if(arr[i] === " ")
      list_item.classList.add("space");
    else
      list_item.classList.add("letter");
    
    list_item.textContent = arr[i]; 
    uList.append(list_item);
  }
}

function checkLetter(button){
  const letters = phrase.querySelectorAll(".letter");
  let match = null;
  for (let i=0; i < letters.length; i++){
    if(letters[i].textContent == button){
      letters[i].classList.add("show");
      match = button;
    }
  }
  return match;
}

qwerty.addEventListener("click", function (event) {
  let target = event.target;
  if(target.nodeName === "BUTTON" && !target.classList.contains("chosen")){
    target.classList.add("chosen");
    const letterFound = checkLetter(target.textContent);

    if (letterFound === null) {
      missed++;
      scoreboard[scoreboard.length-(missed)].src ="/images/lostHeart.png";      
    }
    checkWin();
  }  
});

function checkWin() {
  const letterElements = document.querySelectorAll("li.letter");
  const letterShow = document.querySelectorAll("li.show");

  if (letterShow.length === letterElements.length){
    overlay.querySelector("h2").textContent = "YOU WIN!";
    overlay.classList.add("win");
    overlay.style.display = "flex";
  }else if (missed > 4){
    overlay.querySelector("h2").textContent = "YOU LOSE!";
    overlay.classList.add("lose");
    overlay.style.display = "flex";
  }
}

reset.addEventListener("click", function (){
  overlay.style.display = "none";

  missed = 0;
  phrase.querySelector("ul").innerHTML = "";
  const showList = document.querySelectorAll("li.show");
  const chosenList = document.querySelectorAll("button.chosen");
  const triesList = document.querySelectorAll(".tries img");

  for (let i = 0; i < showList.length; i++){
    showList[i].classList.remove("show");
  }
  for (let i = 0; i < chosenList.length; i++){
    chosenList[i].classList.remove("chosen");
  }
  for (let i = 0; i < triesList.length; i++){
    triesList[i].src = "/images/liveHeart.png";
  }

  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

});


