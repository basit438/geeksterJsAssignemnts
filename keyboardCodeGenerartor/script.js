let body = document.querySelector('body');
let displayKey = null;

body.addEventListener('keydown', (e) => {
    let keyPressed = e.key;
    let keyCode = e.keyCode;


    // Remove the previous message if it exists
    if (displayKey) {
        displayKey.remove();
    }

    // Create and display the new message
    displayKey = document.createElement('div');
    displayKey.innerHTML = `You pressed the ${keyPressed} key and its key code is ${keyCode}`;
    body.appendChild(displayKey);
});
