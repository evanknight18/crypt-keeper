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

console.log('fuck');