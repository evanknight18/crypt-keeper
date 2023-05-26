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

module.exports = {
    formatPrice,
    formatDate,
    calculatePortfolioValue,
    formatPriceChange
};
