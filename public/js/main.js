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

// Fetch API functions
async function handleApiCall(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Buy button
async function handleBuyClick() {
    const data = await handleApiCall('/api/portfolio/buy');
    console.log(data);
}

// Sell button
async function handleSellClick() {
    const data = await handleApiCall('/api/portfolio/sell');
    console.log(data);
}

// Refresh button
async function handleRefreshClick() {
    const data = await handleApiCall('/api/portfolio/refresh');
    console.log(data);
}

// Define buttons
const buyButton = document.querySelector('.btn-success');
const sellButton = document.querySelector('.btn-danger');
const refreshButton = document.querySelector('.btn-info');

// Add event listeners to the buttons
buyButton.addEventListener('click', handleBuyClick);
sellButton.addEventListener('click', handleSellClick);
refreshButton.addEventListener('click', handleRefreshClick);
