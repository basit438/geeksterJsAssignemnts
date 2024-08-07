let emoji_container = document.getElementById("emoji-container");
let search_field = document.getElementById("searchField");

function displayEmoji(searchQuery = "") {
    let filteredList = emojiList.filter(function(emoji) {
        if (searchQuery.length === 0) {
            return true;
        }
        return emoji.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    emoji_container.innerHTML = "";
    filteredList.forEach(function(emoji) {
        let new_div = document.createElement("div");
        let new_emoji = document.createElement("span");
       

        
        new_emoji.innerText = emoji.emoji;

        new_div.appendChild(new_emoji);
      

        emoji_container.appendChild(new_div);
    });
}

window.addEventListener("load", () => displayEmoji());

search_field.addEventListener("keyup", (e) => {
    let value = e.target.value;
    displayEmoji(value);
});
