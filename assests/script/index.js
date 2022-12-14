'use strict';
/*-------------------------------------
    Kunal Mittal

    Typing Master

---------------------------------------- */

import { select , onEvent,getElement , print} from './utilis.js';
import { Score } from './Score.js';


const text = select('.text');
const timerOne = select('.timer');
let display = select('.para');
const btn = select('.btn');
let hit1 = select('.hits');
let result = select('.result');
const restart = select('.restart');
const boardBtn = select('.board');
const scoreboard = select('.score-board');
let scoreArray = [];
let scoreData = select('.score');
let scoreList = select('.list');
let whole = select('.score-board score');

const music = new Audio('./assests/media/sound.mp3');
music.type = 'audio/mp3;'

const hitSound = new Audio('./assests/media/hit.wav');
hitSound.type = 'audio/wav;'

text.disabled = true;
let timerCount = 25;

function save() {
    let rank = 1;
    let percentageScore = Math.floor((hits / 90 ) * 100).toFixed(2);
    const scoreArray = JSON.parse(localStorage.getItem('scoreArray')) || [];

    const score = {
        
        hits : hits,
        percentage : percentageScore
    };

    scoreArray.push(score);
    console.log(scoreArray);

    scoreArray.sort((a,b) => b.hits - a.hits);

    scoreArray.splice(9);

    localStorage.setItem('scoreArray',JSON.stringify(scoreArray));
    if(localStorage.length > 0 ){
    scoreList.innerHTML = scoreArray.map(score => {
        return ` 
                   
        <li><span># </span>${rank++}   &nbsp&nbsp&nbsp&nbsp ${score.hits} words &nbsp&nbsp&nbsp&nbsp ${score.percentage}%</li></br>
                `
                    
                

    }).join('');

    } else {
        return ;
    }
    
}




function timer() {
    
    let counter = setInterval(function() {
        timerCount = timerCount-1;
        timerOne.innerHTML =` <i class="fa-solid fa-clock"></i> Time left: ${timerCount} s` ;

        if(timerCount <= 0){
            timerOne.innerText = 'OOPS !';
            display.innerText ='';
          
            text.value = '';
            music.pause();
            score();
            btn.style.visibility = 'hidden';
            scoreboard.style.visibility = 'visible';
    save();
            // whole.style.visibility = 'visible';
            // restart.style.visibility = 'visible';

        }
    }, 1000)
    
    
}
     




let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
            'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
            'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
            'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
            'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
            'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
            'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
            'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
            'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
            'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
            'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
            'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
            'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
            'keyboard', 'window'];

let wordsCopy = [...words];

 function shufle() {
         let rsm = Math.floor(Math.random() * wordsCopy.length);
         display.innerText = wordsCopy[rsm];
    
         wordsCopy.splice(rsm, 1);
    }


let hits = 0;
function inputValue(){
    
    let data = text.value.toLowerCase().trim();
    
    if(data === display.innerText ){
        console.log('hello');
        hits++;
        hit1.innerText= ` Hits: ${hits}`;
        text.value = '';
        shufle();
        music.pause();
        hitSound.play();
        music.play();
    } 
}
let date = new Date();
let currDate = date.toString().substring(4,15);

function calpercentage(){
    let percentage = ((hits / 90 ) * 100).toFixed(2);
    return percentage;
}

function score() {
    const score = new Score(currDate, hits, calpercentage());
    result.innerText = `${score.getInfo()}`;
}

onEvent('click',btn,function() {
    text.disabled = false;
    text.focus();   
    timer();
    music.play();
    shufle();
    
    inputValue();
    scoreboard.style.visibility = 'hidden';
    
    

});


text.addEventListener('keyup', inputValue)

onEvent('click',boardBtn,function(){
    scoreboard.style.visibility = 'visible';
    save();

    
    // console.log(`${score.hits}`);
    
});
    


