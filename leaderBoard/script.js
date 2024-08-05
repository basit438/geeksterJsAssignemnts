let data = [];

let fName = document.querySelector('.firstName');
let lName = document.querySelector('.lastName');
let country = document.querySelector('.country');
let score = document.querySelector('.score');
let addBtn = document.querySelector('.add');
let board = document.querySelector('#leaderboard');
let search = document.querySelector('#search');

function updateDataOnUi() {
    let showData = "";
     data.sort((p1,p2)=>{
        return p2.score - p1.score;
    })
    let filteredData = data.filter(item =>
        item.fname.toLowerCase().includes(search.value.toLowerCase()) ||
        item.lName.toLowerCase().includes(search.value.toLowerCase())
        
    );

    filteredData.forEach(function (item, index) {
        showData += `<tr class="personData">
            <td>${item.fname}</td>
            <td>${item.lName}</td>
            <td>${item.country}</td>
            <td>${item.score}</td>
            <td>
                <button class="plus">+5</button>
                <button class="minus">-5</button>
                <button class="delete">delete</button>
            </td>
        </tr>`;
    });
    board.innerHTML = showData;

    activeButtons();
}

function activeButtons() {
    let personData = document.querySelectorAll('.personData');
    personData.forEach(function (ele, index) {
        ele.addEventListener('click', (e) => {
            if (e.target.classList.contains("plus")) {
                data[index].score = parseInt(data[index].score) + 5;
                updateDataOnUi();
            } else if (e.target.classList.contains("minus")) {
                data[index].score = parseInt(data[index].score) - 5;
                updateDataOnUi();
            } else if (e.target.classList.contains("delete")) {
                data.splice(index, 1);
                updateDataOnUi();
            }
        });
    });
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (fName.value === "" || lName.value === "" || country.value === "" || score.value === "") {
        alert("Please fill all the fields");
    } else {
        let playerObj = {
            fname: fName.value,
            lName: lName.value,
            country: country.value,
            score: parseInt(score.value)
        };
        data.push(playerObj);
        updateDataOnUi();
        fName.value = "";
        lName.value = "";
        country.value = "";
        score.value = "";
    }
});

search.addEventListener('input', updateDataOnUi);
