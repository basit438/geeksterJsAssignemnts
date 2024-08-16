let displayJoke = document.getElementById("joke-div");
let btn = document.getElementById("jokeBtn");

async function getJoke() {
    let response = await fetch(`https://official-joke-api.appspot.com/jokes/random`);
    let data = await response.json();

    displayJoke.innerHTML = " ";
    let joke = document.createElement("div");

    joke.innerHTML = `<strong>Q:</strong> ${data.setup} <br><br> <strong>Ans:</strong> ${data.punchline}`;
    displayJoke.appendChild(joke);
}

btn.addEventListener("click", getJoke);
