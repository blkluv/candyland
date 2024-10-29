// Function to create a 44x44 map
function createMap() {
    const mapContainer = document.getElementById('map-container');
    const popup = document.getElementById('popup');
    const tooltip = createTooltip();

    // Load data from plots.json
    fetchData('data/plots.json')
        .then(data => {
            createGrid(data, mapContainer, tooltip);
        })
        .catch(error => console.error('Error loading data:', error));
}

// Helper function to create a tooltip
function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);
    return tooltip;
}

// Fetch data helper function
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${url}`);
            }
            return response.json();
        });
}

// Function to create a grid from data
function createGrid(data, mapContainer, tooltip) {
    for (let y = 118; y <= 161; y++) {
        for (let x = 178; x <= 221; x++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.x = x;
            square.dataset.y = y;

            const plot = data.find(p => p.x === x && p.y === y);
            if (plot) {
                square.style.backgroundImage = `url(${plot.image})`;
                square.dataset.hasImage = true;
            }

            square.addEventListener('mouseenter', (event) => handleSquareHover(event, x, y, tooltip));
            square.addEventListener('mouseleave', hideTooltip);
            square.addEventListener('click', () => handleSquareClick(plot));

            mapContainer.appendChild(square);
        }
    }
}

// Tooltip hover handling
function handleSquareHover(event, x, y, tooltip) {
    tooltip.style.display = 'block';
    tooltip.innerText = `Coordinates: (${x}, ${y})`;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'none';
}

// Handle square click
function handleSquareClick(plot) {
    const popup = document.getElementById('popup');
    if (plot) {
        populatePopup(plot);
        popup.style.display = 'flex';

        const buyButton = document.getElementById('mint-me-button');
        buyButton.href = plot.link;

        fetchData('data/paypal.json')
            .then(paypalData => {
                const rarity = plot["🌟 Rarity"];
                const paypalButton = document.getElementById('mint-paypal-button');
                paypalButton.href = paypalData.links[rarity] || '#';
            })
            .catch(error => console.error('Error loading PayPal links:', error));
    }
}

// Populate popup with plot details
function populatePopup(plot) {
    document.getElementById('popup-image').src = plot.image;
    document.getElementById('popup-title').innerText = `Land (${plot.x}, ${plot.y})`;
    document.getElementById('popup-district').innerText = plot["🌆 District"] || "BitVille District";
    document.getElementById('popup-rarity').innerText = plot["🌟 Rarity"];
    document.getElementById('popup-minerals').innerText = plot["💰 Minerals"];
    document.getElementById('popup-water').innerText = plot["💧 Water"];
    document.getElementById('popup-land-type').innerText = plot["🏠 Land Type"];
    document.getElementById('popup-income').innerText = plot["📈 Income"];
    document.getElementById('popup-view').innerText = plot["🌊 View"];
    document.getElementById('popup-storage').innerText = plot["📦 Storage"];
}

// Close popup button event
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// Open signup popup
function openSignupPopup() {
    document.getElementById('signup-popup').style.display = 'flex';
}

// Close signup popup
function closeSignupPopup() {
    document.getElementById('signup-popup').style.display = 'none';
}

// Handle sign-up
document.getElementById('signup-button').addEventListener('click', function() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim(); // Trim whitespace from email input

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    if (email && emailRegex.test(email)) {
        console.log("Sending email to:", email); // Debug: Check email being sent
        
        // Template parameters for EmailJS
        const templateParams = { to_email: email }; // Ensure your template has a parameter for this

        // Send email using EmailJS
        emailjs.send("service_rjwz0nv", "template_yra3s3a", templateParams)
            .then(response => {
                console.log("SUCCESS!", response.status, response.text);
                alert("Thank you for signing up!"); // Success message
                emailInput.value = ''; // Clear the input
                closeSignupPopup(); // Close the pop-up
            })
            .catch(error => {
                console.error("Error sending email:", error);
                alert("An error occurred while sending your email. Please try again later.");
            });
    } else {
        alert('Please enter a valid email address.'); // Alert for empty or invalid email input
    }
});

// Initialize on window load
window.onload = function() {
    openSignupPopup(); // Automatically open signup popup on page load
    createMap(); // Create the map

    // Check if the user is authenticated
    if (isAuthenticated()) {
        // Load the user's data or update the UI accordingly
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log("User authenticated:", profile);
        // Здесь вы можете обновить интерфейс, например, отобразить информацию о пользователе
    } else {
        // Если пользователь не аутентифицирован, вы можете выполнить какие-либо действия
        console.log("User not authenticated");
    }
};
