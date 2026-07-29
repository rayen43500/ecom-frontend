// display Money In Euro format
export const dispalyMoney = function(num) {
  const numFormate = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return numFormate.format(num);
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
  const disCountPercent = (discountedPrice / originalPrice) * 100;
  return disCountPercent;
};



// calculate Total  Amount
export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, curr) => accum + curr, 0);
  return total;
};


export function generateDiscountedPrice(price) {
  var discountPercentage = 35;
  var discountAmount = (discountPercentage / 100) * price;
  var discountedPrice = price - discountAmount;
  return discountedPrice.toFixed(2); 
}

