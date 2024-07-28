function toggleMode() {
    const body = document.body;
    const toggleText = document.getElementById('toggle-text');
    const toggleLogo = document.getElementById('toggle-logo');
    const heading = document.getElementById('heading');
    const paragraph = document.getElementById('paragraph');
    const content = document.getElementById('content');

    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleText.textContent = 'Switch to Bruce Wayne Mode';
        toggleLogo.src = 'https://cdn.mos.cms.futurecdn.net/7MzHKweGbbQ7AnRVVDxz78.jpg';
        heading.textContent = "Welcome to the Dark Knight's Realm";
        paragraph.textContent = 'Embrace the night and join Batman in his fight against crime.';
        content.style.background = 'rgba(0, 0, 0, 0.3)';
       
        
    } else {
        toggleText.textContent = 'Switch to Batman Mode';
        toggleLogo.src = 'https://i.pinimg.com/originals/3d/96/04/3d9604842e809f68a300f3131261f603.jpg';
        heading.textContent = 'Welcome to Gotham City';
        paragraph.textContent = 'Experience the vibrant life of Gotham during the day.';
        content.style.background = 'rgba(255, 255, 255, 0)';
        
    }
}

// Initial state setup
window.onload = function() {
    const toggle = document.getElementById('toggle');
    toggle.checked = false;
    toggleMode(); // Start in Bruce Wayne mode
};
