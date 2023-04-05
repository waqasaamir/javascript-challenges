//Challenge 1
function ageInDays() {
  var birthYear = prompt("What year were you born in??");
  var ageInDayss = (2023 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " days old."
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

//Challenge 2
function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

//Challenge 3
function rpsGame(yourChoice) {
  var humanChoice, botChoice;

  humanChoice = yourChoice.id;

  botChoice = botChoiceGenerator();

  result = decideWinner(humanChoice, botChoice);

  message = finalMessage(result);

  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function botChoiceGenerator() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

function decideWinner(humanChoice, botChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  var yourScore = rpsDatabase[humanChoice][botChoice];
  var botScore = rpsDatabase[botChoice][humanChoice];

  return [yourScore, botScore];
}

function finalMessage([yourScore]) {
  if (yourScore === 0) {
    return { message: "You Lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied!", color: "yellow" };
  } else {
    return { message: "You Won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  var botDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    ";font-size: 70px;padding: 30px; '>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Chanllenge 4
var allButtons = document.getElementsByTagName("button");
var copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
  copyAllButtons.push(allButtons[i].classList[1]);
}
function buttonColorChange(selectedButton) {
  if (selectedButton.value === "red") {
    buttonsRed();
  } else if (selectedButton.value === "green") {
    buttonsGreen();
  } else if (selectedButton.value === "random") {
    buttonsRandom();
  } else if (selectedButton.value === "reset") {
    buttonsReset();
  } else if (selectedButton.value === "yellow") {
    buttonsYellow();
  }
}
function buttonsRed() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add("btn-success");
  }
}
function buttonsYellow() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add("btn-warning");
  }
}
function buttonsReset() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(copyAllButtons[i]);
  }
}
function buttonsRandom() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  for (let i = 0; i < allButtons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(choices[randomNumber]);
  }
}

//Challenge 5
let blackjackGame = {
        you: { 
                    scoreSpan: "#your-blackjack-result", 
                    div: "#your-box", 
                    score: 0, 
             },
        dealer: {
                    scoreSpan: "#dealer-blackjack-result",
                    div: "#dealer-box",
                    score: 0,
                },
        cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
        cardsMap: {
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    10: 10,
                    J: 10,
                    Q: 10,
                    K: 10,
                    A: [1, 10],
                 },
         wins: 0,
         losses: 0,
         draws: 0,
         isStand: false,
         turnsOver: false,
         isHit: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");
const lossSound = new Audio("static/sounds/aww.mp3");
const winSound = new Audio("static/sounds/cash.mp3");

document
  .querySelector("#blacjack-hit-button")
  .addEventListener("click", blackjackhit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackhit() {

  if (blackjackGame["isStand"] === false) {
    blackjackGame['isHit'] = true;
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }

}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "#ffffff";
    document.querySelector("#dealer-blackjack-result").style.color = "#ffffff";
    document.querySelector("#blackjack-result").textContent = "Let's Play!";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["turnsOver"] = false;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BURST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
   if(blackjackGame['isHit'] === true){
    blackjackGame['isStand'] = true;
    blackjackGame['isHit'] = false;

    if(YOU['score'] > 21){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(900);

        blackjackGame["turnsOver"] = true;
        let winner = computeWinner();
        showResult(winner);

        return;
    }
    while((DEALER['score'] < 16 || YOU['score'] >= DEALER['score']) &&  blackjackGame['isStand'] === true)
    {
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(900);
        if(DEALER['score'] > YOU['score'])
        {
                blackjackGame["turnsOver"] = true;
                let winner = computeWinner();
                showResult(winner);
        
                return;
        }
        if(DEALER['score'] === YOU['score'])
        {
                blackjackGame["turnsOver"] = true;
                let winner = computeWinner();
                showResult(winner);
        
                return;
        }
    }
        blackjackGame["turnsOver"] = true;
        let winner = computeWinner();
        showResult(winner);
   }
}
//update
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    //Condition: Higher score than Dealer or Dealer BURST
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      console.log("You Won!");
      winner = YOU;
      blackjackGame["wins"]++;
    } else if (YOU["score"] < DEALER["score"]) {
      console.log("You Lost!");
      winner = DEALER;
      blackjackGame["losses"]++;
    } else if (YOU["score"] === DEALER["score"]) {
      console.log("You Drew!");
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    //Condition:When you burst but dealer doesn't
    console.log("You Lost!");
    winner = DEALER;
    blackjackGame["losses"]++;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    //Condition: When you and Dealer both burst
    console.log("You Drew!");
    blackjackGame["draws"]++;
  }
  console.log("Winner is", winner);
  return winner;
}
function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      winSound.play();
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won!";
      messageColor = "green";
    } else if (winner === DEALER) {
      lossSound.play();
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You Lost!";
      messageColor = "red";
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You Drew!";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
