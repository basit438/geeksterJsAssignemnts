let container = document.querySelector(".container");
let orderBtn = document.querySelector(".order-btn");
let output = document.querySelector(".output");
let loader = document.querySelector(".loader");
let error = document.querySelector(".error");
let orders = document.querySelectorAll("input");

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
}

function placeOrder() {
    // Check if no items are selected
    if (!orders[0].checked && !orders[1].checked && !orders[2].checked) {
        error.innerText = "Please select at least one item";
        return;
    }

    // Show loader
    loader.innerHTML = `<p>Preparing your order...</p>
    <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading...">
    `;
    loader.style.display = "block";

    setTimeout(() => {
        // Hide loader
        loader.style.display = "none";

        // Filter and map selected items
        let orderFood = Array.from(orders).filter((order) => order.checked).map((order) => order.value);
        let order = orderFood.join(", ");

        // Generate an order number
        let orderNumber = generateOrderNumber();

        // Set image based on the order
        let orderImage = "";
        if (order.includes("Burger")) {
            orderImage += `<img src="./istockphoto-520410807-612x612.jpg" alt="Burger">`;
        }
        if (order.includes("Fries")) {
            orderImage += `<img src="./French-fries.webp" alt="Fries">`;
        }
        if (order.includes("Pizza")) {
            orderImage += `<img src="./istockphoto-1442417585-612x612.jpg" alt="Pizza">`;
        }

        // Display the order with the image and order number
        output.innerHTML = `<div class="order">
            <h2>Your Order number #${orderNumber}</h2>
            <h3>Enjoy your ${order}</h3>
            ${orderImage}
        </div>`;
    }, 3000);
}

orderBtn.addEventListener("click", placeOrder);
