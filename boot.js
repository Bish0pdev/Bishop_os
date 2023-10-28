// Your ASCII art boot-up page
const bootUpArt = `
/$$       /$$           /$$                                                     
| $$      |__/          | $$                                                      
| $$$$$$$  /$$  /$$$$$$$| $$$$$$$   /$$$$$$   /$$$$$$           /$$$$$$   /$$$$$$$
| $$__  $$| $$ /$$_____/| $$__  $$ /$$__  $$ /$$__  $$         /$$__  $$ /$$_____/
| $$  | $$| $$|  $$$$$$ | $$  | $$| $$  | $$| $$  | $$        | $$  | $$|  $$$$$$ 
| $$  | $$| $$ |____  $$| $$  | $$| $$  | $$| $$  | $$        | $$  | $$ |____  $$
| $$$$$$$|| $$ /$$$$$$$|| $$  | $$|  $$$$$$|| $$$$$$$/        |  $$$$$$/ /$$$$$$$/
|_______| |__||_______| |__|  |__| |______| | $$____|  |$$$$$$ |______| |_______/ 
                                            | $$      |______/                    
                                            | $$                                  
                                            |__/         
`;

// Function to display the boot-up page
function displayBootUp() {
    const bootUpElement = document.getElementById('boot-up');
    bootUpElement.textContent = bootUpArt;
}

// Display the boot-up page when the page loads
window.onload = function () {
    displayBootUp();
    startAnimation();
}

// Function to start the slide-up animation
function startAnimation() {
    const bootUpElement = document.getElementById('boot-up');
    bootUpElement.style.animation = 'slide-up 5s linear infinite'; // Adjust duration as needed
}

// Function to stop the slide-up animation
function stopAnimation() {
    const bootUpElement = document.getElementById('boot-up');
    bootUpElement.style.animation = 'none';
}

// Start main application after animation duration
setTimeout(function () {
    stopAnimation();
    // Start main application
    startMainApplication();
}, 5000); // Adjust the delay to match the animation duration

// Function to start main application
function startMainApplication() {
    // Remove the boot-up page
    const bootUpContainer = document.getElementById('boot-up-container');
    bootUpContainer.style.display = 'none';

    // Navigate to a different page
    window.location.href = 'terminal.html'; // Replace with desired URL
}

// Add a click event listener to the boot-up-container
const bootUpContainer = document.getElementById('boot-up-container');
bootUpContainer.addEventListener('click', startMainApplication);