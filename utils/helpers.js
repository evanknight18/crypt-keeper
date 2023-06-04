const handlebars = require('handlebars');

const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const calculatePortfolioValue = (portfolio) => {
    let totalValue = 0;
    portfolio.forEach(coin => {
        totalValue += coin.amount * coin.price;
    });
    return totalValue;
};

const formatPriceChange = (priceChange) => {
    if (priceChange > 0) {
        return `+${priceChange.toFixed(2)}`;
    } else {
        return priceChange.toFixed(2);
    }
};


handlebars.registerHelper('large-number', (number) => {
    const suffixes = ["", "k", "mil", "bil", "tril"]; // Add more suffixes as needed
    const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
    const scaledNumber = number / Math.pow(1000, suffixIndex);
    const roundedNumber = Math.round(scaledNumber * 10) / 10;
    return roundedNumber + " " + suffixes[suffixIndex];
});

module.exports = {
    formatPrice,
    formatDate,
    calculatePortfolioValue,
    formatPriceChange,
    handlebars
};
