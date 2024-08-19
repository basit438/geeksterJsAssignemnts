let resultDiv = document.querySelector(".dynamic-div");
let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search");
let typeFilter = document.querySelector("#byType");
let btnTypeFilter = document.querySelector("#btn-typeFilter");
let allCards = []; // Array to hold all card elements

let getCards = async () => {
  for (let i = 1; i <= 250; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let data = await response.json();
    displayCards(data);
  }
};

let displayCards = (data) => {
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  cardContainer.dataset.name = data.name; // Store name in data attribute
  cardContainer.dataset.type = data.types[0].type.name; // Store type in data attribute

  // Card Front
  let cardFront = document.createElement("div");
  cardFront.classList.add("card-front", data.types[0].type.name);

  let img = document.createElement("img");
  img.src = data.sprites.other.dream_world.front_default;
  cardFront.appendChild(img);

  let name = document.createElement("h3");
  name.innerText = data.name;
  cardFront.appendChild(name);

  let typeBadge = document.createElement("div");
  typeBadge.classList.add("type-badge");
  typeBadge.innerText = data.types[0].type.name;
  cardFront.appendChild(typeBadge);

  // Card Back
  let cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  let id = document.createElement("p");
  id.innerText = `ID: ${data.id}`;
  cardBack.appendChild(id);

  let height = document.createElement("p");
  height.innerText = `Height: ${data.height / 10} m`; 
  cardBack.appendChild(height);

  let weight = document.createElement("p");
  weight.innerText = `Weight: ${data.weight / 10} kg`; 
  cardBack.appendChild(weight);

  let ability = document.createElement("p");
  ability.innerText = `Ability: ${data.abilities[0].ability.name}`;
  ability.classList.add("ability");
  cardBack.appendChild(ability);

  // Append both front and back to the card container
  cardContainer.appendChild(cardFront);
  cardContainer.appendChild(cardBack);

  // Append card container to result div
  resultDiv.appendChild(cardContainer);
  allCards.push(cardContainer); // Store card element
};

let filterByType = (type) => {
  allCards.forEach(card => {
    if (type === "" || card.dataset.type === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

let filterByName = (name) => {
  allCards.forEach(card => {
    if (card.dataset.name.toLowerCase().includes(name.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

// Initialize cards
getCards();

// Event Listeners
searchBtn.addEventListener("click", () => {
  filterByName(searchInput.value);
});

btnTypeFilter.addEventListener("click", () => {
  filterByType(typeFilter.value);
});

// searchInput.addEventListener("input", () => {
//   filterByName(searchInput.value);
// });

// typeFilter.addEventListener("change", () => {
//   filterByType(typeFilter.value);
// });

let resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", () => {
  allCards.forEach(card => {
    card.style.display = "block";
  });
  typeFilter.value = "";
  searchInput.value = "";
});