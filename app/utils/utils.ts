export const formatNumber = (number: number) => {
    return number.toFixed(2)
};

export const compute = (price: number, quantity: number) => {
    return (((price * 100) * (quantity * 100)) / 10000)
}
