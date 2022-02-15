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
//console.log('Human Choice:',humanChoice);

botChoice= botChoiceGenerator();
//console.log('Computer Choice:',botChoice);

result = decideWinner(humanChoice, botChoice);
//console.log(result);

message = finalMessage(result);
//console.log(message);

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
//front end part
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
    document.getElementById('flex-box-rps-div').appendChild(botDiv);



}