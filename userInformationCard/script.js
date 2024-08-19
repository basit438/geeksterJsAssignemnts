
function promptUserInfo() {
    const userInfo = {
        firstName: prompt("Enter your first name:"),
        lastName: prompt("Enter your last name:"),
        country: prompt("Enter your country:"),
        phoneNumber: prompt("Enter your phone number:"),
        state: prompt("Enter your state:"),
        city: prompt("Enter your city:"),
        village: prompt("Enter your village:")
    };

    localStorage.setItem("userInformation", JSON.stringify(userInfo));
    displayUserInfo(userInfo);
}


function displayUserInfo(userInfo) {
    document.getElementById("first-name").textContent = userInfo.firstName;
    document.getElementById("last-name").textContent = userInfo.lastName;
    document.getElementById("country").textContent = userInfo.country;
    document.getElementById("phone-number").textContent = userInfo.phoneNumber;
    document.getElementById("state").textContent = userInfo.state;
    document.getElementById("city").textContent = userInfo.city;
    document.getElementById("village").textContent = userInfo.village;
}

function loadUserInfo() {
    const storedUserInfo = localStorage.getItem("userInformation");
    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        displayUserInfo(userInfo);
    } else {
        promptUserInfo();
    }
}

function updateUserInfo() {
    const updateConfirmation = confirm("Do you want to update your information?");
    if (updateConfirmation) {
        promptUserInfo();
    }
}


document.getElementById("info-card").addEventListener("click", updateUserInfo);


window.addEventListener("load", loadUserInfo);
