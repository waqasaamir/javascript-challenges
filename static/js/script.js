//Challenge 1
function ageInDays()
{  
    var birthYear= prompt('What year were you born in??');
    var ageInDayss= (2022-birthYear)*365;
    var h1= document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+ageInDayss+' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset()
{
    document.getElementById('ageInDays').remove();
}

//Challenge 2
function generateCat()
{
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);        
}

//Challenge 3
function rpsGame(yourChoice){
var humanChoice, botChoice;

humanChoice=yourChoice.id;

botChoice= botChoiceGenerator();

result = decideWinner(humanChoice, botChoice);

message = finalMessage(result);

rpsFrontEnd(yourChoice.id,botChoice,message);
}

function botChoiceGenerator(){
    return ["rock","paper","scissors"][Math.floor(Math.random() * 3)];
}

function decideWinner(humanChoice,botChoice){
    var rpsDatabase={
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0},
    }
    var yourScore=rpsDatabase[humanChoice][botChoice];
    var botScore=rpsDatabase[botChoice][humanChoice];

    return [yourScore,botScore];
}

function finalMessage([yourScore])
{
    if (yourScore===0){
        return {'message': 'You Lost!','color':'red'}
    } 
    else if (yourScore===0.5){
        return {'message': 'You Tied!','color':'yellow'}
    } 
    else {
        return {'message':'You Won!', 'color':'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage)
{
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv= document.createElement('div');
    var messageDiv= document.createElement('div');
    var botDiv= document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] +"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>"
    messageDiv.innerHTML= "<h1 style='color:"+finalMessage['color']+";font-size: 70px;padding: 30px; '>"+finalMessage['message']+"</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] +"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
}

// Chanllenge 4
 var allButtons= document.getElementsByTagName('button');
 var copyAllButtons = [];
 for(let i=0;i<allButtons.length;i++)
 {
     copyAllButtons.push(allButtons[i].classList[1]);
 }
 function buttonColorChange(selectedButton){
    if(selectedButton.value=== 'red')
    {
        buttonsRed();
    }else if(selectedButton.value=== 'green')
    {
        buttonsGreen();
    }else if(selectedButton.value=== 'random')
    {
        buttonsRandom();
    }else if(selectedButton.value=== 'reset')
    {
        buttonsReset();
    }
    else if(selectedButton.value=== 'yellow')
    {
        buttonsYellow();
    }
 }
 function buttonsRed(){
     for(let i=0; i<allButtons.length;i++)
     {
         allButtons[i].classList.remove(allButtons[i].classList[1]);
         allButtons[i].classList.add('btn-danger');
     }
 }
 function buttonsGreen(){
    for(let i=0; i<allButtons.length;i++)
    {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
function buttonsYellow(){
    for(let i=0; i<allButtons.length;i++)
    {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-warning');
    }
}
function buttonsReset(){

    for(let i=0; i<allButtons.length;i++)
    {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
function buttonsRandom(){
    let choices=['btn-primary','btn-danger','btn-success','btn-warning'];
    for(let i=0;i<allButtons.length;i++)
    {
        let randomNumber= Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }

}
//Challenge 5
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],

};
const YOU= blackjackGame['you'];
const DEALER= blackjackGame['dealer'];

const hitSound=new Audio('static/sounds/swish.m4a');


document.querySelector('#blacjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackhit(){
let card= randomCard();
console.log(card);
showCard(DEALER);
 showCard(YOU);
}
function randomCard(){
    let randomIndex= Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(activePlayer){
    let cardImage= document.createElement('img');
    cardImage.src='static/images/A.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}
function blackjackDeal(){
    let yourImages= document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

    for(let i=0; i < yourImages.length; i++)
    {
        yourImages[i].remove();
    } 
    for(let i=0; i < dealerImages.length; i++)
    {
        dealerImages[i].remove();
    }
}
