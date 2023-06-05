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
    const coinId = 'bitcoin'; // Replace this with the actual coin ID
    const quantity = 1; // Replace this with the actual quantity
    const response = await fetch('/api/portfolio/sell', {
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
        console.error('Failed to sell coin');
    }
}

// Refresh button
async function handleRefreshClick() {
    const response = await fetch('/api/portfolio/refresh');
    if (response.ok) {
        const updatedPortfolio = await response.json();
        updatePortfolio(updatedPortfolio);
    } else {
        console.error('Failed to refresh portfolio');
    }
}

// refresh coin prices on dropdown click
const handleBuyRefresh = async (event) => {
    event.preventDefault();
   try {
        console.log('clicky click')
        const response = await fetch('/api/coin/price', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
    } catch (error) {
      alert(error);
   }
}

// logout (needs work)
const handleLogout = async (event) => {
    event.preventDefault();
   
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
const buyButton = document.querySelector('#buy');
const sellButton = document.querySelector('.btn-danger');
const buyRefreshButton = document.querySelector('#buy-refresh');
const logoutButton = document.getElementById('logout');
// Add event listeners to the buttons
buyButton.addEventListener('click', handleBuyClick);
sellButton.addEventListener('click', handleSellClick);
buyRefreshButton.addEventListener('click', handleBuyRefresh);
logoutButton.addEventListener('click', handleLogout);

