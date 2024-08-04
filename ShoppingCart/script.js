let products = [
    {
        pName: "product1",
        pPrice: 100,
        count: 0
    },
    {
        pName: "product2",
        pPrice: 200,
        count: 0
    },
    {
        pName: "product3",
        pPrice: 300,
        count: 0
    },
];

let container1 = document.querySelector('.container1');
let container2 = document.querySelector('.container2');

products.forEach(function (ele, index) {
    let productsDisplay = document.createElement('div');
    productsDisplay.classList.add('product');
    productsDisplay.innerHTML = `
        <div>
            <span>${ele.pName}</span>
            <span>${ele.pPrice}</span>
        </div>
        <div class="buttons">
            <button class="minus" data-index="${index}">-</button>
            <span class="count">${ele.count}</span>
            <button class="plus" data-index="${index}">+</button>
        </div>
    `;
    container1.appendChild(productsDisplay);
});

let buttons = document.querySelectorAll('button');

buttons.forEach((ele) => {
    ele.addEventListener('click', (e) => {
        let index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('plus')) {
            products[index].count++;
        } else if (e.target.classList.contains('minus')) {
            if (products[index].count > 0) {
                products[index].count--;
            }
        }
        updateCountDisplay(index);
        updateCartDetails();
    });
});

function updateCountDisplay(index) {
    let countSpans = document.querySelectorAll('.count');
    countSpans[index].textContent = products[index].count;
}

function updateCartDetails() {
    container2.innerHTML = ''; // Clear the previous content
    let totalItems = 0;
    let totalPrice = 0;

    products.forEach(product => {
        if (product.count > 0) {
            totalItems += product.count;
            totalPrice += product.count * product.pPrice;

            let productDetail = document.createElement('div');
            productDetail.innerHTML = `${product.pName}: ${product.count} x ${product.pPrice} = ${product.count * product.pPrice}`;
            container2.appendChild(productDetail);
        }
    });

    let totalDisplay = document.createElement('div');
    totalDisplay.innerHTML = `Total Items: ${totalItems} <br> Total Price: ${totalPrice}`;
    container2.appendChild(totalDisplay);
}
