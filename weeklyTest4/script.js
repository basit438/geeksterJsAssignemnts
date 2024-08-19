let searchBox = document.getElementById("searchBox");
let results = document.getElementById("result");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function() {
    let inputVal = searchBox.value;

    let getResults = async function() {
        let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputVal}`);
        let data = await response.json();
        console.log(data.data);
        displayResults(data.data);
    }

    getResults();
});

let displayResults = function(data) {
    results.innerHTML = "";
    
    // Display the first 7 results
    data.slice(0, 6).forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card">
            <img src="${element.image}" alt="">
            <h3>${element.phone_name}</h3>
            <p>${element.slug}</p>
        </div>
        `;
        results.appendChild(div);
    });

    
    if (data.length > 7) {
        let viewAll = document.createElement("button");
        viewAll.innerText = "View All";
        viewAll.classList.add("view-all-btn");
        viewAll.addEventListener("click", function() {
            data.slice(7).forEach(element => {
                let div = document.createElement("div");
                div.innerHTML = `
                <div class="card">
                    <img src="${element.image}" alt="">
                    <h3>${element.phone_name}</h3>
                    <p class ="slug">${element.slug}</p>
                </div>
                `;
                results.appendChild(div);
            });
            // Remove the "View All" button after all results are displayed
            viewAll.remove();
        });
        results.appendChild(viewAll);
    }
}
