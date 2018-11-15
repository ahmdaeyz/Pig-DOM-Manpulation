/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var roundScore ;
var dices ;
var scores;
var maxScore,gameState;
var playerActive; 
var dice1 = document.getElementById('dice-1');
var dice2 = document.getElementById('dice-2');
var newGame = document.getElementsByClassName('btn-new')[0];
var btnRoll = document.getElementsByClassName('btn-roll')[0];
var btnHold = document.getElementsByClassName('btn-hold')[0];
init();
// ===>Rolling dices event<===
btnRoll.addEventListener('click', function(){
if(gameState){
    rand1=(Math.floor(Math.random()*6)+1);
    rand2=(Math.floor(Math.random()*6)+1);
    dices[0]=rand1;
    dices[1]=rand2;
    rand2=(Math.floor(Math.random()*6)+1);
    dice1.setAttribute('src','dice-'+rand1+'.png');
    dice2.setAttribute('src','dice-'+rand2+'.png');
    roundScore+=rand1+rand2;
    document.getElementById('current-'+playerActive).textContent=roundScore;
    if(rand1===1||rand2===1){
        roundScore=0;
        document.getElementById('current-'+playerActive).textContent = roundScore;
        nextPlayer();
    }
}

});
// ===>Holding Score<===
btnHold.addEventListener('click',function(){
    if(gameState){   
        scores[playerActive]+=roundScore;
        roundScore=0;
        document.getElementById('current-'+playerActive).textContent = roundScore;
        document.getElementById('score-'+playerActive).textContent=scores[playerActive];
        nextPlayer();
        }
        if(scores[0]>=maxScore){
            document.getElementsByClassName('player-0-panel')[0].classList.toggle('winner');
            document.getElementById('name-0').textContent = 'Winner!';
            document.getElementsByClassName('player-1-panel')[0].classList.remove('active');
            dice1.style.display= 'none';
            dice2.style.display= 'none';
            gameState=false;
            newGame.style.display = 'block';
            }else if(scores[1]>=maxScore){
            document.getElementsByClassName('player-1-panel')[0].classList.toggle('winner');
            document.getElementById('name-1').textContent = 'Winner!';
            document.getElementsByClassName('player-0-panel')[0].classList.remove('active');
            dice1.style.display= 'none';
            dice2.style.display= 'none';
            gameState=false;
            newGame.style.display = 'block';
        }
    
});
// ===> instiniating a new game <===
newGame.addEventListener('click', function(){
init();
});
function init(){
roundScore = 0;
dices = [0,0];
scores = [0,0];
playerActive =0;
gameState = true;
dice1.style.display= 'none';
dice2.style.display= 'none';
newGame.style.display= 'none';
document.getElementsByClassName('player-0-panel')[0].classList.remove('active');
document.getElementsByClassName('player-1-panel')[0].classList.remove('active');
document.getElementsByClassName('player-0-panel')[0].classList.toggle('active');
maxScore = window.prompt('GAME RULES:\n'+
'- The game has 2 players, playing in rounds\n'+
'- In each turn, a player rolls the dices as many times as he whishes. Each result get added to his ROUND score\n'+
'- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\'s the next player\'s turn\n'+
'- The player can choose to \'Hold\', which means that his ROUND score gets added to his GLBAL score. After that, it\'s the next player\'s turn\n'+
'- The first player to reach 100 points on GLOBAL score wins the game\n'+
'Enter maximum score');
if(maxScore===null||maxScore===''){
    window.location.reload(false);
}
dice1.style.display = 'block';
dice2.style.display = 'block';
}
function nextPlayer(){
    document.getElementsByClassName('player-0-panel')[0].classList.toggle('active');
    document.getElementsByClassName('player-1-panel')[0].classList.toggle('active');
    playerActive === 1 ? playerActive = 0 : playerActive = 1; 
}
