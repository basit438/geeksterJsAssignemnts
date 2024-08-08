let timer = document.querySelector('#timer');
let buttons = document.querySelector("#buttons");

let seconds = 0;
let minutes = 0;
let hours = 0;

let updateTimer;

buttons.addEventListener("click", function(e){
    if(e.target.classList.contains("play")){
        clearInterval(updateTimer);
        updateTimer = setInterval(function(){
            seconds += 1;
            if(seconds == 60){
                seconds = 0;
                minutes += 1;
                if(minutes == 60){
                    minutes = 0;
                    hours += 1;
                }
            }
            timer.innerText = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        },1000);
    } else if(e.target.classList.contains("stop")){
        clearInterval(updateTimer);
    } else if(e.target.classList.contains("restart")){
        clearInterval(updateTimer);
        seconds = 0;
        minutes = 0;
        hours = 0;
        timer.innerText = "00:00:00";
    }
});
