let hour = document.querySelector("#hour");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");

function updateTime(){
let currentTime = new Date();

let hr = currentTime.getHours();

let min  = currentTime.getMinutes();

let sec = currentTime.getSeconds();
hour.innerHTML = hr <10 ? "0:" + hr : `${hr}`;
minutes.innerHTML = min <10 ? "0:" + min :`:${min}`;    
seconds.innerHTML = sec <10? "0:" + sec : `:${sec}`;

}

  let displayTime = setInterval(updateTime, 1000);

  window.onload = function(){
    updateTime();
    displayTime();
  }


