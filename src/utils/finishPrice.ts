export const finishPrice = (price: number, discount: number) => Math.round(price - (price/100 * discount))