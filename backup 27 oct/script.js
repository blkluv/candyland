// Function to create a 44x44 map
function createMap() {
    const mapContainer = document.getElementById('map-container');
    const popup = document.getElementById('popup');
    const tooltip = document.createElement('div'); // Tooltip for coordinates
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip); // Append tooltip to body

    // Load data from plots.json
    fetch('data/plots.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Create a 44x44 grid
            for (let y = 118; y <= 161; y++) {
                for (let x = 178; x <= 221; x++) {
                    // Create an element for each square
                    const square = document.createElement('div');
                    square.classList.add('square');
                    square.dataset.x = x;
                    square.dataset.y = y;

                    // Find the corresponding plot by coordinates
                    const plot = data.find(p => p.x == x && p.y == y);
                    if (plot) {
                        // Set the background image for the square using template literals
                        square.style.backgroundImage = `url(${plot.image})`;
                        square.dataset.hasImage = true; // Indicate that there is an image
                    }

                    // Add hover event handler for tooltip
                    square.addEventListener('mouseenter', (event) => handleSquareHover(event, x, y));
                    square.addEventListener('mouseleave', () => hideTooltip());

                    // Add click event handler
                    square.addEventListener('click', () => handleSquareClick(plot));

                    // Append the square to the map container
                    mapContainer.appendChild(square);
                }
            }
        })
        .catch(error => console.error('Error loading data:', error));
}

// Show tooltip with coordinates
function handleSquareHover(event, x, y) {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'block';
    tooltip.innerText = `Coordinates: (${x}, ${y})`;
    tooltip.style.left = `${event.pageX + 10}px`; // Position tooltip 10px right from cursor
    tooltip.style.top = `${event.pageY + 10}px`;  // Position tooltip 10px below cursor
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'none';
}

// Handle click on square (already existing function)
function handleSquareClick(plot) {
    if (plot) {
        // Populate the popup with the plot information
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

        // Show the popup
        popup.style.display = 'flex'; // Make the popup visible

        // Update the buy button link with the plot link
        const buyButton = document.getElementById('mint-me-button');
        buyButton.href = plot.link; // Use the link from the data

        // Load PayPal links
        fetch('data/paypal.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(paypalData => {
                const rarity = plot["🌟 Rarity"];
                const paypalLink = paypalData.links[rarity]; // Get the corresponding PayPal link

                // Update the second button link
                const paypalButton = document.getElementById('mint-paypal-button');
                paypalButton.href = paypalLink; // Set PayPal link for the button
            })
            .catch(error => console.error('Error loading PayPal links:', error));
    }
}

// Close the popup when the close button is clicked
document.querySelector('.close-button').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Hide the popup
});

// Call the function to create the map grid
createMap();
