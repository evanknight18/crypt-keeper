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
    const coinId = 'bitcoin'; // Replace this with the actual coin ID
    const quantity = 1; // Replace this with the actual quantity
    const response = await fetch('/api/portfolio/:id/coin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coinId, quantity }),
    });
    if (response.ok) {
        const updatedPortfolio = await response.json();
        updatePortfolio(updatedPortfolio);
    } else {
        console.error('Failed to buy coin');
    }
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

// logout (needs work)
const handleLogout = async (event) => {
    event.preventDefault();
   
    console.log('clicky click')
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
}

// Define buttons
const buyButton = document.querySelector('.btn-success');
const sellButton = document.querySelector('.btn-danger');
// const refreshButton = document.querySelector('.btn-info');
const logoutButton = document.getElementById('logout');
// Add event listeners to the buttons
buyButton.addEventListener('click', handleBuyClick);
sellButton.addEventListener('click', handleSellClick);
// refreshButton.addEventListener('click', handleRefreshClick);
logoutButton.addEventListener('click', handleLogout);

