const ctx = document.getElementById('chart');

let portfolioChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['bitcoin', 'ethereum', 'solana'],
        datasets: [{
            label: 'Value USD:',
            data: [27000, 1800 * 10, 20 * 500],
        }]
    }
});

console.log('fuck yeah sucka');

// Get the buttons by their ids
const buyButton = document.getElementById('buyButton');
const sellButton = document.getElementById('sellButton');
const refreshButton = document.getElementById('refreshButton');

// Buy button
function handleBuyClick() {
    fetch('/api/portfolio/buy')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Sell button
function handleSellClick() {
    fetch('/api/portfolio/sell')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Refresh button
function handleRefreshClick() {
    fetch('/api/portfolio/refresh')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Add event listeners to the buttons
buyButton.addEventListener('click', handleBuyClick);
sellButton.addEventListener('click', handleSellClick);
refreshButton.addEventListener('click', handleRefreshClick);
