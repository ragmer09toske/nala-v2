const zeroDecimalCurrencies = [
    'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX',
    'VND', 'VUV', 'XAF', 'XOF', 'XPF'
];

function isZeroDecimalCurrency(currency) {
    return currency && zeroDecimalCurrencies.indexOf(currency) >= 0;
}

export {
    isZeroDecimalCurrency
};