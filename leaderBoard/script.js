let data = [];

const fName = document.querySelector('.firstName');
const lName = document.querySelector('.lastName');
const country = document.querySelector('.country');
const score = document.querySelector('.score');
const addBtn = document.querySelector('.add');
const board = document.querySelector('#leaderboard');
const search = document.querySelector('#search');

function updateDataOnUi() {
    let showData = "";
    data.sort((p1, p2) => p2.score - p1.score);

    let filteredData = data.filter(item =>
        item.fname.toLowerCase().includes(search.value.toLowerCase()) ||
        item.lname.toLowerCase().includes(search.value.toLowerCase())
    );

    filteredData.forEach((item, index) => {
        showData += `<tr class="personData">
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.country}</td>
            <td>${item.score}</td>
            <td>
                <button class="plus" data-index="${index}">+5</button>
                <button class="minus" data-index="${index}">-5</button>
                <button class="delete" data-index="${index}">delete</button>
            </td>
        </tr>`;
    });
    board.innerHTML = showData;
}

function handleButtonClick(e) {
    if (e.target.tagName !== 'BUTTON') return;

    const index = e.target.getAttribute('data-index');

    if (index === null) return; // Ensure data-index is present

    if (e.target.classList.contains('plus')) {
        data[index].score += 5;
    } else if (e.target.classList.contains('minus')) {
        data[index].score -= 5;
    } else if (e.target.classList.contains('delete')) {
        data.splice(index, 1);
    }

    updateDataOnUi();
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (fName.value === "" || lName.value === "" || country.value === "" || score.value === "") {
        alert("Please fill all the fields");
    } else {
        const playerObj = {
            fname: fName.value,
            lname: lName.value,
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

board.addEventListener('click', handleButtonClick);

// Initial call to render any existing data
updateDataOnUi();
